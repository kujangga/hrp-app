'use client'

import RoleBasedLayout from '@/components/RoleBasedLayout'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { COLORS } from '@/lib/colors'
import { Camera, Star, Award, ShoppingCart, ArrowRight, Filter, DollarSign, CheckCircle2 } from 'lucide-react'

export default function SelectPhotographers() {
  const router = useRouter()
  const [selectedPhotographers, setSelectedPhotographers] = useState<string[]>([])
  const [filters, setFilters] = useState({
    grade: '',
    minPrice: '',
    maxPrice: ''
  })

  // Mock data for photographers
  const photographers = [
    {
      id: '1',
      name: 'John Doe',
      grade: 'A',
      dailyRate: 4000000,
      profilePic: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=200&q=80',
      bio: 'Specializing in wedding and corporate photography with 10+ years of experience.',
      rating: 4.9,
      portfolio: [
        'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=200&q=80',
        'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=200&q=80'
      ]
    },
    {
      id: '2',
      name: 'Jane Smith',
      grade: 'B',
      dailyRate: 3000000,
      profilePic: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=200&q=80',
      bio: 'Creative photographer specializing in lifestyle and portrait photography.',
      rating: 4.7,
      portfolio: [
        'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=200&q=80',
        'https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=200&q=80'
      ]
    },
    {
      id: '3',
      name: 'Robert Johnson',
      grade: 'C',
      dailyRate: 2000000,
      profilePic: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=200&q=80',
      bio: 'Experienced photographer with a focus on events and documentation.',
      rating: 4.5,
      portfolio: [
        'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=200&q=80',
        'https://images.unsplash.com/photo-1507101105822-7472b28e22ac?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=200&q=80'
      ]
    }
  ]

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    const { name, value } = e.target
    setFilters(prev => ({ ...prev, [name]: value }))
  }

  const togglePhotographerSelection = (id: string) => {
    setSelectedPhotographers(prev =>
      prev.includes(id)
        ? prev.filter(photographerId => photographerId !== id)
        : [...prev, id]
    )
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, this would save selections and proceed to next step
    router.push('/booking/cart')
  }

  // Apply filters
  const filteredPhotographers = photographers.filter(photographer => {
    if (filters.grade && photographer.grade !== filters.grade) return false
    if (filters.minPrice && photographer.dailyRate < parseInt(filters.minPrice)) return false
    if (filters.maxPrice && photographer.dailyRate > parseInt(filters.maxPrice)) return false
    return true
  })

  const bookingSteps = [
    { number: 1, title: 'Location & Date', active: false },
    { number: 2, title: 'Select Photographer', active: true },
    { number: 3, title: 'Review & Payment', active: false }
  ]

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
                Select Your Photographer
              </h1>
              <p className="text-lg text-white/70">
                Browse professional photographers available for your shoot
              </p>
            </motion.div>

            {/* Progress Steps */}
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
                      className={`flex h-10 w-10 items-center justify-center rounded-full ${step.active
                          ? 'bg-[#7D97B6] text-white'
                          : 'bg-white/10 text-white/50'
                        }`}
                    >
                      {step.active ? (
                        <span className="font-semibold">{step.number}</span>
                      ) : (
                        <CheckCircle2 className="h-5 w-5" />
                      )}
                    </div>
                    <span
                      className={`hidden text-sm font-medium sm:block ${step.active ? 'text-white' : 'text-white/50'
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

            <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
              {/* Filters Sidebar */}
              <motion.div
                className="lg:col-span-1"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <div className="rounded-2xl border border-white/10 bg-white/95 p-6 shadow-xl backdrop-blur-xl">
                  <div className="mb-6 flex items-center gap-2">
                    <Filter className="h-5 w-5" style={{ color: COLORS.BLUE_LIGHT }} />
                    <h3 className="text-lg font-bold" style={{ color: COLORS.NAVY_DARK }}>
                      Filters
                    </h3>
                  </div>
                  <div className="space-y-6">
                    <div>
                      <label
                        htmlFor="grade"
                        className="mb-2 flex items-center gap-2 text-sm font-semibold"
                        style={{ color: COLORS.NAVY_DARK }}
                      >
                        <Award className="h-4 w-4" />
                        Grade
                      </label>
                      <select
                        id="grade"
                        name="grade"
                        value={filters.grade}
                        onChange={handleFilterChange}
                        className="block w-full rounded-xl border-2 border-gray-200 bg-white px-3 py-3 text-sm transition-all duration-200 focus:border-[#7D97B6] focus:outline-none focus:ring-4 focus:ring-[#7D97B6]/20"
                        style={{ color: COLORS.NAVY_DARK }}
                      >
                        <option value="">All Grades</option>
                        <option value="A">A (Premium)</option>
                        <option value="B">B (High)</option>
                        <option value="C">C (Mid)</option>
                        <option value="D">D (Mid)</option>
                        <option value="E">E (Entry)</option>
                      </select>
                    </div>

                    <div>
                      <label
                        htmlFor="minPrice"
                        className="mb-2 flex items-center gap-2 text-sm font-semibold"
                        style={{ color: COLORS.NAVY_DARK }}
                      >
                        <DollarSign className="h-4 w-4" />
                        Min Price (IDR)
                      </label>
                      <input
                        type="number"
                        name="minPrice"
                        id="minPrice"
                        value={filters.minPrice}
                        onChange={handleFilterChange}
                        placeholder="e.g. 1000000"
                        className="block w-full rounded-xl border-2 border-gray-200 bg-white px-3 py-3 text-sm transition-all duration-200 focus:border-[#7D97B6] focus:outline-none focus:ring-4 focus:ring-[#7D97B6]/20"
                        style={{ color: COLORS.NAVY_DARK }}
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="maxPrice"
                        className="mb-2 flex items-center gap-2 text-sm font-semibold"
                        style={{ color: COLORS.NAVY_DARK }}
                      >
                        <DollarSign className="h-4 w-4" />
                        Max Price (IDR)
                      </label>
                      <input
                        type="number"
                        name="maxPrice"
                        id="maxPrice"
                        value={filters.maxPrice}
                        onChange={handleFilterChange}
                        placeholder="e.g. 5000000"
                        className="block w-full rounded-xl border-2 border-gray-200 bg-white px-3 py-3 text-sm transition-all duration-200 focus:border-[#7D97B6] focus:outline-none focus:ring-4 focus:ring-[#7D97B6]/20"
                        style={{ color: COLORS.NAVY_DARK }}
                      />
                    </div>

                    <div className="rounded-xl bg-blue-50 p-4">
                      <p className="text-xs text-blue-900">
                        <strong>Tip:</strong> Use filters to find photographers that match your budget and quality expectations.
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Photographers Grid */}
              <motion.div
                className="lg:col-span-3"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <div className="space-y-6">
                  {filteredPhotographers.map((photographer, index) => (
                    <motion.div
                      key={photographer.id}
                      className="overflow-hidden rounded-2xl border border-white/10 bg-white/95 shadow-xl backdrop-blur-xl transition-all duration-200 hover:shadow-2xl"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: 0.1 * index }}
                    >
                      <div className="p-6">
                        <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
                          {/* Photographer Info */}
                          <div className="flex flex-1 gap-4">
                            <img
                              className="h-20 w-20 rounded-xl object-cover shadow-md"
                              src={photographer.profilePic}
                              alt={photographer.name}
                            />
                            <div className="flex-1">
                              <div className="mb-2 flex flex-wrap items-center gap-2">
                                <h3 className="text-xl font-bold" style={{ color: COLORS.NAVY_DARK }}>
                                  {photographer.name}
                                </h3>
                                <span
                                  className="inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-semibold text-white"
                                  style={{ backgroundColor: COLORS.BLUE_LIGHT }}
                                >
                                  <Award className="h-3 w-3" />
                                  Grade {photographer.grade}
                                </span>
                              </div>
                              <p className="mb-3 text-sm" style={{ color: COLORS.SLATE_MEDIUM }}>
                                {photographer.bio}
                              </p>
                              <div className="flex items-center gap-2">
                                <div className="flex">
                                  {[...Array(5)].map((_, i) => (
                                    <Star
                                      key={i}
                                      className={`h-4 w-4 ${i < Math.floor(photographer.rating)
                                          ? 'fill-yellow-400 text-yellow-400'
                                          : 'fill-gray-300 text-gray-300'
                                        }`}
                                    />
                                  ))}
                                </div>
                                <span className="text-sm font-semibold" style={{ color: COLORS.NAVY_DARK }}>
                                  {photographer.rating}
                                </span>
                              </div>
                            </div>
                          </div>

                          {/* Price & Action */}
                          <div className="flex flex-col items-end gap-3">
                            <div className="text-right">
                              <p className="text-2xl font-bold" style={{ color: COLORS.NAVY_DARK }}>
                                Rp {photographer.dailyRate.toLocaleString()}
                              </p>
                              <p className="text-sm" style={{ color: COLORS.SLATE_MEDIUM }}>
                                per day
                              </p>
                            </div>
                            <motion.button
                              onClick={() => togglePhotographerSelection(photographer.id)}
                              className={`flex items-center gap-2 rounded-xl px-6 py-3 text-sm font-semibold shadow-md transition-all duration-200 ${selectedPhotographers.includes(photographer.id)
                                  ? 'bg-red-500 text-white hover:bg-red-600'
                                  : 'bg-[#7D97B6] text-white hover:bg-[#6a8399]'
                                }`}
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                            >
                              <ShoppingCart className="h-4 w-4" />
                              {selectedPhotographers.includes(photographer.id) ? 'Remove' : 'Add to Cart'}
                            </motion.button>
                          </div>
                        </div>

                        {/* Portfolio Preview */}
                        <div className="mt-6 grid grid-cols-2 gap-3">
                          {photographer.portfolio.slice(0, 2).map((img, idx) => (
                            <img
                              key={idx}
                              className="h-32 w-full rounded-xl object-cover shadow-md"
                              src={img}
                              alt={`Portfolio ${idx + 1}`}
                            />
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Cart Summary */}
                <motion.div
                  className="mt-8 overflow-hidden rounded-2xl border border-white/10 bg-white/95 shadow-xl backdrop-blur-xl"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                >
                  <div className="p-6">
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                      <div>
                        <h3 className="mb-1 text-xl font-bold" style={{ color: COLORS.NAVY_DARK }}>
                          Selected Photographers ({selectedPhotographers.length})
                        </h3>
                        <p className="text-sm" style={{ color: COLORS.SLATE_MEDIUM }}>
                          Proceed to cart to review your selections
                        </p>
                      </div>
                      <div className="flex gap-3">
                        <button
                          onClick={() => router.back()}
                          className="rounded-xl border-2 border-gray-300 px-6 py-3 font-semibold transition-all duration-200 hover:border-gray-400"
                          style={{ color: COLORS.NAVY_DARK }}
                        >
                          ← Back
                        </button>
                        <motion.button
                          onClick={handleSubmit}
                          disabled={selectedPhotographers.length === 0}
                          className={`flex items-center gap-2 rounded-xl px-6 py-3 font-semibold text-white shadow-lg transition-all duration-200 ${selectedPhotographers.length === 0
                              ? 'cursor-not-allowed bg-gray-400'
                              : 'bg-[#7D97B6] hover:bg-[#6a8399] hover:shadow-xl'
                            }`}
                          whileHover={selectedPhotographers.length > 0 ? { scale: 1.02 } : {}}
                          whileTap={selectedPhotographers.length > 0 ? { scale: 0.98 } : {}}
                        >
                          Next: Review Cart
                          <ArrowRight className="h-5 w-5" />
                        </motion.button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </RoleBasedLayout>
  )
}