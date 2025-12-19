'use client'

import RoleBasedLayout from '@/components/RoleBasedLayout'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { COLORS } from '@/lib/colors'
import { Calendar, MapPin, Camera, Package, Truck, User, Mail, Phone, Edit, CheckCircle, Clock, XCircle } from 'lucide-react'

export default function CustomerDashboard() {
  const [activeTab, setActiveTab] = useState('bookings')

  const bookings = [
    {
      id: '1',
      title: 'Wedding Photography Package',
      status: 'completed',
      items: ['2 Photographers', 'Equipment Rental'],
      location: 'Jakarta, Indonesia',
      date: 'Sat, Jan 1, 2023',
      total: 12000000
    },
    {
      id: '2',
      title: 'Corporate Event Coverage',
      status: 'upcoming',
      items: ['3 Photographers', 'Transport Included'],
      location: 'Bali, Indonesia',
      date: 'Sun, Feb 12, 2023',
      total: 18000000
    },
    {
      id: '3',
      title: 'Product Photography Session',
      status: 'cancelled',
      items: ['1 Photographer', 'Studio Equipment'],
      location: 'Bandung, Indonesia',
      date: 'Mon, Mar 15, 2023',
      total: 5000000
    }
  ]

  const getStatusConfig = (status: string) => {
    switch (status) {
      case 'completed':
        return {
          label: 'Completed',
          bg: 'bg-green-100',
          text: 'text-green-800',
          icon: CheckCircle
        }
      case 'upcoming':
        return {
          label: 'Upcoming',
          bg: 'bg-blue-100',
          text: 'text-blue-800',
          icon: Clock
        }
      case 'cancelled':
        return {
          label: 'Cancelled',
          bg: 'bg-red-100',
          text: 'text-red-800',
          icon: XCircle
        }
      default:
        return {
          label: 'Unknown',
          bg: 'bg-gray-100',
          text: 'text-gray-800',
          icon: Clock
        }
    }
  }

  return (
    <RoleBasedLayout allowedRoles={['CUSTOMER']}>
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
          <div className="mx-auto max-w-7xl">
            
            {/* Header */}
            <motion.div
              className="mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="mb-2 text-[clamp(2rem,4vw,3rem)] font-bold text-white">
                Customer Dashboard
              </h1>
              <p className="text-lg text-white/70">
                Manage your bookings and profile
              </p>
            </motion.div>

            {/* Tabs */}
            <motion.div
              className="mb-8 flex gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <button
                onClick={() => setActiveTab('bookings')}
                className={`rounded-xl px-6 py-3 font-semibold transition-all duration-200 ${
                  activeTab === 'bookings'
                    ? 'bg-[#7D97B6] text-white shadow-lg'
                    : 'bg-white/10 text-white/70 hover:bg-white/20'
                }`}
              >
                My Bookings
              </button>
              <button
                onClick={() => setActiveTab('profile')}
                className={`rounded-xl px-6 py-3 font-semibold transition-all duration-200 ${
                  activeTab === 'profile'
                    ? 'bg-[#7D97B6] text-white shadow-lg'
                    : 'bg-white/10 text-white/70 hover:bg-white/20'
                }`}
              >
                Profile
              </button>
            </motion.div>

            {/* Bookings Tab */}
            {activeTab === 'bookings' && (
              <motion.div
                className="space-y-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                {bookings.map((booking, index) => {
                  const statusConfig = getStatusConfig(booking.status)
                  const StatusIcon = statusConfig.icon

                  return (
                    <motion.div
                      key={booking.id}
                      className="overflow-hidden rounded-2xl border border-white/10 bg-white/95 shadow-xl backdrop-blur-xl transition-all duration-200 hover:shadow-2xl"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: 0.1 * index }}
                    >
                      <div className="p-6">
                        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                          {/* Booking Info */}
                          <div className="flex-1">
                            <div className="mb-3 flex flex-wrap items-center gap-3">
                              <h3 className="text-xl font-bold" style={{ color: COLORS.NAVY_DARK }}>
                                {booking.title}
                              </h3>
                              <span 
                                className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-semibold ${statusConfig.bg} ${statusConfig.text}`}
                              >
                                <StatusIcon className="h-3 w-3" />
                                {statusConfig.label}
                              </span>
                            </div>

                            {/* Items */}
                            <div className="mb-3 flex flex-wrap gap-2">
                              {booking.items.map((item, idx) => (
                                <span
                                  key={idx}
                                  className="inline-flex items-center gap-1 rounded-lg bg-blue-50 px-3 py-1 text-sm"
                                  style={{ color: COLORS.NAVY_DARK }}
                                >
                                  <Camera className="h-4 w-4" style={{ color: COLORS.BLUE_LIGHT }} />
                                  {item}
                                </span>
                              ))}
                            </div>

                            {/* Location & Date */}
                            <div className="flex flex-wrap gap-4 text-sm" style={{ color: COLORS.SLATE_MEDIUM }}>
                              <div className="flex items-center gap-2">
                                <MapPin className="h-4 w-4" style={{ color: COLORS.BLUE_LIGHT }} />
                                {booking.location}
                              </div>
                              <div className="flex items-center gap-2">
                                <Calendar className="h-4 w-4" style={{ color: COLORS.BLUE_LIGHT }} />
                                {booking.date}
                              </div>
                            </div>
                          </div>

                          {/* Price */}
                          <div className="flex flex-col items-start gap-2 sm:items-end">
                            <div className="text-right">
                              <p className="text-sm text-gray-500">Total</p>
                              <p className="text-2xl font-bold" style={{ color: COLORS.NAVY_DARK }}>
                                Rp {booking.total.toLocaleString()}
                              </p>
                            </div>
                            {booking.status === 'upcoming' && (
                              <button
                                className="rounded-lg px-4 py-2 text-sm font-semibold text-white transition-all duration-200 hover:shadow-lg"
                                style={{ backgroundColor: COLORS.BLUE_LIGHT }}
                              >
                                View Details
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )
                })}
              </motion.div>
            )}

            {/* Profile Tab */}
            {activeTab === 'profile' && (
              <motion.div
                className="overflow-hidden rounded-2xl border border-white/10 bg-white/95 shadow-xl backdrop-blur-xl"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <div className="p-6 sm:p-8">
                  <div className="mb-6">
                    <h3 className="mb-2 text-2xl font-bold" style={{ color: COLORS.NAVY_DARK }}>
                      Profile Information
                    </h3>
                    <p className="text-sm" style={{ color: COLORS.SLATE_MEDIUM }}>
                      Personal details and contact information
                    </p>
                  </div>

                  <div className="space-y-6">
                    {/* Full Name */}
                    <div className="flex items-start gap-4 rounded-xl bg-gray-50 p-4">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg" style={{ backgroundColor: `${COLORS.BLUE_LIGHT}20` }}>
                        <User className="h-5 w-5" style={{ color: COLORS.BLUE_LIGHT }} />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-500">Full Name</p>
                        <p className="mt-1 text-lg font-semibold" style={{ color: COLORS.NAVY_DARK }}>
                          Sarah Johnson
                        </p>
                      </div>
                    </div>

                    {/* Email */}
                    <div className="flex items-start gap-4 rounded-xl bg-gray-50 p-4">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg" style={{ backgroundColor: `${COLORS.BLUE_LIGHT}20` }}>
                        <Mail className="h-5 w-5" style={{ color: COLORS.BLUE_LIGHT }} />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-500">Email Address</p>
                        <p className="mt-1 text-lg font-semibold" style={{ color: COLORS.NAVY_DARK }}>
                          customer@hrp.com
                        </p>
                      </div>
                    </div>

                    {/* Phone */}
                    <div className="flex items-start gap-4 rounded-xl bg-gray-50 p-4">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg" style={{ backgroundColor: `${COLORS.BLUE_LIGHT}20` }}>
                        <Phone className="h-5 w-5" style={{ color: COLORS.BLUE_LIGHT }} />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-500">Phone Number</p>
                        <p className="mt-1 text-lg font-semibold" style={{ color: COLORS.NAVY_DARK }}>
                          +62 123 456 781
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Edit Button */}
                  <div className="mt-8 flex justify-end">
                    <motion.button
                      type="button"
                      className="flex items-center gap-2 rounded-xl px-6 py-3 font-semibold text-white shadow-lg transition-all duration-200 hover:shadow-xl"
                      style={{ backgroundColor: COLORS.BLUE_LIGHT }}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Edit className="h-4 w-4" />
                      Edit Profile
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </RoleBasedLayout>
  )
}