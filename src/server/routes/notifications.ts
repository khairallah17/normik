import { Hono } from "hono"
import prisma from "../utils/db"

const notifications = new Hono()

// Get all notifications with pagination and filters
notifications.get("/", async (c) => {
  try {
    const page = parseInt(c.req.query("page") || "1")
    const limit = parseInt(c.req.query("limit") || "30")
    const search = c.req.query("search") || ""
    const last3Years = c.req.query("last3Years") === "true"
    const status = c.req.query("status") // Open, Monitoring, Gesloten
    const skip = (page - 1) * limit

    const where: Record<string, unknown> = {}
    
    if (search) {
      where.OR = [
        { reference: { contains: search, mode: "insensitive" } },
        { type: { contains: search, mode: "insensitive" } },
        { description: { contains: search, mode: "insensitive" } },
        { by: { contains: search, mode: "insensitive" } },
        { owner: { contains: search, mode: "insensitive" } },
        { location: { contains: search, mode: "insensitive" } },
      ]
    }

    if (last3Years) {
      const threeYearsAgo = new Date()
      threeYearsAgo.setFullYear(threeYearsAgo.getFullYear() - 3)
      where.date = { gte: threeYearsAgo }
    }

    if (status) {
      where.status = status
    }

    const [data, total] = await Promise.all([
      prisma.notification.findMany({
        where,
        skip,
        take: limit,
        orderBy: { date: "desc" },
      }),
      prisma.notification.count({ where }),
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

// Get single notification
notifications.get("/:id", async (c) => {
  try {
    const id = c.req.param("id")
    const notification = await prisma.notification.findUnique({
      where: { id },
    })

    if (!notification) {
      return c.json({ error: "Notification not found" }, 404)
    }

    return c.json(notification)
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Unknown error'
    return c.json({ error: message }, 500)
  }
})

// Create notification
notifications.post("/", async (c) => {
  try {
    const body = await c.req.json()
    const { date, planned, reference, type, description, by, status, owner, location } = body

    if (!date || !type || !description || !by || !status) {
      return c.json({ error: "Missing required fields" }, 400)
    }

    const notification = await prisma.notification.create({
      data: {
        date: new Date(date),
        planned: planned ? new Date(planned) : null,
        reference: reference || null,
        type,
        description,
        by,
        status,
        owner: owner || null,
        location: location || null,
      },
    })

    return c.json(notification, 201)
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Unknown error'
    return c.json({ error: message }, 500)
  }
})

// Update notification
notifications.put("/:id", async (c) => {
  try {
    const id = c.req.param("id")
    const body = await c.req.json()

    const notification = await prisma.notification.update({
      where: { id },
      data: {
        ...(body.date && { date: new Date(body.date) }),
        ...(body.planned !== undefined && { planned: body.planned ? new Date(body.planned) : null }),
        ...(body.reference !== undefined && { reference: body.reference }),
        ...(body.type && { type: body.type }),
        ...(body.description && { description: body.description }),
        ...(body.by && { by: body.by }),
        ...(body.status && { status: body.status }),
        ...(body.owner !== undefined && { owner: body.owner }),
        ...(body.location !== undefined && { location: body.location }),
      },
    })

    return c.json(notification)
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Unknown error'
    return c.json({ error: message }, 500)
  }
})

// Delete notification
notifications.delete("/:id", async (c) => {
  try {
    const id = c.req.param("id")
    await prisma.notification.delete({
      where: { id },
    })

    return c.json({ message: "Notification deleted successfully" })
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Unknown error'
    return c.json({ error: message }, 500)
  }
})

export default notifications

