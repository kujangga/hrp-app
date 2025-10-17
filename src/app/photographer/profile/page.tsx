'use client'

import RoleBasedLayout from '@/components/RoleBasedLayout'
import { useState, useRef } from 'react'

export default function PhotographerProfile() {
  const fileInputRef = useRef(null)
  const [profile, setProfile] = useState({
    name: 'John Doe',
    grade: 'A',
    bio: 'Professional photographer with 10+ years of experience specializing in weddings and corporate events.',
    profilePic: '',
    instagram: '@johndoe_photography',
    bankName: 'BCA',
    bankAccount: '1234567890',
    accountHolder: 'John Doe',
    hourlyRate: 500000,
    dailyRate: 4000000,
    status: 'PUBLISHED'
  })

  const [portfolios, setPortfolios] = useState([
    { id: 1, url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80', title: 'Mountain Landscape' },
    { id: 2, url: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80', title: 'Wedding Ceremony' },
    { id: 3, url: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80', title: 'Corporate Event' }
  ])

  const [uploading, setUploading] = useState(false)

  const handleProfileChange = (e) => {
    const { name, value } = e.target
    setProfile(prev => ({ ...prev, [name]: value }))
  }

  const handleFileUpload = async (e) => {
    const file = e.target.files[0]
    if (!file) return

    setUploading(true)

    try {
      const formData = new FormData()
      formData.append('image', file)
      formData.append('title', file.name)

      const response = await fetch('/api/photographer/portfolio/upload', {
        method: 'POST',
        body: formData
      })

      const result = await response.json()

      if (response.ok) {
        // Add the new portfolio item to the state
        setPortfolios(prev => [...prev, {
          id: result.portfolioItem.id,
          url: result.portfolioItem.url,
          title: result.portfolioItem.title
        }])
      } else {
        console.error('Upload failed:', result.error)
        alert('Upload failed: ' + result.error)
      }
    } catch (error) {
      console.error('Upload error:', error)
      alert('Upload failed: ' + error.message)
    } finally {
      setUploading(false)
    }
  }

  const triggerFileInput = () => {
    fileInputRef.current.click()
  }

  const removePortfolioItem = (id) => {
    setPortfolios(prev => prev.filter(item => item.id !== id))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // In a real app, this would send the data to the server
    alert('Profile updated successfully!')
  }

  return (
    <RoleBasedLayout allowedRoles={['PHOTOGRAPHER']}>
      <div className="min-h-screen bg-gray-100">
        <header className="bg-white shadow">
          <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold text-gray-900">Photographer Profile</h1>
          </div>
        </header>
        <main>
          <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
            <div className="px-4 py-6 sm:px-0">
              <form onSubmit={handleSubmit} className="space-y-8 divide-y divide-gray-200">
                <div className="space-y-8 divide-y divide-gray-200">
                  <div>
                    <div>
                      <h3 className="text-lg leading-6 font-medium text-gray-900">Profile Information</h3>
                      <p className="mt-1 text-sm text-gray-500">
                        This information will be displayed publicly so be careful what you share.
                      </p>
                    </div>

                    <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                      <div className="sm:col-span-6">
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                          Full Name
                        </label>
                        <div className="mt-1">
                          <input
                            type="text"
                            name="name"
                            id="name"
                            value={profile.name}
                            onChange={handleProfileChange}
                            className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                          />
                        </div>
                      </div>

                      <div className="sm:col-span-3">
                        <label htmlFor="grade" className="block text-sm font-medium text-gray-700">
                          Grade
                        </label>
                        <div className="mt-1">
                          <select
                            id="grade"
                            name="grade"
                            value={profile.grade}
                            onChange={handleProfileChange}
                            className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                          >
                            <option value="A">A (Premium)</option>
                            <option value="B">B (High)</option>
                            <option value="C">C (Mid)</option>
                            <option value="D">D (Mid)</option>
                            <option value="E">E (Entry)</option>
                          </select>
                        </div>
                      </div>

                      <div className="sm:col-span-3">
                        <label htmlFor="status" className="block text-sm font-medium text-gray-700">
                          Profile Status
                        </label>
                        <div className="mt-1">
                          <select
                            id="status"
                            name="status"
                            value={profile.status}
                            onChange={handleProfileChange}
                            className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                          >
                            <option value="DRAFT">Draft</option>
                            <option value="PUBLISHED">Published</option>
                          </select>
                        </div>
                      </div>

                      <div className="sm:col-span-6">
                        <label htmlFor="bio" className="block text-sm font-medium text-gray-700">
                          Bio
                        </label>
                        <div className="mt-1">
                          <textarea
                            id="bio"
                            name="bio"
                            rows={3}
                            value={profile.bio}
                            onChange={handleProfileChange}
                            className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border border-gray-300 rounded-md"
                            maxLength={200}
                          />
                          <p className="mt-2 text-sm text-gray-500">Brief description for your profile. 200 characters max.</p>
                        </div>
                      </div>

                      <div className="sm:col-span-6">
                        <label htmlFor="instagram" className="block text-sm font-medium text-gray-700">
                          Instagram
                        </label>
                        <div className="mt-1 flex rounded-md shadow-sm">
                          <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 sm:text-sm">
                            @
                          </span>
                          <input
                            type="text"
                            name="instagram"
                            id="instagram"
                            value={profile.instagram.replace('@', '')}
                            onChange={(e) => handleProfileChange({ ...e, target: { ...e.target, value: `@${e.target.value}` } })}
                            className="flex-1 min-w-0 block w-full px-3 py-2 rounded-none rounded-r-md focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="pt-8">
                    <div>
                      <h3 className="text-lg leading-6 font-medium text-gray-900">Pricing</h3>
                      <p className="mt-1 text-sm text-gray-500">
                        Set your pricing rates for different services.
                      </p>
                    </div>
                    <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                      <div className="sm:col-span-3">
                        <label htmlFor="hourlyRate" className="block text-sm font-medium text-gray-700">
                          Hourly Rate (IDR)
                        </label>
                        <div className="mt-1">
                          <input
                            type="number"
                            name="hourlyRate"
                            id="hourlyRate"
                            value={profile.hourlyRate}
                            onChange={handleProfileChange}
                            className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                          />
                        </div>
                      </div>

                      <div className="sm:col-span-3">
                        <label htmlFor="dailyRate" className="block text-sm font-medium text-gray-700">
                          Daily Rate (IDR)
                        </label>
                        <div className="mt-1">
                          <input
                            type="number"
                            name="dailyRate"
                            id="dailyRate"
                            value={profile.dailyRate}
                            onChange={handleProfileChange}
                            className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="pt-8">
                    <div>
                      <h3 className="text-lg leading-6 font-medium text-gray-900">Financial Information</h3>
                      <p className="mt-1 text-sm text-gray-500">
                        Bank account details for payments.
                      </p>
                    </div>
                    <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                      <div className="sm:col-span-3">
                        <label htmlFor="bankName" className="block text-sm font-medium text-gray-700">
                          Bank Name
                        </label>
                        <div className="mt-1">
                          <input
                            type="text"
                            name="bankName"
                            id="bankName"
                            value={profile.bankName}
                            onChange={handleProfileChange}
                            className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                          />
                        </div>
                      </div>

                      <div className="sm:col-span-6">
                        <label htmlFor="bankAccount" className="block text-sm font-medium text-gray-700">
                          Account Number
                        </label>
                        <div className="mt-1">
                          <input
                            type="text"
                            name="bankAccount"
                            id="bankAccount"
                            value={profile.bankAccount}
                            onChange={handleProfileChange}
                            className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                          />
                        </div>
                      </div>

                      <div className="sm:col-span-6">
                        <label htmlFor="accountHolder" className="block text-sm font-medium text-gray-700">
                          Account Holder Name
                        </label>
                        <div className="mt-1">
                          <input
                            type="text"
                            name="accountHolder"
                            id="accountHolder"
                            value={profile.accountHolder}
                            onChange={handleProfileChange}
                            className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="pt-8">
                    <div>
                      <h3 className="text-lg leading-6 font-medium text-gray-900">Portfolio</h3>
                      <p className="mt-1 text-sm text-gray-500">
                        Add up to 5 photos or videos to showcase your work.
                      </p>
                    </div>

                    <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
                      {portfolios.map((item) => (
                        <div key={item.id} className="relative group">
                          <div className="aspect-w-10 aspect-h-10 block w-full overflow-hidden rounded-lg bg-gray-100">
                            <img
                              src={item.url}
                              alt=""
                              className="object-cover pointer-events-none group-hover:opacity-75"
                            />
                          </div>
                          <button
                            type="button"
                            onClick={() => removePortfolioItem(item.id)}
                            className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <svg className="h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                            </svg>
                          </button>
                        </div>
                      ))}
                      <div className="aspect-w-10 aspect-h-10 block w-full overflow-hidden rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center">
                        <button
                          type="button"
                          onClick={triggerFileInput}
                          disabled={uploading}
                          className="text-gray-600 hover:text-gray-900"
                        >
                          {uploading ? (
                            <svg className="h-8 w-8 animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                          ) : (
                            <svg className="h-8 w-8" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                            </svg>
                          )}
                        </button>
                        <input
                          type="file"
                          ref={fileInputRef}
                          onChange={handleFileUpload}
                          accept="image/*"
                          className="hidden"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="pt-5">
                  <div className="flex justify-end">
                    <button
                      type="button"
                      className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      Save
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </main>
      </div>
    </RoleBasedLayout>
  )
}