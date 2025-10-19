'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Camera, Users, ArrowRight } from 'lucide-react'
import { COLORS } from '@/lib/colors'
import { Magnet } from '@/components/ui/magnet'
import { WaveDivider } from '@/components/ui/wave-divider'

const CtaSection = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const ctaCards = [
    {
      title: 'Book a Photographer',
      description: 'Browse portfolios, compare prices, and book the perfect photographer for your event in minutes.',
      icon: Camera,
      buttonText: 'Start Booking',
      buttonLink: '/booking/location-date',
      color: COLORS.BLUE_LIGHT,
    },
    {
      title: 'Join as Photographer',
      description: 'Join our network, get matched with clients, and grow your photography business effortlessly.',
      icon: Users,
      buttonText: 'Join Now',
      buttonLink: '/auth/register',
      color: COLORS.SLATE_MEDIUM,
    },
  ]

  return (
    <section
      ref={ref}
      className="relative overflow-hidden py-16 lg:py-24"
      style={{ backgroundColor: COLORS.NAVY_DARK }}
    >
      {/* Top Wave Divider */}
      <WaveDivider position="top" color={COLORS.NAVY_DARK} flip />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12 text-center lg:mb-16">
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
            Get Started
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
            Ready to Create Something Amazing?
          </motion.h2>

          {/* Subtitle */}
          <motion.p
            className="mx-auto max-w-2xl text-base text-white/70"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            Whether you need a photographer or want to showcase your talent—join our platform today
          </motion.p>
        </div>

        {/* CTA Cards Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:gap-8">
          {ctaCards.map((card, index) => {
            const Icon = card.icon
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40, scale: 0.9 }}
                animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
                transition={{
                  duration: 0.6,
                  delay: 0.6 + index * 0.12,
                  ease: [0.22, 1, 0.36, 1],
                  type: 'spring',
                  stiffness: 100,
                  damping: 15,
                }}
              >
                <Magnet magnitude={0.08} maxDistance={80}>
                  <div
                    className="group relative h-full overflow-hidden rounded-2xl bg-white p-8 shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl"
                    style={{
                      borderLeft: `4px solid ${card.color}`,
                    }}
                  >
                    {/* Subtle gradient overlay on hover */}
                    <div
                      className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                      style={{
                        background: `linear-gradient(135deg, ${card.color}08 0%, transparent 100%)`,
                      }}
                    />

                    <div className="relative">
                      {/* Icon with floating animation */}
                      <motion.div
                        className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-xl transition-transform duration-300 group-hover:scale-110"
                        style={{
                          background: `${card.color}20`,
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
                        <Icon className="h-7 w-7" style={{ color: card.color }} />
                      </motion.div>

                      {/* Title */}
                      <h3 className="mb-3 text-2xl font-bold" style={{ color: COLORS.NAVY_DARK }}>
                        {card.title}
                      </h3>

                      {/* Description */}
                      <p className="mb-6 leading-relaxed" style={{ color: COLORS.SLATE_MEDIUM }}>
                        {card.description}
                      </p>

                      {/* Button */}
                      <button
                        onClick={() => {
                          window.location.href = card.buttonLink
                        }}
                        className="group/btn inline-flex w-full items-center justify-center gap-2 rounded-xl px-6 py-3.5 font-semibold text-white transition-all duration-300 hover:scale-105 hover:shadow-lg"
                        style={{
                          backgroundColor: card.color,
                        }}
                      >
                        {card.buttonText}
                        <ArrowRight
                          size={18}
                          className="transition-transform duration-300 group-hover/btn:translate-x-1"
                        />
                      </button>
                    </div>
                  </div>
                </Magnet>
              </motion.div>
            )
          })}
        </div>

        {/* Trust indicators */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 1.0 }}
          className="mt-12 flex flex-wrap items-center justify-center gap-6 text-center text-sm text-white/60"
        >
          <span>✓ No hidden fees</span>
          <span className="hidden sm:inline">•</span>
          <span>✓ Secure payment</span>
          <span className="hidden sm:inlinenah">•</span>
          <span>✓ Instant confirmation</span>
          <span className="hidden sm:inline">•</span>
          <span>✓ 24/7 support</span>
        </motion.div>
      </div>

      {/* Bottom Wave Divider - menggunakan warna Footer yang lebih gelap */}
      <WaveDivider position="bottom" color="#0f1924" />
    </section>
  )
}

export default CtaSection
