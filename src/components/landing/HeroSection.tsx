'use client'

import { useEffect, useState, type CSSProperties } from 'react'
import { motion } from 'framer-motion'

interface Location {
  id: string
  name: string
  type: 'city' | 'country'
}

interface GalleryTile {
  id: string
  image: string
  title: string
  location: string
  gridClassName: string
  style: CSSProperties
}

const LOCATION_OPTIONS: Location[] = [
  { id: '1', name: 'Jakarta', type: 'city' },
  { id: '2', name: 'Bandung', type: 'city' },
  { id: '3', name: 'Bali', type: 'city' },
  { id: '4', name: 'Yogyakarta', type: 'city' },
  { id: '5', name: 'Singapore', type: 'country' },
  { id: '6', name: 'Kuala Lumpur', type: 'country' },
]

const GALLERY_TILES: GalleryTile[] = [
  {
    id: 'sunrise',
    image:
      'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=600&q=80',
    title: 'Sunrise Elopement',
    location: 'Mount Batur, Bali',
    gridClassName: 'h-56 sm:h-60',
    style: {
      top: '0%',
      left: '3%',
      width: '270px',
      height: '190px',
      transform: 'rotate(-8deg) translate(-18px, -12px)',
      zIndex: 5,
    },
  },
  {
    id: 'desert',
    image:
      'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=600&q=80',
    title: 'Brand Adventure',
    location: 'Komodo Island',
    gridClassName: 'h-44 sm:h-48',
    style: {
      top: '8%',
      left: '58%',
      width: '260px',
      height: '170px',
      transform: 'rotate(6deg) translate(20px, -16px)',
      zIndex: 2,
    },
  },
  {
    id: 'couple',
    image:
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=600&q=80',
    title: 'Intimate Stories',
    location: 'Ubud, Bali',
    gridClassName: 'h-60',
    style: {
      top: '38%',
      left: '46%',
      width: '260px',
      height: '200px',
      transform: 'rotate(3deg) translate(12px, 4px)',
      zIndex: 4,
    },
  },
  {
    id: 'city',
    image:
      'https://images.unsplash.com/photo-1489515217757-5fd1be406fef?auto=format&fit=crop&w=600&q=80',
    title: 'Editorial Portraits',
    location: 'Menteng, Jakarta',
    gridClassName: 'h-48 sm:h-52',
    style: {
      top: '32%',
      left: '-6%',
      width: '280px',
      height: '180px',
      transform: 'rotate(-4deg) translate(-24px, 18px)',
      zIndex: 3,
    },
  },
  {
    id: 'aurora',
    image:
      'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=600&q=80',
    title: 'Destination Escape',
    location: 'Reykjavík, Iceland',
    gridClassName: 'h-48',
    style: {
      top: '68%',
      left: '24%',
      width: '300px',
      height: '190px',
      transform: 'rotate(-2deg) translate(-6px, 6px)',
      zIndex: 1,
    },
  },
]

