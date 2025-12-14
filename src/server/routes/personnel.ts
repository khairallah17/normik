import { Hono } from "hono"
import prisma from "../utils/db"

const personnel = new Hono()

// Get all personnel with pagination and filters
personnel.get("/", async (c) => {
  try {
    const page = parseInt(c.req.query("page") || "1")
    const limit = parseInt(c.req.query("limit") || "30")
    const search = c.req.query("search") || ""
    const outOfService = c.req.query("outOfService") === "true"
    const skip = (page - 1) * limit

    const where: Record<string, unknown> = {}
    
    if (search) {
      where.OR = [
        { firstName: { contains: search, mode: "insensitive" } },
        { lastName: { contains: search, mode: "insensitive" } },
        { mobile: { contains: search, mode: "insensitive" } },
        { function: { contains: search, mode: "insensitive" } },
      ]
    }

    if (outOfService) {
      where.outOfService = true
    }

    const [data, total] = await Promise.all([
      prisma.personnel.findMany({
        where,
        skip,
        take: limit,
        orderBy: { firstName: "asc" },
      }),
      prisma.personnel.count({ where }),
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

// Get single personnel
personnel.get("/:id", async (c) => {
  try {
    const id = c.req.param("id")
    const person = await prisma.personnel.findUnique({
      where: { id },
    })

    if (!person) {
      return c.json({ error: "Personnel not found" }, 404)
    }

    return c.json(person)
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Unknown error'
    return c.json({ error: message }, 500)
  }
})

// Create personnel
personnel.post("/", async (c) => {
  try {
    const body = await c.req.json()
    const { firstName, lastName, mobile, function: func, endOfContract, k, b, next, outOfService } = body

    if (!firstName || !lastName) {
      return c.json({ error: "Missing required fields" }, 400)
    }

    const person = await prisma.personnel.create({
      data: {
        firstName,
        lastName,
        mobile: mobile || null,
        function: func || null,
        endOfContract: endOfContract || null,
        k: k || 0,
        b: b || null,
        next: next ? new Date(next) : null,
        outOfService: outOfService || false,
      },
    })

    return c.json(person, 201)
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Unknown error'
    return c.json({ error: message }, 500)
  }
})

// Update personnel
personnel.put("/:id", async (c) => {
  try {
    const id = c.req.param("id")
    const body = await c.req.json()

    const person = await prisma.personnel.update({
      where: { id },
      data: {
        ...(body.firstName && { firstName: body.firstName }),
        ...(body.lastName && { lastName: body.lastName }),
        ...(body.mobile !== undefined && { mobile: body.mobile }),
        ...(body.function !== undefined && { function: body.function }),
        ...(body.endOfContract !== undefined && { endOfContract: body.endOfContract }),
        ...(body.k !== undefined && { k: body.k }),
        ...(body.b !== undefined && { b: body.b }),
        ...(body.next !== undefined && { next: body.next ? new Date(body.next) : null }),
        ...(body.outOfService !== undefined && { outOfService: body.outOfService }),
      },
    })

    return c.json(person)
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Unknown error'
    return c.json({ error: message }, 500)
  }
})

// Delete personnel
personnel.delete("/:id", async (c) => {
  try {
    const id = c.req.param("id")
    await prisma.personnel.delete({
      where: { id },
    })

    return c.json({ message: "Personnel deleted successfully" })
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Unknown error'
    return c.json({ error: message }, 500)
  }
})

export default personnel

