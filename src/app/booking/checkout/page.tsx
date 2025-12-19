'use client'

import RoleBasedLayout from '@/components/RoleBasedLayout'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useBooking } from '@/contexts/BookingContext'
import { COLORS } from '@/lib/colors'
import { motion } from 'framer-motion'
import { User, Mail, Phone, MapPin, CreditCard, CheckCircle } from 'lucide-react'

interface GuestInfo {
  fullName: string
  email: string
  phone: string
  address: string
  city: string
  notes: string
}

interface ValidationErrors {
  [key: string]: string
}

export default function BookingCheckout() {
  const router = useRouter()
  const { booking, getTotalCost } = useBooking()

  const [paymentMethod, setPaymentMethod] = useState('credit-card')
  const [isProcessing, setIsProcessing] = useState(false)
  const [guestInfo, setGuestInfo] = useState<GuestInfo>({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    notes: ''
  })
  const [errors, setErrors] = useState<ValidationErrors>({})

  // Validation functions
  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  }

  const validatePhone = (phone: string) => {
    // Indonesian phone format
    return /^(\+62|62|0)[0-9]{9,12}$/.test(phone.replace(/[\s-]/g, ''))
  }

  const validateForm = (): boolean => {
    const newErrors: ValidationErrors = {}

    if (!guestInfo.fullName.trim()) {
      newErrors.fullName = 'Full name is required'
    }

    if (!guestInfo.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!validateEmail(guestInfo.email)) {
      newErrors.email = 'Please enter a valid email address'
    }

    if (!guestInfo.phone.trim()) {
      newErrors.phone = 'Phone number is required'
    } else if (!validatePhone(guestInfo.phone)) {
      newErrors.phone = 'Please enter a valid phone number (e.g., 081234567890)'
    }

    if (!guestInfo.address.trim()) {
      newErrors.address = 'Event address is required'
    }

    if (!guestInfo.city.trim()) {
      newErrors.city = 'City is required'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  // Generate unique order ID
  const generateOrderId = () => {
    const timestamp = Date.now().toString(36).toUpperCase()
    const randomStr = Math.random().toString(36).substring(2, 8).toUpperCase()
    return `ORD-${timestamp}-${randomStr}`
  }

  const handleInputChange = (field: keyof GuestInfo, value: string) => {
    setGuestInfo(prev => ({ ...prev, [field]: value }))
    // Clear error for this field when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }))
    }
  }

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault()

    // Validate form
    if (!validateForm()) {
      return
    }

    setIsProcessing(true)

    // Generate order ID
    const orderId = generateOrderId()

    // Create order object
    const order = {
      orderId,
      guestInfo,
      bookingDetails: {
        location: booking.location,
        date: booking.date,
        items: booking.items,
        total: getTotalCost()
      },
      paymentMethod,
      createdAt: new Date().toISOString(),
      status: 'pending'
    }

    // Store order in localStorage for demonstration
    // In production, this would be sent to a backend API
    if (typeof window !== 'undefined') {
      localStorage.setItem(`order_${orderId}`, JSON.stringify(order))
      localStorage.setItem('latestOrderId', orderId)
    }

    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false)
      router.push('/booking/confirmation')
    }, 2000)
  }

  const photographerTotal = booking.items
    .filter(item => item.type === 'photographer')
    .reduce((sum, item) => sum + item.dailyRate, 0)

  const videographerTotal = booking.items
    .filter(item => item.type === 'videographer')
    .reduce((sum, item) => sum + item.dailyRate, 0)

  const equipmentTotal = booking.items
    .filter(item => item.type === 'equipment')
    .reduce((sum, item) => sum + (item.dailyRate * (item.quantity || 1)), 0)

  const transportTotal = booking.items
    .filter(item => item.type === 'transport')
    .reduce((sum, item) => sum + (item.dailyRate * (item.quantity || 1)), 0)

  const grandTotal = getTotalCost()

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
          <div className="mx-auto max-w-7xl">
            {/* Header */}
            <motion.div
              className="mb-8 text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="mb-3 text-[clamp(2rem,4vw,3rem)] font-bold text-white">
                Checkout
              </h1>
              <p className="text-lg text-white/70">
                Complete your booking information
              </p>
            </motion.div>

            <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
              {/* Guest Information Form + Booking Details */}
              <div className="space-y-6 lg:col-span-2">
                {/* Guest Information */}
                <motion.div
                  className="overflow-hidden rounded-2xl border border-white/10 bg-white/95 shadow-xl backdrop-blur-xl"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                >
                  <div className="p-6">
                    <div className="mb-6 flex items-center gap-2">
                      <User className="h-6 w-6" style={{ color: COLORS.BLUE_LIGHT }} />
                      <h3 className="text-xl font-bold" style={{ color: COLORS.NAVY_DARK }}>
                        Contact Information
                      </h3>
                    </div>

                    <div className="space-y-4">
                      {/* Full Name */}
                      <div>
                        <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          id="fullName"
                          value={guestInfo.fullName}
                          onChange={(e) => handleInputChange('fullName', e.target.value)}
                          className={`w-full rounded-lg border ${errors.fullName ? 'border-red-500' : 'border-gray-300'} px-4 py-2 focus:border-[#7D97B6] focus:outline-none focus:ring-2 focus:ring-[#7D97B6]/20`}
                          placeholder="Enter your full name"
                        />
                        {errors.fullName && (
                          <p className="mt-1 text-sm text-red-600">{errors.fullName}</p>
                        )}
                      </div>

                      {/* Email */}
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                          Email Address *
                        </label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                          <input
                            type="email"
                            id="email"
                            value={guestInfo.email}
                            onChange={(e) => handleInputChange('email', e.target.value)}
                            className={`w-full rounded-lg border ${errors.email ? 'border-red-500' : 'border-gray-300'} px-4 py-2 pl-10 focus:border-[#7D97B6] focus:outline-none focus:ring-2 focus:ring-[#7D97B6]/20`}
                            placeholder="your.email@example.com"
                          />
                        </div>
                        {errors.email && (
                          <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                        )}
                      </div>

                      {/* Phone */}
                      <div>
                        <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                          Phone Number *
                        </label>
                        <div className="relative">
                          <Phone className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                          <input
                            type="tel"
                            id="phone"
                            value={guestInfo.phone}
                            onChange={(e) => handleInputChange('phone', e.target.value)}
                            className={`w-full rounded-lg border ${errors.phone ? 'border-red-500' : 'border-gray-300'} px-4 py-2 pl-10 focus:border-[#7D97B6] focus:outline-none focus:ring-2 focus:ring-[#7D97B6]/20`}
                            placeholder="081234567890"
                          />
                        </div>
                        {errors.phone && (
                          <p className="mt-1 text-sm text-red-600">{errors.phone}</p>
                        )}
                      </div>

                      {/* Address */}
                      <div>
                        <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                          Event Location/Address *
                        </label>
                        <div className="relative">
                          <MapPin className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                          <textarea
                            id="address"
                            value={guestInfo.address}
                            onChange={(e) => handleInputChange('address', e.target.value)}
                            rows={3}
                            className={`w-full rounded-lg border ${errors.address ? 'border-red-500' : 'border-gray-300'} px-4 py-2 pl-10 focus:border-[#7D97B6] focus:outline-none focus:ring-2 focus:ring-[#7D97B6]/20`}
                            placeholder="Enter the event address"
                          />
                        </div>
                        {errors.address && (
                          <p className="mt-1 text-sm text-red-600">{errors.address}</p>
                        )}
                      </div>

                      {/* City */}
                      <div>
                        <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
                          City *
                        </label>
                        <input
                          type="text"
                          id="city"
                          value={guestInfo.city}
                          onChange={(e) => handleInputChange('city', e.target.value)}
                          className={`w-full rounded-lg border ${errors.city ? 'border-red-500' : 'border-gray-300'} px-4 py-2 focus:border-[#7D97B6] focus:outline-none focus:ring-2 focus:ring-[#7D97B6]/20`}
                          placeholder="Enter city"
                        />
                        {errors.city && (
                          <p className="mt-1 text-sm text-red-600">{errors.city}</p>
                        )}
                      </div>

                      {/* Notes */}
                      <div>
                        <label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-1">
                          Special Notes (Optional)
                        </label>
                        <textarea
                          id="notes"
                          value={guestInfo.notes}
                          onChange={(e) => handleInputChange('notes', e.target.value)}
                          rows={3}
                          className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-[#7D97B6] focus:outline-none focus:ring-2 focus:ring-[#7D97B6]/20"
                          placeholder="Any special requirements or notes for your event"
                        />
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Booking Summary */}
                <motion.div
                  className="overflow-hidden rounded-2xl border border-white/10 bg-white/95 shadow-xl backdrop-blur-xl"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  <div className="p-6">
                    <h3 className="mb-4 text-xl font-bold" style={{ color: COLORS.NAVY_DARK }}>
                      Booking Summary
                    </h3>

                    <div className="space-y-3">
                      <div className="flex justify-between border-b border-gray-200 pb-2">
                        <span className="text-sm font-medium text-gray-600">Location</span>
                        <span className="text-sm font-semibold" style={{ color: COLORS.NAVY_DARK }}>
                          {booking.location || 'Not set'}
                        </span>
                      </div>
                      <div className="flex justify-between border-b border-gray-200 pb-2">
                        <span className="text-sm font-medium text-gray-600">Date</span>
                        <span className="text-sm font-semibold" style={{ color: COLORS.NAVY_DARK }}>
                          {booking.date || 'Not set'}
                        </span>
                      </div>
                      <div className="flex justify-between border-b border-gray-200 pb-2">
                        <span className="text-sm font-medium text-gray-600">Rental Duration</span>
                        <span className="text-sm font-semibold" style={{ color: COLORS.NAVY_DARK }}>
                          {booking.rentalDays} {booking.rentalDays === 1 ? 'day' : 'days'}
                        </span>
                      </div>
                      <div className="flex justify-between border-b border-gray-200 pb-2">
                        <span className="text-sm font-medium text-gray-600">Total Items</span>
                        <span className="text-sm font-semibold" style={{ color: COLORS.NAVY_DARK }}>
                          {booking.items.length} items
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* Payment Section */}
              <motion.div
                className="lg:col-span-1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <div className="sticky top-8 overflow-hidden rounded-2xl border border-white/10 bg-white/95 shadow-xl backdrop-blur-xl">
                  <div className="p-6">
                    <div className="mb-6 flex items-center gap-2">
                      <CreditCard className="h-6 w-6" style={{ color: COLORS.BLUE_LIGHT }} />
                      <h3 className="text-xl font-bold" style={{ color: COLORS.NAVY_DARK }}>
                        Payment Details
                      </h3>
                    </div>

                    <div className="space-y-4">
                      {photographerTotal > 0 && (
                        <div className="flex justify-between">
                          <span className="text-sm font-medium text-gray-600">Photographers</span>
                          <span className="text-sm font-semibold" style={{ color: COLORS.NAVY_DARK }}>
                            Rp {photographerTotal.toLocaleString()}
                          </span>
                        </div>
                      )}
                      {videographerTotal > 0 && (
                        <div className="flex justify-between">
                          <span className="text-sm font-medium text-gray-600">Videographers</span>
                          <span className="text-sm font-semibold" style={{ color: COLORS.NAVY_DARK }}>
                            Rp {videographerTotal.toLocaleString()}
                          </span>
                        </div>
                      )}
                      {equipmentTotal > 0 && (
                        <div className="flex justify-between">
                          <span className="text-sm font-medium text-gray-600">Equipment</span>
                          <span className="text-sm font-semibold" style={{ color: COLORS.NAVY_DARK }}>
                            Rp {equipmentTotal.toLocaleString()}
                          </span>
                        </div>
                      )}
                      {transportTotal > 0 && (
                        <div className="flex justify-between">
                          <span className="text-sm font-medium text-gray-600">Transportation</span>
                          <span className="text-sm font-semibold" style={{ color: COLORS.NAVY_DARK }}>
                            Rp {transportTotal.toLocaleString()}
                          </span>
                        </div>
                      )}

                      <div className="border-t-2 border-gray-200 pt-4">
                        <div className="flex justify-between">
                          <span className="text-lg font-bold" style={{ color: COLORS.NAVY_DARK }}>
                            Total
                          </span>
                          <span className="text-2xl font-bold" style={{ color: COLORS.BLUE_LIGHT }}>
                            Rp {grandTotal.toLocaleString()}
                          </span>
                        </div>
                      </div>
                    </div>

                    <form onSubmit={handlePayment} className="mt-6 space-y-6">
                      {/* Payment Method */}
                      <div>
                        <h4 className="mb-3 text-sm font-semibold" style={{ color: COLORS.NAVY_DARK }}>
                          Payment Method
                        </h4>
                        <div className="space-y-3">
                          <label className="flex items-center gap-3 cursor-pointer">
                            <input
                              type="radio"
                              name="payment-method"
                              value="credit-card"
                              checked={paymentMethod === 'credit-card'}
                              onChange={(e) => setPaymentMethod(e.target.value)}
                              className="h-4 w-4 text-[#7D97B6] focus:ring-[#7D97B6]"
                            />
                            <span className="text-sm font-medium text-gray-700">Credit Card</span>
                          </label>
                          <label className="flex items-center gap-3 cursor-pointer">
                            <input
                              type="radio"
                              name="payment-method"
                              value="bank-transfer"
                              checked={paymentMethod === 'bank-transfer'}
                              onChange={(e) => setPaymentMethod(e.target.value)}
                              className="h-4 w-4 text-[#7D97B6] focus:ring-[#7D97B6]"
                            />
                            <span className="text-sm font-medium text-gray-700">Bank Transfer</span>
                          </label>
                          <label className="flex items-center gap-3 cursor-pointer">
                            <input
                              type="radio"
                              name="payment-method"
                              value="e-wallet"
                              checked={paymentMethod === 'e-wallet'}
                              onChange={(e) => setPaymentMethod(e.target.value)}
                              className="h-4 w-4 text-[#7D97B6] focus:ring-[#7D97B6]"
                            />
                            <span className="text-sm font-medium text-gray-700">E-Wallet</span>
                          </label>
                        </div>
                      </div>

                      {/* Submit Button */}
                      <motion.button
                        type="submit"
                        disabled={isProcessing}
                        className={`flex w-full items-center justify-center gap-2 rounded-xl py-4 font-semibold text-white shadow-lg transition-all ${isProcessing
                          ? 'cursor-not-allowed bg-gray-400'
                          : 'hover:shadow-xl'
                          }`}
                        style={{ backgroundColor: isProcessing ? undefined : COLORS.BLUE_LIGHT }}
                        whileHover={!isProcessing ? { scale: 1.02 } : {}}
                        whileTap={!isProcessing ? { scale: 0.98 } : {}}
                      >
                        {isProcessing ? (
                          <>
                            <svg className="h-5 w-5 animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Processing...
                          </>
                        ) : (
                          <>
                            <CheckCircle className="h-5 w-5" />
                            Complete Booking
                          </>
                        )}
                      </motion.button>

                      <button
                        type="button"
                        onClick={() => router.back()}
                        className="w-full rounded-xl border-2 border-gray-300 py-3 font-semibold transition-all hover:border-gray-400"
                        style={{ color: COLORS.NAVY_DARK }}
                      >
                        ← Back to Cart
                      </button>
                    </form>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </RoleBasedLayout>
  )
}