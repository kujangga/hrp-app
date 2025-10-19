'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import Link from 'next/link'
import { COLORS } from '@/lib/colors'
import { Magnet } from '@/components/ui/magnet'
import { WaveDivider } from '@/components/ui/wave-divider'
import { Camera, Package, Truck } from 'lucide-react'

const services = [
  {
    id: 1,
    title: 'Talent Directory',
    subtitle: 'Photographers & Videographers',
    description: 'Browse our curated selection of graded professionals for your photography and videography needs',
    icon: Camera,
    cta: 'Browse Talent',
    link: '/talent',
    color: COLORS.BLUE_LIGHT,
    features: ['Grade System A-E', 'Real-time Availability', 'Portfolio Preview'],
  },
  {
    id: 2,
    title: 'Equipment Rental',
    subtitle: 'Professional Gear',
    description: 'Rent professional photography and videography equipment for your productions',
    icon: Package,
    cta: 'Rent Gear',
    link: '/equipment',
    color: COLORS.SLATE_MEDIUM,
    features: ['High-quality Gear', 'Flexible Rental Periods', 'Equipment Bundles'],
  },
  {
    id: 3,
    title: 'Team Transport',
    subtitle: 'Reliable Logistics',
    description: 'Professional transportation services for your photography teams',
    icon: Truck,
    cta: 'Book Transport',
    link: '/transport',
    color: COLORS.NAVY_DARK,
    features: ['Reliable Vehicles', 'Nation-wide Coverage', 'Professional Drivers'],
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

            {/* Title */}
            <h3 className="mb-1 text-xl font-bold" style={{ color: COLORS.NAVY_DARK }}>
              {service.title}
            </h3>

            {/* Subtitle */}
            <p className="mb-3 text-sm font-medium" style={{ color: service.color }}>
              {service.subtitle}
            </p>

            {/* Description */}
            <p className="mb-6 text-sm leading-relaxed" style={{ color: COLORS.SLATE_MEDIUM }}>
              {service.description}
            </p>

            {/* Features List */}
            <ul className="mb-6 space-y-2">
              {service.features.map((feature, idx) => (
                <li key={idx} className="flex items-center">
                  <svg
                    className="mr-2 h-4 w-4"
                    style={{ color: service.color }}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="text-sm" style={{ color: COLORS.SLATE_MEDIUM }}>
                    {feature}
                  </span>
                </li>
              ))}
            </ul>

            {/* CTA Button */}
            <Link href={service.link} passHref>
              <motion.button
                className="w-full rounded-xl py-3 font-bold text-white transition-opacity hover:opacity-90"
                style={{ background: service.color }}
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                {service.cta}
              </motion.button>
            </Link>
          </div>
        </div>
      </Magnet>
    </motion.div>
  )
}

export default function ServiceGatewaySection() {
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
      {/* Wave divider at top */}
      <WaveDivider position="top" color="white" flip={true} />

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
            Complete Production Marketplace
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
            Everything You Need in One Place
          </motion.h2>

          {/* Subtitle */}
          <motion.p
            className="mx-auto max-w-xl text-base"
            style={{ color: COLORS.SLATE_MEDIUM }}
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            Access all our services from one platform - talent, equipment, and transport in a single solution
          </motion.p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {services.map((service, index) => (
            <ServiceCard key={service.id} service={service} index={index} inView={inView} />
          ))}
        </div>
      </div>

      {/* Wave divider at bottom */}
      <WaveDivider position="bottom" color="white" />
    </section>
  )
}
