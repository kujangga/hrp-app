'use client'

import RoleBasedLayout from '@/components/RoleBasedLayout'
import { useState } from 'react'

export default function AvailabilityCalendar() {
  const [currentMonth, setCurrentMonth] = useState(new Date())
  const [selectedDates, setSelectedDates] = useState<Date[]>([])

  // Generate calendar days
  const getDaysInMonth = (year: number, month: number) => {
    return new Date(year, month + 1, 0).getDate()
  }

  const getFirstDayOfMonth = (year: number, month: number) => {
    return new Date(year, month, 1).getDay()
  }

  const isDateSelected = (date: Date) => {
    return selectedDates.some(
      (d) => d.getDate() === date.getDate() && d.getMonth() === date.getMonth() && d.getFullYear() === date.getFullYear()
    )
  }

  const isDateUnavailable = (date: Date) => {
    // Mock unavailable dates
    const unavailableDates = [
      new Date(2023, 0, 15),
      new Date(2023, 0, 20),
      new Date(2023, 1, 5)
    ]
    
    return unavailableDates.some(
      (d) => d.getDate() === date.getDate() && d.getMonth() === date.getMonth() && d.getFullYear() === date.getFullYear()
    )
  }

  const toggleDateSelection = (date: Date) => {
    if (isDateUnavailable(date)) return
    
    const isSelected = isDateSelected(date)
    
    if (isSelected) {
      setSelectedDates(selectedDates.filter(d => d.getTime() !== date.getTime()))
    } else {
      setSelectedDates([...selectedDates, date])
    }
  }

  const renderCalendar = () => {
    const year = currentMonth.getFullYear()
    const month = currentMonth.getMonth()
    const daysInMonth = getDaysInMonth(year, month)
    const firstDayOfMonth = getFirstDayOfMonth(year, month)
    
    const days = []
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(<div key={`empty-${i}`} className="h-16"></div>)
    }
    
    // Add cells for each day of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month, day)
      const isSelected = isDateSelected(date)
      const isUnavailable = isDateUnavailable(date)
      const isToday = new Date().toDateString() === date.toDateString()
      
      days.push(
        <div
          key={day}
          onClick={() => toggleDateSelection(date)}
          className={`
            h-16 border border-gray-200 p-1 cursor-pointer
            ${isToday ? 'bg-blue-50' : ''}
            ${isUnavailable ? 'bg-red-50 cursor-not-allowed' : ''}
            ${isSelected ? 'bg-indigo-100' : 'hover:bg-gray-50'}
          `}
        >
          <div className="flex flex-col h-full">
            <span className={`text-sm ${isToday ? 'font-bold text-blue-600' : ''}`}>
              {day}
            </span>
            {isUnavailable && (
              <span className="text-xs text-red-600 mt-1">Booked</span>
            )}
          </div>
        </div>
      )
    }
    
    return days
  }

  const navigateMonth = (direction: 'prev' | 'next') => {
    setCurrentMonth(prev => {
      const newMonth = new Date(prev)
      newMonth.setMonth(prev.getMonth() + (direction === 'prev' ? -1 : 1))
      return newMonth
    })
  }

  const saveAvailability = () => {
    // In a real app, this would save to the database
    alert(`Saved ${selectedDates.length} unavailable dates`)
  }

  return (
    <RoleBasedLayout allowedRoles={['PHOTOGRAPHER']}>
      <div className="min-h-screen bg-gray-100">
        <header className="bg-white shadow">
          <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold text-gray-900">Availability Calendar</h1>
          </div>
        </header>
        <main>
          <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
            <div className="px-4 py-6 sm:px-0">
              <div className="bg-white shadow sm:rounded-lg">
                <div className="px-4 py-5 sm:p-6">
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-lg font-medium text-gray-900">Set Unavailable Dates</h3>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => navigateMonth('prev')}
                        className="inline-flex items-center px-3 py-1 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                      >
                        Previous
                      </button>
                      <button
                        onClick={() => navigateMonth('next')}
                        className="inline-flex items-center px-3 py-1 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                      >
                        Next
                      </button>
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <h2 className="text-xl font-semibold text-gray-900">
                      {currentMonth.toLocaleString('default', { month: 'long', year: 'numeric' })}
                    </h2>
                  </div>
                  
                  <div className="grid grid-cols-7 gap-px bg-gray-200 border border-gray-200 rounded-lg overflow-hidden">
                    {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                      <div
                        key={day}
                        className="bg-gray-100 py-2 text-center text-sm font-medium text-gray-500"
                      >
                        {day}
                      </div>
                    ))}
                    {renderCalendar()}
                  </div>
                  
                  <div className="mt-6 flex flex-wrap gap-4">
                    <div className="flex items-center">
                      <div className="w-4 h-4 bg-indigo-100 border border-gray-200 mr-2"></div>
                      <span className="text-sm text-gray-600">Selected Unavailable</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-4 h-4 bg-red-50 border border-gray-200 mr-2"></div>
                      <span className="text-sm text-gray-600">Already Booked</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-4 h-4 bg-blue-50 border border-gray-200 mr-2"></div>
                      <span className="text-sm text-gray-600">Today</span>
                    </div>
                  </div>
                  
                  <div className="mt-6">
                    <button
                      onClick={saveAvailability}
                      className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      Save Availability
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </RoleBasedLayout>
  )
}