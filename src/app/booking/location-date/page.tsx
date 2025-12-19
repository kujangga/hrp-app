'use client'

import RoleBasedLayout from '@/components/RoleBasedLayout'
import BookingSteps from '@/components/BookingSteps'
import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { motion } from 'framer-motion'
import { COLORS } from '@/lib/colors'
import { MapPin, Calendar, ArrowRight, CheckCircle2 } from 'lucide-react'
import { useBooking, BookingType } from '@/contexts/BookingContext'

export default function BookingLocationDate() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { setBookingType, setLocationAndDate, getBookingSteps } = useBooking()
  const [bookingInfo, setBookingInfo] = useState({
    location: '',
    date: ''
  })

  // Pre-fill from query params and set booking type
  useEffect(() => {
    if (searchParams) {
      const locationParam = searchParams.get('location')
      const dateParam = searchParams.get('date')
      const typeParam = searchParams.get('type') as BookingType

      if (locationParam || dateParam) {
        setBookingInfo({
          location: locationParam || '',
          date: dateParam || ''
        })
      }

      // Set booking type from query param or default to 'full'
      if (typeParam && ['full', 'photographer', 'videographer', 'equipment', 'transport'].includes(typeParam)) {
        setBookingType(typeParam)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams])

  const locations = [
    { id: '1', name: 'Jakarta', type: 'city' },
    { id: '2', name: 'Bandung', type: 'city' },
    { id: '3', name: 'Bali', type: 'city' },
    { id: '4', name: 'Yogyakarta', type: 'city' },
    { id: '5', name: 'Indonesia', type: 'country' },
    { id: '6', name: 'Singapore', type: 'country' },
    { id: '7', name: 'Malaysia', type: 'country' }
  ]

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    const { name, value } = e.target
    setBookingInfo(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Save location and date to context
    setLocationAndDate(bookingInfo.location, bookingInfo.date)

    // Get next step based on booking type
    const steps = getBookingSteps()
    const nextStep = steps[1] // Second step after location-date

    if (nextStep) {
      router.push(nextStep.path)
    }
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
          <motion.div
            className="absolute -bottom-40 -left-40 h-96 w-96 rounded-full bg-[#E1E7F2]/5 blur-3xl"
            animate={{
              scale: [1.2, 1, 1.2],
              opacity: [0.2, 0.4, 0.2],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </div>

        {/* Main Content */}
        <div className="relative min-h-screen px-4 py-12 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl">

            {/* Header */}
            <motion.div
              className="mb-12 text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="mb-4 text-[clamp(2rem,4vw,3rem)] font-bold text-white">
                Book Your Photography Session
              </h1>
              <p className="text-lg text-white/70">
                Let's start by selecting your shoot location and preferred date
              </p>
            </motion.div>

            {/* Progress Steps */}
            <BookingSteps />

            {/* Form Card */}
            <motion.div
              className="overflow-hidden rounded-3xl border border-white/10 bg-white/95 shadow-2xl backdrop-blur-xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="p-8 sm:p-12">
                <form onSubmit={handleSubmit} className="space-y-8">

                  {/* Location Field */}
                  <div>
                    <label
                      htmlFor="location"
                      className="mb-3 flex items-center gap-2 text-sm font-semibold"
                      style={{ color: COLORS.NAVY_DARK }}
                    >
                      <MapPin className="h-5 w-5" style={{ color: COLORS.BLUE_LIGHT }} />
                      Shoot Location
                    </label>
                    <select
                      id="location"
                      name="location"
                      value={bookingInfo.location}
                      onChange={handleChange}
                      className="block w-full rounded-xl border-2 border-gray-200 bg-white px-4 py-4 text-base transition-all duration-200 focus:border-[#7D97B6] focus:outline-none focus:ring-4 focus:ring-[#7D97B6]/20"
                      style={{ color: COLORS.NAVY_DARK }}
                      required
                    >
                      <option value="">Select your destination</option>
                      {locations.map((location) => (
                        <option key={location.id} value={location.name}>
                          {location.name} ({location.type})
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Date Field */}
                  <div>
                    <label
                      htmlFor="date"
                      className="mb-3 flex items-center gap-2 text-sm font-semibold"
                      style={{ color: COLORS.NAVY_DARK }}
                    >
                      <Calendar className="h-5 w-5" style={{ color: COLORS.BLUE_LIGHT }} />
                      Event Date
                    </label>
                    <input
                      type="date"
                      name="date"
                      id="date"
                      value={bookingInfo.date}
                      onChange={handleChange}
                      min={new Date().toISOString().split('T')[0]}
                      className="block w-full rounded-xl border-2 border-gray-200 bg-white px-4 py-4 text-base transition-all duration-200 focus:border-[#7D97B6] focus:outline-none focus:ring-4 focus:ring-[#7D97B6]/20"
                      style={{ color: COLORS.NAVY_DARK }}
                      required
                    />
                  </div>

                  {/* Info Box */}
                  <motion.div
                    className="rounded-xl bg-blue-50 p-6"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                  >
                    <div className="flex gap-3">
                      <CheckCircle2 className="h-5 w-5 flex-shrink-0 text-blue-600" />
                      <div>
                        <h4 className="mb-1 font-semibold text-blue-900">
                          What's Next?
                        </h4>
                        <p className="text-sm text-blue-700">
                          After confirming your location and date, you'll be able to browse available photographers in your area and select the perfect match for your shoot.
                        </p>
                      </div>
                    </div>
                  </motion.div>

                  {/* Submit Button */}
                  <div className="flex flex-col gap-4 sm:flex-row sm:justify-between sm:items-center">
                    <button
                      type="button"
                      onClick={() => router.back()}
                      className="order-2 text-sm font-medium text-gray-600 transition-colors hover:text-gray-900 sm:order-1"
                    >
                      ← Back to Home
                    </button>
                    <motion.button
                      type="submit"
                      className="order-1 flex items-center justify-center gap-2 rounded-xl px-8 py-4 font-semibold text-white shadow-lg transition-all duration-200 hover:shadow-xl sm:order-2"
                      style={{ backgroundColor: COLORS.BLUE_LIGHT }}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Continue to Photographers
                      <ArrowRight className="h-5 w-5" />
                    </motion.button>
                  </div>
                </form>
              </div>
            </motion.div>

            {/* Trust Indicators */}
            <motion.div
              className="mt-12 grid gap-6 sm:grid-cols-3"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              {[
                { icon: CheckCircle2, title: 'Verified Professionals', desc: '850+ vetted photographers' },
                { icon: MapPin, title: 'Nationwide Coverage', desc: 'Available in all major cities' },
                { icon: Calendar, title: 'Flexible Scheduling', desc: 'Book up to 6 months ahead' }
              ].map((item, index) => (
                <div
                  key={index}
                  className="rounded-2xl border border-white/10 bg-white/5 p-6 text-center backdrop-blur-sm"
                >
                  <item.icon className="mx-auto mb-3 h-8 w-8 text-[#7D97B6]" />
                  <h4 className="mb-1 font-semibold text-white">{item.title}</h4>
                  <p className="text-sm text-white/60">{item.desc}</p>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </RoleBasedLayout>
  )
}