import { createTestWorkplaceInspection, cleanupDatabase, getDateYearsAgo } from '../../__tests__/helpers'
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

describe('Workplace Inspections API', () => {
  beforeEach(async () => {
    await cleanupDatabase()
  })

  afterAll(async () => {
    await prisma.$disconnect()
  })

  describe('GET /api/modules/workplace-inspections', () => {
    it('should return empty array when no inspections exist', async () => {
      const response = await request('GET', '/api/modules/workplace-inspections')
      
      expect(response.status).toBe(200)
      expect(response.body.data).toEqual([])
      expect(response.body.pagination.total).toBe(0)
    })

    it('should return all inspections with pagination', async () => {
      await createTestWorkplaceInspection({ title: 'Inspection 1' })
      await createTestWorkplaceInspection({ title: 'Inspection 2' })

      const response = await request('GET', '/api/modules/workplace-inspections')
      
      expect(response.status).toBe(200)
      expect(response.body.data).toHaveLength(2)
      expect(response.body.pagination.total).toBe(2)
    })

    it('should filter by last3Years', async () => {
      const recentDate = new Date()
      recentDate.setMonth(recentDate.getMonth() - 6) // 6 months ago
      const oldDate = getDateYearsAgo(4) // 4 years ago

      await createTestWorkplaceInspection({ date: recentDate })
      await createTestWorkplaceInspection({ date: oldDate })

      const response = await request('GET', '/api/modules/workplace-inspections?last3Years=true')
      
      expect(response.status).toBe(200)
      expect(response.body.data).toHaveLength(1)
      expect(new Date(response.body.data[0].date).getFullYear()).toBeGreaterThanOrEqual(new Date().getFullYear() - 3)
    })

    it('should support search', async () => {
      await createTestWorkplaceInspection({ title: 'Safety Inspection', inspector: 'John Doe' })
      await createTestWorkplaceInspection({ title: 'Quality Check', inspector: 'Jane Smith' })

      const response = await request('GET', '/api/modules/workplace-inspections?search=Safety')
      
      expect(response.status).toBe(200)
      expect(response.body.data).toHaveLength(1)
      expect(response.body.data[0].title).toContain('Safety')
    })
  })

  describe('GET /api/modules/workplace-inspections/:id', () => {
    it('should return a single inspection', async () => {
      const inspection = await createTestWorkplaceInspection()

      const response = await request('GET', `/api/modules/workplace-inspections/${inspection.id}`)
      
      expect(response.status).toBe(200)
      expect(response.body.id).toBe(inspection.id)
      expect(response.body.title).toBe(inspection.title)
    })

    it('should return 404 for non-existent inspection', async () => {
      const fakeId = '00000000-0000-0000-0000-000000000000'
      const response = await request('GET', `/api/modules/workplace-inspections/${fakeId}`)
      
      expect(response.status).toBe(404)
      expect(response.body.error).toBe('Workplace inspection not found')
    })
  })

  describe('POST /api/modules/workplace-inspections', () => {
    it('should create a new inspection', async () => {
      const newInspection = {
        date: '2025-01-15T00:00:00Z',
        title: 'New Inspection',
        number: 'INS-NEW',
        type: 'Safety',
        inspector: 'John Doe',
        location: 'Test Location',
        deviations: 'Some deviations',
        direct: 'Direct action',
      }

      const response = await request('POST', '/api/modules/workplace-inspections', newInspection)
      
      expect(response.status).toBe(201)
      expect(response.body.title).toBe(newInspection.title)
      expect(response.body.number).toBe(newInspection.number)
      expect(response.body.id).toBeDefined()
    })

    it('should return error for missing required fields', async () => {
      const incompleteInspection = {
        title: 'Incomplete Inspection',
        // Missing date, number
      }

      const response = await request('POST', '/api/modules/workplace-inspections', incompleteInspection)
      
      expect(response.status).toBe(500)
      expect(response.body.error).toBeDefined()
    })
  })

  describe('PUT /api/modules/workplace-inspections/:id', () => {
    it('should update an existing inspection', async () => {
      const inspection = await createTestWorkplaceInspection()

      const updateData = {
        title: 'Updated Inspection',
        inspector: 'Jane Doe',
      }

      const response = await request('PUT', `/api/modules/workplace-inspections/${inspection.id}`, updateData)
      
      expect(response.status).toBe(200)
      expect(response.body.title).toBe('Updated Inspection')
      expect(response.body.inspector).toBe('Jane Doe')
    })
  })

  describe('DELETE /api/modules/workplace-inspections/:id', () => {
    it('should delete an inspection', async () => {
      const inspection = await createTestWorkplaceInspection()

      const response = await request('DELETE', `/api/modules/workplace-inspections/${inspection.id}`)
      
      expect(response.status).toBe(200)
      expect(response.body.message).toBe('Workplace inspection deleted successfully')

      // Verify it's deleted
      const getResponse = await request('GET', `/api/modules/workplace-inspections/${inspection.id}`)
      expect(getResponse.status).toBe(404)
    })
  })
})

