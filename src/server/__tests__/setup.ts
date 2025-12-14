import prisma from '../utils/db'

// Clean up database before all tests
beforeAll(async () => {
  // Ensure database is clean
  await prisma.workEquipment.deleteMany()
  await prisma.personnel.deleteMany()
  await prisma.notification.deleteMany()
  await prisma.workplaceInspection.deleteMany()
  await prisma.workPlan.deleteMany()
})

// Clean up after each test
afterEach(async () => {
  await prisma.workEquipment.deleteMany()
  await prisma.personnel.deleteMany()
  await prisma.notification.deleteMany()
  await prisma.workplaceInspection.deleteMany()
  await prisma.workPlan.deleteMany()
})

// Close Prisma connection after all tests
afterAll(async () => {
  await prisma.$disconnect()
})

