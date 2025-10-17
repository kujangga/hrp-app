import { prisma } from '@/lib/prisma'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/lib/auth'

export default async function handler(req, res) {
  const session = await getServerSession(req, res, authOptions)
  
  if (!session) {
    return res.status(401).json({ error: 'Unauthorized' })
  }

  if (req.method === 'GET') {
    try {
      const notifications = await prisma.notification.findMany({
        where: {
          userId: session.user.id
        },
        orderBy: {
          createdAt: 'desc'
        }
      })
      
      return res.status(200).json(notifications)
    } catch (error) {
      console.error('Error fetching notifications:', error)
      return res.status(500).json({ error: 'Failed to fetch notifications' })
    }
  } else if (req.method === 'PUT') {
    const { notificationId } = req.body
    
    try {
      const notification = await prisma.notification.update({
        where: {
          id: notificationId
        },
        data: {
          status: 'READ'
        }
      })
      
      return res.status(200).json(notification)
    } catch (error) {
      console.error('Error updating notification:', error)
      return res.status(500).json({ error: 'Failed to update notification' })
    }
  } else {
    return res.status(405).json({ error: 'Method not allowed' })
  }
}