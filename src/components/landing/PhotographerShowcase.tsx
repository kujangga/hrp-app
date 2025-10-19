'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { COLORS } from '@/lib/colors'
import { Magnet } from '@/components/ui/magnet'
import { WaveDivider } from '@/components/ui/wave-divider'
import { Star, MapPin, CheckCircle2, Heart } from 'lucide-react'

interface Talent {
  id: number
  name: string
  grade: 'A' | 'B' | 'C' | 'D' | 'E'
  rating: number
  reviewCount: number
  price: number
  location: string
  available: boolean
  specialties: string[]
  talentType: 'Photographer' | 'Videographer'
}

const talents: Talent[] = [
  {
    id: 1,
    name: 'Andreas Wibowo',
    grade: 'A',
    rating: 4.9,
    reviewCount: 124,
    price: 2500000,
    location: 'Jakarta',
    available: true,
    specialties: ['Wedding', 'Portrait'],
    talentType: 'Photographer',
  },
  {
    id: 2,
    name: 'Sarah Chen',
    grade: 'B',
    rating: 4.7,
    reviewCount: 89,
    price: 1800000,
    location: 'Bandung',
    available: true,
    specialties: ['Corporate', 'Event'],
    talentType: 'Videographer',
  },
  {
    id: 3,
    name: 'Budi Santoso',
    grade: 'C',
    rating: 4.5,
    reviewCount: 67,
    price: 1200000,
    location: 'Bali',
    available: false,
    specialties: ['Event', 'Portrait'],
    talentType: 'Photographer',
  },
  {
    id: 4,
    name: 'Maria Gunawan',
    grade: 'A',
    rating: 4.8,
    reviewCount: 156,
    price: 3200000,
    location: 'Jakarta',
    available: true,
    specialties: ['Wedding', 'Fashion'],
    talentType: 'Photographer',
  },
  {
    id: 5,
    name: 'James Wilson',
    grade: 'B',
    rating: 4.6,
    reviewCount: 92,
    price: 1950000,
    location: 'Singapore',
    available: true,
    specialties: ['Corporate', 'Product'],
    talentType: 'Videographer',
  },
  {
    id: 6,
    name: 'Dewi Kusuma',
    grade: 'C',
    rating: 4.3,
    reviewCount: 43,
    price: 800000,
    location: 'Yogyakarta',
    available: true,
    specialties: ['Portrait', 'Event'],
    talentType: 'Photographer',
  },
]

const gradeColors = {
  A: COLORS.BLUE_LIGHT,
  B: COLORS.SLATE_MEDIUM,
  C: COLORS.NAVY_DARK,
  D: COLORS.TAUPE_NEUTRAL,
  E: COLORS.POWDER_LIGHT,
}

