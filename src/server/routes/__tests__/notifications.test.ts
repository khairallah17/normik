import { createTestNotification, cleanupDatabase, getDateYearsAgo } from '../../__tests__/helpers'
import prisma from '../../utils/db'
import app from '../../index'

const request = async (method: string, path: string, body?: unknown) => {
  const url = new URL(`http://localhost${path}`)
  const request = new Request(url.toString(), {
    method,
    headers: { 'Content-Type': 'application/json' },
    body: body ? JSON.stringify(body) : undefined,
  })
  const response = await app.fetch(request)
  const data = await response.json()
  return { status: response.status, body: data }
}

describe('Notifications API', () => {
  beforeEach(async () => {
    await cleanupDatabase()
  })

  afterAll(async () => {
    await prisma.$disconnect()
  })

  describe('GET /api/modules/notifications', () => {
    it('should return empty array when no notifications exist', async () => {
      const response = await request('GET', '/api/modules/notifications')
      
      expect(response.status).toBe(200)
      expect(response.body.data).toEqual([])
      expect(response.body.pagination.total).toBe(0)
    })

    it('should filter by status', async () => {
      await createTestNotification({ status: 'Open' })
      await createTestNotification({ status: 'Monitoring' })
      await createTestNotification({ status: 'Gesloten' })

      const response = await request('GET', '/api/modules/notifications?status=Open')
      
      expect(response.status).toBe(200)
      expect(response.body.data).toHaveLength(1)
      expect(response.body.data[0].status).toBe('Open')
    })

    it('should filter by last3Years', async () => {
      const recentDate = new Date()
      recentDate.setMonth(recentDate.getMonth() - 6)
      const oldDate = getDateYearsAgo(4)

      await createTestNotification({ date: recentDate })
      await createTestNotification({ date: oldDate })

      const response = await request('GET', '/api/modules/notifications?last3Years=true')
      
      expect(response.status).toBe(200)
      expect(response.body.data).toHaveLength(1)
    })

    it('should support search', async () => {
      await createTestNotification({ description: 'Safety incident', reference: 'REF-001' })
      await createTestNotification({ description: 'Quality issue', reference: 'REF-002' })

      const response = await request('GET', '/api/modules/notifications?search=Safety')
      
      expect(response.status).toBe(200)
      expect(response.body.data.length).toBeGreaterThan(0)
    })
  })

  describe('GET /api/modules/notifications/:id', () => {
    it('should return a single notification', async () => {
      const notification = await createTestNotification()

      const response = await request('GET', `/api/modules/notifications/${notification.id}`)
      
      expect(response.status).toBe(200)
      expect(response.body.id).toBe(notification.id)
      expect(response.body.type).toBe(notification.type)
    })

    it('should return 404 for non-existent notification', async () => {
      const fakeId = '00000000-0000-0000-0000-000000000000'
      const response = await request('GET', `/api/modules/notifications/${fakeId}`)
      
      expect(response.status).toBe(404)
      expect(response.body.error).toBe('Notification not found')
    })
  })

  describe('POST /api/modules/notifications', () => {
    it('should create a new notification', async () => {
      const newNotification = {
        date: '2025-01-10T00:00:00Z',
        type: 'Incident',
        description: 'Test notification',
        by: 'John Doe',
        status: 'Open',
        reference: 'REF-TEST',
        owner: 'Jane Doe',
        location: 'Test Location',
      }

      const response = await request('POST', '/api/modules/notifications', newNotification)
      
      expect(response.status).toBe(201)
      expect(response.body.type).toBe(newNotification.type)
      expect(response.body.status).toBe(newNotification.status)
      expect(response.body.id).toBeDefined()
    })

    it('should return error for missing required fields', async () => {
      const incompleteNotification = {
        description: 'Incomplete notification',
        // Missing date, type, by, status
      }

      const response = await request('POST', '/api/modules/notifications', incompleteNotification)
      
      expect(response.status).toBe(500)
      expect(response.body.error).toBeDefined()
    })
  })

  describe('PUT /api/modules/notifications/:id', () => {
    it('should update an existing notification', async () => {
      const notification = await createTestNotification()

      const updateData = {
        status: 'Gesloten',
        owner: 'Updated Owner',
      }

      const response = await request('PUT', `/api/modules/notifications/${notification.id}`, updateData)
      
      expect(response.status).toBe(200)
      expect(response.body.status).toBe('Gesloten')
      expect(response.body.owner).toBe('Updated Owner')
    })
  })

  describe('DELETE /api/modules/notifications/:id', () => {
    it('should delete a notification', async () => {
      const notification = await createTestNotification()

      const response = await request('DELETE', `/api/modules/notifications/${notification.id}`)
      
      expect(response.status).toBe(200)
      expect(response.body.message).toBe('Notification deleted successfully')

      // Verify it's deleted
      const getResponse = await request('GET', `/api/modules/notifications/${notification.id}`)
      expect(getResponse.status).toBe(404)
    })
  })
})

