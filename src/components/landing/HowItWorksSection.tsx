'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { COLORS } from '@/lib/colors'
import { Magnet } from '@/components/ui/magnet'
import { WaveDivider } from '@/components/ui/wave-divider'
import { SearchIcon } from '@/components/ui/SearchIcon'
import { CreditCardIcon } from '@/components/ui/CreditCardIcon'
import { UserCheckIcon } from '@/components/ui/UserCheckIcon'
import { SparklesIcon } from '@/components/ui/SparklesIcon'

const steps = [
  {
    number: '01',
    title: 'Find Your Match',
    description: 'Browse talented photographers and discover the perfect style for your special moments.',
    IconComponent: SearchIcon,
    color: COLORS.BLUE_LIGHT,
  },
  {
    number: '02',
    title: 'Book & Pay',
    description: 'Choose your package and secure your booking with protected payment.',
    IconComponent: CreditCardIcon,
    color: COLORS.BLUE_LIGHT,
  },
  {
    number: '03',
    title: 'Get Confirmed',
    description: 'We match you with your photographer and handle all the coordination.',
    IconComponent: UserCheckIcon,
    color: COLORS.BLUE_LIGHT,
  },
  {
    number: '04',
    title: 'Enjoy Your Photos',
    description: 'Receive professionally edited, stunning photos that capture your memories.',
    IconComponent: SparklesIcon,
    color: COLORS.BLUE_LIGHT,
  },
]

function StepCard({ step, index, inView }: { step: typeof steps[0]; index: number; inView: boolean }) {
  const IconComponent = step.IconComponent
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.4,
        delay: index * 0.1,
      }}
      className="relative h-full text-center"
    >
      {/* Icon container */}
      <div
        className="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20"
      >
        <IconComponent size={36} speed={1} style={{ color: step.color }} />
      </div>

      {/* Step number */}
      <div className="mb-3">
        <span
          className="inline-block rounded-full px-3 py-1 text-[10px] font-bold tracking-wider"
          style={{
            background: `${step.color}20`,
            color: step.color,
          }}
        >
          STEP {step.number}
        </span>
      </div>

      {/* Title */}
      <h3 className="mb-2 text-lg font-bold text-white">
        {step.title}
      </h3>

      {/* Description */}
      <p className="text-sm leading-relaxed px-2 text-white/70">
        {step.description}
      </p>
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
      style={{ backgroundColor: COLORS.NAVY_DARK }}
    >
      {/* No wave divider at top since WhyHRP doesn't have bottom wave */}

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
            className="mb-4 text-[clamp(1.875rem,3.5vw,2.5rem)] font-bold tracking-tight text-white"
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            How It Works
          </motion.h2>

          {/* Subtitle */}
          <motion.p
            className="mx-auto max-w-2xl text-base text-white/70"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            From browsing to beautiful photos—your journey is just four simple steps away
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

      {/* Wave divider at bottom - transition to ServiceGateway (POWDER_LIGHT) */}
      <WaveDivider position="bottom" color={COLORS.POWDER_LIGHT} />
    </section>
  )
}
