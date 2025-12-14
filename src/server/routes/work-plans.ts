import { Hono } from "hono"
import prisma from "../utils/db"

const workPlans = new Hono()

// Get all work plans with pagination and search
workPlans.get("/", async (c) => {
  try {
    const page = parseInt(c.req.query("page") || "1")
    const limit = parseInt(c.req.query("limit") || "30")
    const search = c.req.query("search") || ""
    const skip = (page - 1) * limit

    const where: Record<string, unknown> = {}
    
    if (search) {
      where.OR = [
        { title: { contains: search, mode: "insensitive" } },
        { number: { contains: search, mode: "insensitive" } },
        { location: { contains: search, mode: "insensitive" } },
        { address: { contains: search, mode: "insensitive" } },
      ]
    }

    const [data, total] = await Promise.all([
      prisma.workPlan.findMany({
        where,
        skip,
        take: limit,
        orderBy: { start: "desc" },
      }),
      prisma.workPlan.count({ where }),
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

// Get single work plan
workPlans.get("/:id", async (c) => {
  try {
    const id = c.req.param("id")
    const workPlan = await prisma.workPlan.findUnique({
      where: { id },
    })

    if (!workPlan) {
      return c.json({ error: "Work plan not found" }, 404)
    }

    return c.json(workPlan)
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Unknown error'
    return c.json({ error: message }, 500)
  }
})

// Create work plan
workPlans.post("/", async (c) => {
  try {
    const body = await c.req.json()
    const { start, end, title, number, location, address, type } = body

    if (!start || !end || !title || !number) {
      return c.json({ error: "Missing required fields" }, 400)
    }

    const workPlan = await prisma.workPlan.create({
      data: {
        start: new Date(start),
        end: new Date(end),
        title,
        number,
        location: location || "",
        address: address || "",
        type: type || "",
      },
    })

    return c.json(workPlan, 201)
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Unknown error'
    return c.json({ error: message }, 500)
  }
})

// Update work plan
workPlans.put("/:id", async (c) => {
  try {
    const id = c.req.param("id")
    const body = await c.req.json()
    const { start, end, title, number, location, address, type } = body

    const workPlan = await prisma.workPlan.update({
      where: { id },
      data: {
        ...(start && { start: new Date(start) }),
        ...(end && { end: new Date(end) }),
        ...(title && { title }),
        ...(number && { number }),
        ...(location !== undefined && { location }),
        ...(address !== undefined && { address }),
        ...(type !== undefined && { type }),
      },
    })

    return c.json(workPlan)
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Unknown error'
    return c.json({ error: message }, 500)
  }
})

// Delete work plan
workPlans.delete("/:id", async (c) => {
  try {
    const id = c.req.param("id")
    await prisma.workPlan.delete({
      where: { id },
    })

    return c.json({ message: "Work plan deleted successfully" })
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Unknown error'
    return c.json({ error: message }, 500)
  }
})

export default workPlans

