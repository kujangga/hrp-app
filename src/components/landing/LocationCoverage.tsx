'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import dynamic from 'next/dynamic'
import { COLORS } from '@/lib/colors'
import { WaveDivider } from '@/components/ui/wave-divider'

// Dynamic import to avoid SSR issues with Leaflet
const MapView = dynamic(() => import('./MapView'), { ssr: false })

interface Location {
  id: string
  name: string
  region: string
  photographerCount: number
  featured?: boolean
  lat: number
  lng: number
}

const LocationCoverage = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })
  
  const [activeRegion, setActiveRegion] = useState<'all' | 'indonesia' | 'international'>('all')
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null)
  
  const locations: Location[] = [
    { id: '1', name: 'Jakarta', region: 'indonesia', photographerCount: 342, featured: true, lat: -6.2088, lng: 106.8456 },
    { id: '2', name: 'Bali', region: 'indonesia', photographerCount: 289, featured: true, lat: -8.4095, lng: 115.1889 },
    { id: '3', name: 'Bandung', region: 'indonesia', photographerCount: 127, lat: -6.9175, lng: 107.6191 },
    { id: '4', name: 'Surabaya', region: 'indonesia', photographerCount: 98, lat: -7.2575, lng: 112.7521 },
    { id: '5', name: 'Yogyakarta', region: 'indonesia', photographerCount: 76, lat: -7.7956, lng: 110.3695 },
    { id: '6', name: 'Medan', region: 'indonesia', photographerCount: 65, lat: 3.5952, lng: 98.6722 },
    { id: '7', name: 'Makassar', region: 'indonesia', photographerCount: 54, lat: -5.1477, lng: 119.4327 },
    { id: '8', name: 'Semarang', region: 'indonesia', photographerCount: 43, lat: -6.9667, lng: 110.4167 },
    { id: '9', name: 'Singapore', region: 'international', photographerCount: 123, featured: true, lat: 1.3521, lng: 103.8198 },
    { id: '10', name: 'Malaysia', region: 'international', photographerCount: 87, lat: 3.1390, lng: 101.6869 },
    { id: '11', name: 'Thailand', region: 'international', photographerCount: 95, lat: 13.7563, lng: 100.5018 },
    { id: '12', name: 'Philippines', region: 'international', photographerCount: 78, lat: 14.5995, lng: 120.9842 },
    { id: '13', name: 'Australia', region: 'international', photographerCount: 64, lat: -33.8688, lng: 151.2093 },
    { id: '14', name: 'Vietnam', region: 'international', photographerCount: 52, lat: 10.8231, lng: 106.6297 },
  ]

  const filteredLocations = locations.filter(loc => 
    activeRegion === 'all' ? true : loc.region === activeRegion
  )

  const stats = [
    { 
      number: '15+', 
      label: 'Indonesian Cities',
      icon: 'M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z M15 11a3 3 0 11-6 0 3 3 0 016 0z'
    },
    { 
      number: '12', 
      label: 'Countries',
      icon: 'M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
    },
    { 
      number: '1,247+', 
      label: 'Verified Professionals',
      icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z'
    },
  ]

  return (
    <section ref={ref} className="relative overflow-hidden py-16 lg:py-24" style={{ backgroundColor: COLORS.POWDER_LIGHT }}>
      <WaveDivider position="top" color={COLORS.POWDER_LIGHT} />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <motion.div className="mb-3 inline-flex items-center gap-2 text-xs font-medium uppercase tracking-wider" style={{ color: COLORS.BLUE_LIGHT }} initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.4 }}>
            <div className="h-px w-8" style={{ backgroundColor: COLORS.BLUE_LIGHT }} />
            Global Coverage
            <div className="h-px w-8" style={{ backgroundColor: COLORS.BLUE_LIGHT }} />
          </motion.div>

          <motion.h2 className="mb-4 text-[clamp(1.875rem,3.5vw,2.5rem)] font-bold tracking-tight" style={{ color: COLORS.NAVY_DARK }} initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.4, delay: 0.1 }}>
            Extensive Network Across Indonesia and Beyond
          </motion.h2>

          <motion.p className="mx-auto max-w-2xl text-base" style={{ color: COLORS.SLATE_MEDIUM }} initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.4, delay: 0.2 }}>
            Professional photographers ready to serve you in major cities nationwide and international destinations
          </motion.p>
        </div>

        <motion.div className="mb-12 grid grid-cols-1 gap-4 md:grid-cols-3" initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: 0.3 }}>
          {stats.map((stat, index) => (
            <motion.div key={index} className="group relative overflow-hidden rounded-2xl bg-white p-6 shadow-md transition-all duration-300 hover:shadow-lg" initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.4 + index * 0.1 }}>
              <div className="flex items-center gap-4">
                <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-xl transition-transform duration-300 group-hover:scale-110" style={{ backgroundColor: `${COLORS.BLUE_LIGHT}15` }}>
                  <svg className="h-8 w-8" style={{ color: COLORS.BLUE_LIGHT }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d={stat.icon} />
                  </svg>
                </div>
                <div>
                  <p className="text-3xl font-bold" style={{ color: COLORS.NAVY_DARK }}>{stat.number}</p>
                  <p className="mt-1 text-sm font-medium" style={{ color: COLORS.SLATE_MEDIUM }}>{stat.label}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div className="mb-8 flex justify-center" initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.4, delay: 0.7 }}>
          <div className="inline-flex gap-2 rounded-xl bg-white p-1.5 shadow-md">
            {[{ value: 'all', label: 'All Locations' }, { value: 'indonesia', label: 'Indonesia' }, { value: 'international', label: 'International' }].map((tab) => (
              <button key={tab.value} onClick={() => setActiveRegion(tab.value as typeof activeRegion)} className={`rounded-lg px-5 py-2 text-sm font-semibold transition-all duration-200 ${activeRegion === tab.value ? 'text-white shadow-sm' : 'text-gray-600 hover:text-gray-900'}`} style={{ backgroundColor: activeRegion === tab.value ? COLORS.BLUE_LIGHT : 'transparent' }}>
                {tab.label}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Interactive Map */}
        <motion.div
          className="mb-8 overflow-hidden rounded-2xl bg-white p-6 shadow-md"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.8 }}
        >
          <MapView 
            locations={filteredLocations}
            selectedLocation={selectedLocation}
            onLocationSelect={setSelectedLocation}
          />
        </motion.div>

        {/* Selected Location Detail */}
        {selectedLocation && (
          <motion.div
            className="mb-8 rounded-2xl p-6 shadow-md"
            style={{ backgroundColor: `${COLORS.BLUE_LIGHT}10` }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex flex-col items-center gap-4 md:flex-row">
              <div
                className="flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-full text-xl font-bold text-white"
                style={{ backgroundColor: COLORS.BLUE_LIGHT }}
              >
                {selectedLocation.photographerCount}
              </div>
              <div className="flex-1 text-center md:text-left">
                <h3 className="text-xl font-bold" style={{ color: COLORS.NAVY_DARK }}>
                  {selectedLocation.name}
                </h3>
                <p className="mt-1 text-sm" style={{ color: COLORS.SLATE_MEDIUM }}>
                  {selectedLocation.photographerCount} verified photographers available
                </p>
              </div>
              <button
                className="rounded-lg px-5 py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90"
                style={{ backgroundColor: COLORS.BLUE_LIGHT }}
              >
                View Photographers
              </button>
            </div>
          </motion.div>
        )}

        {/* Compact Location List */}
        <motion.div
          className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 1.1 }}
        >
          {filteredLocations.map((location, index) => (
            <motion.button
              key={location.id}
              onClick={() => setSelectedLocation(location)}
              className={`group relative rounded-lg p-3 text-left transition-all duration-200 ${
                selectedLocation?.id === location.id
                  ? 'shadow-md'
                  : 'bg-white shadow-sm hover:shadow-md'
              }`}
              style={{
                backgroundColor: selectedLocation?.id === location.id ? `${COLORS.BLUE_LIGHT}15` : undefined,
                borderLeft: selectedLocation?.id === location.id ? `3px solid ${COLORS.BLUE_LIGHT}` : '3px solid transparent',
              }}
              initial={{ opacity: 0, x: -10 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 1.2 + index * 0.02 }}
            >
              {location.featured && (
                <div className="absolute right-2 top-2">
                  <svg className="h-3 w-3" style={{ color: COLORS.BLUE_LIGHT }} fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                </div>
              )}
              
              <div className="flex items-center gap-2">
                <div
                  className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full text-white text-xs font-semibold"
                  style={{ backgroundColor: COLORS.BLUE_LIGHT }}
                >
                  {location.photographerCount}
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="truncate text-xs font-semibold" style={{ color: COLORS.NAVY_DARK }}>
                    {location.name}
                  </h3>
                  <p className="text-[10px]" style={{ color: COLORS.SLATE_MEDIUM }}>
                    {location.photographerCount} pros
                  </p>
                </div>
              </div>
            </motion.button>
          ))}
        </motion.div>

        <motion.div className="mt-12 overflow-hidden rounded-2xl bg-white shadow-lg" initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: 1.2 }}>
          <div className="grid md:grid-cols-2">
            <div className="p-8 md:p-10">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-semibold" style={{ backgroundColor: `${COLORS.BLUE_LIGHT}15`, color: COLORS.BLUE_LIGHT }}>
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                Expanding Network
              </div>
              <h3 className="mb-3 text-2xl font-bold" style={{ color: COLORS.NAVY_DARK }}>Don&apos;t See Your Location?</h3>
              <p className="mb-6 text-sm leading-relaxed" style={{ color: COLORS.SLATE_MEDIUM }}>We&apos;re constantly expanding our network. Request your city and we&apos;ll notify you when we launch there.</p>
              <div className="flex flex-col gap-3 sm:flex-row">
                <input type="text" placeholder="Enter your city or country" className="flex-1 rounded-lg border-2 px-4 py-2.5 text-sm focus:outline-none focus:ring-2" style={{ borderColor: `${COLORS.BLUE_LIGHT}30` }} />
                <button className="rounded-lg px-6 py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90" style={{ backgroundColor: COLORS.BLUE_LIGHT }}>Request Location</button>
              </div>
            </div>
            <div className="relative hidden md:block" style={{ background: `linear-gradient(135deg, ${COLORS.BLUE_LIGHT}15, ${COLORS.POWDER_LIGHT})` }}>
              <div className="flex h-full items-center justify-center p-8">
                <svg className="h-48 w-48" style={{ color: COLORS.BLUE_LIGHT }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      <WaveDivider position="bottom" color={COLORS.NAVY_DARK} />
    </section>
  )
}

export default LocationCoverage
