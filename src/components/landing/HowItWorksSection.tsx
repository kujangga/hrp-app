'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { COLORS } from '@/lib/colors'
import { Magnet } from '@/components/ui/magnet'
import { WaveDivider } from '@/components/ui/wave-divider'

const steps = [
  {
    number: '01',
    title: 'Browse & Compare',
    description: 'Explore photographer portfolios, read reviews, and compare styles to find your perfect match.',
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
        />
      </svg>
    ),
    color: COLORS.BLUE_LIGHT,
  },
  {
    number: '02',
    title: 'Book Securely',
    description: 'Select your date, choose a package, and pay securely. Your payment is protected until delivery.',
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
        />
      </svg>
    ),
    color: COLORS.SLATE_MEDIUM,
  },
  {
    number: '03',
    title: 'Get Matched',
    description:
      'We confirm your photographer, share their contact details, and ensure everything is set for your event.',
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
        />
      </svg>
    ),
    color: COLORS.NAVY_DARK,
  },
  {
    number: '04',
    title: 'Receive Photos',
    description:
      'Your photographer captures the magic, edits professionally, and delivers stunning photos within the agreed timeline.',
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
        />
      </svg>
    ),
    color: COLORS.TAUPE_NEUTRAL,
  },
]

function StepCard({ step, index, inView }: { step: typeof steps[0]; index: number; inView: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.5,
        delay: index * 0.1,
        ease: [0.21, 0.47, 0.32, 0.98],
      }}
    >
      <Magnet magnitude={0.05} maxDistance={60}>
        <div className="group relative h-full text-center transition-transform duration-300 hover:-translate-y-2">
          {/* Large icon */}
          <motion.div
            className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-2xl"
            style={{
              background: `${step.color}`,
            }}
            whileHover={{ scale: 1.05 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          >
            <div className="scale-125 text-white">{step.icon}</div>
          </motion.div>

          {/* Step number */}
          <div className="mb-4">
            <span
              className="inline-block rounded-full px-4 py-1 text-xs font-bold"
              style={{
                background: `${step.color}15`,
                color: step.color,
              }}
            >
              STEP {step.number}
            </span>
          </div>

          {/* Title */}
          <h3 className="mb-3 text-xl font-bold" style={{ color: COLORS.NAVY_DARK }}>
            {step.title}
          </h3>

          {/* Description */}
          <p className="text-sm leading-relaxed" style={{ color: COLORS.SLATE_MEDIUM }}>
            {step.description}
          </p>

          {/* Connecting line - desktop only */}
          {index < 3 && (
            <motion.div
              className="absolute left-full top-10 hidden w-full lg:block"
              initial={{ scaleX: 0 }}
              animate={inView ? { scaleX: 1 } : {}}
              transition={{ delay: index * 0.1 + 0.3, duration: 0.4 }}
            >
              <div
                className="h-0.5 w-full origin-left"
                style={{
                  background: `${step.color}30`,
                }}
              />
            </motion.div>
          )}
        </div>
      </Magnet>
    </motion.div>
  )
}

export default function HowItWorksSection() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  return (
    <section
      ref={ref}
      className="relative overflow-hidden py-16 lg:py-24"
      style={{ backgroundColor: 'white' }}
    >
      {/* Wave divider at top */}
      <WaveDivider position="top" color={COLORS.POWDER_LIGHT} flip={true} />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
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
            How It Works
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
            How It Works
          </motion.h2>

          {/* Subtitle */}
          <motion.p
            className="mx-auto max-w-xl text-base"
            style={{ color: COLORS.SLATE_MEDIUM }}
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            Booking your photographer is simple—just four easy steps
          </motion.p>
        </div>

        {/* Steps Grid */}
        <div className="mb-16 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, index) => (
            <StepCard key={step.number} step={step} index={index} inView={inView} />
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          className="mt-12 text-center"
          initial={{ opacity: 0, y: 30, scale: 0.9 }}
          animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
          transition={{
            duration: 0.6,
            delay: 1,
            ease: [0.22, 1, 0.36, 1],
            type: 'spring',
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
              Get Started Now
              <motion.svg
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                animate={{ x: [0, 4, 0] }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </motion.svg>
            </motion.button>
          </Magnet>
        </motion.div>
      </div>

      {/* Wave divider at bottom */}
      <WaveDivider position="bottom" color={COLORS.POWDER_LIGHT} />
    </section>
  )
}
