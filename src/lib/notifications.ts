// Notification system utilities
import { prisma } from '@/lib/prisma'

// Send email notification
export async function sendEmailNotification(to, subject, body) {
  // In a real implementation, this would integrate with an email service like SendGrid or Nodemailer
  console.log(`Email sent to ${to}: ${subject}\n${body}`)
  
  // Save to database
  await prisma.notification.create({
    data: {
      userId: to,
      type: 'EMAIL',
      subject,
      message: body,
      status: 'SENT'
    }
  })
}

// Send SMS notification
export async function sendSMSNotification(to, message) {
  // In a real implementation, this would integrate with an SMS service like Twilio
  console.log(`SMS sent to ${to}: ${message}`)
  
  // Save to database
  await prisma.notification.create({
    data: {
      userId: to,
      type: 'SMS',
      message,
      status: 'SENT'
    }
  })
}

// Create in-app notification
export async function createInAppNotification(userId, title, message, link = null) {
  await prisma.notification.create({
    data: {
      userId,
      type: 'IN_APP',
      subject: title,
      message,
      link,
      status: 'UNREAD'
    }
  })
}

// Get user notifications
export async function getUserNotifications(userId) {
  return await prisma.notification.findMany({
    where: {
      userId
    },
    orderBy: {
      createdAt: 'desc'
    },
    take: 10
  })
}

// Mark notification as read
export async function markNotificationAsRead(notificationId) {
  await prisma.notification.update({
    where: {
      id: notificationId
    },
    data: {
      status: 'READ'
    }
  })
}