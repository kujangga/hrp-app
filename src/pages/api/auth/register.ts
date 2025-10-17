import { NextApiRequest, NextApiResponse } from 'next'
import bcrypt from 'bcryptjs'
import { prisma } from '@/lib/prisma'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const { name, email, password, role } = req.body

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email }
    })

    if (existingUser) {
      return res.status(400).json({ error: 'User already exists' })
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10)

    // Create user
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role: role === 'PHOTOGRAPHER' ? 'PHOTOGRAPHER' : 'CUSTOMER'
      }
    })

    // If user is a photographer, create photographer profile
    if (role === 'PHOTOGRAPHER') {
      await prisma.photographer.create({
        data: {
          userId: user.id,
          grade: 'E', // Default grade
          hourlyRate: 0,
          dailyRate: 0,
          status: 'DRAFT'
        }
      })
    }

    return res.status(201).json({ message: 'User created successfully', user })
  } catch (error) {
    console.error('Registration error:', error)
    return res.status(500).json({ error: 'Internal server error' })
  }
}