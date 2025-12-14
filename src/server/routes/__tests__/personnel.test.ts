import { createTestPersonnel, cleanupDatabase } from '../../__tests__/helpers'
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

describe('Personnel API', () => {
  beforeEach(async () => {
    await cleanupDatabase()
  })

  afterAll(async () => {
    await prisma.$disconnect()
  })

  describe('GET /api/modules/personnel', () => {
    it('should return empty array when no personnel exist', async () => {
      const response = await request('GET', '/api/modules/personnel')
      
      expect(response.status).toBe(200)
      expect(response.body.data).toEqual([])
      expect(response.body.pagination.total).toBe(0)
    })

    it('should return all personnel with pagination', async () => {
      await createTestPersonnel({ firstName: 'John', lastName: 'Doe' })
      await createTestPersonnel({ firstName: 'Jane', lastName: 'Smith' })

      const response = await request('GET', '/api/modules/personnel')
      
      expect(response.status).toBe(200)
      expect(response.body.data).toHaveLength(2)
      expect(response.body.pagination.total).toBe(2)
    })

    it('should filter by outOfService', async () => {
      await createTestPersonnel({ outOfService: false })
      await createTestPersonnel({ outOfService: true })
      await createTestPersonnel({ outOfService: true })

      const response = await request('GET', '/api/modules/personnel?outOfService=true')
      
      expect(response.status).toBe(200)
      expect(response.body.data).toHaveLength(2)
      expect(response.body.data.every((p: any) => p.outOfService === true)).toBe(true)
    })

    it('should support search', async () => {
      await createTestPersonnel({ firstName: 'John', lastName: 'Doe', mobile: '0612345678' })
      await createTestPersonnel({ firstName: 'Jane', lastName: 'Smith', mobile: '0698765432' })

      const response = await request('GET', '/api/modules/personnel?search=John')
      
      expect(response.status).toBe(200)
      expect(response.body.data.length).toBeGreaterThan(0)
      expect(response.body.data.some((p: any) => p.firstName === 'John')).toBe(true)
    })
  })

  describe('GET /api/modules/personnel/:id', () => {
    it('should return a single personnel', async () => {
      const person = await createTestPersonnel()

      const response = await request('GET', `/api/modules/personnel/${person.id}`)
      
      expect(response.status).toBe(200)
      expect(response.body.id).toBe(person.id)
      expect(response.body.firstName).toBe(person.firstName)
    })

    it('should return 404 for non-existent personnel', async () => {
      const fakeId = '00000000-0000-0000-0000-000000000000'
      const response = await request('GET', `/api/modules/personnel/${fakeId}`)
      
      expect(response.status).toBe(404)
      expect(response.body.error).toBe('Personnel not found')
    })
  })

  describe('POST /api/modules/personnel', () => {
    it('should create a new personnel', async () => {
      const newPersonnel = {
        firstName: 'New',
        lastName: 'Employee',
        mobile: '0611111111',
        function: 'Developer',
        endOfContract: 'ZZP',
        k: 1,
        b: '✓',
        next: '2026-01-01T00:00:00Z',
        outOfService: false,
      }

      const response = await request('POST', '/api/modules/personnel', newPersonnel)
      
      expect(response.status).toBe(201)
      expect(response.body.firstName).toBe(newPersonnel.firstName)
      expect(response.body.lastName).toBe(newPersonnel.lastName)
      expect(response.body.id).toBeDefined()
    })

    it('should return error for missing required fields', async () => {
      const incompletePersonnel = {
        firstName: 'Incomplete',
        // Missing lastName
      }

      const response = await request('POST', '/api/modules/personnel', incompletePersonnel)
      
      expect(response.status).toBe(500)
      expect(response.body.error).toBeDefined()
    })
  })

  describe('PUT /api/modules/personnel/:id', () => {
    it('should update an existing personnel', async () => {
      const person = await createTestPersonnel()

      const updateData = {
        firstName: 'Updated',
        mobile: '0622222222',
        outOfService: true,
      }

      const response = await request('PUT', `/api/modules/personnel/${person.id}`, updateData)
      
      expect(response.status).toBe(200)
      expect(response.body.firstName).toBe('Updated')
      expect(response.body.mobile).toBe('0622222222')
      expect(response.body.outOfService).toBe(true)
    })
  })

  describe('DELETE /api/modules/personnel/:id', () => {
    it('should delete a personnel', async () => {
      const person = await createTestPersonnel()

      const response = await request('DELETE', `/api/modules/personnel/${person.id}`)
      
      expect(response.status).toBe(200)
      expect(response.body.message).toBe('Personnel deleted successfully')

      // Verify it's deleted
      const getResponse = await request('GET', `/api/modules/personnel/${person.id}`)
      expect(getResponse.status).toBe(404)
    })
  })
})

