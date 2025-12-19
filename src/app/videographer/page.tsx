'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { WaveDivider } from '@/components/ui/wave-divider'
import { LocationDateWidget } from '@/components/landing/LocationDateWidget'
import { COLORS } from '@/lib/colors'
import Footer from '@/components/landing/Footer'
import {
  Heart,
  User,
  Shirt,
  Package,
  PartyPopper,
  Mountain,
  Utensils,
  Building2,
  CheckCircle2,
  Star,
  Video
} from 'lucide-react'

const VIDEOGRAPHER_STATS = [
  { value: '650+', label: 'Professional Videographers', icon: Video },
  { value: '9K+', label: 'Successful Projects', icon: CheckCircle2 },
  { value: '42', label: 'Cities Worldwide', icon: Star },
]

const SPECIALIZATIONS = [
  { name: 'Wedding', Icon: Heart },
  { name: 'Portrait', Icon: User },
  { name: 'Fashion', Icon: Shirt },
  { name: 'Product', Icon: Package },
  { name: 'Event', Icon: PartyPopper },
  { name: 'Travel', Icon: Mountain },
  { name: 'Food', Icon: Utensils },
  { name: 'Commercial', Icon: Building2 },
]

const VIDEOGRAPHER_FEATURES = [
  {
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: 'Verified Portfolios',
    description: 'Every videographer is vetted with reviewed portfolios',
  },
  {
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: 'Real-time Availability',
    description: 'Book videographers available on your exact dates',
  },
  {
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: 'Transparent Pricing',
    description: 'Clear, upfront pricing with no hidden fees',
  },
  {
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
    title: '24h Replacement Guarantee',
    description: 'If issues arise, we find a replacement within 24 hours',
  },
]

