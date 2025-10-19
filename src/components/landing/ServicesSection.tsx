'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { COLORS } from '@/lib/colors'
import { Magnet } from '@/components/ui/magnet'
import { WaveDivider } from '@/components/ui/wave-divider'
import { Heart, Calendar, User, Sliders } from 'lucide-react'

const services = [
  {
    name: 'Wedding Photography',
    price: '$899',
    popular: true,
    icon: Heart,
    features: [
      'Full-day coverage (8 hours)',
      'Two professional photographers',
      '500+ edited high-resolution photos',
      'Online gallery with download',
      'Pre-wedding consultation',
      'Backup equipment guarantee',
    ],
    color: COLORS.BLUE_LIGHT,
  },
  {
    name: 'Event Photography',
    price: '$499',
    popular: false,
    icon: Calendar,
    features: [
      'Half-day coverage (4 hours)',
      'One professional photographer',
      '200+ edited photos',
      'Corporate & private events',
      'Fast 3-day turnaround',
      'Social media ready formats',
    ],
    color: COLORS.SLATE_MEDIUM,
  },
  {
    name: 'Portrait & Family',
    price: '$299',
    popular: false,
    icon: User,
    features: [
      '1-2 hour photo session',
      'Up to 5 people included',
      '50+ edited photos',
      'Indoor or outdoor location',
      'Wardrobe consultation',
      'Print-ready files',
    ],
    color: COLORS.NAVY_DARK,
  },
  {
    name: 'Special Add-ons',
    price: 'Custom',
    popular: false,
    icon: Sliders,
    features: [
      'Videography services',
      'Drone aerial shots',
      'Photo albums & prints',
      'Same-day editing',
      'Additional photographers',
      'Extended coverage hours',
    ],
    color: COLORS.TAUPE_NEUTRAL,
  },
]

function ServiceCard({ service, index, inView }: { service: typeof services[0]; index: number; inView: boolean }) {
  const Icon = service.icon

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
            borderLeft: `4px solid ${service.color}`,
          }}
        >
          {/* Subtle gradient overlay on hover */}
          <div
            className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
            style={{
              background: `linear-gradient(135deg, ${service.color}08 0%, transparent 100%)`,
            }}
          />

          <div className="relative">
            {/* Popular Badge */}
            {service.popular && (
              <div className="absolute -right-2 -top-2 z-10">
                <motion.div
                  className="rounded-full px-3 py-1 text-xs font-bold shadow-lg"
                  style={{
                    background: COLORS.BLUE_LIGHT,
                    color: 'white',
                  }}
                  initial={{ scale: 0, rotate: -12 }}
                  animate={inView ? { scale: 1, rotate: -12 } : {}}
                  transition={{ duration: 0.5, delay: 0.3, type: 'spring', stiffness: 200 }}
                >
                  POPULAR
                </motion.div>
              </div>
            )}

            {/* Icon with floating animation */}
            <motion.div
              className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl transition-transform duration-300 group-hover:scale-110"
              style={{
                background: `${service.color}20`,
              }}
              animate={{
                y: [0, -8, 0],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: index * 0.2,
              }}
            >
              <Icon className="h-6 w-6" style={{ color: service.color }} />
            </motion.div>

            {/* Service Name */}
            <h3 className="mb-2 text-xl font-bold" style={{ color: COLORS.NAVY_DARK }}>
              {service.name}
            </h3>

            {/* Price */}
            <div className="mb-4 flex items-baseline gap-1">
              <span className="text-3xl font-extrabold" style={{ color: service.color }}>
                {service.price}
              </span>
              {service.price !== 'Custom' && (
                <span className="text-sm font-medium" style={{ color: COLORS.SLATE_MEDIUM }}>
                  + per package
                </span>
              )}
            </div>

            {/* Features List */}
            <ul className="mb-6 space-y-3">
              {service.features.map((feature, featureIndex) => (
                <motion.li
                  key={featureIndex}
                  className="flex items-start gap-3"
                  initial={{ opacity: 0, x: -10 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.3, delay: index * 0.1 + featureIndex * 0.05 }}
                >
                  <svg
                    className="mt-0.5 h-5 w-5 flex-shrink-0"
                    style={{ color: service.color }}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-sm leading-relaxed" style={{ color: COLORS.SLATE_MEDIUM }}>
                    {feature}
                  </span>
                </motion.li>
              ))}
            </ul>

            {/* CTA Button */}
            <motion.button
              className="w-full rounded-xl py-3 font-semibold text-white shadow-lg transition-all duration-300 hover:shadow-xl"
              style={{ background: service.color }}
              whileHover={{ y: -2, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Learn More
            </motion.button>
          </div>
        </div>
      </Magnet>
    </motion.div>
  )
}

export default function ServicesSection() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  return (
    <section
      ref={ref}
      className="relative overflow-hidden bg-white py-16 lg:py-24"
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
            Our Services
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
            Photography Packages
          </motion.h2>

          {/* Subtitle */}
          <motion.p
            className="mx-auto max-w-xl text-base"
            style={{ color: COLORS.SLATE_MEDIUM }}
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            Professional photography packages tailored to your needs
          </motion.p>
        </div>

        {/* Services Grid */}
        <div className="mb-16 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service, index) => (
            <ServiceCard key={service.name} service={service} index={index} inView={inView} />
          ))}
        </div>

        {/* Custom Package CTA */}
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
              Build Custom Package
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
