# Dynamic Booking System

## Overview
Sistem booking yang fleksibel dan context-aware yang memungkinkan user untuk booking service sesuai kebutuhan mereka.

## Architecture

### 1. BookingContext (`/src/contexts/BookingContext.tsx`)
Global state management untuk seluruh booking flow.

**State:**
- `bookingType`: 'full' | 'photographer' | 'videographer' | 'equipment' | 'transport'
- `location`: string
- `date`: string
- `items`: BookingItem[]

**Methods:**
- `setBookingType(type)`: Set tipe booking
- `setLocationAndDate(location, date)`: Save location & date
- `addItem(item)`: Tambah item ke cart
- `removeItem(id, type)`: Hapus item dari cart
- `clearItems(type?)`: Clear semua/specific items
- `getTotalCost()`: Hitung total harga
- `getItemsByType(type)`: Get items by type
- `getBookingSteps()`: Get dynamic steps based on bookingType

### 2. BookingSteps Component (`/src/components/BookingSteps.tsx`)
Reusable progress indicator yang otomatis adjust berdasarkan bookingType.

**Features:**
- Visual progress (completed/active/future)
- Responsive design
- Auto-detect current step dari URL

## Booking Types & Flows

### Full Booking (from Homepage)
**Type:** `full`
**Steps:**
1. Location & Date
2. Photographer
3. Videographer  
4. Equipment
5. Transport
6. Review & Payment

**Entry:** Homepage → "Plan my shoot" button
**URL:** `/booking/location-date?location=X&date=Y&type=full`

### Photographer Only
**Type:** `photographer`
**Steps:**
1. Location & Date
2. Select Photographer
3. Review & Payment

**Entry:** Photographer page → "Book Now" button
**URL:** `/booking/location-date?type=photographer`

### Videographer Only
**Type:** `videographer`
**Steps:**
1. Location & Date
2. Select Videographer
3. Review & Payment

**Entry:** Videographer page → "Book Now" button
**URL:** `/booking/location-date?type=videographer`

### Equipment Only
**Type:** `equipment`
**Steps:**
1. Location & Date
2. Select Equipment
3. Review & Payment

**Entry:** Equipment page → "Rent Now" button
**URL:** `/booking/location-date?type=equipment`

### Transport Only
**Type:** `transport`
**Steps:**
1. Location & Date
2. Select Transport
3. Review & Payment

**Entry:** Transport page → "Book Now" button
**URL:** `/booking/location-date?type=transport`

## Implementation Guide

### Step 1: Update Entry Points

Add booking links to each service page:

```tsx
import { useRouter } from 'next/navigation'

const router = useRouter()

// For photographer page
const handleBookNow = () => {
  router.push('/booking/location-date?type=photographer')
}

// For videographer page
const handleBookNow = () => {
  router.push('/booking/location-date?type=videographer')
}

// For equipment page
const handleRentNow = () => {
  router.push('/booking/location-date?type=equipment')
}

// For transport page
const handleBookTransport = () => {
  router.push('/booking/location-date?type=transport')
}
```

### Step 2: Use BookingContext in Pages

```tsx
'use client'
import { useBooking } from '@/contexts/BookingContext'
import BookingSteps from '@/components/BookingSteps'

export default function BookingPage() {
  const { 
    booking, 
    addItem, 
    removeItem, 
    getBookingSteps 
  } = useBooking()

  return (
    <div>
      <BookingSteps />
      {/* Your booking content */}
    </div>
  )
}
```

### Step 3: Navigate Between Steps

```tsx
const handleNext = () => {
  const steps = getBookingSteps()
  const currentIndex = steps.findIndex(s => pathname.includes(s.path))
  const nextStep = steps[currentIndex + 1]
  
  if (nextStep) {
    router.push(nextStep.path)
  }
}
```

## Features

✅ **Dynamic Steps**: Steps adjust based on booking type
✅ **Persistent State**: Booking data preserved across navigation
✅ **Flexible Entry**: Multiple entry points (homepage, service pages)
✅ **Type Safety**: Full TypeScript support
✅ **Context Aware**: Each page knows its position in the flow
✅ **Optional Services**: Users can skip services they don't need

## Next Steps (TODO)

1. ✅ Create BookingContext
2. ✅ Create BookingSteps component
3. ✅ Update layout with BookingProvider
4. ✅ Update location-date page
5. ⏳ Update photographers page to use context
6. ⏳ Create videographers booking page
7. ⏳ Update equipment page for booking
8. ⏳ Update transport page for booking
9. ⏳ Update cart page to show all items
10. ⏳ Add "Book Now" buttons to service pages

## Benefits

1. **Better UX**: Users only see steps relevant to their booking
2. **Flexibility**: Easy to add new services or modify flow
3. **Maintainability**: Centralized booking logic
4. **Scalability**: Easy to extend with new booking types
5. **State Management**: No data loss during navigation
