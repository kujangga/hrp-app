'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { COLORS } from '@/lib/colors'
import { Magnet } from '@/components/ui/magnet'
import { BadgeCheck, Zap, DollarSign, Shield } from 'lucide-react'

const benefits = [
  {
    icon: BadgeCheck,
    title: 'Curated Photographers',
    description: 'Vetted professionals ensuring top-quality results.',
    color: COLORS.BLUE_LIGHT,
  },
  {
    icon: Zap,
    title: '24h Replacement',
    description: 'Free replacement guarantee within 24 hours.',
    color: COLORS.POWDER_LIGHT,
  },
  {
    icon: DollarSign,
    title: 'Transparent Pricing',
    description: 'No hidden fees. Clear pricing upfront.',
    color: COLORS.SLATE_MEDIUM,
  },
  {
    icon: Shield,
    title: 'Secure Payment',
    description: 'Protected until delivery. Safe & reliable.',
    color: COLORS.TAUPE_NEUTRAL,
  },
]


function BenefitCard({ benefit, index, inView }: { benefit: typeof benefits[0]; index: number; inView: boolean }) {
  const Icon = benefit.icon

  // Make POWDER_LIGHT more visible by using BLUE_LIGHT as accent
  const isPowderLight = benefit.color === COLORS.POWDER_LIGHT
  const accentColor = isPowderLight ? COLORS.BLUE_LIGHT : benefit.color
  const iconBgOpacity = isPowderLight ? '50' : '20'

  return (
    <motion.div
      initial={{ opacity: 0, y: 40, scale: 0.9 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{
        duration: 0.6,
        delay: index * 0.12,
        ease: [0.22, 1, 0.36, 1],
        type: "spring",
        stiffness: 100,
        damping: 15
      }}
    >
      <Magnet magnitude={0.08} maxDistance={80}>
        <div
          className="group relative overflow-hidden rounded-2xl bg-white p-6 shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl"
          style={{
            borderLeft: `4px solid ${accentColor}`,
          }}
        >
          {/* Subtle gradient overlay on hover */}
          <div
            className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
            style={{
              background: `linear-gradient(135deg, ${accentColor}08 0%, transparent 100%)`,
            }}
          />

          <div className="relative">
            {/* Icon with solid color background and floating animation */}
            <motion.div
              className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl transition-transform duration-300 group-hover:scale-110"
              style={{
                background: `${accentColor}${iconBgOpacity}`,
              }}
              animate={{
                y: [0, -8, 0],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
                delay: index * 0.2,
              }}
            >
              <Icon className="h-6 w-6" style={{ color: accentColor }} />
            </motion.div>

            {/* Title */}
            <h3 className="mb-2 text-lg font-semibold" style={{ color: COLORS.NAVY_DARK }}>
              {benefit.title}
            </h3>

            {/* Description */}
            <p className="text-sm leading-relaxed" style={{ color: COLORS.SLATE_MEDIUM }}>
              {benefit.description}
            </p>
          </div>
        </div>
      </Magnet>
    </motion.div>
  )
}

export default function WhyHRPSection() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  return (
    <section
      ref={ref}
      className="relative overflow-hidden py-16 lg:py-24"
      style={{ backgroundColor: COLORS.POWDER_LIGHT }}
    >
      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Header - More compact */}
        <div className="mb-12 text-center">
          {/* Badge with animated lines */}
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
            Why Choose Us
            <motion.div
              className="h-px w-8"
              style={{ backgroundColor: COLORS.BLUE_LIGHT }}
              initial={{ width: 0 }}
              animate={inView ? { width: 32 } : {}}
              transition={{ duration: 0.5, delay: 0.2 }}
            />
          </motion.div>

          {/* Title */}
          <motion.h2
            className="mb-4 text-[clamp(1.875rem,3.5vw,2.5rem)] font-bold tracking-tight"
            style={{ color: COLORS.NAVY_DARK }}
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            Why Choose HRP?
          </motion.h2>

          {/* Subtitle */}
          <motion.p
            className="mx-auto max-w-xl text-base"
            style={{ color: COLORS.SLATE_MEDIUM }}
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            Professional photography services trusted by thousands worldwide.
          </motion.p>
        </div>

        {/* Benefits Grid - Compact 4 columns */}
        <div className="mb-16 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {benefits.map((benefit, index) => (
            <BenefitCard key={benefit.title} benefit={benefit} index={index} inView={inView} />
          ))}
        </div>

        {/* Bottom CTA - Minimal */}
        <motion.div
          className="mt-12 text-center"
          initial={{ opacity: 0, y: 30, scale: 0.9 }}
          animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
          transition={{
            duration: 0.6,
            delay: 1,
            ease: [0.22, 1, 0.36, 1],
            type: "spring",
            stiffness: 100,
          }}
        >
          <Magnet magnitude={0.12} maxDistance={100}>
            <motion.button
              className="group inline-flex items-center gap-2 rounded-full px-8 py-3 text-sm font-semibold transition-all duration-300 hover:gap-3 hover:shadow-lg"
              style={{
                background: COLORS.NAVY_DARK,
                color: 'white',
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              Explore Photographers
              <motion.svg
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                animate={{ x: [0, 4, 0] }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </motion.svg>
            </motion.button>
          </Magnet>
        </motion.div>
      </div>
    </section>
  )
}
