import prisma from '../utils/db'

// Test data factories
export const createTestWorkPlan = async (overrides = {}) => {
  return await prisma.workPlan.create({
    data: {
      start: new Date('2025-01-01'),
      end: new Date('2025-12-31'),
      title: 'Test Work Plan',
      number: 'WP-001',
      location: 'Test Location',
      address: 'Test Address',
      type: 'General',
      ...overrides,
    },
  })
}

export const createTestWorkplaceInspection = async (overrides = {}) => {
  return await prisma.workplaceInspection.create({
    data: {
      date: new Date('2025-01-15'),
      title: 'Test Inspection',
      number: 'INS-001',
      type: 'Safety',
      inspector: 'John Doe',
      location: 'Test Location',
      deviations: null,
      direct: null,
      ...overrides,
    },
  })
}

export const createTestNotification = async (overrides = {}) => {
  return await prisma.notification.create({
    data: {
      date: new Date('2025-01-10'),
      planned: null,
      reference: 'REF-001',
      type: 'Incident',
      description: 'Test notification description',
      by: 'John Doe',
      status: 'Open',
      owner: null,
      location: null,
      ...overrides,
    },
  })
}

export const createTestPersonnel = async (overrides = {}) => {
  return await prisma.personnel.create({
    data: {
      firstName: 'John',
      lastName: 'Doe',
      mobile: '0612345678',
      function: 'Manager',
      endOfContract: 'ZZP',
      k: 0,
      b: null,
      next: null,
      outOfService: false,
      ...overrides,
    },
  })
}

export const createTestWorkEquipment = async (overrides = {}) => {
  return await prisma.workEquipment.create({
    data: {
      type: 'Tool',
      description: 'Test Equipment',
      identification: 'EQ-001',
      operatingCompany: 'Test Company',
      next: null,
      d: null,
      removed: false,
      ...overrides,
    },
  })
}

// Database cleanup helpers
export const cleanupDatabase = async () => {
  await prisma.workEquipment.deleteMany()
  await prisma.personnel.deleteMany()
  await prisma.notification.deleteMany()
  await prisma.workplaceInspection.deleteMany()
  await prisma.workPlan.deleteMany()
}

// Helper to get date N years ago
export const getDateYearsAgo = (years: number): Date => {
  const date = new Date()
  date.setFullYear(date.getFullYear() - years)
  return date
}

