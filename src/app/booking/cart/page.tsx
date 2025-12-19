'use client'

import RoleBasedLayout from '@/components/RoleBasedLayout'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { COLORS } from '@/lib/colors'
import { Camera, Package, Truck, CreditCard, ArrowRight, CheckCircle2, Minus, Plus, Trash2, ShoppingBag, Calendar } from 'lucide-react'
import { useBooking } from '@/contexts/BookingContext'
import { useState } from 'react'
import CartConfirmDialog from '@/components/CartConfirmDialog'

export default function BookingCart() {
  const router = useRouter()
  const { booking, removeItem, updateItemQuantity, clearItems, getTotalCost, getItemsByType, getBookingSteps, setRentalDays } = useBooking()

  const [confirmDialog, setConfirmDialog] = useState<{
    isOpen: boolean
    type: 'remove' | 'clear'
    itemId?: string
    itemType?: string
    itemName?: string
  }>({
    isOpen: false,
    type: 'remove'
  })

  const photographers = getItemsByType('photographer')
  const videographers = getItemsByType('videographer')
  const equipment = getItemsByType('equipment')
  const transport = getItemsByType('transport')

  const rentalDays = booking.rentalDays || 1

  const photographerTotal = photographers.reduce((sum, p) => sum + (p.dailyRate * rentalDays), 0)
  const videographerTotal = videographers.reduce((sum, v) => sum + (v.dailyRate * rentalDays), 0)
  const equipmentTotal = equipment.reduce((sum, item) => sum + (item.dailyRate * (item.quantity || 1) * rentalDays), 0)
  const transportTotal = transport.reduce((sum, item) => sum + (item.dailyRate * (item.quantity || 1) * rentalDays), 0)
  const grandTotal = getTotalCost()

  const hasItems = booking.items.length > 0

  const handleCheckout = () => {
    router.push('/booking/checkout')
  }

  const handleRemoveItem = (id: string, type: string, name: string) => {
    setConfirmDialog({
      isOpen: true,
      type: 'remove',
      itemId: id,
      itemType: type,
      itemName: name
    })
  }

  const handleClearCart = () => {
    setConfirmDialog({
      isOpen: true,
      type: 'clear'
    })
  }

  const handleConfirmAction = () => {
    if (confirmDialog.type === 'remove' && confirmDialog.itemId && confirmDialog.itemType) {
      removeItem(confirmDialog.itemId, confirmDialog.itemType)
    } else if (confirmDialog.type === 'clear') {
      clearItems()
    }
  }

  const handleQuantityChange = (id: string, type: string, currentQuantity: number, delta: number) => {
    const newQuantity = currentQuantity + delta
    if (newQuantity >= 1) {
      updateItemQuantity(id, type, newQuantity)
    }
  }

  const bookingSteps = getBookingSteps()
  const currentStepIndex = bookingSteps.findIndex(step => step.type === 'cart')

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
          <div className="mx-auto max-w-7xl">

            {/* Header */}
            <motion.div
              className="mb-8 text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="mb-3 text-[clamp(2rem,4vw,3rem)] font-bold text-white">
                {hasItems ? 'Review Your Booking' : 'Your Cart is Empty'}
              </h1>
              <p className="text-lg text-white/70">
                {hasItems ? 'Almost there! Review your selections before checkout' : 'Add items to your cart to get started'}
              </p>
            </motion.div>

            {/* Progress Steps */}
            {hasItems && (
              <motion.div
                className="mb-12 flex items-center justify-center gap-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                {bookingSteps.map((step, index) => (
                  <div key={step.number} className="flex items-center">
                    <div className="flex items-center gap-3">
                      <div
                        className={`flex h-10 w-10 items-center justify-center rounded-full ${index === currentStepIndex
                          ? 'bg-[#7D97B6] text-white'
                          : index < currentStepIndex
                            ? 'bg-[#7D97B6]/70 text-white'
                            : 'bg-white/10 text-white/50'
                          }`}
                      >
                        {index < currentStepIndex ? (
                          <CheckCircle2 className="h-5 w-5" />
                        ) : (
                          <span className="font-semibold">{step.number}</span>
                        )}
                      </div>
                      <span
                        className={`hidden text-sm font-medium sm:block ${index === currentStepIndex ? 'text-white' : index < currentStepIndex ? 'text-white/70' : 'text-white/50'
                          }`}
                      >
                        {step.title}
                      </span>
                    </div>
                    {index < bookingSteps.length - 1 && (
                      <div className="mx-4 h-0.5 w-12 bg-white/20" />
                    )}
                  </div>
                ))}
              </motion.div>
            )}

            {!hasItems ? (
              // Empty Cart State
              <motion.div
                className="flex min-h-[400px] items-center justify-center"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6 }}
              >
                <div className="text-center">
                  <div className="mb-6 flex justify-center">
                    <div className="rounded-full bg-white/5 p-8">
                      <ShoppingBag className="h-20 w-20 text-white/30" />
                    </div>
                  </div>
                  <h2 className="mb-3 text-2xl font-bold text-white">No items in your cart</h2>
                  <p className="mb-8 text-white/60">
                    Start by selecting photographers, videographers, equipment, or transport
                  </p>
                  <motion.button
                    onClick={() => router.push('/booking/location-date')}
                    className="rounded-xl px-8 py-3 font-semibold text-white shadow-lg"
                    style={{ backgroundColor: COLORS.BLUE_LIGHT }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Start Booking
                  </motion.button>
                </div>
              </motion.div>
            ) : (
              <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
                {/* Cart Items */}
                <div className="space-y-6 lg:col-span-2">
                  {/* Photographers */}
                  {photographers.length > 0 && (
                    <motion.div
                      className="overflow-hidden rounded-2xl border border-white/10 bg-white/95 shadow-xl backdrop-blur-xl"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.2 }}
                      layout
                    >
                      <div className="p-6">
                        <div className="mb-4 flex items-center gap-2">
                          <Camera className="h-6 w-6" style={{ color: COLORS.BLUE_LIGHT }} />
                          <h3 className="text-xl font-bold" style={{ color: COLORS.NAVY_DARK }}>
                            Selected Photographers
                          </h3>
                        </div>
                        <AnimatePresence>
                          <div className="space-y-4">
                            {photographers.map((photographer) => (
                              <motion.div
                                key={photographer.id}
                                className="flex items-center gap-4 rounded-xl bg-gray-50 p-4"
                                layout
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 20 }}
                              >
                                <img
                                  className="h-16 w-16 rounded-xl object-cover shadow-md"
                                  src={photographer.profilePic || `https://ui-avatars.com/api/?name=${encodeURIComponent(photographer.name)}&size=64`}
                                  alt={photographer.name}
                                />
                                <div className="flex-1">
                                  <h4 className="font-semibold" style={{ color: COLORS.NAVY_DARK }}>
                                    {photographer.name}
                                  </h4>
                                  {photographer.grade && (
                                    <span
                                      className="inline-block rounded-full px-2 py-1 text-xs font-semibold text-white"
                                      style={{ backgroundColor: COLORS.BLUE_LIGHT }}
                                    >
                                      Grade {photographer.grade}
                                    </span>
                                  )}
                                </div>
                                <div className="text-right">
                                  <p className="text-lg font-bold" style={{ color: COLORS.NAVY_DARK }}>
                                    Rp {photographer.dailyRate.toLocaleString()}
                                  </p>
                                  <p className="text-xs text-gray-500">per day</p>
                                </div>
                                <motion.button
                                  onClick={() => handleRemoveItem(photographer.id, 'photographer', photographer.name)}
                                  className="rounded-lg p-2 text-red-500 transition-colors hover:bg-red-50"
                                  whileHover={{ scale: 1.1 }}
                                  whileTap={{ scale: 0.9 }}
                                  aria-label="Remove item"
                                >
                                  <Trash2 className="h-5 w-5" />
                                </motion.button>
                              </motion.div>
                            ))}
                          </div>
                        </AnimatePresence>
                      </div>
                    </motion.div>
                  )}

                  {/* Videographers */}
                  {videographers.length > 0 && (
                    <motion.div
                      className="overflow-hidden rounded-2xl border border-white/10 bg-white/95 shadow-xl backdrop-blur-xl"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.25 }}
                      layout
                    >
                      <div className="p-6">
                        <div className="mb-4 flex items-center gap-2">
                          <Camera className="h-6 w-6" style={{ color: COLORS.BLUE_LIGHT }} />
                          <h3 className="text-xl font-bold" style={{ color: COLORS.NAVY_DARK }}>
                            Selected Videographers
                          </h3>
                        </div>
                        <AnimatePresence>
                          <div className="space-y-4">
                            {videographers.map((videographer) => (
                              <motion.div
                                key={videographer.id}
                                className="flex items-center gap-4 rounded-xl bg-gray-50 p-4"
                                layout
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 20 }}
                              >
                                <img
                                  className="h-16 w-16 rounded-xl object-cover shadow-md"
                                  src={videographer.profilePic || `https://ui-avatars.com/api/?name=${encodeURIComponent(videographer.name)}&size=64`}
                                  alt={videographer.name}
                                />
                                <div className="flex-1">
                                  <h4 className="font-semibold" style={{ color: COLORS.NAVY_DARK }}>
                                    {videographer.name}
                                  </h4>
                                  {videographer.grade && (
                                    <span
                                      className="inline-block rounded-full px-2 py-1 text-xs font-semibold text-white"
                                      style={{ backgroundColor: COLORS.BLUE_LIGHT }}
                                    >
                                      Grade {videographer.grade}
                                    </span>
                                  )}
                                </div>
                                <div className="text-right">
                                  <p className="text-lg font-bold" style={{ color: COLORS.NAVY_DARK }}>
                                    Rp {videographer.dailyRate.toLocaleString()}
                                  </p>
                                  <p className="text-xs text-gray-500">per day</p>
                                </div>
                                <motion.button
                                  onClick={() => handleRemoveItem(videographer.id, 'videographer', videographer.name)}
                                  className="rounded-lg p-2 text-red-500 transition-colors hover:bg-red-50"
                                  whileHover={{ scale: 1.1 }}
                                  whileTap={{ scale: 0.9 }}
                                  aria-label="Remove item"
                                >
                                  <Trash2 className="h-5 w-5" />
                                </motion.button>
                              </motion.div>
                            ))}
                          </div>
                        </AnimatePresence>
                      </div>
                    </motion.div>
                  )}

                  {/* Equipment */}
                  {equipment.length > 0 && (
                    <motion.div
                      className="overflow-hidden rounded-2xl border border-white/10 bg-white/95 shadow-xl backdrop-blur-xl"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.3 }}
                      layout
                    >
                      <div className="p-6">
                        <div className="mb-4 flex items-center gap-2">
                          <Package className="h-6 w-6" style={{ color: COLORS.BLUE_LIGHT }} />
                          <h3 className="text-xl font-bold" style={{ color: COLORS.NAVY_DARK }}>
                            Equipment Rental
                          </h3>
                        </div>
                        <AnimatePresence>
                          <div className="space-y-3">
                            {equipment.map((item) => (
                              <motion.div
                                key={item.id}
                                className="flex items-center gap-4 rounded-xl bg-gray-50 p-4"
                                layout
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 20 }}
                              >
                                <div className="flex-1">
                                  <h4 className="font-semibold" style={{ color: COLORS.NAVY_DARK }}>
                                    {item.name}
                                  </h4>
                                  <p className="text-sm text-gray-500">
                                    Rp {item.dailyRate.toLocaleString()} per day
                                  </p>
                                </div>
                                <div className="flex items-center gap-3">
                                  <div className="flex items-center gap-2 rounded-lg bg-white p-1 shadow-sm">
                                    <motion.button
                                      onClick={() => handleQuantityChange(item.id, 'equipment', item.quantity || 1, -1)}
                                      className="rounded p-1 text-gray-600 transition-colors hover:bg-gray-100"
                                      whileHover={{ scale: 1.1 }}
                                      whileTap={{ scale: 0.9 }}
                                      aria-label="Decrease quantity"
                                    >
                                      <Minus className="h-4 w-4" />
                                    </motion.button>
                                    <span className="w-8 text-center font-semibold" style={{ color: COLORS.NAVY_DARK }}>
                                      {item.quantity || 1}
                                    </span>
                                    <motion.button
                                      onClick={() => handleQuantityChange(item.id, 'equipment', item.quantity || 1, 1)}
                                      className="rounded p-1 text-gray-600 transition-colors hover:bg-gray-100"
                                      whileHover={{ scale: 1.1 }}
                                      whileTap={{ scale: 0.9 }}
                                      aria-label="Increase quantity"
                                    >
                                      <Plus className="h-4 w-4" />
                                    </motion.button>
                                  </div>
                                  <p className="w-32 text-right font-bold" style={{ color: COLORS.NAVY_DARK }}>
                                    Rp {(item.dailyRate * (item.quantity || 1)).toLocaleString()}
                                  </p>
                                  <motion.button
                                    onClick={() => handleRemoveItem(item.id, 'equipment', item.name)}
                                    className="rounded-lg p-2 text-red-500 transition-colors hover:bg-red-50"
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                    aria-label="Remove item"
                                  >
                                    <Trash2 className="h-5 w-5" />
                                  </motion.button>
                                </div>
                              </motion.div>
                            ))}
                          </div>
                        </AnimatePresence>
                      </div>
                    </motion.div>
                  )}

                  {/* Transportation */}
                  {transport.length > 0 && (
                    <motion.div
                      className="overflow-hidden rounded-2xl border border-white/10 bg-white/95 shadow-xl backdrop-blur-xl"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.4 }}
                      layout
                    >
                      <div className="p-6">
                        <div className="mb-4 flex items-center gap-2">
                          <Truck className="h-6 w-6" style={{ color: COLORS.BLUE_LIGHT }} />
                          <h3 className="text-xl font-bold" style={{ color: COLORS.NAVY_DARK }}>
                            Transportation
                          </h3>
                        </div>
                        <AnimatePresence>
                          <div className="space-y-3">
                            {transport.map((item) => (
                              <motion.div
                                key={item.id}
                                className="flex items-center gap-4 rounded-xl bg-gray-50 p-4"
                                layout
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 20 }}
                              >
                                <div className="flex-1">
                                  <h4 className="font-semibold" style={{ color: COLORS.NAVY_DARK }}>
                                    {item.name}
                                  </h4>
                                  <p className="text-sm text-gray-500">
                                    Rp {item.dailyRate.toLocaleString()} per day
                                  </p>
                                </div>
                                <div className="flex items-center gap-3">
                                  <div className="flex items-center gap-2 rounded-lg bg-white p-1 shadow-sm">
                                    <motion.button
                                      onClick={() => handleQuantityChange(item.id, 'transport', item.quantity || 1, -1)}
                                      className="rounded p-1 text-gray-600 transition-colors hover:bg-gray-100"
                                      whileHover={{ scale: 1.1 }}
                                      whileTap={{ scale: 0.9 }}
                                      aria-label="Decrease quantity"
                                    >
                                      <Minus className="h-4 w-4" />
                                    </motion.button>
                                    <span className="w-8 text-center font-semibold" style={{ color: COLORS.NAVY_DARK }}>
                                      {item.quantity || 1}
                                    </span>
                                    <motion.button
                                      onClick={() => handleQuantityChange(item.id, 'transport', item.quantity || 1, 1)}
                                      className="rounded p-1 text-gray-600 transition-colors hover:bg-gray-100"
                                      whileHover={{ scale: 1.1 }}
                                      whileTap={{ scale: 0.9 }}
                                      aria-label="Increase quantity"
                                    >
                                      <Plus className="h-4 w-4" />
                                    </motion.button>
                                  </div>
                                  <p className="w-32 text-right font-bold" style={{ color: COLORS.NAVY_DARK }}>
                                    Rp {(item.dailyRate * (item.quantity || 1)).toLocaleString()}
                                  </p>
                                  <motion.button
                                    onClick={() => handleRemoveItem(item.id, 'transport', item.name)}
                                    className="rounded-lg p-2 text-red-500 transition-colors hover:bg-red-50"
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                    aria-label="Remove item"
                                  >
                                    <Trash2 className="h-5 w-5" />
                                  </motion.button>
                                </div>
                              </motion.div>
                            ))}
                          </div>
                        </AnimatePresence>
                      </div>
                    </motion.div>
                  )}
                </div>

                {/* Rental Duration Selector */}
                <motion.div
                  className="lg:col-span-1"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.45 }}
                >
                  <div className="sticky top-8 space-y-6">
                    {/* Duration Card */}
                    <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/95 shadow-xl backdrop-blur-xl">
                      <div className="p-6">
                        <div className="mb-4 flex items-center gap-2">
                          <Calendar className="h-6 w-6" style={{ color: COLORS.BLUE_LIGHT }} />
                          <h3 className="text-xl font-bold" style={{ color: COLORS.NAVY_DARK }}>
                            Rental Duration
                          </h3>
                        </div>
                        <div className="space-y-3">
                          <p className="text-sm text-gray-600">
                            How many days do you need these services?
                          </p>
                          <div className="flex items-center gap-3">
                            <button
                              onClick={() => setRentalDays(Math.max(1, rentalDays - 1))}
                              className="rounded-lg bg-gray-100 p-3 transition-colors hover:bg-gray-200"
                              disabled={rentalDays <= 1}
                            >
                              <Minus className="h-5 w-5 text-gray-600" />
                            </button>
                            <div className="flex-1 text-center">
                              <div className="text-3xl font-bold" style={{ color: COLORS.NAVY_DARK }}>
                                {rentalDays}
                              </div>
                              <div className="text-sm text-gray-500">
                                {rentalDays === 1 ? 'day' : 'days'}
                              </div>
                            </div>
                            <button
                              onClick={() => setRentalDays(rentalDays + 1)}
                              className="rounded-lg bg-gray-100 p-3 transition-colors hover:bg-gray-200"
                            >
                              <Plus className="h-5 w-5 text-gray-600" />
                            </button>
                          </div>
                          <div className="rounded-lg bg-blue-50 p-3">
                            <p className="text-xs text-blue-900">
                              <strong>Note:</strong> All prices will be calculated based on the rental duration.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Order Summary */}
                    <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/95 shadow-xl backdrop-blur-xl">
                      <div className="p-6">
                        <div className="mb-6 flex items-center gap-2">
                          <CreditCard className="h-6 w-6" style={{ color: COLORS.BLUE_LIGHT }} />
                          <h3 className="text-xl font-bold" style={{ color: COLORS.NAVY_DARK }}>
                            Order Summary
                          </h3>
                        </div>
                        <div className="space-y-4">
                          {photographers.length > 0 && (
                            <div className="space-y-1">
                              <div className="flex justify-between">
                                <span className="font-medium text-gray-600">Photographers</span>
                                <span className="font-semibold" style={{ color: COLORS.NAVY_DARK }}>
                                  Rp {photographerTotal.toLocaleString()}
                                </span>
                              </div>
                              <div className="text-xs text-gray-500 text-right">
                                {photographers.reduce((sum, p) => sum + p.dailyRate, 0).toLocaleString()} × {rentalDays} day{rentalDays > 1 ? 's' : ''}
                              </div>
                            </div>
                          )}
                          {videographers.length > 0 && (
                            <div className="space-y-1">
                              <div className="flex justify-between">
                                <span className="font-medium text-gray-600">Videographers</span>
                                <span className="font-semibold" style={{ color: COLORS.NAVY_DARK }}>
                                  Rp {videographerTotal.toLocaleString()}
                                </span>
                              </div>
                              <div className="text-xs text-gray-500 text-right">
                                {videographers.reduce((sum, v) => sum + v.dailyRate, 0).toLocaleString()} × {rentalDays} day{rentalDays > 1 ? 's' : ''}
                              </div>
                            </div>
                          )}
                          {equipment.length > 0 && (
                            <div className="space-y-1">
                              <div className="flex justify-between">
                                <span className="font-medium text-gray-600">Equipment</span>
                                <span className="font-semibold" style={{ color: COLORS.NAVY_DARK }}>
                                  Rp {equipmentTotal.toLocaleString()}
                                </span>
                              </div>
                              <div className="text-xs text-gray-500 text-right">
                                {equipment.reduce((sum, item) => sum + (item.dailyRate * (item.quantity || 1)), 0).toLocaleString()} × {rentalDays} day{rentalDays > 1 ? 's' : ''}
                              </div>
                            </div>
                          )}
                          {transport.length > 0 && (
                            <div className="space-y-1">
                              <div className="flex justify-between">
                                <span className="font-medium text-gray-600">Transportation</span>
                                <span className="font-semibold" style={{ color: COLORS.NAVY_DARK }}>
                                  Rp {transportTotal.toLocaleString()}
                                </span>
                              </div>
                              <div className="text-xs text-gray-500 text-right">
                                {transport.reduce((sum, item) => sum + (item.dailyRate * (item.quantity || 1)), 0).toLocaleString()} × {rentalDays} day{rentalDays > 1 ? 's' : ''}
                              </div>
                            </div>
                          )}
                          <div className="border-t-2 border-gray-200 pt-4">
                            <div className="flex justify-between">
                              <span className="text-xl font-bold" style={{ color: COLORS.NAVY_DARK }}>
                                Total
                              </span>
                              <span className="text-2xl font-bold" style={{ color: COLORS.BLUE_LIGHT }}>
                                Rp {grandTotal.toLocaleString()}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="mt-8 space-y-3">
                          <motion.button
                            onClick={handleCheckout}
                            className="flex w-full items-center justify-center gap-2 rounded-xl py-4 font-semibold text-white shadow-lg transition-all duration-200 hover:shadow-xl"
                            style={{ backgroundColor: COLORS.BLUE_LIGHT }}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                          >
                            Proceed to Checkout
                            <ArrowRight className="h-5 w-5" />
                          </motion.button>
                          <button
                            onClick={() => router.back()}
                            className="w-full rounded-xl border-2 border-gray-300 py-3 font-semibold transition-all duration-200 hover:border-gray-400"
                            style={{ color: COLORS.NAVY_DARK }}
                          >
                            ← Continue Shopping
                          </button>
                          <motion.button
                            onClick={handleClearCart}
                            className="w-full rounded-xl border-2 border-red-300 py-3 font-semibold text-red-600 transition-all duration-200 hover:border-red-400 hover:bg-red-50"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                          >
                            Clear Cart
                          </motion.button>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Confirmation Dialog */}
      <CartConfirmDialog
        isOpen={confirmDialog.isOpen}
        onClose={() => setConfirmDialog({ ...confirmDialog, isOpen: false })}
        onConfirm={handleConfirmAction}
        title={confirmDialog.type === 'remove' ? 'Remove Item?' : 'Clear Cart?'}
        message={
          confirmDialog.type === 'remove'
            ? `Are you sure you want to remove "${confirmDialog.itemName}" from your cart?`
            : 'Are you sure you want to remove all items from your cart? This action cannot be undone.'
        }
        confirmText={confirmDialog.type === 'remove' ? 'Remove' : 'Clear All'}
        variant={confirmDialog.type === 'clear' ? 'danger' : 'warning'}
      />
    </RoleBasedLayout>
  )
}