'use client'

import RoleBasedLayout from '@/components/RoleBasedLayout'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function BookingLocationDate() {
  const router = useRouter()
  const [bookingInfo, setBookingInfo] = useState({
    location: '',
    date: ''
  })

  const locations = [
    { id: '1', name: 'Jakarta', type: 'city' },
    { id: '2', name: 'Bandung', type: 'city' },
    { id: '3', name: 'Bali', type: 'city' },
    { id: '4', name: 'Yogyakarta', type: 'city' },
    { id: '5', name: 'Indonesia', type: 'country' },
    { id: '6', name: 'Singapore', type: 'country' },
    { id: '7', name: 'Malaysia', type: 'country' }
  ]

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    const { name, value } = e.target
    setBookingInfo(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, this would validate and proceed to next step
    router.push('/booking/photographers')
  }

  return (
    <RoleBasedLayout allowedRoles={['CUSTOMER']}>
      <div className="min-h-screen bg-gray-100">
        <header className="bg-white shadow">
          <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold text-gray-900">Book a Photographer</h1>
          </div>
        </header>
        <main>
          <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
            <div className="px-4 py-6 sm:px-0">
              <div className="bg-white shadow sm:rounded-lg">
                <div className="px-4 py-5 sm:p-6">
                  <h3 className="text-lg leading-6 font-medium text-gray-900">
                    Select Location & Date
                  </h3>
                  <div className="mt-5">
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div>
                        <label htmlFor="location" className="block text-sm font-medium text-gray-700">
                          Location
                        </label>
                        <select
                          id="location"
                          name="location"
                          value={bookingInfo.location}
                          onChange={handleChange}
                          className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                          required
                        >
                          <option value="">Select a location</option>
                          {locations.map((location) => (
                            <option key={location.id} value={location.id}>
                              {location.name} ({location.type})
                            </option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label htmlFor="date" className="block text-sm font-medium text-gray-700">
                          Event Date
                        </label>
                        <input
                          type="date"
                          name="date"
                          id="date"
                          value={bookingInfo.date}
                          onChange={handleChange}
                          min={new Date().toISOString().split('T')[0]}
                          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                          required
                        />
                      </div>

                      <div className="flex justify-end">
                        <button
                          type="submit"
                          className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                          Next: Select Photographers
                        </button>
                      </div>
                    </form>
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