'use client'

import RoleBasedLayout from '@/components/RoleBasedLayout'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { COLORS } from '@/lib/colors'
import { CheckCircle, Mail, Phone, MapPin, Calendar, Package, User } from 'lucide-react'

interface OrderData {
  orderId: string
  guestInfo: {
    fullName: string
    email: string
    phone: string
    address: string
    city: string
    notes?: string
  }
  bookingDetails: {
    location: string
    date: string
    items: any[]
    total: number
  }
  paymentMethod: string
  createdAt: string
  status: string
}

export default function BookingConfirmation() {
  const router = useRouter()
  const [orderData, setOrderData] = useState<OrderData | null>(null)

  useEffect(() => {
    // Retrieve order data from localStorage
    if (typeof window !== 'undefined') {
      const latestOrderId = localStorage.getItem('latestOrderId')
      if (latestOrderId) {
        const savedOrder = localStorage.getItem(`order_${latestOrderId}`)
        if (savedOrder) {
          setOrderData(JSON.parse(savedOrder))
        }
      }
    }
  }, [])

  if (!orderData) {
    return (
      <RoleBasedLayout allowedRoles={['CUSTOMER']} allowGuest={true}>
        <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-[#0a1219] via-[#0f1924] to-[#162533]">
          <div className="text-center">
            <div className="mb-4 animate-spin rounded-full border-4 border-white/20 border-t-white h-12 w-12 mx-auto"></div>
            <p className="text-white/70">Loading order details...</p>
          </div>
        </div>
      </RoleBasedLayout>
    )
  }

  return (
    <RoleBasedLayout allowedRoles={['CUSTOMER']} allowGuest={true}>
      <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-[#0a1219] via-[#0f1924] to-[#162533]">
        {/* Animated Gradient Orbs */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            className="absolute -top-40 -right-40 h-96 w-96 rounded-full bg-[#7D97B6]/10 blur-3xl"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </div>

        {/* Main Content */}
        <div className="relative min-h-screen px-4 py-12 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl">
            {/* Success Icon */}
            <motion.div
              className="flex justify-center mb-8"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', duration: 0.8, delay: 0.2 }}
            >
              <div className="flex h-24 w-24 items-center justify-center rounded-full bg-green-500/20 backdrop-blur-sm">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', duration: 0.6, delay: 0.4 }}
                >
                  <CheckCircle className="h-12 w-12 text-green-400" />
                </motion.div>
              </div>
            </motion.div>

            {/* Header */}
            <motion.div
              className="mb-8 text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <h1 className="mb-3 text-[clamp(2rem,4vw,3rem)] font-bold text-white">
                Booking Confirmed!
              </h1>
              <p className="text-lg text-white/70">
                Thank you for your booking. We've received your order.
              </p>
            </motion.div>

            {/* Order ID Card */}
            <motion.div
              className="mb-6 overflow-hidden rounded-2xl border border-white/10 bg-white/95 shadow-xl backdrop-blur-xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <div className="bg-gradient-to-r from-[#7D97B6] to-[#546079] p-6">
                <p className="text-sm font-medium text-white/80">Order ID</p>
                <p className="mt-1 text-3xl font-bold text-white">{orderData.orderId}</p>
                <p className="mt-2 text-sm text-white/70">
                  Please save this order ID for tracking purposes
                </p>
              </div>
            </motion.div>

            {/* Contact Information */}
            <motion.div
              className="mb-6 overflow-hidden rounded-2xl border border-white/10 bg-white/95 shadow-xl backdrop-blur-xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <div className="p-6">
                <div className="mb-4 flex items-center gap-2">
                  <User className="h-6 w-6" style={{ color: COLORS.BLUE_LIGHT }} />
                  <h3 className="text-xl font-bold" style={{ color: COLORS.NAVY_DARK }}>
                    Contact Information
                  </h3>
                </div>

                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <User className="h-5 w-5 text-gray-400 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-gray-500">Full Name</p>
                      <p className="text-base font-semibold" style={{ color: COLORS.NAVY_DARK }}>
                        {orderData.guestInfo.fullName}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Mail className="h-5 w-5 text-gray-400 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-gray-500">Email</p>
                      <p className="text-base font-semibold" style={{ color: COLORS.NAVY_DARK }}>
                        {orderData.guestInfo.email}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Phone className="h-5 w-5 text-gray-400 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-gray-500">Phone</p>
                      <p className="text-base font-semibold" style={{ color: COLORS.NAVY_DARK }}>
                        {orderData.guestInfo.phone}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <MapPin className="h-5 w-5 text-gray-400 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-gray-500">Event Address</p>
                      <p className="text-base font-semibold" style={{ color: COLORS.NAVY_DARK }}>
                        {orderData.guestInfo.address}
                      </p>
                      <p className="text-sm text-gray-600">{orderData.guestInfo.city}</p>
                    </div>
                  </div>

                  {orderData.guestInfo.notes && (
                    <div className="flex items-start gap-3 pt-2 border-t border-gray-200">
                      <Package className="h-5 w-5 text-gray-400 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium text-gray-500">Special Notes</p>
                        <p className="text-base" style={{ color: COLORS.NAVY_DARK }}>
                          {orderData.guestInfo.notes}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>

            {/* Booking Details */}
            <motion.div
              className="mb-6 overflow-hidden rounded-2xl border border-white/10 bg-white/95 shadow-xl backdrop-blur-xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <div className="p-6">
                <div className="mb-4 flex items-center gap-2">
                  <Calendar className="h-6 w-6" style={{ color: COLORS.BLUE_LIGHT }} />
                  <h3 className="text-xl font-bold" style={{ color: COLORS.NAVY_DARK }}>
                    Booking Details
                  </h3>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between border-b border-gray-200 pb-2">
                    <span className="text-sm font-medium text-gray-600">Location</span>
                    <span className="text-sm font-semibold" style={{ color: COLORS.NAVY_DARK }}>
                      {orderData.bookingDetails.location}
                    </span>
                  </div>

                  <div className="flex justify-between border-b border-gray-200 pb-2">
                    <span className="text-sm font-medium text-gray-600">Date</span>
                    <span className="text-sm font-semibold" style={{ color: COLORS.NAVY_DARK }}>
                      {orderData.bookingDetails.date}
                    </span>
                  </div>

                  <div className="flex justify-between border-b border-gray-200 pb-2">
                    <span className="text-sm font-medium text-gray-600">Total Items</span>
                    <span className="text-sm font-semibold" style={{ color: COLORS.NAVY_DARK }}>
                      {orderData.bookingDetails.items.length} items
                    </span>
                  </div>

                  <div className="flex justify-between border-b border-gray-200 pb-2">
                    <span className="text-sm font-medium text-gray-600">Payment Method</span>
                    <span className="text-sm font-semibold capitalize" style={{ color: COLORS.NAVY_DARK }}>
                      {orderData.paymentMethod.replace('-', ' ')}
                    </span>
                  </div>

                  <div className="flex justify-between pt-2">
                    <span className="text-lg font-bold" style={{ color: COLORS.NAVY_DARK }}>
                      Total Amount
                    </span>
                    <span className="text-2xl font-bold" style={{ color: COLORS.BLUE_LIGHT }}>
                      Rp {orderData.bookingDetails.total.toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Next Steps */}
            <motion.div
              className="mb-6 overflow-hidden rounded-2xl border border-white/10 bg-white/95 shadow-xl backdrop-blur-xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
            >
              <div className="p-6">
                <h3 className="mb-4 text-xl font-bold" style={{ color: COLORS.NAVY_DARK }}>
                  What's Next?
                </h3>

                <ol className="space-y-3">
                  <li className="flex gap-3">
                    <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-[#7D97B6] text-xs font-bold text-white">
                      1
                    </span>
                    <p className="text-sm text-gray-700">
                      <strong>Confirmation Email:</strong> We'll send a confirmation email to {orderData.guestInfo.email} with all the details.
                    </p>
                  </li>

                  <li className="flex gap-3">
                    <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-[#7D97B6] text-xs font-bold text-white">
                      2
                    </span>
                    <p className="text-sm text-gray-700">
                      <strong>Our team will contact you:</strong> We'll reach out within 24 hours to confirm the booking and discuss any additional details.
                    </p>
                  </li>

                  <li className="flex gap-3">
                    <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-[#7D97B6] text-xs font-bold text-white">
                      3
                    </span>
                    <p className="text-sm text-gray-700">
                      <strong>Payment Instructions:</strong> You'll receive payment instructions via email or our team will discuss payment options with you.
                    </p>
                  </li>

                  <li className="flex gap-3">
                    <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-[#7D97B6] text-xs font-bold text-white">
                      4
                    </span>
                    <p className="text-sm text-gray-700">
                      <strong>Event Day:</strong> Our team will arrive at the specified location on {orderData.bookingDetails.date}.
                    </p>
                  </li>
                </ol>
              </div>
            </motion.div>

            {/* Action Buttons */}
            <motion.div
              className="flex flex-col gap-3 sm:flex-row"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              <motion.button
                onClick={() => router.push('/')}
                className="flex-1 rounded-xl py-4 font-semibold text-white shadow-lg"
                style={{ backgroundColor: COLORS.BLUE_LIGHT }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Back to Home
              </motion.button>

              <motion.button
                onClick={() => router.push('/booking/location-date')}
                className="flex-1 rounded-xl border-2 border-white/30 py-4 font-semibold text-white backdrop-blur-sm hover:bg-white/10"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Book Another Event
              </motion.button>
            </motion.div>

            {/* Support */}
            <motion.div
              className="mt-8 text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.9 }}
            >
              <p className="text-sm text-white/60">
                Have questions? Contact us at{' '}
                <a href="mailto:support@hrp.com" className="font-semibold text-white/90 hover:text-white">
                  support@hrp.com
                </a>
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </RoleBasedLayout>
  )
}