export default function VideographerPage() {
  const router = useRouter()
  const [selectedLocation, setSelectedLocation] = useState<string>('')
  const [selectedDate, setSelectedDate] = useState<string>('')
  const [selectedSpecialization, setSelectedSpecialization] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')

  const videographerItems = [
    {
      id: 1,
      name: 'Ryan Martinez',
      specialization: 'Wedding',
      price: 'Rp 4,000,000/day',
      rating: 4.9,
      completedProjects: 200,
      features: ['Cinematic 4K', 'Drone Footage', 'Same-Day Highlights', 'Multi-Camera'],
      description: 'Award-winning wedding videographer creating cinematic stories of your special day.'
    },
    {
      id: 2,
      name: 'Emily Wang',
      specialization: 'Commercial',
      price: 'Rp 5,500,000/day',
      rating: 5.0,
      completedProjects: 280,
      features: ['Brand Films', 'Commercial Ads', '8K Capability', 'Color Grading'],
      description: 'Commercial videographer specializing in brand storytelling and corporate videos.'
    },
    {
      id: 3,
      name: 'Alex Johnson',
      specialization: 'Event',
      price: 'Rp 3,500,000/day',
      rating: 4.8,
      completedProjects: 350,
      features: ['Live Streaming', 'Multi-Cam Setup', 'Quick Turnaround', 'Event Coverage'],
      description: 'Professional event videographer capturing conferences, seminars, and corporate events.'
    },
    {
      id: 4,
      name: 'Nina Patel',
      specialization: 'Fashion',
      price: 'Rp 4,800,000/day',
      rating: 4.9,
      completedProjects: 160,
      features: ['Fashion Films', 'Runway Coverage', 'Editorial Style', 'Post-Production'],
      description: 'Fashion videographer with experience in runway shows and editorial campaigns.'
    },
    {
      id: 5,
      name: 'Tom Hartono',
      specialization: 'Product',
      price: 'Rp 3,200,000/day',
      rating: 4.7,
      completedProjects: 420,
      features: ['Product Demos', '360° Videos', 'Slow Motion', 'Studio Lighting'],
      description: 'Product videographer creating engaging content for e-commerce and marketing.'
    },
    {
      id: 6,
      name: 'Sophie Laurent',
      specialization: 'Travel',
      price: 'Rp 3,800,000/day',
      rating: 4.9,
      completedProjects: 190,
      features: ['Travel Films', 'Documentary Style', 'Aerial Shots', 'Adventure Ready'],
      description: 'Travel videographer capturing breathtaking destinations and adventures.'
    }
  ]

  const specializationCategories = [
    { id: 'all', name: 'All Videographers' },
    ...SPECIALIZATIONS.map(spec => ({ id: spec.name.toLowerCase(), name: spec.name }))
  ]

  const filteredVideographers = videographerItems.filter(item => {
    const matchesSpecialization = selectedSpecialization === 'all' ||
      item.specialization.toLowerCase().includes(selectedSpecialization)
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.specialization.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesSpecialization && matchesSearch
  })

  const handleFindVideographer = () => {
    if (!selectedLocation || !selectedDate) {
      alert('Please select both a location and a date to continue')
      return
    }

    // Navigate to search results or booking flow
    router.push(`/videographer/search?location=${encodeURIComponent(selectedLocation)}&date=${selectedDate}`)
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section - TOTALLY NEW CREATIVE LAYOUT */}
      <section className="relative min-h-screen overflow-hidden bg-gradient-to-br from-[#0a1219] via-[#0f1924] to-[#162533]">
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
          <motion.div
            className="absolute top-1/2 left-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#7D97B6]/5 blur-3xl"
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.2, 0.3, 0.2],
            }}
            transition={{
              duration: 12,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </div>

        {/* Wave Divider */}
        <WaveDivider position="bottom" color={COLORS.POWDER_LIGHT} />

        <div className="relative mx-auto flex h-full w-full max-w-7xl items-center px-4 pt-24 pb-[120px] sm:px-6 lg:px-8 lg:pt-32">
          {/* 2-COLUMN LAYOUT - FIT IN ONE SCREEN */}
          <div className="grid w-full gap-8 lg:grid-cols-[1fr_auto] lg:gap-12">

            {/* Left Column - Content */}
            <div className="flex flex-col justify-center">
              {/* Badge */}
              <motion.div
                className="inline-flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.35em] text-[#7D97B6]"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                Videographers • Portfolios • Reviews
              </motion.div>

              {/* Main Title */}
              <motion.h1
                className="mt-10 max-w-xl text-[clamp(2.5rem,5vw,4rem)] font-bold leading-[1.1] tracking-tight text-white"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4, ease: 'easeOut' }}
              >
                Book Professional
                <br />
                <span className="bg-gradient-to-r from-[#7D97B6] via-[#E1E7F2] to-[#7D97B6] bg-clip-text text-transparent">
                  Videographers
                </span>{' '}
                in Minutes
              </motion.h1>

              {/* Description */}
              <motion.p
                className="mt-5 max-w-lg text-base leading-relaxed text-white/70"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                From weddings to corporate events, find verified videography talent that brings your story to life.
                Transparent pricing, instant booking, guaranteed quality.
              </motion.p>

              {/* Compact Stats Row */}
              <motion.div
                className="mt-6 flex flex-wrap gap-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                {VIDEOGRAPHER_STATS.map((stat, index) => {
                  const Icon = stat.icon
                  return (
                    <div key={index} className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#7D97B6]/20">
                        <Icon className="h-5 w-5 text-[#7D97B6]" />
                      </div>
                      <div>
                        <div className="text-xl font-bold text-white">{stat.value}</div>
                        <div className="text-xs text-white/60">{stat.label}</div>
                      </div>
                    </div>
                  )
                })}
              </motion.div>

              {/* Categories - Compact */}
              <motion.div
                className="mt-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <p className="mb-3 text-[11px] font-semibold uppercase tracking-wider text-white/50">
                  Browse by Category
                </p>
                <div className="flex flex-wrap gap-2">
                  {SPECIALIZATIONS.slice(0, 6).map((spec, index) => {
                    const Icon = spec.Icon
                    return (
                      <button
                        key={index}
                        type="button"
                        className="group flex items-center gap-1.5 rounded-lg border border-white/20 bg-white/5 px-3 py-1.5 text-xs font-medium text-white/90 backdrop-blur-sm transition-all hover:border-[#7D97B6]/50 hover:bg-[#7D97B6]/20"
                      >
                        <Icon className="h-3 w-3 transition-transform group-hover:scale-110" />
                        <span>{spec.name}</span>
                      </button>
                    )
                  })}
                </div>
              </motion.div>
            </div>

            {/* Right Column - Search Card */}
            <motion.div
              className="flex items-center lg:w-[500px]"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              <div className="w-full rounded-3xl border border-white/10 bg-white/95 p-8 shadow-2xl backdrop-blur-xl">
                <div className="mb-6">
                  <h3 className="text-xl font-bold text-[#162533]">Find Your Videographer</h3>
                  <p className="mt-2 text-sm text-[#546079]">
                    Select location and date to see available professionals
                  </p>
                </div>

                <div className="space-y-4">
                  <LocationDateWidget
                    selectedLocation={selectedLocation}
                    selectedDate={selectedDate}
                    onLocationChange={setSelectedLocation}
                    onDateChange={setSelectedDate}
                  />
                </div>

                <motion.button
                  type="button"
                  onClick={handleFindVideographer}
                  className="mt-6 flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-[#162533] to-[#0f1924] px-6 py-4 text-sm font-semibold text-white shadow-lg shadow-[#162533]/30 transition-all hover:shadow-xl"
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Video className="h-5 w-5" />
                  <span>Search Videographers</span>
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </motion.button>

                <div className="mt-6 space-y-3 border-t border-[#E1E7F2] pt-6">
                  <div className="flex items-center gap-3">
                    <div className="flex -space-x-2">
                      {['JD', 'RM', 'LK'].map((initials) => (
                        <div
                          key={initials}
                          className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-white bg-gradient-to-br from-[#7D97B6] to-[#546079] text-xs font-bold text-white shadow-md"
                        >
                          {initials}
                        </div>
                      ))}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="h-3.5 w-3.5 fill-[#7D97B6] text-[#7D97B6]" />
                        ))}
                        <span className="ml-1 text-sm font-semibold text-[#162533]">4.8</span>
                      </div>
                      <p className="text-xs text-[#546079]">Trusted by 9,000+ clients</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 rounded-xl border border-[#7D97B6]/30 bg-[#7D97B6]/10 px-4 py-2.5 text-xs font-semibold text-[#162533]">
                    <CheckCircle2 className="h-4 w-4 text-[#7D97B6]" />
                    24h replacement guarantee
                  </div>
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* Full Videographer Inventory Section */}
      <section id="inventory" className="py-16 px-4 lg:py-24 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="mb-12 text-center">
            <motion.div
              className="mb-3 inline-flex items-center gap-2 text-xs font-medium uppercase tracking-wider"
              style={{ color: COLORS.BLUE_LIGHT }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
            >
              Complete Directory
            </motion.div>

            <motion.h2
              className="mb-4 text-[clamp(1.875rem,3.5vw,2.5rem)] font-bold tracking-tight"
              style={{ color: COLORS.NAVY_DARK }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.1 }}
            >
              Full Videographer Directory
            </motion.h2>

            <motion.p
              className="mx-auto max-w-2xl text-base"
              style={{ color: COLORS.SLATE_MEDIUM }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.2 }}
            >
              Browse our complete portfolio of professional videographers
            </motion.p>
          </div>

          {/* Search and Filter */}
          <motion.div
            className="mb-8 flex flex-col md:flex-row justify-between items-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <div className="w-full md:w-1/3">
              <input
                type="text"
                placeholder="Search videographers..."
                className="w-full rounded-xl border p-3 focus:outline-none focus:ring-2 focus:ring-[#7D97B6] transition-all"
                style={{
                  borderColor: COLORS.SLATE_MEDIUM + '40'
                }}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex flex-wrap gap-2">
              {specializationCategories.map((category) => (
                <button
                  key={category.id}
                  className="rounded-full px-4 py-2 text-sm font-medium transition-all"
                  style={{
                    backgroundColor: selectedSpecialization === category.id ? COLORS.BLUE_LIGHT : COLORS.POWDER_LIGHT,
                    color: selectedSpecialization === category.id ? '#ffffff' : COLORS.SLATE_MEDIUM
                  }}
                  onClick={() => setSelectedSpecialization(category.id)}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </motion.div>

          {/* Videographer Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredVideographers.map((videographer, index) => (
              <motion.div
                key={videographer.id}
                className="group overflow-hidden rounded-2xl bg-white shadow-md transition-all duration-300 hover:shadow-xl"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="p-6">
                  <div className="relative mb-4 flex aspect-square w-full items-center justify-center overflow-hidden rounded-xl border-2 border-dashed" style={{ borderColor: COLORS.BLUE_LIGHT, backgroundColor: COLORS.POWDER_LIGHT }}>
                    <div className="text-center">
                      <Video className="mx-auto mb-2 h-12 w-12" style={{ color: COLORS.BLUE_LIGHT }} />
                      <span className="text-sm font-semibold" style={{ color: COLORS.SLATE_MEDIUM }}>
                        {videographer.name}
                      </span>
                    </div>
                  </div>
                  <div className="mb-3 inline-block rounded-full px-3 py-1 text-sm font-medium" style={{ backgroundColor: `${COLORS.BLUE_LIGHT}20`, color: COLORS.BLUE_LIGHT }}>
                    {videographer.specialization}
                  </div>
                  <h3 className="mb-2 text-xl font-bold" style={{ color: COLORS.NAVY_DARK }}>
                    {videographer.name}
                  </h3>
                  <p className="mb-3 text-sm" style={{ color: COLORS.SLATE_MEDIUM }}>
                    {videographer.description}
                  </p>
                  <div className="mb-3 flex items-center gap-2">
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className={`h-3.5 w-3.5 ${i < Math.floor(videographer.rating) ? 'fill-[#7D97B6] text-[#7D97B6]' : 'text-gray-300'}`} />
                      ))}
                    </div>
                    <span className="text-sm font-semibold" style={{ color: COLORS.NAVY_DARK }}>{videographer.rating}</span>
                    <span className="text-xs" style={{ color: COLORS.SLATE_MEDIUM }}>({videographer.completedProjects} projects)</span>
                  </div>
                  <div className="mb-4 flex items-center justify-between">
                    <p className="text-xl font-bold" style={{ color: COLORS.BLUE_LIGHT }}>
                      {videographer.price}
                    </p>
                    <motion.button
                      type="button"
                      className="rounded-lg px-4 py-2 font-medium transition-all"
                      style={{
                        backgroundColor: `${COLORS.BLUE_LIGHT}15`,
                        color: COLORS.BLUE_LIGHT
                      }}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      View Profile
                    </motion.button>
                  </div>
                  <div className="space-y-2">
                    <h4 className="text-sm font-semibold" style={{ color: COLORS.NAVY_DARK }}>
                      Key Skills:
                    </h4>
                    <ul className="space-y-1">
                      {videographer.features.slice(0, 3).map((feature, idx) => (
                        <li key={idx} className="flex items-center text-xs" style={{ color: COLORS.SLATE_MEDIUM }}>
                          <CheckCircle2 className="mr-2 h-3 w-3" style={{ color: COLORS.BLUE_LIGHT }} />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative overflow-hidden py-16 lg:py-24" style={{ backgroundColor: COLORS.POWDER_LIGHT }}>
        <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-12 text-center">
            <motion.div
              className="mb-3 inline-flex items-center gap-2 text-xs font-medium uppercase tracking-wider"
              style={{ color: COLORS.BLUE_LIGHT }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              Why Choose Our Platform
            </motion.div>

            <motion.h2
              className="mb-4 text-[clamp(1.875rem,3.5vw,2.5rem)] font-bold tracking-tight"
              style={{ color: COLORS.NAVY_DARK }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
            >
              Professional Videography Made Simple
            </motion.h2>

            <motion.p
              className="mx-auto max-w-2xl text-base"
              style={{ color: COLORS.SLATE_MEDIUM }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
            >
              We connect you with the best videographers in your area, ensuring quality, reliability,
              and stunning results every time
            </motion.p>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
            {VIDEOGRAPHER_FEATURES.map((feature, index) => (
              <motion.div
                key={index}
                className="group relative h-full"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="relative h-full rounded-2xl bg-white p-7 shadow-md transition-all duration-300 hover:shadow-xl">
                  <div
                    className="mb-5 inline-flex h-16 w-16 items-center justify-center rounded-xl transition-transform duration-300 group-hover:scale-105"
                    style={{ backgroundColor: `${COLORS.BLUE_LIGHT}15` }}
                  >
                    <div style={{ color: COLORS.BLUE_LIGHT }}>
                      {feature.icon}
                    </div>
                  </div>
                  <h3 className="mb-3 text-xl font-bold" style={{ color: COLORS.NAVY_DARK }}>
                    {feature.title}
                  </h3>
                  <p className="text-sm leading-relaxed" style={{ color: COLORS.SLATE_MEDIUM }}>
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* CTA */}
          <motion.div
            className="mt-12 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            <p className="mb-4 text-sm" style={{ color: COLORS.SLATE_MEDIUM }}>
              Ready to book your videographer?
            </p>
            <motion.button
              type="button"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="rounded-full px-8 py-3 text-sm font-semibold text-white shadow-lg transition-all hover:shadow-xl"
              style={{ backgroundColor: COLORS.BLUE_LIGHT }}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              Get Started Now
            </motion.button>
          </motion.div>
        </div>

        {/* Wave Divider */}
        <WaveDivider position="bottom" color="#ffffff" />
      </section>

      <Footer />
    </div>
  )
}
