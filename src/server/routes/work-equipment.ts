import { Hono } from "hono"
import prisma from "../utils/db"

const workEquipment = new Hono()

// Get all work equipment with pagination and filters
workEquipment.get("/", async (c) => {
  try {
    const page = parseInt(c.req.query("page") || "1")
    const limit = parseInt(c.req.query("limit") || "30")
    const search = c.req.query("search") || ""
    const removed = c.req.query("removed") === "true"
    const type = c.req.query("type")
    const skip = (page - 1) * limit

    const where: Record<string, unknown> = {}
    
    if (search) {
      where.OR = [
        { type: { contains: search, mode: "insensitive" } },
        { description: { contains: search, mode: "insensitive" } },
        { identification: { contains: search, mode: "insensitive" } },
        { operatingCompany: { contains: search, mode: "insensitive" } },
      ]
    }

    if (removed) {
      where.removed = true
    }

    if (type) {
      where.type = type
    }

    const [data, total] = await Promise.all([
      prisma.workEquipment.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: "desc" },
      }),
      prisma.workEquipment.count({ where }),
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

// Get single work equipment
workEquipment.get("/:id", async (c) => {
  try {
    const id = c.req.param("id")
    const equipment = await prisma.workEquipment.findUnique({
      where: { id },
    })

    if (!equipment) {
      return c.json({ error: "Work equipment not found" }, 404)
    }

    return c.json(equipment)
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Unknown error'
    return c.json({ error: message }, 500)
  }
})

// Create work equipment
workEquipment.post("/", async (c) => {
  try {
    const body = await c.req.json()
    const { type, description, identification, operatingCompany, next, d, removed } = body

    if (!type || !description) {
      return c.json({ error: "Missing required fields" }, 400)
    }

    const equipment = await prisma.workEquipment.create({
      data: {
        type,
        description,
        identification: identification || null,
        operatingCompany: operatingCompany || null,
        next: next ? new Date(next) : null,
        d: d || null,
        removed: removed || false,
      },
    })

    return c.json(equipment, 201)
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Unknown error'
    return c.json({ error: message }, 500)
  }
})

// Update work equipment
workEquipment.put("/:id", async (c) => {
  try {
    const id = c.req.param("id")
    const body = await c.req.json()

    const equipment = await prisma.workEquipment.update({
      where: { id },
      data: {
        ...(body.type && { type: body.type }),
        ...(body.description && { description: body.description }),
        ...(body.identification !== undefined && { identification: body.identification }),
        ...(body.operatingCompany !== undefined && { operatingCompany: body.operatingCompany }),
        ...(body.next !== undefined && { next: body.next ? new Date(body.next) : null }),
        ...(body.d !== undefined && { d: body.d }),
        ...(body.removed !== undefined && { removed: body.removed }),
      },
    })

    return c.json(equipment)
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Unknown error'
    return c.json({ error: message }, 500)
  }
})

// Delete work equipment
workEquipment.delete("/:id", async (c) => {
  try {
    const id = c.req.param("id")
    await prisma.workEquipment.delete({
      where: { id },
    })

    return c.json({ message: "Work equipment deleted successfully" })
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Unknown error'
    return c.json({ error: message }, 500)
  }
})

export default workEquipment

