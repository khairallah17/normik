import { createTestWorkEquipment, cleanupDatabase } from '../../__tests__/helpers'
import prisma from '../../utils/db'
import app from '../../index'

const request = async (method: string, path: string, body?: any) => {
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

describe('Work Equipment API', () => {
  beforeEach(async () => {
    await cleanupDatabase()
  })

  afterAll(async () => {
    await prisma.$disconnect()
  })

  describe('GET /api/modules/work-equipment', () => {
    it('should return empty array when no equipment exists', async () => {
      const response = await request('GET', '/api/modules/work-equipment')
      
      expect(response.status).toBe(200)
      expect(response.body.data).toEqual([])
      expect(response.body.pagination.total).toBe(0)
    })

    it('should return all equipment with pagination', async () => {
      await createTestWorkEquipment({ type: 'Tool', description: 'Hammer' })
      await createTestWorkEquipment({ type: 'Machine', description: 'Drill' })

      const response = await request('GET', '/api/modules/work-equipment')
      
      expect(response.status).toBe(200)
      expect(response.body.data).toHaveLength(2)
      expect(response.body.pagination.total).toBe(2)
    })

    it('should filter by removed status', async () => {
      await createTestWorkEquipment({ removed: false })
      await createTestWorkEquipment({ removed: true })
      await createTestWorkEquipment({ removed: true })

      const response = await request('GET', '/api/modules/work-equipment?removed=true')
      
      expect(response.status).toBe(200)
      expect(response.body.data).toHaveLength(2)
      expect(response.body.data.every((e: any) => e.removed === true)).toBe(true)
    })

    it('should filter by type', async () => {
      await createTestWorkEquipment({ type: 'Tool' })
      await createTestWorkEquipment({ type: 'Machine' })
      await createTestWorkEquipment({ type: 'Tool' })

      const response = await request('GET', '/api/modules/work-equipment?type=Tool')
      
      expect(response.status).toBe(200)
      expect(response.body.data).toHaveLength(2)
      expect(response.body.data.every((e: any) => e.type === 'Tool')).toBe(true)
    })

    it('should support search', async () => {
      await createTestWorkEquipment({ description: 'Safety equipment', identification: 'EQ-001' })
      await createTestWorkEquipment({ description: 'Power tool', identification: 'EQ-002' })

      const response = await request('GET', '/api/modules/work-equipment?search=Safety')
      
      expect(response.status).toBe(200)
      expect(response.body.data.length).toBeGreaterThan(0)
    })
  })

  describe('GET /api/modules/work-equipment/:id', () => {
    it('should return a single equipment', async () => {
      const equipment = await createTestWorkEquipment()

      const response = await request('GET', `/api/modules/work-equipment/${equipment.id}`)
      
      expect(response.status).toBe(200)
      expect(response.body.id).toBe(equipment.id)
      expect(response.body.type).toBe(equipment.type)
    })

    it('should return 404 for non-existent equipment', async () => {
      const fakeId = '00000000-0000-0000-0000-000000000000'
      const response = await request('GET', `/api/modules/work-equipment/${fakeId}`)
      
      expect(response.status).toBe(404)
      expect(response.body.error).toBe('Work equipment not found')
    })
  })

  describe('POST /api/modules/work-equipment', () => {
    it('should create a new equipment', async () => {
      const newEquipment = {
        type: 'New Tool',
        description: 'New Equipment Description',
        identification: 'EQ-NEW',
        operatingCompany: 'Test Company',
        next: '2026-01-01T00:00:00Z',
        d: 'D-value',
        removed: false,
      }

      const response = await request('POST', '/api/modules/work-equipment', newEquipment)
      
      expect(response.status).toBe(201)
      expect(response.body.type).toBe(newEquipment.type)
      expect(response.body.description).toBe(newEquipment.description)
      expect(response.body.id).toBeDefined()
    })

    it('should return error for missing required fields', async () => {
      const incompleteEquipment = {
        type: 'Incomplete',
        // Missing description
      }

      const response = await request('POST', '/api/modules/work-equipment', incompleteEquipment)
      
      expect(response.status).toBe(500)
      expect(response.body.error).toBeDefined()
    })
  })

  describe('PUT /api/modules/work-equipment/:id', () => {
    it('should update an existing equipment', async () => {
      const equipment = await createTestWorkEquipment()

      const updateData = {
        description: 'Updated Description',
        removed: true,
      }

      const response = await request('PUT', `/api/modules/work-equipment/${equipment.id}`, updateData)
      
      expect(response.status).toBe(200)
      expect(response.body.description).toBe('Updated Description')
      expect(response.body.removed).toBe(true)
    })
  })

  describe('DELETE /api/modules/work-equipment/:id', () => {
    it('should delete an equipment', async () => {
      const equipment = await createTestWorkEquipment()

      const response = await request('DELETE', `/api/modules/work-equipment/${equipment.id}`)
      
      expect(response.status).toBe(200)
      expect(response.body.message).toBe('Work equipment deleted successfully')

      // Verify it's deleted
      const getResponse = await request('GET', `/api/modules/work-equipment/${equipment.id}`)
      expect(getResponse.status).toBe(404)
    })
  })
})

