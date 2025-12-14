import { createTestWorkPlan, cleanupDatabase } from '../../__tests__/helpers'
import prisma from '../../utils/db'
import app from '../../index'

// Helper to make requests to Hono app
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

describe('Work Plans API', () => {
  beforeEach(async () => {
    await cleanupDatabase()
  })

  afterAll(async () => {
    await prisma.$disconnect()
  })

  describe('GET /api/modules/work-plans', () => {
    it('should return empty array when no work plans exist', async () => {
      const response = await request('GET', '/api/modules/work-plans')
      
      expect(response.status).toBe(200)

      expect(response.body.data).toEqual([])
      expect(response.body.pagination.total).toBe(0)
    })

    it('should return all work plans with pagination', async () => {
      await createTestWorkPlan({ title: 'Plan 1' })
      await createTestWorkPlan({ title: 'Plan 2' })
      await createTestWorkPlan({ title: 'Plan 3' })

      const response = await request('GET', '/api/modules/work-plans')
      
      expect(response.status).toBe(200)
      expect(response.body.data).toHaveLength(3)
      expect(response.body.pagination.total).toBe(3)
      expect(response.body.pagination.page).toBe(1)
      expect(response.body.pagination.limit).toBe(30)
    })

    it('should support pagination', async () => {
      // Create 5 work plans
      for (let i = 1; i <= 5; i++) {
        await createTestWorkPlan({ title: `Plan ${i}`, number: `WP-${i}` })
      }

      const response = await request('GET', '/api/modules/work-plans?page=1&limit=2')
      
      expect(response.status).toBe(200)
      expect(response.body.data).toHaveLength(2)
      expect(response.body.pagination.page).toBe(1)
      expect(response.body.pagination.limit).toBe(2)
      expect(response.body.pagination.total).toBe(5)
      expect(response.body.pagination.totalPages).toBe(3)
    })

    it('should support search', async () => {
      await createTestWorkPlan({ title: 'Project Alpha', number: 'WP-001' })
      await createTestWorkPlan({ title: 'Project Beta', number: 'WP-002' })
      await createTestWorkPlan({ title: 'Task Gamma', number: 'WP-003' })

      const response = await request('GET', '/api/modules/work-plans?search=Project')
      
      expect(response.status).toBe(200)
      expect(response.body.data).toHaveLength(2)
      expect(response.body.data.every((plan: { title: string }) => plan.title.includes('Project'))).toBe(true)
    })

    it('should search by location', async () => {
      await createTestWorkPlan({ location: 'Amsterdam' })
      await createTestWorkPlan({ location: 'Rotterdam' })
      await createTestWorkPlan({ location: 'Utrecht' })

      const response = await request('GET', '/api/modules/work-plans?search=Amsterdam')
      
      expect(response.status).toBe(200)
      expect(response.body.data).toHaveLength(1)
      expect(response.body.data[0].location).toBe('Amsterdam')
    })
  })

  describe('GET /api/modules/work-plans/:id', () => {
    it('should return a single work plan', async () => {
      const workPlan = await createTestWorkPlan()

      const response = await request('GET', `/api/modules/work-plans/${workPlan.id}`)
      
      expect(response.status).toBe(200)
      expect(response.body.id).toBe(workPlan.id)
      expect(response.body.title).toBe(workPlan.title)
    })

    it('should return 404 for non-existent work plan', async () => {
      const fakeId = '00000000-0000-0000-0000-000000000000'
      const response = await request('GET', `/api/modules/work-plans/${fakeId}`)
      
      expect(response.status).toBe(404)
      expect(response.body.error).toBe('Work plan not found')
    })
  })

  describe('POST /api/modules/work-plans', () => {
    it('should create a new work plan', async () => {
      const newWorkPlan = {
        start: '2025-01-01T00:00:00Z',
        end: '2025-12-31T00:00:00Z',
        title: 'New Work Plan',
        number: 'WP-NEW',
        location: 'New Location',
        address: 'New Address',
        type: 'Construction',
      }

      const response = await request('POST', '/api/modules/work-plans', newWorkPlan)
      
      expect(response.status).toBe(201)
      expect(response.body.title).toBe(newWorkPlan.title)
      expect(response.body.number).toBe(newWorkPlan.number)
      expect(response.body.id).toBeDefined()
    })

    it('should return error for missing required fields', async () => {
      const incompletePlan = {
        title: 'Incomplete Plan',
        // Missing start, end, number
      }

      const response = await request('POST', '/api/modules/work-plans', incompletePlan)
      
      expect(response.status).toBe(500) // Prisma will throw an error
      expect(response.body.error).toBeDefined()
    })

    it('should handle optional fields', async () => {
      const minimalPlan = {
        start: '2025-01-01T00:00:00Z',
        end: '2025-12-31T00:00:00Z',
        title: 'Minimal Plan',
        number: 'WP-MIN',
        location: '',
        address: '',
        type: '',
      }

      const response = await request('POST', '/api/modules/work-plans', minimalPlan)
      
      expect(response.status).toBe(201)
      expect(response.body.location).toBe('')
      expect(response.body.address).toBe('')
    })
  })

  describe('PUT /api/modules/work-plans/:id', () => {
    it('should update an existing work plan', async () => {
      const workPlan = await createTestWorkPlan()

      const updateData = {
        title: 'Updated Title',
        location: 'Updated Location',
      }

      const response = await request('PUT', `/api/modules/work-plans/${workPlan.id}`, updateData)
      
      expect(response.status).toBe(200)
      expect(response.body.title).toBe('Updated Title')
      expect(response.body.location).toBe('Updated Location')
      expect(response.body.id).toBe(workPlan.id)
    })

    it('should update dates correctly', async () => {
      const workPlan = await createTestWorkPlan()

      const updateData = {
        start: '2026-01-01T00:00:00Z',
        end: '2026-12-31T00:00:00Z',
      }

      const response = await request('PUT', `/api/modules/work-plans/${workPlan.id}`, updateData)
      
      expect(response.status).toBe(200)
      expect(new Date(response.body.start).getFullYear()).toBe(2026)
      expect(new Date(response.body.end).getFullYear()).toBe(2026)
    })
  })

  describe('DELETE /api/modules/work-plans/:id', () => {
    it('should delete a work plan', async () => {
      const workPlan = await createTestWorkPlan()

      const response = await request('DELETE', `/api/modules/work-plans/${workPlan.id}`)
      
      expect(response.status).toBe(200)
      expect(response.body.message).toBe('Work plan deleted successfully')

      // Verify it's deleted
      const getResponse = await request('GET', `/api/modules/work-plans/${workPlan.id}`)
      expect(getResponse.status).toBe(404)
    })

    it('should return error for non-existent work plan', async () => {
      const fakeId = '00000000-0000-0000-0000-000000000000'
      const response = await request('DELETE', `/api/modules/work-plans/${fakeId}`)
      
      expect(response.status).toBe(500)
      expect(response.body.error).toBeDefined()
    })
  })
})

