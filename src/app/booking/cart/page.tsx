'use client'

import RoleBasedLayout from '@/components/RoleBasedLayout'
import { useRouter } from 'next/navigation'

export default function BookingCart() {
  const router = useRouter()

  // Mock data for selected photographers
  const selectedPhotographers = [
    {
      id: '1',
      name: 'John Doe',
      grade: 'A',
      dailyRate: 4000000,
      profilePic: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=200&q=80',
      selected: true
    },
    {
      id: '2',
      name: 'Jane Smith',
      grade: 'B',
      dailyRate: 3000000,
      profilePic: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=200&q=80',
      selected: true
    }
  ]

  const equipment = [
    {
      id: '1',
      name: 'Canon EOS R5 Camera',
      dailyRate: 500000,
      quantity: 1
    },
    {
      id: '2',
      name: 'Professional Lighting Kit',
      dailyRate: 300000,
      quantity: 1
    }
  ]

  const transport = [
    {
      id: '1',
      name: 'SUV for Photography Team',
      dailyRate: 1000000,
      quantity: 1
    }
  ]

  const photographerTotal = selectedPhotographers.reduce((sum, photographer) => sum + photographer.dailyRate, 0)
  const equipmentTotal = equipment.reduce((sum, item) => sum + (item.dailyRate * item.quantity), 0)
  const transportTotal = transport.reduce((sum, item) => sum + (item.dailyRate * item.quantity), 0)
  const grandTotal = photographerTotal + equipmentTotal + transportTotal

  const handleCheckout = () => {
    // In a real app, this would proceed to checkout
    router.push('/booking/checkout')
  }

  return (
    <RoleBasedLayout allowedRoles={['CUSTOMER']}>
      <div className="min-h-screen bg-gray-100">
        <header className="bg-white shadow">
          <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold text-gray-900">Booking Cart</h1>
          </div>
        </header>
        <main>
          <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
            <div className="px-4 py-6 sm:px-0">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Cart items */}
                <div className="lg:col-span-2">
                  <div className="bg-white shadow sm:rounded-lg">
                    <div className="px-4 py-5 sm:p-6">
                      <h3 className="text-lg font-medium text-gray-900 mb-4">Selected Photographers</h3>
                      <div className="flow-root">
                        <ul className="divide-y divide-gray-200">
                          {selectedPhotographers.map((photographer) => (
                            <li key={photographer.id} className="py-4 flex">
                              <img
                                className="h-16 w-16 rounded-full"
                                src={photographer.profilePic}
                                alt={photographer.name}
                              />
                              <div className="ml-4 flex-1">
                                <div className="flex items-center justify-between">
                                  <h4 className="text-lg font-medium text-gray-900">{photographer.name}</h4>
                                  <p className="text-lg font-medium text-gray-900">
                                    Rp {photographer.dailyRate.toLocaleString()}
                                  </p>
                                </div>
                                <div className="flex items-center mt-1">
                                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
                                    Grade {photographer.grade}
                                  </span>
                                </div>
                              </div>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 bg-white shadow sm:rounded-lg">
                    <div className="px-4 py-5 sm:p-6">
                      <h3 className="text-lg font-medium text-gray-900 mb-4">Equipment Rental</h3>
                      <div className="flow-root">
                        <ul className="divide-y divide-gray-200">
                          {equipment.map((item) => (
                            <li key={item.id} className="py-4 flex justify-between">
                              <div>
                                <h4 className="text-base font-medium text-gray-900">{item.name}</h4>
                                <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
                              </div>
                              <p className="text-base font-medium text-gray-900">
                                Rp {item.dailyRate.toLocaleString()}
                              </p>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 bg-white shadow sm:rounded-lg">
                    <div className="px-4 py-5 sm:p-6">
                      <h3 className="text-lg font-medium text-gray-900 mb-4">Transportation</h3>
                      <div className="flow-root">
                        <ul className="divide-y divide-gray-200">
                          {transport.map((item) => (
                            <li key={item.id} className="py-4 flex justify-between">
                              <div>
                                <h4 className="text-base font-medium text-gray-900">{item.name}</h4>
                                <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
                              </div>
                              <p className="text-base font-medium text-gray-900">
                                Rp {item.dailyRate.toLocaleString()}
                              </p>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Order summary */}
                <div className="lg:col-span-1">
                  <div className="bg-white shadow sm:rounded-lg">
                    <div className="px-4 py-5 sm:p-6">
                      <h3 className="text-lg font-medium text-gray-900 mb-4">Order Summary</h3>
                      <div className="space-y-4">
                        <div className="flex justify-between">
                          <span className="text-base font-medium text-gray-500">Photographers</span>
                          <span className="text-base font-medium text-gray-900">
                            Rp {photographerTotal.toLocaleString()}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-base font-medium text-gray-500">Equipment</span>
                          <span className="text-base font-medium text-gray-900">
                            Rp {equipmentTotal.toLocaleString()}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-base font-medium text-gray-500">Transportation</span>
                          <span className="text-base font-medium text-gray-900">
                            Rp {transportTotal.toLocaleString()}
                          </span>
                        </div>
                        <div className="border-t border-gray-200 pt-4 flex justify-between">
                          <span className="text-lg font-medium text-gray-900">Total</span>
                          <span className="text-lg font-medium text-gray-900">
                            Rp {grandTotal.toLocaleString()}
                          </span>
                        </div>
                      </div>
                      <div className="mt-6">
                        <button
                          onClick={handleCheckout}
                          className="w-full bg-indigo-600 border border-transparent rounded-md shadow-sm py-3 px-4 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                          Proceed to Checkout
                        </button>
                      </div>
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