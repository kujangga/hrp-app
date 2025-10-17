'use client'

import RoleBasedLayout from '@/components/RoleBasedLayout'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function BookingCheckout() {
  const router = useRouter()
  const [paymentMethod, setPaymentMethod] = useState('credit-card')
  const [isProcessing, setIsProcessing] = useState(false)

  // Mock data for the booking
  const bookingSummary = {
    photographers: [
      { id: '1', name: 'John Doe', grade: 'A', dailyRate: 4000000 },
      { id: '2', name: 'Jane Smith', grade: 'B', dailyRate: 3000000 }
    ],
    equipment: [
      { id: '1', name: 'Canon EOS R5 Camera', dailyRate: 500000, quantity: 1 },
      { id: '2', name: 'Professional Lighting Kit', dailyRate: 300000, quantity: 1 }
    ],
    transport: [
      { id: '1', name: 'SUV for Photography Team', dailyRate: 1000000, quantity: 1 }
    ],
    location: 'Jakarta, Indonesia',
    date: 'Sat, Jan 1, 2023',
    photographerTotal: 7000000,
    equipmentTotal: 800000,
    transportTotal: 1000000,
    grandTotal: 8800000
  }

  const handlePayment = async (e) => {
    e.preventDefault()
    setIsProcessing(true)
    
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false)
      router.push('/booking/confirmation')
    }, 2000)
  }

  return (
    <RoleBasedLayout allowedRoles={['CUSTOMER']}>
      <div className="min-h-screen bg-gray-100">
        <header className="bg-white shadow">
          <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold text-gray-900">Checkout</h1>
          </div>
        </header>
        <main>
          <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
            <div className="px-4 py-6 sm:px-0">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Booking details */}
                <div className="lg:col-span-2">
                  <div className="bg-white shadow sm:rounded-lg">
                    <div className="px-4 py-5 sm:p-6">
                      <h3 className="text-lg font-medium text-gray-900 mb-4">Booking Details</h3>
                      <div className="border-t border-gray-200 pt-4">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <h4 className="text-sm font-medium text-gray-500">Location</h4>
                            <p className="mt-1 text-sm text-gray-900">{bookingSummary.location}</p>
                          </div>
                          <div>
                            <h4 className="text-sm font-medium text-gray-500">Event Date</h4>
                            <p className="mt-1 text-sm text-gray-900">{bookingSummary.date}</p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="mt-6">
                        <h4 className="text-md font-medium text-gray-900">Selected Photographers</h4>
                        <ul className="mt-2 divide-y divide-gray-200">
                          {bookingSummary.photographers.map((photographer) => (
                            <li key={photographer.id} className="py-3 flex justify-between">
                              <div>
                                <p className="text-sm font-medium text-gray-900">{photographer.name}</p>
                                <p className="text-sm text-gray-500">Grade {photographer.grade}</p>
                              </div>
                              <p className="text-sm font-medium text-gray-900">
                                Rp {photographer.dailyRate.toLocaleString()}
                              </p>
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      <div className="mt-6">
                        <h4 className="text-md font-medium text-gray-900">Equipment</h4>
                        <ul className="mt-2 divide-y divide-gray-200">
                          {bookingSummary.equipment.map((item) => (
                            <li key={item.id} className="py-3 flex justify-between">
                              <div>
                                <p className="text-sm font-medium text-gray-900">{item.name}</p>
                                <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
                              </div>
                              <p className="text-sm font-medium text-gray-900">
                                Rp {(item.dailyRate * item.quantity).toLocaleString()}
                              </p>
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      <div className="mt-6">
                        <h4 className="text-md font-medium text-gray-900">Transportation</h4>
                        <ul className="mt-2 divide-y divide-gray-200">
                          {bookingSummary.transport.map((item) => (
                            <li key={item.id} className="py-3 flex justify-between">
                              <div>
                                <p className="text-sm font-medium text-gray-900">{item.name}</p>
                                <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
                              </div>
                              <p className="text-sm font-medium text-gray-900">
                                Rp {(item.dailyRate * item.quantity).toLocaleString()}
                              </p>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Payment section */}
                <div className="lg:col-span-1">
                  <div className="bg-white shadow sm:rounded-lg">
                    <div className="px-4 py-5 sm:p-6">
                      <h3 className="text-lg font-medium text-gray-900 mb-4">Payment Details</h3>
                      
                      <div className="border-t border-gray-200 pt-4">
                        <div className="space-y-4">
                          <div className="flex justify-between">
                            <span className="text-base font-medium text-gray-500">Photographers</span>
                            <span className="text-base font-medium text-gray-900">
                              Rp {bookingSummary.photographerTotal.toLocaleString()}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-base font-medium text-gray-500">Equipment</span>
                            <span className="text-base font-medium text-gray-900">
                              Rp {bookingSummary.equipmentTotal.toLocaleString()}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-base font-medium text-gray-500">Transportation</span>
                            <span className="text-base font-medium text-gray-900">
                              Rp {bookingSummary.transportTotal.toLocaleString()}
                            </span>
                          </div>
                          <div className="border-t border-gray-200 pt-4 flex justify-between">
                            <span className="text-lg font-medium text-gray-900">Total</span>
                            <span className="text-lg font-medium text-gray-900">
                              Rp {bookingSummary.grandTotal.toLocaleString()}
                            </span>
                          </div>
                        </div>
                      </div>
                      
                      <form onSubmit={handlePayment} className="mt-6 space-y-6">
                        <div>
                          <h4 className="text-md font-medium text-gray-900 mb-2">Payment Method</h4>
                          <div className="space-y-4">
                            <div className="flex items-center">
                              <input
                                id="credit-card"
                                name="payment-method"
                                type="radio"
                                checked={paymentMethod === 'credit-card'}
                                onChange={() => setPaymentMethod('credit-card')}
                                className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
                              />
                              <label htmlFor="credit-card" className="ml-3 block text-sm font-medium text-gray-700">
                                Credit Card
                              </label>
                            </div>
                            <div className="flex items-center">
                              <input
                                id="bank-transfer"
                                name="payment-method"
                                type="radio"
                                checked={paymentMethod === 'bank-transfer'}
                                onChange={() => setPaymentMethod('bank-transfer')}
                                className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
                              />
                              <label htmlFor="bank-transfer" className="ml-3 block text-sm font-medium text-gray-700">
                                Bank Transfer
                              </label>
                            </div>
                            <div className="flex items-center">
                              <input
                                id="e-wallet"
                                name="payment-method"
                                type="radio"
                                checked={paymentMethod === 'e-wallet'}
                                onChange={() => setPaymentMethod('e-wallet')}
                                className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
                              />
                              <label htmlFor="e-wallet" className="ml-3 block text-sm font-medium text-gray-700">
                                E-Wallet
                              </label>
                            </div>
                          </div>
                        </div>
                        
                        {paymentMethod === 'credit-card' && (
                          <div className="space-y-4">
                            <div>
                              <label htmlFor="card-number" className="block text-sm font-medium text-gray-700">
                                Card Number
                              </label>
                              <input
                                type="text"
                                name="card-number"
                                id="card-number"
                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                placeholder="0000 0000 0000 0000"
                              />
                            </div>
                            
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <label htmlFor="expiry-date" className="block text-sm font-medium text-gray-700">
                                  Expiry Date
                                </label>
                                <input
                                  type="text"
                                  name="expiry-date"
                                  id="expiry-date"
                                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                  placeholder="MM/YY"
                                />
                              </div>
                              
                              <div>
                                <label htmlFor="cvv" className="block text-sm font-medium text-gray-700">
                                  CVV
                                </label>
                                <input
                                  type="text"
                                  name="cvv"
                                  id="cvv"
                                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                  placeholder="123"
                                />
                              </div>
                            </div>
                          </div>
                        )}
                        
                        <button
                          type="submit"
                          disabled={isProcessing}
                          className={`w-full border border-transparent rounded-md shadow-sm py-3 px-4 text-base font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${
                            isProcessing 
                              ? 'bg-gray-400 cursor-not-allowed' 
                              : 'bg-indigo-600 hover:bg-indigo-700'
                          }`}
                        >
                          {isProcessing ? (
                            <span className="flex items-center justify-center">
                              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                              </svg>
                              Processing...
                            </span>
                          ) : (
                            `Pay Rp ${bookingSummary.grandTotal.toLocaleString()}`
                          )}
                        </button>
                      </form>
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