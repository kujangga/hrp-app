'use client'

import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react'

export type BookingType = 'full' | 'photographer' | 'videographer' | 'equipment' | 'transport'

export interface BookingItem {
  id: string
  type: 'photographer' | 'videographer' | 'equipment' | 'transport'
  name: string
  dailyRate: number
  quantity?: number
  grade?: string
  [key: string]: any
}

interface BookingState {
  bookingType: BookingType
  location: string
  date: string
  items: BookingItem[]
}

interface BookingContextType {
  booking: BookingState
  setBookingType: (type: BookingType) => void
  setLocationAndDate: (location: string, date: string) => void
  addItem: (item: BookingItem) => void
  removeItem: (id: string, type: string) => void
  updateItemQuantity: (id: string, type: string, quantity: number) => void
  clearItems: (type?: string) => void
  getTotalCost: () => number
  getItemsByType: (type: string) => BookingItem[]
  getItemCount: () => number
  getBookingSteps: () => BookingStep[]
}

export interface BookingStep {
  number: number
  title: string
  path: string
  type: 'location' | 'photographer' | 'videographer' | 'equipment' | 'transport' | 'cart'
}

const BookingContext = createContext<BookingContextType | undefined>(undefined)

export function BookingProvider({ children }: { children: ReactNode }) {
  const [booking, setBooking] = useState<BookingState>({
    bookingType: 'full',
    location: '',
    date: '',
    items: []
  })

  const setBookingType = useCallback((type: BookingType) => {
    setBooking(prev => ({ ...prev, bookingType: type }))
  }, [])

  const setLocationAndDate = useCallback((location: string, date: string) => {
    setBooking(prev => ({ ...prev, location, date }))
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
        // Add new item
        return { ...prev, items: [...prev.items, item] }
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

  const getTotalCost = useCallback(() => {
    return booking.items.reduce((total, item) => {
      const quantity = item.quantity || 1
      return total + (item.dailyRate * quantity)
    }, 0)
  }, [booking.items])

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

    // Currently only photographers booking route exists
    // For all booking types, go to photographers then cart
    steps.push({
      number: 2,
      title: 'Select Services',
      path: '/booking/photographers',
      type: 'photographer'
    })

    steps.push({
      number: 3,
      title: 'Review & Payment',
      path: '/booking/cart',
      type: 'cart'
    })

    return steps
  }, [booking.bookingType])

  return (
    <BookingContext.Provider
      value={{
        booking,
        setBookingType,
        setLocationAndDate,
        addItem,
        removeItem,
        updateItemQuantity,
        clearItems,
        getTotalCost,
        getItemsByType,
        getItemCount,
        getBookingSteps
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
