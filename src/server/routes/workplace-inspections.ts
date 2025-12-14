import { Hono } from "hono"
import prisma from "../utils/db"

const workplaceInspections = new Hono()

// Get all workplace inspections with pagination and filters
workplaceInspections.get("/", async (c) => {
  try {
    const page = parseInt(c.req.query("page") || "1")
    const limit = parseInt(c.req.query("limit") || "30")
    const search = c.req.query("search") || ""
    const last3Years = c.req.query("last3Years") === "true"
    const skip = (page - 1) * limit

    const where: Record<string, unknown> = {}
    
    if (search) {
      where.OR = [
        { title: { contains: search, mode: "insensitive" } },
        { number: { contains: search, mode: "insensitive" } },
        { inspector: { contains: search, mode: "insensitive" } },
        { location: { contains: search, mode: "insensitive" } },
      ]
    }

    if (last3Years) {
      const threeYearsAgo = new Date()
      threeYearsAgo.setFullYear(threeYearsAgo.getFullYear() - 3)
      where.date = { gte: threeYearsAgo }
    }

    const [data, total] = await Promise.all([
      prisma.workplaceInspection.findMany({
        where,
        skip,
        take: limit,
        orderBy: { date: "desc" },
      }),
      prisma.workplaceInspection.count({ where }),
    ])

    return c.json({
      data,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    })
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Unknown error'
    return c.json({ error: message }, 500)
  }
})

// Get single workplace inspection
workplaceInspections.get("/:id", async (c) => {
  try {
    const id = c.req.param("id")
    const inspection = await prisma.workplaceInspection.findUnique({
      where: { id },
    })

    if (!inspection) {
      return c.json({ error: "Workplace inspection not found" }, 404)
    }

    return c.json(inspection)
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Unknown error'
    return c.json({ error: message }, 500)
  }
})

// Create workplace inspection
workplaceInspections.post("/", async (c) => {
  try {
    const body = await c.req.json()
    const { date, title, number, type, inspector, location, deviations, direct } = body

    if (!date || !title || !number) {
      return c.json({ error: "Missing required fields" }, 400)
    }

    const inspection = await prisma.workplaceInspection.create({
      data: {
        date: new Date(date),
        title,
        number,
        type: type || "",
        inspector: inspector || "",
        location: location || "",
        deviations: deviations || null,
        direct: direct || null,
      },
    })

    return c.json(inspection, 201)
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Unknown error'
    return c.json({ error: message }, 500)
  }
})

// Update workplace inspection
workplaceInspections.put("/:id", async (c) => {
  try {
    const id = c.req.param("id")
    const body = await c.req.json()

    const inspection = await prisma.workplaceInspection.update({
      where: { id },
      data: {
        ...(body.date && { date: new Date(body.date) }),
        ...(body.title && { title: body.title }),
        ...(body.number && { number: body.number }),
        ...(body.type !== undefined && { type: body.type }),
        ...(body.inspector !== undefined && { inspector: body.inspector }),
        ...(body.location !== undefined && { location: body.location }),
        ...(body.deviations !== undefined && { deviations: body.deviations }),
        ...(body.direct !== undefined && { direct: body.direct }),
      },
    })

    return c.json(inspection)
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Unknown error'
    return c.json({ error: message }, 500)
  }
})

// Delete workplace inspection
workplaceInspections.delete("/:id", async (c) => {
  try {
    const id = c.req.param("id")
    await prisma.workplaceInspection.delete({
      where: { id },
    })

    return c.json({ message: "Workplace inspection deleted successfully" })
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Unknown error'
    return c.json({ error: message }, 500)
  }
})

export default workplaceInspections

