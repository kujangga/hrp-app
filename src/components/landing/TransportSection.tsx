'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { COLORS } from '@/lib/colors'
import { Magnet } from '@/components/ui/magnet'
import { WaveDivider } from '@/components/ui/wave-divider'
import { Car, Users, MapPin, CheckCircle } from 'lucide-react'

const vehicleTypes = [
  {
    id: 1,
    name: 'Luxury Van',
    capacity: '6-8 people',
    features: ['AC', 'Power Outlets', 'Wi-Fi', 'Comfortable Seating'],
    icon: Car,
    color: COLORS.BLUE_LIGHT,
  },
  {
    id: 2,
    name: 'Professional SUV',
    capacity: '4-5 people',
    features: ['All-Terrain', 'GPS Tracking', 'Premium Audio', 'Reclining Seats'],
    icon: Users,
    color: COLORS.SLATE_MEDIUM,
  },
  {
    id: 3,
    name: 'Cargo Transport',
    capacity: 'Equipment & Gear',
    features: ['Climate Control', 'Secure Locks', 'GPS Tracking', 'Large Capacity'],
    icon: MapPin,
    color: COLORS.NAVY_DARK,
  },
]

function VehicleCard({ vehicle, index, inView }: { vehicle: typeof vehicleTypes[0]; index: number; inView: boolean }) {
  const Icon = vehicle.icon

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
            borderLeft: `4px solid ${vehicle.color}`,
          }}
        >
          <div
            className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
            style={{
              background: `linear-gradient(135deg, ${vehicle.color}08 0%, transparent 100%)`,
            }}
          />

          <div className="relative">
            <motion.div
              className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl transition-transform duration-300 group-hover:scale-110"
              style={{
                background: `${vehicle.color}20`,
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
              <Icon className="h-6 w-6" style={{ color: vehicle.color }} />
            </motion.div>

            <h3 className="mb-2 text-xl font-bold" style={{ color: COLORS.NAVY_DARK }}>
              {vehicle.name}
            </h3>

            <p className="mb-6 text-sm font-medium" style={{ color: vehicle.color }}>
              {vehicle.capacity}
            </p>

            <ul className="mb-6 space-y-2">
              {vehicle.features.map((feature, idx) => (
                <li key={idx} className="flex items-center">
                  <CheckCircle className="mr-2 h-4 w-4" style={{ color: vehicle.color }} />
                  <span className="text-sm" style={{ color: COLORS.SLATE_MEDIUM }}>
                    {feature}
                  </span>
                </li>
              ))}
            </ul>

            <motion.button
              className="w-full rounded-xl py-3 font-medium text-white"
              style={{
                background: vehicle.color,
              }}
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              Book Now
            </motion.button>
          </div>
        </div>
      </Magnet>
    </motion.div>
  )
}

export default function TransportSection() {
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
      {/* No top divider - wave from Equipment section */}

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
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
            Team Transport
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
            On-Time, On-Budget Logistics
          </motion.h2>

          <motion.p
            className="mx-auto max-w-xl text-base"
            style={{ color: COLORS.SLATE_MEDIUM }}
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            Reliable transportation services for your photography and videography crews. Professional vehicles with experienced drivers, available nationwide
          </motion.p>
        </div>

        <div className="mb-16 grid grid-cols-1 gap-4 md:grid-cols-3">
          {vehicleTypes.map((vehicle, index) => (
            <VehicleCard key={vehicle.id} vehicle={vehicle} index={index} inView={inView} />
          ))}
        </div>

        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 30, scale: 0.9 }}
          animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
          transition={{
            duration: 0.6,
            delay: 1,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          <Magnet magnitude={0.12} maxDistance={100}>
            <motion.button
              className="inline-flex items-center gap-2 rounded-full px-8 py-3 text-sm font-semibold text-white"
              style={{
                background: COLORS.NAVY_DARK,
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              Book Transport Service
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

      <WaveDivider position="bottom" color={COLORS.POWDER_LIGHT} />
    </section>
  )
}