const HeroSection = ({ session }: { session: unknown }) => {
  const [selectedLocation, setSelectedLocation] = useState<string>('')
  const [selectedDate, setSelectedDate] = useState<string>('')
  const [photographerCount, setPhotographerCount] = useState<number>(1247)
  const isAuthenticated = Boolean(session)

  useEffect(() => {
    const interval = setInterval(() => {
      setPhotographerCount((prev) => prev + Math.floor(Math.random() * 3) - 1)
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  const handleFindPhotographer = () => {
    if (!selectedLocation || !selectedDate) {
      alert('Please select both a destination and a shoot date')
      return
    }

    alert(`Planning a shoot in ${selectedLocation} on ${selectedDate}.`)
  }

  const handleJoinAsPhotographer = () => {
    alert(
      isAuthenticated
        ? 'Opening photographer workspace'
        : 'Navigating to photographer registration',
    )
  }

  const today = new Date().toISOString().split('T')[0]

  return (
    <section className="relative flex min-h-screen items-center overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage:
            'url(https://images.unsplash.com/photo-1452587925148-ce544e77e70d?auto=format&fit=crop&w=2000&q=80)',
        }}
      />

      {/* Black Overlay with Alpha - Balanced for readability */}
      <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-black/55 to-black/65" />

      <div className="relative mx-auto flex w-full max-w-7xl items-center px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
        <div className="grid w-full gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,520px)] lg:items-center">
          <div className="relative z-10">
            <motion.div
              className="inline-flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.35em] text-[#7D97B6]"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Talent • Crew • Logistics
            </motion.div>

            <motion.h1
              className="mt-10 text-[clamp(2.25rem,5vw,3.75rem)] font-semibold tracking-tight text-white leading-[0.95]"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4, ease: 'easeOut' }}
            >
              Crews gear
              <span className="block">transport delivered</span>
            </motion.h1>

            <motion.p
              className="mt-6 max-w-xl text-[1.05rem] leading-relaxed text-white/80"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              We assemble photographers, videographers, equipment, and transport in one seamless
              operation—matching global briefs with local talent for visuals that are timely, efficient,
              and built to impress.
            </motion.p>

            <motion.div
              className="mt-8 rounded-3xl border border-[#E1E7F2]/70 bg-[#E1E7F2]/90 p-5 shadow-xl shadow-[#162533]/10 backdrop-blur md:p-6"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.8 }}
            >
              <div className="grid gap-3 md:grid-cols-[1.6fr_1.2fr_auto] md:items-center">
                <div className="space-y-1.5">
                  <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#546079]">
                    Destination
                  </span>
                  <div className="relative flex items-center rounded-2xl border border-[#E1E7F2] bg-[#E1E7F2] px-3.5 py-2.5">
                    <svg
                      className="mr-3 h-4 w-4 text-[#7D97B6]"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M12 21s7-4.686 7-10a7 7 0 10-14 0c0 5.314 7 10 7 10z"
                      />
                      <circle cx="12" cy="11" r="2.5" />
                    </svg>
                    <select
                      value={selectedLocation}
                      onChange={(event) => setSelectedLocation(event.target.value)}
                      className="w-full appearance-none bg-transparent text-sm font-semibold text-[#162533] outline-none"
                    >
                      <option value="" disabled>
                        Select location
                      </option>
                      <optgroup label="Indonesia">
                        {LOCATION_OPTIONS.filter((option) => option.type === 'city').map((option) => (
                          <option key={option.id} value={option.name}>
                            {option.name}
                          </option>
                        ))}
                      </optgroup>
                      <optgroup label="International">
                        {LOCATION_OPTIONS.filter((option) => option.type === 'country').map((option) => (
                          <option key={option.id} value={option.name}>
                            {option.name}
                          </option>
                        ))}
                      </optgroup>
                    </select>
                    <svg
                      className="pointer-events-none absolute right-4 h-4 w-4 text-[#546079]/60"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={1.5}
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#546079]">
                    Shoot date
                  </span>
                  <div className="relative flex items-center rounded-2xl border border-[#E1E7F2] bg-[#E1E7F2] px-3.5 py-2.5">
                    <svg
                      className="mr-3 h-4 w-4 text-[#7D97B6]"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                    <input
                      type="date"
                      min={today}
                      value={selectedDate}
                      onChange={(event) => setSelectedDate(event.target.value)}
                      className="w-full bg-transparent text-sm font-semibold text-[#162533] outline-none"
                    />
                  </div>
                </div>

                <div className="flex flex-col justify-end md:pt-4">
                  <motion.button
                    type="button"
                    onClick={handleFindPhotographer}
                    className="inline-flex w-full items-center justify-center rounded-2xl bg-[#162533] px-5 py-3.5 text-sm font-semibold text-[#E1E7F2] shadow-lg shadow-[#162533]/20 transition hover:bg-[#162533]/90 md:w-auto"
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Plan my shoot
                    <svg
                      className="ml-2 h-4 w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M5 12h14m-7-7l7 7-7 7"
                      />
                    </svg>
                  </motion.button>
                </div>
              </div>

              <div className="mt-4 flex flex-wrap items-center gap-4">
                <div className="flex -space-x-2">
                  {['AL', 'TR', 'MN'].map((initials) => (
                    <div
                      key={initials}
                      className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-[#E1E7F2] bg-[#546079]/20 text-xs font-semibold text-[#162533]"
                    >
                      {initials}
                    </div>
                  ))}
                </div>
                <div>
                  <p className="text-sm font-semibold text-[#162533]">
                    {photographerCount.toLocaleString()}+ experts ready
                  </p>
                  <p className="text-xs text-[#546079]">Covering 42 cities worldwide</p>
                </div>
                <div className="flex items-center gap-2 rounded-full border border-[#7D97B6]/40 bg-[#E1E7F2]/70 px-3.5 py-1.5 text-xs font-semibold text-[#546079]">
                  <svg className="h-4 w-4 text-[#7D97B6]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                    />
                  </svg>
                  24h replacement guarantee
                </div>
              </div>
            </motion.div>

            <motion.div
              className="mt-8 flex flex-wrap items-center gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.0 }}
            >
              <div className="flex items-center gap-3 rounded-2xl border border-white/20 bg-white/10 px-4 py-3 text-sm text-white/90 backdrop-blur-sm">
                <svg className="h-6 w-6 text-[#7D97B6]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-2-8h.01M4 6h16"
                  />
                </svg>
                Real-time portfolio curation for every match
              </div>
              <motion.button
                type="button"
                onClick={handleJoinAsPhotographer}
                className="inline-flex items-center gap-2 rounded-full border border-white/30 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10 hover:border-white/50"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                {isAuthenticated ? 'Access photographer tools' : 'Join as photographer'}
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 12h14" />
                </svg>
              </motion.button>
            </motion.div>
          </div>

          <motion.div
            className="relative"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <div className="absolute -top-16 -left-16 hidden h-40 w-40 rounded-full bg-[#162533]/15 blur-3xl lg:block" />
            <div className="grid gap-4 lg:gap-6">
              <div className="grid gap-4 sm:grid-cols-2 lg:hidden">
                {GALLERY_TILES.map((tile, index) => (
                  <motion.div
                    key={tile.id}
                    className={`group relative overflow-hidden rounded-3xl border border-[#E1E7F2]/60 bg-[#162533]/5 ${tile.gridClassName} shadow-xl shadow-[#162533]/10 cursor-pointer`}
                    initial={{ opacity: 0, scale: 0.9, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
                    whileHover={{
                      scale: 1.05,
                      y: -8,
                      transition: {
                        type: 'spring',
                        stiffness: 300,
                        damping: 20
                      }
                    }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <motion.div
                      className="absolute inset-0"
                      style={{
                        backgroundImage: `url(${tile.image})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                      }}
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.4 }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#162533]/80 via-[#162533]/20 to-transparent transition-all duration-500 group-hover:from-[#162533]/60 group-hover:via-[#162533]/10" />
                    <motion.div
                      className="absolute inset-x-0 bottom-0 p-4"
                      initial={{ y: 0 }}
                      whileHover={{ y: -4 }}
                      transition={{ duration: 0.3 }}
                    >
                      <motion.p
                        className="text-xs font-semibold uppercase tracking-wide text-[#E1E7F2]/70"
                        whileHover={{ color: 'rgb(225, 231, 242)' }}
                      >
                        {tile.location}
                      </motion.p>
                      <motion.p
                        className="mt-1 text-lg font-semibold text-[#E1E7F2]"
                        whileHover={{ scale: 1.02 }}
                      >
                        {tile.title}
                      </motion.p>
                    </motion.div>
                  </motion.div>
                ))}
              </div>
              <div className="relative hidden h-[560px] w-full max-w-[520px] lg:block">
                {GALLERY_TILES.map((tile, index) => (
                  <motion.div
                    key={tile.id}
                    className="group absolute overflow-hidden rounded-[32px] border border-[#E1E7F2]/60 bg-[#162533]/5 shadow-2xl shadow-[#162533]/20 cursor-pointer"
                    style={{
                      ...tile.style,
                      boxShadow: '0 35px 70px rgba(22, 37, 51, 0.28)',
                    }}
                    initial={{ opacity: 0, scale: 0.8, rotate: 0 }}
                    animate={{
                      opacity: 1,
                      scale: 1,
                      rotate: tile.style.transform?.includes('rotate')
                        ? parseFloat(tile.style.transform.match(/rotate\(([^)]+)\)/)?.[1] || '0')
                        : 0
                    }}
                    transition={{
                      duration: 0.8,
                      delay: 0.6 + index * 0.15,
                      ease: 'easeOut'
                    }}
                    whileHover={{
                      scale: 1.1,
                      rotate: 0,
                      y: -12,
                      zIndex: 10,
                      boxShadow: '0 50px 100px rgba(22, 37, 51, 0.4)',
                      transition: {
                        type: 'spring',
                        stiffness: 300,
                        damping: 25,
                        boxShadow: { duration: 0.3 }
                      }
                    }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <motion.div
                      className="absolute inset-0"
                      style={{
                        backgroundImage: `url(${tile.image})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                      }}
                      whileHover={{ scale: 1.15 }}
                      transition={{ duration: 0.5, ease: 'easeOut' }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#162533]/80 via-[#162533]/15 to-transparent transition-all duration-500 group-hover:from-[#162533]/60 group-hover:via-[#162533]/5" />
                    <motion.div
                      className="absolute inset-x-0 bottom-0 p-5"
                      initial={{ y: 0 }}
                      whileHover={{ y: -6 }}
                      transition={{ duration: 0.3 }}
                    >
                      <motion.p
                        className="text-xs font-semibold uppercase tracking-[0.2em] text-[#E1E7F2]/70"
                        whileHover={{
                          color: 'rgb(225, 231, 242)',
                          scale: 1.05
                        }}
                        transition={{ duration: 0.2 }}
                      >
                        {tile.location}
                      </motion.p>
                      <motion.p
                        className="mt-2 text-xl font-semibold text-[#E1E7F2]"
                        whileHover={{ scale: 1.03 }}
                        transition={{ duration: 0.2 }}
                      >
                        {tile.title}
                      </motion.p>
                    </motion.div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default HeroSection
