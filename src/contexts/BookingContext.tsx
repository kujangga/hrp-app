'use client'

import React, { createContext, useContext, useState, useCallback, ReactNode, useEffect } from 'react'

export type BookingType = 'full' | 'photographer' | 'videographer' | 'equipment' | 'transport'

export interface BookingItem {
  id: string
  type: 'photographer' | 'videographer' | 'equipment' | 'transport'
  name: string
  dailyRate: number
  quantity?: number
  grade?: string
  profilePic?: string
  [key: string]: any
}

interface BookingState {
  bookingType: BookingType
  location: string
  date: string
  items: BookingItem[]
  rentalDays: number
  skippedServices: string[]
}

interface BookingContextType {
  booking: BookingState
  setBookingType: (type: BookingType) => void
  setLocationAndDate: (location: string, date: string) => void
  setRentalDays: (days: number) => void
  addItem: (item: BookingItem) => void
  removeItem: (id: string, type: string) => void
  updateItemQuantity: (id: string, type: string, quantity: number) => void
  clearItems: (type?: string) => void
  clearCart: () => void
  skipService: (serviceType: string) => void
  getTotalCost: () => number
  getItemsByType: (type: string) => BookingItem[]
  getItemCount: () => number
  getBookingSteps: () => BookingStep[]
  getNextStep: (currentPath: string) => BookingStep | null
  getPreviousStep: (currentPath: string) => BookingStep | null
}

export interface BookingStep {
  number: number
  title: string
  path: string
  type: 'location' | 'photographer' | 'videographer' | 'equipment' | 'transport' | 'cart'
}

const BookingContext = createContext<BookingContextType | undefined>(undefined)

const STORAGE_KEY = 'hrp_booking_cart'

// Load initial state from localStorage
const loadInitialState = (): BookingState => {
  if (typeof window === 'undefined') {
    return {
      bookingType: 'full',
      location: '',
      date: '',
      items: [],
      rentalDays: 1,
      skippedServices: []
    }
  }

  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) {
      const parsed = JSON.parse(stored)
      return {
        ...parsed,
        rentalDays: parsed.rentalDays || 1,
        skippedServices: parsed.skippedServices || []
      }
    }
  } catch (error) {
    console.error('Failed to load booking state from localStorage:', error)
  }

  return {
    bookingType: 'full',
    location: '',
    date: '',
    items: [],
    rentalDays: 1,
    skippedServices: []
  }
}

