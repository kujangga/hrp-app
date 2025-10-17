'use client'

import RoleBasedLayout from '@/components/RoleBasedLayout'
import { useState } from 'react'

export default function AutomaticReplacement() {
  // Mock data for replacement requests
  const [replacementRequests, setReplacementRequests] = useState([
    {
      id: '1',
      bookingId: 'BK-2023-001',
      customer: 'Sarah Johnson',
      originalPhotographer: 'John Doe',
      originalGrade: 'A',
      reason: 'Original photographer is unavailable due to illness',
      status: 'PENDING',
      suggestedReplacement: 'Jane Smith',
      suggestedReplacementGrade: 'A'
    },
    {
      id: '2',
      bookingId: 'BK-2023-002',
      customer: 'Michael Chen',
      originalPhotographer: 'Robert Johnson',
      originalGrade: 'B',
      reason: 'Original photographer has a scheduling conflict',
      status: 'PENDING',
      suggestedReplacement: 'David Wilson',
      suggestedReplacementGrade: 'B'
    }
  ])

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedRequest, setSelectedRequest] = useState(null)

  const openReplacementModal = (request) => {
    setSelectedRequest(request)
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setSelectedRequest(null)
  }

  const handleReplacementAction = (action) => {
    if (!selectedRequest) return

    // Update the replacement request status
    setReplacementRequests(replacementRequests.map(request => 
      request.id === selectedRequest.id 
        ? { ...request, status: action === 'accept' ? 'ACCEPTED' : 'REJECTED' } 
        : request
    ))

    closeModal()
  }

  return (
    <RoleBasedLayout allowedRoles={['ADMIN']}>
      <div className="min-h-screen bg-gray-100">
        <header className="bg-white shadow">
          <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold text-gray-900">Automatic Replacement System</h1>
          </div>
        </header>
        <main>
          <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
            <div className="px-4 py-6 sm:px-0">
              <div className="bg-white shadow overflow-hidden sm:rounded-lg">
                <div className="px-4 py-5 sm:px-6">
                  <h3 className="text-lg leading-6 font-medium text-gray-900">
                    Pending Replacement Requests
                  </h3>
                </div>
                <div className="border-t border-gray-200">
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Booking ID
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Customer
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Original Photographer
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Reason
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Suggested Replacement
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Status
                          </th>
                          <th scope="col" className="relative px-6 py-3">
                            <span className="sr-only">Actions</span>
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {replacementRequests.map((request) => (
                          <tr key={request.id}>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                              {request.bookingId}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {request.customer}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              <div>
                                <span className="block">{request.originalPhotographer}</span>
                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
                                  Grade {request.originalGrade}
                                </span>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {request.reason}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              <div>
                                <span className="block">{request.suggestedReplacement}</span>
                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                  Grade {request.suggestedReplacementGrade}
                                </span>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                                {request.status}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                              <button
                                onClick={() => openReplacementModal(request)}
                                className="text-indigo-600 hover:text-indigo-900"
                              >
                                Review
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>

        {/* Replacement Review Modal */}
        {isModalOpen && selectedRequest && (
          <div className="fixed z-10 inset-0 overflow-y-auto">
            <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
              <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>
              <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
              <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start">
                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                      <h3 className="text-lg leading-6 font-medium text-gray-900">
                        Review Replacement Request
                      </h3>
                      <div className="mt-4 space-y-4">
                        <div className="bg-gray-50 p-4 rounded-lg">
                          <h4 className="text-md font-medium text-gray-900">Booking Details</h4>
                          <div className="mt-2 grid grid-cols-2 gap-2">
                            <div>
                              <p className="text-sm text-gray-500">Booking ID</p>
                              <p className="text-sm font-medium text-gray-900">{selectedRequest.bookingId}</p>
                            </div>
                            <div>
                              <p className="text-sm text-gray-500">Customer</p>
                              <p className="text-sm font-medium text-gray-900">{selectedRequest.customer}</p>
                            </div>
                            <div>
                              <p className="text-sm text-gray-500">Original Photographer</p>
                              <p className="text-sm font-medium text-gray-900">
                                {selectedRequest.originalPhotographer} (Grade {selectedRequest.originalGrade})
                              </p>
                            </div>
                            <div>
                              <p className="text-sm text-gray-500">Reason</p>
                              <p className="text-sm font-medium text-gray-900">{selectedRequest.reason}</p>
                            </div>
                          </div>
                        </div>
                        
                        <div className="bg-blue-50 p-4 rounded-lg">
                          <h4 className="text-md font-medium text-gray-900">Suggested Replacement</h4>
                          <div className="mt-2">
                            <p className="text-sm font-medium text-gray-900">
                              {selectedRequest.suggestedReplacement} (Grade {selectedRequest.suggestedReplacementGrade})
                            </p>
                            <p className="text-sm text-gray-500 mt-1">
                              This photographer has similar availability and matching grade.
                            </p>
                          </div>
                        </div>
                        
                        <div>
                          <h4 className="text-md font-medium text-gray-900">Replacement Options</h4>
                          <div className="mt-2 space-y-2">
                            <div className="flex items-center">
                              <input
                                id="automatic"
                                name="replacement-option"
                                type="radio"
                                className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
                                defaultChecked
                              />
                              <label htmlFor="automatic" className="ml-3 block text-sm text-gray-700">
                                Accept automatic replacement with {selectedRequest.suggestedReplacement}
                              </label>
                            </div>
                            <div className="flex items-center">
                              <input
                                id="manual"
                                name="replacement-option"
                                type="radio"
                                className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
                              />
                              <label htmlFor="manual" className="ml-3 block text-sm text-gray-700">
                                Select different photographer manually
                              </label>
                            </div>
                            <div className="flex items-center">
                              <input
                                id="contact"
                                name="replacement-option"
                                type="radio"
                                className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
                              />
                              <label htmlFor="contact" className="ml-3 block text-sm text-gray-700">
                                Contact customer for approval
                              </label>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                  <button
                    type="button"
                    onClick={() => handleReplacementAction('accept')}
                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:ml-3 sm:w-auto sm:text-sm"
                  >
                    Accept Replacement
                  </button>
                  <button
                    type="button"
                    onClick={() => handleReplacementAction('reject')}
                    className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                  >
                    Reject
                  </button>
                  <button
                    type="button"
                    onClick={closeModal}
                    className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </RoleBasedLayout>
  )
}