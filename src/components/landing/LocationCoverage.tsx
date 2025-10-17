'use client';

import { useState } from 'react';

interface Location {
  id: string;
  name: string;
  type: 'city' | 'country';
  photographerCount: number;
  coordinates: { x: number; y: number };
}

const LocationCoverage = () => {
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null);
  const [viewMode, setViewMode] = useState<'indonesia' | 'international'>('indonesia');
  
  // Mock location data
  const locations: Location[] = [
    // Indonesia cities
    { id: '1', name: 'Jakarta', type: 'city', photographerCount: 342, coordinates: { x: 45, y: 60 } },
    { id: '2', name: 'Bandung', type: 'city', photographerCount: 127, coordinates: { x: 42, y: 65 } },
    { id: '3', name: 'Bali', type: 'city', photographerCount: 289, coordinates: { x: 65, y: 75 } },
    { id: '4', name: 'Surabaya', type: 'city', photographerCount: 98, coordinates: { x: 55, y: 68 } },
    { id: '5', name: 'Yogyakarta', type: 'city', photographerCount: 76, coordinates: { x: 48, y: 72 } },
    { id: '6', name: 'Medan', type: 'city', photographerCount: 65, coordinates: { x: 52, y: 45 } },
    { id: '7', name: 'Makassar', type: 'city', photographerCount: 54, coordinates: { x: 72, y: 82 } },
    
    // International countries
    { id: '8', name: 'Singapore', type: 'country', photographerCount: 87, coordinates: { x: 60, y: 85 } },
    { id: '9', name: 'Malaysia', type: 'country', photographerCount: 123, coordinates: { x: 58, y: 78 } },
    { id: '10', name: 'Thailand', type: 'country', photographerCount: 95, coordinates: { x: 62, y: 70 } },
    { id: '11', name: 'Philippines', type: 'country', photographerCount: 78, coordinates: { x: 75, y: 72 } },
    { id: '12', name: 'Australia', type: 'country', photographerCount: 64, coordinates: { x: 85, y: 90 } }
  ];

  const filteredLocations = locations.filter(loc => 
    viewMode === 'indonesia' ? loc.type === 'city' : loc.type === 'country'
  );

  const handleLocationClick = (location: Location) => {
    setSelectedLocation(location);
  };

  const handleRequestLocation = () => {
    // In a real app, this would open a form or modal
    alert('Thank you for your interest! We will notify you when we expand to this location.');
  };

  return (
    <div className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-base font-semibold text-purple-600 tracking-wide uppercase">Coverage Map</h2>
          <p className="mt-2 text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Extensive Network Across Indonesia and Beyond
          </p>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 mx-auto">
            Find talented photographers in major cities across Indonesia and select international destinations
          </p>
        </div>

        {/* View Toggle */}
        <div className="mt-12 flex justify-center">
          <div className="inline-flex rounded-md shadow-sm" role="group">
            <button
              type="button"
              className={`px-6 py-3 text-base font-medium rounded-l-lg ${
                viewMode === 'indonesia'
                  ? 'bg-purple-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
              onClick={() => setViewMode('indonesia')}
            >
              Indonesia
            </button>
            <button
              type="button"
              className={`px-6 py-3 text-base font-medium rounded-r-lg ${
                viewMode === 'international'
                  ? 'bg-purple-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
              onClick={() => setViewMode('international')}
            >
              International
            </button>
          </div>
        </div>

        {/* Map Visualization */}
        <div className="mt-12">
          <div className="relative bg-gradient-to-br from-blue-50 to-indigo-100 rounded-2xl p-8 overflow-hidden">
            {/* Decorative elements */}
            <div className="absolute top-0 left-0 w-full h-full opacity-10">
              <div className="absolute top-10 left-10 w-32 h-32 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl"></div>
              <div className="absolute bottom-10 right-10 w-48 h-48 bg-indigo-300 rounded-full mix-blend-multiply filter blur-xl"></div>
            </div>
            
            {/* Map Container */}
            <div className="relative bg-white rounded-xl shadow-lg p-6 h-96 md:h-[500px]">
              {/* Map Title */}
              <div className="text-center mb-6">
                <h3 className="text-xl font-bold text-gray-900">
                  {viewMode === 'indonesia' ? 'Indonesia Coverage' : 'International Coverage'}
                </h3>
                <p className="text-gray-600">
                  {viewMode === 'indonesia' 
                    ? 'Major cities across Indonesia' 
                    : 'Selected international destinations'}
                </p>
              </div>
              
              {/* Map Visualization */}
              <div className="relative w-full h-full bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg border-2 border-dashed border-gray-300">
                {/* Simplified map representation */}
                {filteredLocations.map((location) => (
                  <div
                    key={location.id}
                    className={`absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-all duration-300 ${
                      selectedLocation?.id === location.id
                        ? 'z-10 scale-125'
                        : 'hover:scale-110'
                    }`}
                    style={{
                      left: `${location.coordinates.x}%`,
                      top: `${location.coordinates.y}%`
                    }}
                    onClick={() => handleLocationClick(location)}
                  >
                    <div className="flex flex-col items-center">
                      <div className={`flex items-center justify-center w-10 h-10 rounded-full ${
                        location.type === 'city' 
                          ? 'bg-purple-600 text-white' 
                          : 'bg-indigo-600 text-white'
                      } shadow-lg`}>
                        <span className="font-bold text-sm">{location.photographerCount}</span>
                      </div>
                      <div className={`mt-2 px-2 py-1 rounded text-xs font-medium whitespace-nowrap ${
                        selectedLocation?.id === location.id
                          ? 'bg-purple-600 text-white'
                          : 'bg-white text-gray-800 shadow'
                      }`}>
                        {location.name}
                      </div>
                    </div>
                  </div>
                ))}
                
                {/* Map Legend */}
                <div className="absolute bottom-4 left-4 bg-white p-3 rounded-lg shadow-md">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center">
                      <div className="w-4 h-4 bg-purple-600 rounded-full mr-2"></div>
                      <span className="text-sm text-gray-700">Cities</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-4 h-4 bg-indigo-600 rounded-full mr-2"></div>
                      <span className="text-sm text-gray-700">Countries</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Location Details */}
        {selectedLocation && (
          <div className="mt-8 bg-purple-50 rounded-2xl p-6 max-w-3xl mx-auto">
            <div className="flex flex-col md:flex-row items-center">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-16 w-16 rounded-full bg-purple-600 text-white text-xl font-bold">
                  {selectedLocation.photographerCount}
                </div>
              </div>
              <div className="mt-4 md:mt-0 md:ml-6 text-center md:text-left">
                <h3 className="text-xl font-bold text-gray-900">
                  {selectedLocation.name}
                </h3>
                <p className="mt-1 text-gray-600">
                  {selectedLocation.photographerCount} verified photographers available
                </p>
                <div className="mt-3">
                  <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700">
                    Book a Photographer
                    <svg className="ml-2 -mr-1 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Request New Location */}
        <div className="mt-16 max-w-3xl mx-auto">
          <div className="bg-gradient-to-r from-purple-600 to-indigo-700 rounded-2xl p-8 text-white text-center">
            <h3 className="text-2xl font-bold">Don&apos;t see your location?</h3>
            <p className="mt-2 text-purple-100">
              We&apos;re constantly expanding our network. Request your city or country and we&apos;ll notify you when we launch there.
            </p>
            <div className="mt-6 flex flex-col sm:flex-row justify-center space-y-3 sm:space-y-0 sm:space-x-3">
              <input
                type="text"
                placeholder="Enter city or country"
                className="px-4 py-3 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-500 w-full sm:w-auto"
              />
              <button
                onClick={handleRequestLocation}
                className="px-6 py-3 bg-white text-purple-700 font-bold rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-white"
              >
                Request Location
              </button>
            </div>
          </div>
        </div>

        {/* Coverage Stats */}
        <div className="mt-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { 
                number: "15+", 
                label: "Indonesian Cities", 
                description: "Major cities across Java, Sumatra, Sulawesi, and Bali" 
              },
              { 
                number: "12", 
                label: "Countries", 
                description: "International destinations in Southeast Asia and Oceania" 
              },
              { 
                number: "1,247+", 
                label: "Photographers", 
                description: "Verified professionals in our network" 
              }
            ].map((stat, index) => (
              <div key={index} className="text-center p-6 bg-gray-50 rounded-xl">
                <p className="text-4xl font-bold text-purple-600">{stat.number}</p>
                <p className="mt-2 text-xl font-semibold text-gray-900">{stat.label}</p>
                <p className="mt-2 text-gray-600">{stat.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LocationCoverage;