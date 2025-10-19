'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import Link from 'next/link'
import { COLORS } from '@/lib/colors'
import { WaveDivider } from '@/components/ui/wave-divider'
import { UserIcon } from '@/components/ui/UserIcon'
import { ShoppingBagIcon } from '@/components/ui/ShoppingBagIcon'
import { MapPinIcon } from '@/components/ui/MapPinIcon'

const services = [
  {
    id: 1,
    title: 'Professional Talent',
    description: 'Connect with skilled photographers and videographers ready to bring your vision to life.',
    IconComponent: UserIcon,
    cta: 'Find Talent',
    link: '/talent',
    color: COLORS.BLUE_LIGHT,
    features: ['Verified Professionals', 'Live Availability', 'Portfolio Reviews'],
  },
  {
    id: 2,
    title: 'Premium Equipment',
    description: 'Access professional-grade cameras, lenses, and gear for any production.',
    IconComponent: ShoppingBagIcon,
    cta: 'Browse Gear',
    link: '/equipment',
    color: COLORS.SLATE_MEDIUM,
    features: ['Top Brands', 'Flexible Rentals', 'Package Deals'],
  },
  {
    id: 3,
    title: 'Reliable Transport',
    description: 'Professional transportation to get your team and equipment where they need to be.',
    IconComponent: MapPinIcon,
    cta: 'Book Ride',
    link: '/transport',
    color: COLORS.NAVY_DARK,
    features: ['Safe & Secure', 'Nationwide', 'On-Time Guarantee'],
  },
]

function ServiceCard({ service, index, inView }: { service: typeof services[0]; index: number; inView: boolean }) {
  const IconComponent = service.IconComponent

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.5,
        delay: index * 0.1,
      }}
      className="group relative h-full"
    >
      <div className="relative h-full rounded-2xl bg-white p-7 shadow-md transition-all duration-300 hover:shadow-xl">
        {/* Simple Icon */}
        <div
          className="mb-5 inline-flex h-16 w-16 items-center justify-center rounded-xl transition-transform duration-300 group-hover:scale-105"
          style={{ backgroundColor: `${service.color}15` }}
        >
          <IconComponent size={32} speed={1} style={{ color: service.color }} />
        </div>

        {/* Title */}
        <h3 className="mb-3 text-xl font-bold" style={{ color: COLORS.NAVY_DARK }}>
          {service.title}
        </h3>

        {/* Description */}
        <p className="mb-5 text-sm leading-relaxed" style={{ color: COLORS.SLATE_MEDIUM }}>
          {service.description}
        </p>

        {/* Features - Simple dots */}
        <ul className="mb-6 space-y-2.5">
          {service.features.map((feature, idx) => (
            <li key={idx} className="flex items-center gap-2.5 text-sm" style={{ color: COLORS.SLATE_MEDIUM }}>
              <span
                className="h-1.5 w-1.5 rounded-full flex-shrink-0"
                style={{ backgroundColor: service.color }}
              />
              {feature}
            </li>
          ))}
        </ul>

        {/* Simple CTA Button */}
        <Link href={service.link}>
          <button
            className="w-full rounded-xl py-3 text-sm font-semibold text-white transition-all duration-200 hover:opacity-90"
            style={{ backgroundColor: service.color }}
          >
            {service.cta}
          </button>
        </Link>
      </div>
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
      {/* No top divider - wave already from HowItWorks bottom */}

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12 text-center">
          {/* Badge */}
          <motion.div
            className="mb-3 inline-flex items-center gap-2 text-xs font-medium uppercase tracking-wider"
            style={{ color: COLORS.BLUE_LIGHT }}
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.4 }}
          >
            <div className="h-px w-8" style={{ backgroundColor: COLORS.BLUE_LIGHT }} />
            All-in-One Platform
            <div className="h-px w-8" style={{ backgroundColor: COLORS.BLUE_LIGHT }} />
          </motion.div>

          {/* Title */}
          <motion.h2
            className="mb-4 text-[clamp(1.875rem,3.5vw,2.5rem)] font-bold tracking-tight"
            style={{ color: COLORS.NAVY_DARK }}
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.4, delay: 0.1 }}
          >
            Everything You Need in One Place
          </motion.h2>

          {/* Subtitle */}
          <motion.p
            className="mx-auto max-w-2xl text-base"
            style={{ color: COLORS.SLATE_MEDIUM }}
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.4, delay: 0.2 }}
          >
            Talent, equipment, and transport—all the essentials for your next production in a single platform
          </motion.p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {services.map((service, index) => (
            <ServiceCard key={service.id} service={service} index={index} inView={inView} />
          ))}
        </div>
      </div>

      {/* Wave divider at bottom - transition to Talent (NAVY_DARK) */}
      <WaveDivider position="bottom" color={COLORS.NAVY_DARK} />
    </section>
  )
}