export function BookingProvider({ children }: { children: ReactNode }) {
  const [booking, setBooking] = useState<BookingState>(loadInitialState)

  // Auto-save to localStorage whenever booking state changes
  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(booking))
      } catch (error) {
        console.error('Failed to save booking state to localStorage:', error)
      }
    }
  }, [booking])

  const setBookingType = useCallback((type: BookingType) => {
    setBooking(prev => ({ ...prev, bookingType: type }))
  }, [])

  const setLocationAndDate = useCallback((location: string, date: string) => {
    setBooking(prev => ({ ...prev, location, date }))
  }, [])

  const setRentalDays = useCallback((days: number) => {
    if (days < 1) return
    setBooking(prev => ({ ...prev, rentalDays: days }))
  }, [])

  const addItem = useCallback((item: BookingItem) => {
    setBooking(prev => {
      // Check if item already exists
      const existingIndex = prev.items.findIndex(
        i => i.id === item.id && i.type === item.type
      )

      if (existingIndex >= 0) {
        // Update existing item
        const newItems = [...prev.items]
        newItems[existingIndex] = item
        return { ...prev, items: newItems }
      } else {
        // Add new item and remove from skipped services
        return {
          ...prev,
          items: [...prev.items, item],
          skippedServices: prev.skippedServices.filter(s => s !== item.type)
        }
      }
    })
  }, [])

  const removeItem = useCallback((id: string, type: string) => {
    setBooking(prev => ({
      ...prev,
      items: prev.items.filter(item => !(item.id === id && item.type === type))
    }))
  }, [])

  const updateItemQuantity = useCallback((id: string, type: string, quantity: number) => {
    if (quantity <= 0) return
    setBooking(prev => ({
      ...prev,
      items: prev.items.map(item =>
        item.id === id && item.type === type
          ? { ...item, quantity }
          : item
      )
    }))
  }, [])

  const clearItems = useCallback((type?: string) => {
    setBooking(prev => ({
      ...prev,
      items: type
        ? prev.items.filter(item => item.type !== type)
        : []
    }))
  }, [])

  const clearCart = useCallback(() => {
    setBooking({
      bookingType: 'full',
      location: '',
      date: '',
      items: [],
      rentalDays: 1,
      skippedServices: []
    })
    if (typeof window !== 'undefined') {
      localStorage.removeItem(STORAGE_KEY)
    }
  }, [])

  const skipService = useCallback((serviceType: string) => {
    setBooking(prev => {
      if (!prev.skippedServices.includes(serviceType)) {
        return {
          ...prev,
          skippedServices: [...prev.skippedServices, serviceType]
        }
      }
      return prev
    })
  }, [])

  const getTotalCost = useCallback(() => {
    return booking.items.reduce((total, item) => {
      const quantity = item.quantity || 1
      const days = booking.rentalDays
      return total + (item.dailyRate * quantity * days)
    }, 0)
  }, [booking.items, booking.rentalDays])

  const getItemsByType = useCallback((type: string) => {
    return booking.items.filter(item => item.type === type)
  }, [booking.items])

  const getItemCount = useCallback(() => {
    return booking.items.length
  }, [booking.items])

  const getBookingSteps = useCallback((): BookingStep[] => {
    const steps: BookingStep[] = [
      {
        number: 1,
        title: 'Location & Date',
        path: '/booking/location-date',
        type: 'location'
      }
    ]

    // Add service selection steps based on booking type
    if (booking.bookingType === 'full') {
      steps.push({
        number: 2,
        title: 'Photographers',
        path: '/booking/photographers',
        type: 'photographer'
      })
      steps.push({
        number: 3,
        title: 'Videographers',
        path: '/booking/videographers',
        type: 'videographer'
      })
      steps.push({
        number: 4,
        title: 'Equipment',
        path: '/booking/equipment',
        type: 'equipment'
      })
      steps.push({
        number: 5,
        title: 'Transportation',
        path: '/booking/transportation',
        type: 'transport'
      })
      steps.push({
        number: 6,
        title: 'Review & Payment',
        path: '/booking/cart',
        type: 'cart'
      })
    } else {
      // Single service type booking
      const serviceMap = {
        photographer: { title: 'Photographers', path: '/booking/photographers' },
        videographer: { title: 'Videographers', path: '/booking/videographers' },
        equipment: { title: 'Equipment', path: '/booking/equipment' },
        transport: { title: 'Transportation', path: '/booking/transportation' }
      }

      const service = serviceMap[booking.bookingType as keyof typeof serviceMap]
      if (service) {
        steps.push({
          number: 2,
          title: service.title,
          path: service.path,
          type: booking.bookingType as any
        })
      }

      steps.push({
        number: 3,
        title: 'Review & Payment',
        path: '/booking/cart',
        type: 'cart'
      })
    }

    return steps
  }, [booking.bookingType])

  const getNextStep = useCallback((currentPath: string): BookingStep | null => {
    const steps = getBookingSteps()
    const currentIndex = steps.findIndex(step => currentPath.includes(step.path))
    if (currentIndex >= 0 && currentIndex < steps.length - 1) {
      return steps[currentIndex + 1]
    }
    return null
  }, [getBookingSteps])

  const getPreviousStep = useCallback((currentPath: string): BookingStep | null => {
    const steps = getBookingSteps()
    const currentIndex = steps.findIndex(step => currentPath.includes(step.path))
    if (currentIndex > 0) {
      return steps[currentIndex - 1]
    }
    return null
  }, [getBookingSteps])

  return (
    <BookingContext.Provider
      value={{
        booking,
        setBookingType,
        setLocationAndDate,
        setRentalDays,
        addItem,
        removeItem,
        updateItemQuantity,
        clearItems,
        clearCart,
        skipService,
        getTotalCost,
        getItemsByType,
        getItemCount,
        getBookingSteps,
        getNextStep,
        getPreviousStep
      }}
    >
      {children}
    </BookingContext.Provider>
  )
}

export function useBooking() {
  const context = useContext(BookingContext)
  if (context === undefined) {
    throw new Error('useBooking must be used within a BookingProvider')
  }
  return context
}
