import { Hono } from "hono"
import { serveStatic } from "@hono/node-server/serve-static"

import prisma from "./utils/db"
import workPlans from "./routes/work-plans"
import workplaceInspections from "./routes/workplace-inspections"
import notifications from "./routes/notifications"
import personnel from "./routes/personnel"
import workEquipment from "./routes/work-equipment"

const app = new Hono().basePath("/api")

// Health check
app.get("/hello", (c) => {
    return c.json({
        message: `Hello World ${process.cwd()}`
    })
})

// Static assets
app.use('/assets/*', serveStatic({
    root: './public',
    rewriteRequestPath: (p) => p.replace(/^\/assets/, ''),
}))

// User routes
app.post('/users', async (c) => {
    const { email, password } = await c.req.json()
    const user = await prisma.user.create({ data: { email, password } })
    return c.json(user)
})

// Module routes
app.route('/modules/work-plans', workPlans)
app.route('/modules/workplace-inspections', workplaceInspections)
app.route('/modules/notifications', notifications)
app.route('/modules/personnel', personnel)
app.route('/modules/work-equipment', workEquipment)

export default app