function TalentCard({ talent, index, inView }: { talent: Talent; index: number; inView: boolean }) {
  const gradeColor = gradeColors[talent.grade]

  return (
    <motion.div
      initial={{ opacity: 0, y: 40, scale: 0.9 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{
        duration: 0.6,
        delay: index * 0.12,
        ease: [0.22, 1, 0.36, 1],
        type: 'spring',
        stiffness: 100,
        damping: 15,
      }}
    >
      <Magnet magnitude={0.08} maxDistance={80}>
        <div
          className="group relative h-full overflow-hidden rounded-2xl bg-white p-6 shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl"
          style={{
            borderLeft: `4px solid ${gradeColor}`,
          }}
        >
          {/* Subtle gradient overlay on hover */}
          <div
            className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
            style={{
              background: `linear-gradient(135deg, ${gradeColor}08 0%, transparent 100%)`,
            }}
          />

          <div className="relative">
            {/* Header */}
            <div className="mb-4 flex items-start justify-between">
              <div className="flex-1">
                <h3 className="text-lg font-bold" style={{ color: COLORS.NAVY_DARK }}>
                  {talent.name}
                </h3>
                <p className="text-sm" style={{ color: COLORS.SLATE_MEDIUM }}>
                  {talent.talentType}
                </p>
              </div>
              <span
                className="rounded-full px-2 py-1 text-xs font-bold"
                style={{ background: `${gradeColor}20`, color: gradeColor }}
              >
                Grade {talent.grade}
              </span>
            </div>

            {/* Rating */}
            <div className="mb-3 flex items-center">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${i < Math.floor(talent.rating) ? 'fill-current' : ''}`}
                    style={{ color: i < Math.floor(talent.rating) ? COLORS.TAUPE_NEUTRAL : COLORS.POWDER_LIGHT }}
                  />
                ))}
              </div>
              <span className="ml-2 text-sm" style={{ color: COLORS.SLATE_MEDIUM }}>
                {talent.rating} ({talent.reviewCount})
              </span>
            </div>

            {/* Location & Availability */}
            <div className="mb-4 flex items-center justify-between">
              <div className="flex items-center">
                <MapPin className="mr-1 h-4 w-4" style={{ color: COLORS.BLUE_LIGHT }} />
                <span className="text-sm" style={{ color: COLORS.SLATE_MEDIUM }}>
                  {talent.location}
                </span>
              </div>
              <span
                className="inline-flex items-center rounded-full px-2 py-1 text-xs font-medium"
                style={{
                  background: talent.available ? `${COLORS.BLUE_LIGHT}20` : `${COLORS.SLATE_MEDIUM}20`,
                  color: talent.available ? COLORS.BLUE_LIGHT : COLORS.SLATE_MEDIUM,
                }}
              >
                {talent.available ? 'Available' : 'Unavailable'}
              </span>
            </div>

            {/* Price */}
            <p className="mb-4 text-lg font-bold" style={{ color: gradeColor }}>
              {talent.price.toLocaleString()} IDR
              <span className="text-sm font-normal" style={{ color: COLORS.SLATE_MEDIUM }}>
                /day
              </span>
            </p>

            {/* Specialties */}
            <div className="mb-6 flex flex-wrap gap-1">
              {talent.specialties.map((specialty) => (
                <span
                  key={specialty}
                  className="rounded-full px-2.5 py-0.5 text-xs font-medium"
                  style={{ background: `${gradeColor}20`, color: gradeColor }}
                >
                  {specialty}
                </span>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex space-x-3">
              <motion.button
                className="flex-1 rounded-lg py-2 font-medium text-white"
                style={{ background: gradeColor }}
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                View Profile
              </motion.button>
              <motion.button
                className={`rounded-lg border p-2 ${talent.available ? '' : 'opacity-50'}`}
                style={{ borderColor: COLORS.POWDER_LIGHT, color: talent.available ? gradeColor : COLORS.SLATE_MEDIUM }}
                disabled={!talent.available}
                whileHover={talent.available ? { scale: 1.1 } : {}}
                whileTap={talent.available ? { scale: 0.9 } : {}}
              >
                <Heart className="h-5 w-5" />
              </motion.button>
            </div>
          </div>
        </div>
      </Magnet>
    </motion.div>
  )
}

export default function PhotographerShowcase() {
  const [selectedGrade, setSelectedGrade] = useState<'A' | 'B' | 'C' | 'D' | 'E' | 'all'>('all')
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const filteredTalents = talents.filter((talent) => selectedGrade === 'all' || talent.grade === selectedGrade)

  return (
    <section ref={ref} className="relative overflow-hidden py-16 lg:py-24" style={{ backgroundColor: COLORS.NAVY_DARK }}>
      {/* Wave divider at top */}
      <WaveDivider position="top" color={COLORS.POWDER_LIGHT} flip={true} />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12 text-center">
          <motion.div
            className="mb-3 inline-flex items-center gap-2 text-xs font-medium uppercase tracking-wider"
            style={{ color: COLORS.BLUE_LIGHT }}
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
          >
            <motion.div
              className="h-px w-8"
              style={{ backgroundColor: COLORS.BLUE_LIGHT }}
              initial={{ width: 0 }}
              animate={inView ? { width: 32 } : {}}
              transition={{ duration: 0.5, delay: 0.2 }}
            />
            Talent Directory
            <motion.div
              className="h-px w-8"
              style={{ backgroundColor: COLORS.BLUE_LIGHT }}
              initial={{ width: 0 }}
              animate={inView ? { width: 32 } : {}}
              transition={{ duration: 0.5, delay: 0.2 }}
            />
          </motion.div>

          <motion.h2
            className="mb-4 text-[clamp(1.875rem,3.5vw,2.5rem)] font-bold tracking-tight"
            style={{ color: COLORS.NAVY_DARK }}
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            Graded Photographers & Videographers
          </motion.h2>

          <motion.p
            className="mx-auto max-w-xl text-base"
            style={{ color: COLORS.SLATE_MEDIUM }}
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            Choose from our curated selection of 1,247+ verified professionals based on your needs
          </motion.p>
        </div>

        {/* Grade Filter */}
        <div className="mb-10">
          <div className="flex flex-wrap justify-center gap-2">
            {['all', 'A', 'B', 'C', 'D', 'E'].map((grade) => {
              const isActive = selectedGrade === grade
              const color = grade === 'all' ? COLORS.NAVY_DARK : gradeColors[grade as keyof typeof gradeColors]

              return (
                <motion.button
                  key={grade}
                  className="rounded-full px-4 py-2 text-sm font-medium transition-all"
                  style={{
                    background: isActive ? color : COLORS.POWDER_LIGHT,
                    color: isActive ? 'white' : COLORS.SLATE_MEDIUM,
                  }}
                  onClick={() => setSelectedGrade(grade as typeof selectedGrade)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {grade === 'all' ? 'All Grades' : `Grade ${grade}`}
                </motion.button>
              )
            })}
          </div>
        </div>

        {/* Talent Grid */}
        <div className="mb-16 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filteredTalents.slice(0, 6).map((talent, index) => (
            <TalentCard key={talent.id} talent={talent} index={index} inView={inView} />
          ))}
        </div>

        {/* CTA */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 30, scale: 0.9 }}
          animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
          transition={{ duration: 0.6, delay: 1, ease: [0.22, 1, 0.36, 1] }}
        >
          <Magnet magnitude={0.12} maxDistance={100}>
            <motion.button
              className="inline-flex items-center gap-2 rounded-full px-8 py-3 text-sm font-semibold text-white"
              style={{ background: COLORS.NAVY_DARK }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              View All Professionals (1,247+)
              <motion.svg
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                animate={{ x: [0, 4, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </motion.svg>
            </motion.button>
          </Magnet>
        </motion.div>
      </div>

      {/* Wave divider at bottom - transition to Equipment (POWDER_LIGHT) */}
      <WaveDivider position="bottom" color={COLORS.POWDER_LIGHT} />
    </section>
  )
}
