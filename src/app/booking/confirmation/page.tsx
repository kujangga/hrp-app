'use client'

import RoleBasedLayout from '@/components/RoleBasedLayout'
import Link from 'next/link'

export default function BookingConfirmation() {
  return (
    <RoleBasedLayout allowedRoles={['CUSTOMER']}>
      <div className="min-h-screen bg-gray-100">
        <header className="bg-white shadow">
          <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold text-gray-900">Booking Confirmation</h1>
          </div>
        </header>
        <main>
          <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
            <div className="px-4 py-6 sm:px-0">
              <div className="bg-white shadow sm:rounded-lg">
                <div className="px-4 py-5 sm:p-6">
                  <div className="text-center">
                    <svg className="mx-auto h-16 w-16 text-green-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <h3 className="mt-4 text-2xl font-medium text-gray-900">Booking Confirmed!</h3>
                    <p className="mt-2 text-gray-500">
                      Your booking has been confirmed. A confirmation email has been sent to your email address.
                    </p>
                    
                    <div className="mt-8 bg-gray-50 rounded-lg p-6 text-left max-w-2xl mx-auto">
                      <h4 className="text-lg font-medium text-gray-900">Booking Details</h4>
                      <div className="mt-4 space-y-4">
                        <div className="flex justify-between">
                          <span className="text-gray-500">Booking ID</span>
                          <span className="font-medium">HRP-2023-001234</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-500">Event Date</span>
                          <span className="font-medium">Sat, Jan 1, 2023</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-500">Location</span>
                          <span className="font-medium">Jakarta, Indonesia</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-500">Total Amount</span>
                          <span className="font-medium">Rp 8,800,000</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-500">Payment Status</span>
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                            Paid
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-8">
                      <Link
                        href="/customer/dashboard"
                        className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      >
                        View Booking History
                      </Link>
                    </div>
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