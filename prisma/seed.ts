import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  // Create admin user
  const adminPassword = await bcrypt.hash('admin123', 10)
  const admin = await prisma.user.create({
    data: {
      id: 'admin-1',
      email: 'admin@hrp.com',
      password: adminPassword,
      role: 'ADMIN',
      name: 'HRP Admin',
      phoneNumber: '+62123456789'
    }
  })

  // Create photographer user
  const photographerPassword = await bcrypt.hash('photographer123', 10)
  const photographerUser = await prisma.user.create({
    data: {
      id: 'photographer-1',
      email: 'photographer@hrp.com',
      password: photographerPassword,
      role: 'PHOTOGRAPHER',
      name: 'John Doe',
      phoneNumber: '+62123456780'
    }
  })

  // Create photographer profile
  const photographer = await prisma.photographer.create({
    data: {
      id: 'photographer-profile-1',
      userId: photographerUser.id,
      grade: 'A',
      bio: 'Professional photographer with 10+ years of experience',
      instagram: '@johndoe_photography',
      bankName: 'BCA',
      bankAccount: '1234567890',
      accountHolder: 'John Doe',
      hourlyRate: 500000,
      dailyRate: 4000000,
      status: 'PUBLISHED'
    }
  })

  // Create customer user
  const customerPassword = await bcrypt.hash('customer123', 10)
  const customer = await prisma.user.create({
    data: {
      id: 'customer-1',
      email: 'customer@hrp.com',
      password: customerPassword,
      role: 'CUSTOMER',
      name: 'Sarah Johnson',
      phoneNumber: '+62123456781'
    }
  })

  // Create locations
  const jakarta = await prisma.location.create({
    data: {
      id: 'location-1',
      name: 'Jakarta',
      type: 'city'
    }
  })

  const bali = await prisma.location.create({
    data: {
      id: 'location-2',
      name: 'Bali',
      type: 'city'
    }
  })

  const indonesia = await prisma.location.create({
    data: {
      id: 'location-3',
      name: 'Indonesia',
      type: 'country'
    }
  })

  // Create equipment
  const camera = await prisma.equipment.create({
    data: {
      id: 'equipment-1',
      name: 'Canon EOS R5 Camera',
      description: 'Professional mirrorless camera with 45MP sensor',
      dailyRate: 500000,
      quantity: 5
    }
  })

  const lighting = await prisma.equipment.create({
    data: {
      id: 'equipment-2',
      name: 'Professional Lighting Kit',
      description: 'Complete lighting setup with softboxes and stands',
      dailyRate: 300000,
      quantity: 3
    }
  })

  // Create transport
  const suv = await prisma.transport.create({
    data: {
      id: 'transport-1',
      name: 'SUV for Photography Team',
      description: '7-seater SUV for equipment and team transport',
      dailyRate: 1000000,
      quantity: 2
    }
  })

  console.log('Database seeded successfully!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })