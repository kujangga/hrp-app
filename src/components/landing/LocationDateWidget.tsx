'use client'

import { useState, useRef, useEffect, useCallback, useMemo } from 'react'
import { createPortal } from 'react-dom'
import { motion, AnimatePresence } from 'framer-motion'

type DropdownDirection = 'up' | 'down'

interface DropdownMetrics {
  top: number
  left: number
  width: number
  maxHeight: number
  direction: DropdownDirection
}

const DROPDOWN_MAX_HEIGHT = 400
const DROPDOWN_MIN_HEIGHT = 240
const DROPDOWN_MIN_WIDTH = 360
const DATE_DROPDOWN_MIN_WIDTH = 420
const DROPDOWN_OFFSET = 12
const VIEWPORT_MARGIN = 16

const clamp = (value: number, min: number, max: number) => {
  if (max <= min) {
    return min
  }
  return Math.min(Math.max(value, min), max)
}

interface Location {
  id: string
  name: string
  type: 'city' | 'country'
  country?: string
  popular?: boolean
}

interface LocationDateWidgetProps {
  selectedLocation: string
  selectedDate: string
  onLocationChange: (location: string) => void
  onDateChange: (date: string) => void
}

const DAY_LABELS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'] as const

const formatDateKey = (date: Date) => {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

const getMonthAnchor = (value?: string) => {
  if (!value) {
    const now = new Date()
    return new Date(now.getFullYear(), now.getMonth(), 1)
  }

  const parsed = new Date(`${value}T00:00:00`)
  if (Number.isNaN(parsed.getTime())) {
    const fallback = new Date()
    return new Date(fallback.getFullYear(), fallback.getMonth(), 1)
  }

  return new Date(parsed.getFullYear(), parsed.getMonth(), 1)
}

const shiftMonth = (date: Date, offset: number) =>
  new Date(date.getFullYear(), date.getMonth() + offset, 1)

type CalendarDay = {
  dateKey: string
  label: number
  inCurrentMonth: boolean
  isDisabled: boolean
  isToday: boolean
}

const LOCATION_OPTIONS: Location[] = [
  { id: '1', name: 'Jakarta', type: 'city', country: 'Indonesia', popular: true },
  { id: '2', name: 'Bandung', type: 'city', country: 'Indonesia', popular: true },
  { id: '3', name: 'Bali', type: 'city', country: 'Indonesia', popular: true },
  { id: '4', name: 'Yogyakarta', type: 'city', country: 'Indonesia' },
  { id: '5', name: 'Surabaya', type: 'city', country: 'Indonesia' },
  { id: '6', name: 'Semarang', type: 'city', country: 'Indonesia' },
  { id: '7', name: 'Singapore', type: 'country', country: 'Singapore', popular: true },
  { id: '8', name: 'Kuala Lumpur', type: 'country', country: 'Malaysia', popular: true },
  { id: '9', name: 'Bangkok', type: 'country', country: 'Thailand' },
  { id: '10', name: 'Hong Kong', type: 'country', country: 'Hong Kong' },
]

export const LocationDateWidget = ({
  selectedLocation,
  selectedDate,
  onLocationChange,
  onDateChange,
}: LocationDateWidgetProps) => {
  const [isLocationOpen, setIsLocationOpen] = useState(false)
  const [isDateOpen, setIsDateOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [isMounted, setIsMounted] = useState(false)
  const [locationMetrics, setLocationMetrics] = useState<DropdownMetrics | null>(null)
  const [dateMetrics, setDateMetrics] = useState<DropdownMetrics | null>(null)
  const [currentMonth, setCurrentMonth] = useState(() => getMonthAnchor(selectedDate))
  const locationFieldRef = useRef<HTMLDivElement>(null)
  const locationButtonRef = useRef<HTMLButtonElement>(null)
  const locationDropdownRef = useRef<HTMLDivElement>(null)
  const dateFieldRef = useRef<HTMLDivElement>(null)
  const dateButtonRef = useRef<HTMLButtonElement>(null)
  const dateDropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  useEffect(() => {
    setCurrentMonth(getMonthAnchor(selectedDate))
  }, [selectedDate])

  const today = new Date().toISOString().split('T')[0]

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node

      if (
        isLocationOpen &&
        !locationFieldRef.current?.contains(target) &&
        !locationDropdownRef.current?.contains(target)
      ) {
        setIsLocationOpen(false)
        setSearchQuery('')
      }

      if (
        isDateOpen &&
        !dateFieldRef.current?.contains(target) &&
        !dateDropdownRef.current?.contains(target)
      ) {
        setIsDateOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [isLocationOpen, isDateOpen])

  const filteredLocations = LOCATION_OPTIONS.filter((location) =>
    location.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const popularLocations = LOCATION_OPTIONS.filter((loc) => loc.popular)

  const handleLocationSelect = (locationName: string) => {
    onLocationChange(locationName)
    setIsLocationOpen(false)
    setSearchQuery('')
  }

  const handleDateSelect = (date: string) => {
    setCurrentMonth(getMonthAnchor(date))
    onDateChange(date)
    setIsDateOpen(false)
  }

  // Quick date options
  const getQuickDates = () => {
    const dates = []
    const now = new Date()
    
    // Tomorrow
    const tomorrow = new Date(now)
    tomorrow.setDate(tomorrow.getDate() + 1)
    dates.push({ label: 'Tomorrow', value: tomorrow.toISOString().split('T')[0] })
    
    // This Weekend (Saturday)
    const daysUntilSaturday = (6 - now.getDay() + 7) % 7 || 7
    const saturday = new Date(now)
    saturday.setDate(saturday.getDate() + daysUntilSaturday)
    dates.push({ label: 'This Weekend', value: saturday.toISOString().split('T')[0] })
    
    // Next Week
    const nextWeek = new Date(now)
    nextWeek.setDate(nextWeek.getDate() + 7)
    dates.push({ label: 'Next Week', value: nextWeek.toISOString().split('T')[0] })
    
    // Next Month
    const nextMonth = new Date(now)
    nextMonth.setMonth(nextMonth.getMonth() + 1)
    dates.push({ label: 'Next Month', value: nextMonth.toISOString().split('T')[0] })
    
    return dates
  }

  const quickDates = getQuickDates()

  const locationScrollMaxHeight = locationMetrics
    ? Math.max(locationMetrics.maxHeight - 96, 180)
    : 280

  const monthFormatter = useMemo(
    () => new Intl.DateTimeFormat('en-US', { month: 'long', year: 'numeric' }),
    [],
  )

  const selectedDateLabel = useMemo(() => {
    if (!selectedDate) {
      return null
    }

    const date = new Date(`${selectedDate}T00:00:00`)
    if (Number.isNaN(date.getTime())) {
      return null
    }

    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    })
  }, [selectedDate])

  const todayMonthAnchor = useMemo(() => getMonthAnchor(today), [today])

  const calendarDays = useMemo<CalendarDay[]>(() => {
    const days: CalendarDay[] = []
    const year = currentMonth.getFullYear()
    const month = currentMonth.getMonth()
    const firstDay = new Date(year, month, 1)
    const startDay = firstDay.getDay()
    const totalCells = 42

    for (let index = 0; index < totalCells; index += 1) {
      const date = new Date(year, month, index - startDay + 1)
      const dateKey = formatDateKey(date)
      const inCurrentMonth = date.getMonth() === month
      const isDisabled = dateKey < today
      const isToday = dateKey === today

      days.push({
        dateKey,
        label: date.getDate(),
        inCurrentMonth,
        isDisabled,
        isToday,
      })
    }

    return days
  }, [currentMonth, today])

  const canGoPrev = currentMonth.getTime() > todayMonthAnchor.getTime()

  const goToPreviousMonth = useCallback(() => {
    setCurrentMonth((prev) => {
      const candidate = shiftMonth(prev, -1)
      if (candidate.getTime() < todayMonthAnchor.getTime()) {
        return prev
      }
      return candidate
    })
  }, [todayMonthAnchor])

  const goToNextMonth = useCallback(() => {
    setCurrentMonth((prev) => shiftMonth(prev, 1))
  }, [])

  const locationDropdownPortal =
    isMounted && typeof document !== 'undefined'
      ? createPortal(
          <AnimatePresence>
            {isLocationOpen && locationMetrics ? (
              <motion.div
                ref={locationDropdownRef}
                initial={{
                  opacity: 0,
                  y: locationMetrics.direction === 'down' ? -8 : 8,
                  scale: 0.97,
                }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{
                  opacity: 0,
                  y: locationMetrics.direction === 'down' ? -8 : 8,
                  scale: 0.97,
                }}
                transition={{ duration: 0.2, ease: 'easeOut' }}
                style={{
                  position: 'fixed',
                  top: locationMetrics.top,
                  left: locationMetrics.left,
                  width: locationMetrics.width,
                  maxHeight: locationMetrics.maxHeight,
                  transformOrigin:
                    locationMetrics.direction === 'down' ? 'top center' : 'bottom center',
                  zIndex: 1200,
                }}
                className="overflow-hidden rounded-2xl border border-[#E1E7F2] bg-white shadow-[0_28px_60px_rgba(22,37,51,0.28)] backdrop-blur-xl"
              >
                <div className="border-b border-[#E1E7F2] p-3">
                  <div className="relative flex items-center">
                    <svg
                      className="absolute left-3 h-4 w-4 text-[#7D97B6]"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                      />
                    </svg>
                    <input
                      type="text"
                      placeholder="Search location..."
                      value={searchQuery}
                      onChange={(event) => setSearchQuery(event.target.value)}
                      className="w-full rounded-xl border border-[#E1E7F2] bg-[#E1E7F2]/60 py-2.5 pl-10 pr-3 text-sm text-[#162533] placeholder-[#7D97B6] outline-none transition focus:border-[#7D97B6] focus:ring-2 focus:ring-[#7D97B6]/20"
                      autoFocus
                    />
                  </div>
                </div>

                <div
                  className="overflow-y-auto"
                  style={{ maxHeight: locationScrollMaxHeight }}
                >
                  {searchQuery === '' && (
                    <div className="border-b border-[#E1E7F2] px-3 py-3">
                      <div className="mb-3 flex items-center gap-2 px-2">
                        <svg
                          className="h-3.5 w-3.5 text-[#7D97B6]"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                        <span className="text-xs font-semibold uppercase tracking-wider text-[#7D97B6]">
                          Popular
                        </span>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {popularLocations.map((location) => (
                          <button
                            key={location.id}
                            type="button"
                            onClick={() => handleLocationSelect(location.name)}
                            className="rounded-lg border border-[#7D97B6]/30 bg-[#E1E7F2] px-3 py-1.5 text-xs font-medium text-[#162533] transition-all hover:border-[#7D97B6] hover:shadow-md hover:shadow-[#7D97B6]/20"
                          >
                            {location.name}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="p-3">
                    <div className="mb-2 px-1 text-xs font-semibold uppercase tracking-wider text-[#7D97B6]">
                      {searchQuery ? 'Search Results' : 'All Locations'}
                    </div>
                    {filteredLocations.length > 0 ? (
                      <div className="space-y-1">
                        {filteredLocations.map((location) => (
                          <button
                            key={location.id}
                            type="button"
                            onClick={() => handleLocationSelect(location.name)}
                            className={`flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-left transition-all hover:bg-[#E1E7F2]/50 ${
                              selectedLocation === location.name ? 'bg-[#E1E7F2]/80' : ''
                            }`}
                          >
                            <div className="flex items-center gap-3">
                              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#E1E7F2]">
                                <svg
                                  className="h-4 w-4 text-[#7D97B6]"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={1.5}
                                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                                  />
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={1.5}
                                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                                  />
                                </svg>
                              </div>
                              <div>
                                <div className="text-sm font-semibold text-[#162533]">
                                  {location.name}
                                </div>
                                {location.country && (
                                  <div className="text-xs text-[#7D97B6]">{location.country}</div>
                                )}
                              </div>
                            </div>
                            {selectedLocation === location.name && (
                              <svg
                                className="h-5 w-5 text-[#7D97B6]"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                  clipRule="evenodd"
                                />
                              </svg>
                            )}
                          </button>
                        ))}
                      </div>
                    ) : (
                      <div className="px-3 py-10 text-center">
                        <svg
                          className="mx-auto h-12 w-12 text-[#7D97B6]/40"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={1.5}
                            d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                        <p className="mt-3 text-sm text-[#7D97B6]">No locations found</p>
                        <p className="text-xs text-[#7D97B6]/70">Try a different search term</p>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            ) : null}
          </AnimatePresence>,
          document.body,
        )
      : null

  const dateDropdownPortal =
    isMounted && typeof document !== 'undefined'
      ? createPortal(
          <AnimatePresence>
            {isDateOpen && dateMetrics ? (
              <motion.div
                ref={dateDropdownRef}
                initial={{
                  opacity: 0,
                  y: dateMetrics.direction === 'down' ? -8 : 8,
                  scale: 0.97,
                }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{
                  opacity: 0,
                  y: dateMetrics.direction === 'down' ? -8 : 8,
                  scale: 0.97,
                }}
                transition={{ duration: 0.2, ease: 'easeOut' }}
                style={{
                  position: 'fixed',
                  top: dateMetrics.top,
                  left: dateMetrics.left,
                  width: dateMetrics.width,
                  maxHeight: dateMetrics.maxHeight,
                  transformOrigin: dateMetrics.direction === 'down' ? 'top center' : 'bottom center',
                  zIndex: 1200,
                }}
                className="flex w-full flex-col overflow-hidden rounded-2xl border border-[#E1E7F2] bg-white shadow-[0_28px_60px_rgba(22,37,51,0.28)] backdrop-blur-xl"
              >
                <div className="border-b border-[#E1E7F2] bg-[#F4F7FB] px-4 py-3">
                  <div className="flex items-center justify-between">
                    <button
                      type="button"
                      onClick={goToPreviousMonth}
                      disabled={!canGoPrev}
                      className="flex h-8 w-8 items-center justify-center rounded-full border border-[#7D97B6]/30 text-[#7D97B6] transition hover:bg-white disabled:cursor-not-allowed disabled:opacity-40"
                    >
                      <span className="sr-only">Go to previous month</span>
                      <svg
                        className="h-4 w-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19l-7-7 7-7" />
                      </svg>
                    </button>

                    <div className="flex flex-col items-center text-center">
                      <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#7D97B6]">
                        Schedule
                      </span>
                      <span className="text-sm font-semibold text-[#162533]">
                        {monthFormatter.format(currentMonth)}
                      </span>
                    </div>

                    <button
                      type="button"
                      onClick={goToNextMonth}
                      className="flex h-8 w-8 items-center justify-center rounded-full border border-[#7D97B6]/30 text-[#7D97B6] transition hover:bg-white"
                    >
                      <span className="sr-only">Go to next month</span>
                      <svg
                        className="h-4 w-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  </div>
                  <div className="mt-2 text-center text-xs text-[#546079]">
                    {selectedDateLabel ?? 'Pick a date to see availability'}
                  </div>
                </div>

                <div className="px-4 py-3">
                  <div className="grid grid-cols-7 gap-1 text-[11px] font-semibold uppercase tracking-wider text-[#7D97B6]">
                    {DAY_LABELS.map((label) => (
                      <span key={label} className="py-1 text-center">
                        {label}
                      </span>
                    ))}
                  </div>
                  <div className="mt-1 grid grid-cols-7 gap-1">
                    {calendarDays.map((day, index) => {
                      const isSelected = selectedDate === day.dateKey
                      const classes = ['flex h-10 w-full items-center justify-center rounded-lg text-sm font-semibold transition-all']

                      if (isSelected) {
                        classes.push(
                          'bg-[#162533]',
                          'text-white',
                          'shadow-[0_12px_24px_rgba(22,37,51,0.25)]',
                        )
                      } else {
                        if (day.isDisabled) {
                          classes.push('cursor-not-allowed', 'text-[#7D97B6]/40')
                        } else {
                          classes.push('text-[#162533]', 'hover:bg-[#E1E7F2]')
                          if (day.isToday) {
                            classes.push('ring-1', 'ring-[#162533]/25')
                          }
                        }

                        if (!day.inCurrentMonth) {
                          classes.push(day.isDisabled ? 'text-[#7D97B6]/40' : 'text-[#7D97B6]')
                        }
                      }

                      return (
                        <button
                          key={`${day.dateKey}-${index}`}
                          type="button"
                          disabled={day.isDisabled}
                          onClick={() => {
                            if (day.isDisabled) return
                            handleDateSelect(day.dateKey)
                          }}
                          className={classes.join(' ')}
                          aria-label={new Date(`${day.dateKey}T00:00:00`).toLocaleDateString('en-US', {
                            weekday: 'long',
                            month: 'long',
                            day: 'numeric',
                            year: 'numeric',
                          })}
                        >
                          {day.label}
                        </button>
                      )
                    })}
                  </div>
                </div>

                <div className="border-t border-[#E1E7F2] bg-white/80">
                  <div className="grid gap-4 p-4 md:grid-cols-[1.2fr_0.8fr]">
                    <div>
                      <div className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#7D97B6]">
                        <svg
                          className="h-3.5 w-3.5 text-[#7D97B6]"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={1.5}
                            d="M13 10V3L4 14h7v7l9-11h-7z"
                          />
                        </svg>
                        <span>Quick Select</span>
                      </div>
                      <div className="grid gap-2 sm:grid-cols-2">
                        {quickDates.map((date) => {
                          const isActive = selectedDate === date.value
                          const quickClasses = [
                            'flex items-center justify-between rounded-xl border px-3 py-2 text-xs font-semibold transition-all',
                          ]

                          if (isActive) {
                            quickClasses.push(
                              'border-[#162533]',
                              'bg-[#162533]',
                              'text-white',
                              'shadow-[0_12px_24px_rgba(22,37,51,0.2)]',
                            )
                          } else {
                            quickClasses.push(
                              'border-[#7D97B6]/30',
                              'bg-[#E1E7F2]',
                              'text-[#162533]',
                              'hover:border-[#7D97B6]',
                              'hover:shadow-md',
                              'hover:shadow-[#7D97B6]/20',
                            )
                          }

                          return (
                            <button
                              key={date.label}
                              type="button"
                              onClick={() => handleDateSelect(date.value)}
                              className={quickClasses.join(' ')}
                            >
                              <span>{date.label}</span>
                              {isActive && (
                                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={1.5}
                                    d="M5 13l4 4L19 7"
                                  />
                                </svg>
                              )}
                            </button>
                          )
                        })}
                      </div>
                    </div>

                    <div className="flex flex-col justify-between rounded-2xl border border-[#E1E7F2] bg-[#E1E7F2]/50 p-3">
                      <span className="text-xs font-semibold uppercase tracking-wider text-[#7D97B6]">
                        Custom Date
                      </span>
                      <input
                        type="date"
                        min={today}
                        value={selectedDate}
                        onChange={(event) => handleDateSelect(event.target.value)}
                        className="mt-2 w-full rounded-xl border border-transparent bg-white/80 px-3 py-2 text-sm font-semibold text-[#162533] outline-none transition focus:border-[#7D97B6] focus:ring-2 focus:ring-[#7D97B6]/20"
                      />
                      <span className="mt-2 text-[11px] text-[#7D97B6]/80">
                        Only future dates are available for bookings.
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ) : null}
          </AnimatePresence>,
          document.body,
        )
      : null

  const calculateMetrics = useCallback(
    (rect: DOMRect, minWidthOverride?: number): DropdownMetrics => {
    if (typeof window === 'undefined') {
      return {
        top: 0,
        left: 0,
        width: rect.width,
        maxHeight: DROPDOWN_MAX_HEIGHT,
        direction: 'down',
      }
  }

  const availableWidth = window.innerWidth - VIEWPORT_MARGIN * 2
  const desiredWidth = Math.max(rect.width, minWidthOverride ?? DROPDOWN_MIN_WIDTH)
  const width = Math.min(desiredWidth, availableWidth)
  const maxLeft = Math.max(VIEWPORT_MARGIN, window.innerWidth - width - VIEWPORT_MARGIN)
  const left = clamp(rect.left, VIEWPORT_MARGIN, maxLeft)

    const spaceBelow = window.innerHeight - rect.bottom - VIEWPORT_MARGIN
    const spaceAbove = rect.top - VIEWPORT_MARGIN

    let direction: DropdownDirection = 'down'
    if (spaceBelow < DROPDOWN_MIN_HEIGHT && spaceAbove > spaceBelow) {
      direction = 'up'
    }

    const availableSpace = direction === 'down' ? spaceBelow : spaceAbove
    const maxHeight = Math.min(
      DROPDOWN_MAX_HEIGHT,
      Math.max(availableSpace, DROPDOWN_MIN_HEIGHT),
      window.innerHeight - VIEWPORT_MARGIN * 2,
    )

    const top =
      direction === 'down'
        ? Math.min(rect.bottom + DROPDOWN_OFFSET, window.innerHeight - maxHeight - VIEWPORT_MARGIN)
        : Math.max(rect.top - DROPDOWN_OFFSET - maxHeight, VIEWPORT_MARGIN)

    return {
      top,
      left,
      width,
      maxHeight,
      direction,
    }
  }, [])

  const updateLocationMetrics = useCallback(() => {
    if (!locationButtonRef.current) return
    setLocationMetrics(calculateMetrics(locationButtonRef.current.getBoundingClientRect()))
  }, [calculateMetrics])

  const updateDateMetrics = useCallback(() => {
    if (!dateButtonRef.current) return
    setDateMetrics(
      calculateMetrics(dateButtonRef.current.getBoundingClientRect(), DATE_DROPDOWN_MIN_WIDTH),
    )
  }, [calculateMetrics])

  useEffect(() => {
    if (!isLocationOpen) return

    updateLocationMetrics()

    const handleReposition = () => updateLocationMetrics()
    window.addEventListener('resize', handleReposition)
    window.addEventListener('scroll', handleReposition, true)

    return () => {
      window.removeEventListener('resize', handleReposition)
      window.removeEventListener('scroll', handleReposition, true)
    }
  }, [isLocationOpen, updateLocationMetrics])

  useEffect(() => {
    if (!isDateOpen) return

    updateDateMetrics()

    const handleReposition = () => updateDateMetrics()
    window.addEventListener('resize', handleReposition)
    window.addEventListener('scroll', handleReposition, true)

    return () => {
      window.removeEventListener('resize', handleReposition)
      window.removeEventListener('scroll', handleReposition, true)
    }
  }, [isDateOpen, updateDateMetrics])

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsLocationOpen(false)
        setIsDateOpen(false)
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [])

  return (
    <>
      <div className="grid gap-3 md:grid-cols-[1.6fr_1.2fr] md:items-start">
        {/* Location Input */}
        <div className="relative z-[60] space-y-1.5" ref={locationFieldRef}>
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#546079]">
            Destination
          </span>
          <button
            ref={locationButtonRef}
            type="button"
            onClick={() => {
              if (isLocationOpen) {
                setIsLocationOpen(false)
                return
              }
              setIsDateOpen(false)
              updateLocationMetrics()
              setIsLocationOpen(true)
            }}
            className="relative flex w-full items-center rounded-2xl border border-[#E1E7F2] bg-[#E1E7F2] px-3.5 py-2.5 text-left text-[#162533] shadow-[0_1px_1px_rgba(22,37,51,0.04)] transition-all hover:-translate-y-[1px] hover:shadow-[0_14px_25px_rgba(22,37,51,0.12)] focus:outline-none focus:ring-2 focus:ring-[#7D97B6]/20 focus:border-[#7D97B6]"
          >
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
            <span className="flex-1 truncate text-sm font-semibold text-[#162533]">
              {selectedLocation || 'Select location'}
            </span>
            <svg
              className={`h-4 w-4 text-[#546079]/60 transition-transform ${isLocationOpen ? 'rotate-180' : ''}`}
              fill="none"
              stroke="currentColor"
              strokeWidth={1.5}
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        </div>

        {/* Date Input */}
        <div className="relative z-[50] space-y-1.5" ref={dateFieldRef}>
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#546079]">
            Shoot date
          </span>
          <button
            ref={dateButtonRef}
            type="button"
            onClick={() => {
              if (isDateOpen) {
                setIsDateOpen(false)
                return
              }
              setIsLocationOpen(false)
              setCurrentMonth(getMonthAnchor(selectedDate))
              updateDateMetrics()
              setIsDateOpen(true)
            }}
            className="relative flex w-full items-center rounded-2xl border border-[#E1E7F2] bg-[#E1E7F2] px-3.5 py-2.5 text-left transition-all hover:border-[#7D97B6]/40 focus:border-[#7D97B6] focus:outline-none focus:ring-2 focus:ring-[#7D97B6]/20"
          >
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
            <span className="flex-1 truncate text-sm font-semibold text-[#162533]">
              {selectedDate
                ? new Date(selectedDate + 'T00:00:00').toLocaleDateString('en-US', {
                    weekday: 'short',
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric',
                  })
                : 'Select date'}
            </span>
            <svg
              className={`h-4 w-4 text-[#546079]/60 transition-transform ${isDateOpen ? 'rotate-180' : ''}`}
              fill="none"
              stroke="currentColor"
              strokeWidth={1.5}
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        </div>
      </div>

      {locationDropdownPortal}
      {dateDropdownPortal}
    </>
  )
}
