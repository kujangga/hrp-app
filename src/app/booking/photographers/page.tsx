'use client'

import RoleBasedLayout from '@/components/RoleBasedLayout'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function SelectPhotographers() {
  const router = useRouter()
  const [selectedPhotographers, setSelectedPhotographers] = useState<string[]>([])
  const [filters, setFilters] = useState({
    grade: '',
    minPrice: '',
    maxPrice: ''
  })

  // Mock data for photographers
  const photographers = [
    {
      id: '1',
      name: 'John Doe',
      grade: 'A',
      dailyRate: 4000000,
      profilePic: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=200&q=80',
      bio: 'Specializing in wedding and corporate photography with 10+ years of experience.',
      rating: 4.9,
      portfolio: [
        'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=200&q=80',
        'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=200&q=80'
      ]
    },
    {
      id: '2',
      name: 'Jane Smith',
      grade: 'B',
      dailyRate: 3000000,
      profilePic: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=200&q=80',
      bio: 'Creative photographer specializing in lifestyle and portrait photography.',
      rating: 4.7,
      portfolio: [
        'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=200&q=80',
        'https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=200&q=80'
      ]
    },
    {
      id: '3',
      name: 'Robert Johnson',
      grade: 'C',
      dailyRate: 2000000,
      profilePic: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=200&q=80',
      bio: 'Experienced photographer with a focus on events and documentation.',
      rating: 4.5,
      portfolio: [
        'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=200&q=80',
        'https://images.unsplash.com/photo-1507101105822-7472b28e22ac?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=200&q=80'
      ]
    }
  ]

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    const { name, value } = e.target
    setFilters(prev => ({ ...prev, [name]: value }))
  }

  const togglePhotographerSelection = (id: string) => {
    setSelectedPhotographers(prev => 
      prev.includes(id) 
        ? prev.filter(photographerId => photographerId !== id) 
        : [...prev, id]
    )
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, this would save selections and proceed to next step
    router.push('/booking/cart')
  }

  // Apply filters
  const filteredPhotographers = photographers.filter(photographer => {
    if (filters.grade && photographer.grade !== filters.grade) return false
    if (filters.minPrice && photographer.dailyRate < parseInt(filters.minPrice)) return false
    if (filters.maxPrice && photographer.dailyRate > parseInt(filters.maxPrice)) return false
    return true
  })

  return (
    <RoleBasedLayout allowedRoles={['CUSTOMER']}>
      <div className="min-h-screen bg-gray-100">
        <header className="bg-white shadow">
          <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold text-gray-900">Select Photographers</h1>
          </div>
        </header>
        <main>
          <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
            <div className="px-4 py-6 sm:px-0">
              <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                {/* Filters sidebar */}
                <div className="lg:col-span-1">
                  <div className="bg-white shadow rounded-lg p-4">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Filters</h3>
                    <div className="space-y-4">
                      <div>
                        <label htmlFor="grade" className="block text-sm font-medium text-gray-700">
                          Grade
                        </label>
                        <select
                          id="grade"
                          name="grade"
                          value={filters.grade}
                          onChange={handleFilterChange}
                          className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                        >
                          <option value="">All Grades</option>
                          <option value="A">A (Premium)</option>
                          <option value="B">B (High)</option>
                          <option value="C">C (Mid)</option>
                          <option value="D">D (Mid)</option>
                          <option value="E">E (Entry)</option>
                        </select>
                      </div>

                      <div>
                        <label htmlFor="minPrice" className="block text-sm font-medium text-gray-700">
                          Min Price (IDR)
                        </label>
                        <input
                          type="number"
                          name="minPrice"
                          id="minPrice"
                          value={filters.minPrice}
                          onChange={handleFilterChange}
                          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                      </div>

                      <div>
                        <label htmlFor="maxPrice" className="block text-sm font-medium text-gray-700">
                          Max Price (IDR)
                        </label>
                        <input
                          type="number"
                          name="maxPrice"
                          id="maxPrice"
                          value={filters.maxPrice}
                          onChange={handleFilterChange}
                          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Photographers grid */}
                <div className="lg:col-span-3">
                  <div className="bg-white shadow overflow-hidden sm:rounded-md">
                    <ul className="divide-y divide-gray-200">
                      {filteredPhotographers.map((photographer) => (
                        <li key={photographer.id}>
                          <div className="px-4 py-4 sm:px-6">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center">
                                <img
                                  className="h-16 w-16 rounded-full"
                                  src={photographer.profilePic}
                                  alt={photographer.name}
                                />
                                <div className="ml-4">
                                  <div className="flex items-center">
                                    <h3 className="text-lg font-medium text-indigo-600">{photographer.name}</h3>
                                    <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
                                      Grade {photographer.grade}
                                    </span>
                                  </div>
                                  <p className="text-sm text-gray-500 mt-1">{photographer.bio}</p>
                                  <div className="flex items-center mt-1">
                                    <div className="flex text-yellow-400">
                                      {[...Array(5)].map((_, i) => (
                                        <svg
                                          key={i}
                                          className={`h-4 w-4 ${i < Math.floor(photographer.rating) ? 'text-yellow-400' : 'text-gray-300'}`}
                                          xmlns="http://www.w3.org/2000/svg"
                                          viewBox="0 0 20 20"
                                          fill="currentColor"
                                        >
                                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                        </svg>
                                      ))}
                                    </div>
                                    <span className="ml-1 text-sm text-gray-500">{photographer.rating}</span>
                                  </div>
                                </div>
                              </div>
                              <div className="flex flex-col items-end">
                                <p className="text-lg font-medium text-gray-900">
                                  Rp {photographer.dailyRate.toLocaleString()}
                                </p>
                                <p className="text-sm text-gray-500">per day</p>
                                <button
                                  onClick={() => togglePhotographerSelection(photographer.id)}
                                  className={`mt-2 inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md ${
                                    selectedPhotographers.includes(photographer.id)
                                      ? 'bg-red-100 text-red-800 hover:bg-red-200'
                                      : 'bg-indigo-100 text-indigo-800 hover:bg-indigo-200'
                                  }`}
                                >
                                  {selectedPhotographers.includes(photographer.id) ? 'Remove' : 'Add to Cart'}
                                </button>
                              </div>
                            </div>
                            
                            {/* Portfolio preview */}
                            <div className="mt-4 grid grid-cols-2 gap-2">
                              {photographer.portfolio.slice(0, 2).map((img, idx) => (
                                <img
                                  key={idx}
                                  className="h-24 w-full object-cover rounded"
                                  src={img}
                                  alt={`Portfolio ${idx + 1}`}
                                />
                              ))}
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-6 bg-white shadow sm:rounded-lg">
                    <div className="px-4 py-5 sm:p-6">
                      <div className="flex justify-between items-center">
                        <div>
                          <h3 className="text-lg font-medium text-gray-900">
                            Selected Photographers ({selectedPhotographers.length})
                          </h3>
                          <p className="mt-1 text-sm text-gray-500">
                            Proceed to cart to review your selections
                          </p>
                        </div>
                        <button
                          onClick={handleSubmit}
                          disabled={selectedPhotographers.length === 0}
                          className={`inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${
                            selectedPhotographers.length === 0
                              ? 'bg-gray-400 cursor-not-allowed'
                              : 'bg-indigo-600 hover:bg-indigo-700'
                          }`}
                        >
                          Next: Review Cart
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