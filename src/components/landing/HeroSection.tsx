'use client';

import { useState, useEffect } from 'react';

interface Location {
  id: string;
  name: string;
  type: 'city' | 'country';
}

const HeroSection = ({ session }: { session: unknown }) => {
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedLocation, setSelectedLocation] = useState<string>('');
  const [photographerCount, setPhotographerCount] = useState<number>(1247);
  const [locations, setLocations] = useState<Location[]>([
    { id: '1', name: 'Jakarta', type: 'city' },
    { id: '2', name: 'Bandung', type: 'city' },
    { id: '3', name: 'Bali', type: 'city' },
    { id: '4', name: 'Singapore', type: 'country' },
    { id: '5', name: 'Malaysia', type: 'country' },
  ]);

  // Simulate real-time photographer count update
  useEffect(() => {
    const interval = setInterval(() => {
      setPhotographerCount(prev => prev + Math.floor(Math.random() * 3) - 1);
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);

  const handleFindPhotographer = () => {
    if (!selectedLocation || !selectedDate) {
      alert('Please select both location and date');
      return;
    }
    // In a real app, this would navigate to the booking flow
    alert(`Searching for photographers in ${selectedLocation} on ${selectedDate}`);
  };

  const handleJoinAsPhotographer = () => {
    // In a real app, this would navigate to the photographer registration flow
    alert('Navigating to photographer registration');
  };

  return (
    <div className="relative bg-gradient-to-r from-purple-600 to-indigo-700 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-64 h-64 bg-white rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute bottom-20 left-1/2 w-80 h-80 bg-indigo-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left content */}
          <div className="text-white">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight">
              <span className="block">Indonesia&apos;s Smartest</span>
              <span className="block bg-clip-text text-transparent bg-gradient-to-r from-yellow-300 to-orange-300">
                Photographer Booking Platform
              </span>
            </h1>
            <p className="mt-6 text-xl text-purple-100 max-w-2xl">
              Never worry about photographer availability. Our smart matching system connects you with 
              verified professionals based on your needs, with automatic replacement guarantee.
            </p>
            
            {/* Stats */}
            <div className="mt-8 flex flex-wrap gap-6">
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-purple-800 rounded-lg p-2">
                  <svg className="h-6 w-6 text-yellow-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-2xl font-bold">{photographerCount.toLocaleString()}+</p>
                  <p className="text-sm text-purple-200">Photographers Available</p>
                </div>
              </div>
              
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-purple-800 rounded-lg p-2">
                  <svg className="h-6 w-6 text-green-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-2xl font-bold">A-E</p>
                  <p className="text-sm text-purple-200">Grade System</p>
                </div>
              </div>
            </div>
            
            {/* Grade System Preview */}
            <div className="mt-8">
              <h3 className="text-lg font-semibold">Verified Professional Grades</h3>
              <div className="mt-3 flex space-x-3">
                {['A', 'B', 'C', 'D', 'E'].map((grade) => (
                  <div key={grade} className="flex flex-col items-center">
                    <span className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                      grade === 'A' ? 'bg-yellow-400 text-yellow-900' :
                      grade === 'B' ? 'bg-green-400 text-green-900' :
                      grade === 'C' ? 'bg-blue-400 text-blue-900' :
                      grade === 'D' ? 'bg-indigo-400 text-indigo-900' : 'bg-purple-400 text-purple-900'
                    }`}>
                      {grade}
                    </span>
                    <span className="mt-1 text-xs text-purple-200">
                      {grade === 'A' ? 'Premium' : grade === 'B' ? 'Professional' : 'Standard'}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          {/* Right content - Booking Widget */}
          <div className="bg-white rounded-2xl shadow-2xl p-6 md:p-8">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Find Your Perfect Photographer</h2>
              <p className="mt-2 text-gray-600">Book with confidence, guaranteed quality</p>
            </div>
            
            <div className="space-y-6">
              {/* Location Selector */}
              <div>
                <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
                  Location
                </label>
                <select
                  id="location"
                  value={selectedLocation}
                  onChange={(e) => setSelectedLocation(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                >
                  <option value="">Select location</option>
                  <optgroup label="Indonesia">
                    {locations.filter(loc => loc.type === 'city').map((location) => (
                      <option key={location.id} value={location.name}>
                        {location.name}
                      </option>
                    ))}
                  </optgroup>
                  <optgroup label="International">
                    {locations.filter(loc => loc.type === 'country').map((location) => (
                      <option key={location.id} value={location.name}>
                        {location.name}
                      </option>
                    ))}
                  </optgroup>
                </select>
              </div>
              
              {/* Date Selector */}
              <div>
                <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">
                  Date
                </label>
                <input
                  type="date"
                  id="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  min={new Date().toISOString().split('T')[0]}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                />
              </div>
              
              {/* Trust Indicators */}
              <div className="bg-purple-50 rounded-lg p-4">
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-purple-900">Guaranteed Service</h3>
                    <p className="mt-1 text-sm text-purple-700">
                      Automatic replacement if your photographer can&apos;t make it. Never worry about no-shows.
                    </p>
                  </div>
                </div>
              </div>
              
              {/* CTA Buttons */}
              <div className="space-y-3">
                <button
                  onClick={handleFindPhotographer}
                  className="w-full bg-gradient-to-r from-purple-600 to-indigo-700 text-white font-bold py-3 px-4 rounded-lg hover:from-purple-700 hover:to-indigo-800 transition duration-300 transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
                >
                  Find Perfect Photographer
                </button>
                
                <button
                  onClick={handleJoinAsPhotographer}
                  className="w-full bg-white border border-purple-600 text-purple-700 font-bold py-3 px-4 rounded-lg hover:bg-purple-50 transition duration-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
                >
                  Join as Photographer
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;