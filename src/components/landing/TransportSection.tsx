'use client';

import React from 'react';

const TransportSection = () => {
  const vehicleTypes = [
    {
      id: 1,
      name: 'Luxury Van',
      capacity: '6-8 people',
      features: ['AC', 'Power Outlets', 'Wi-Fi', 'Comfortable Seating'],
      icon: '🚐'
    },
    {
      id: 2,
      name: 'Professional SUV',
      capacity: '4-5 people',
      features: ['All-Terrain', 'GPS Tracking', 'Premium Audio', 'Reclining Seats'],
      icon: '🚙'
    },
    {
      id: 3,
      name: 'Cargo Transport',
      capacity: 'Equipment & Gear',
      features: ['Climate Control', 'Secure Locks', 'GPS Tracking', 'Large Capacity'],
      icon: '🚚'
    }
  ];

  const benefits = [
    {
      title: 'Reliability',
      description: 'Punctual arrival and professional drivers',
      icon: (
        <svg className="w-8 h-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    },
    {
      title: 'Team Capacity',
      description: 'Perfect for crews of all sizes',
      icon: (
        <svg className="w-8 h-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      )
    },
    {
      title: 'Location Coverage',
      description: 'Nation-wide coverage with local expertise',
      icon: (
        <svg className="w-8 h-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      )
    }
  ];

  return (
    <section className="py-16 px-4 bg-gradient-to-b from-purple-50 to-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            On-Time, On-Budget Logistics for Your Team.
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Reliable transportation services for your photography and videography crews. 
            Professional vehicles with experienced drivers, available nationwide.
          </p>
        </div>

        {/* Vehicle Types */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {vehicleTypes.map((vehicle) => (
            <div key={vehicle.id} className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition duration-300">
              <div className="text-center mb-4">
                <div className="text-4xl mb-2">{vehicle.icon}</div>
                <h3 className="text-xl font-bold text-gray-900">{vehicle.name}</h3>
                <p className="text-gray-600">{vehicle.capacity}</p>
              </div>
              <ul className="space-y-2 mb-6">
                {vehicle.features.map((feature, index) => (
                  <li key={index} className="flex items-center">
                    <svg className="w-4 h-4 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>
              <button className="w-full bg-indigo-100 hover:bg-indigo-200 text-indigo-700 font-medium py-2 px-4 rounded-lg transition duration-300">
                Book Now
              </button>
            </div>
          ))}
        </div>

        {/* Key Benefits */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {benefits.map((benefit, index) => (
            <div key={index} className="text-center">
              <div className="flex justify-center mb-4">
                {benefit.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">{benefit.title}</h3>
              <p className="text-gray-600">{benefit.description}</p>
            </div>
          ))}
        </div>

        {/* Interactive Cost Calculator */}
        <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl p-8 text-white mb-10">
          <div className="max-w-3xl mx-auto">
            <h3 className="text-2xl font-bold mb-6 text-center">Calculate Your Transport Cost</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-sm font-medium mb-2">From Location</label>
                <input 
                  type="text" 
                  placeholder="Departure city" 
                  className="w-full bg-indigo-400 bg-opacity-30 border border-white border-opacity-30 rounded-lg py-3 px-4 text-white placeholder-indigo-200 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">To Location</label>
                <input 
                  type="text" 
                  placeholder="Destination city" 
                  className="w-full bg-indigo-400 bg-opacity-30 border border-white border-opacity-30 rounded-lg py-3 px-4 text-white placeholder-indigo-200 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Team Size</label>
                <select className="w-full bg-indigo-400 bg-opacity-30 border border-white border-opacity-30 rounded-lg py-3 px-4 text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50">
                  <option>1-3 people</option>
                  <option>4-6 people</option>
                  <option>7-10 people</option>
                  <option>10+ people</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Vehicle Type</label>
                <select className="w-full bg-indigo-400 bg-opacity-30 border border-white border-opacity-30 rounded-lg py-3 px-4 text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50">
                  <option>Luxury Van</option>
                  <option>Professional SUV</option>
                  <option>Cargo Transport</option>
                </select>
              </div>
            </div>

            <div className="text-center mb-6">
              <p className="text-sm text-indigo-200">Estimated Cost: <span className="text-2xl font-bold">Rp 1,500,000</span></p>
            </div>

            <button className="w-full bg-white text-indigo-600 font-bold py-3 px-6 rounded-lg hover:bg-gray-100 transition duration-300 shadow-lg">
              Calculate Transport Cost
            </button>
          </div>
        </div>

        {/* Main CTA */}
        <div className="text-center">
          <button className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-bold py-4 px-8 rounded-lg text-lg shadow-lg transition duration-300 transform hover:scale-105">
            Book Transport Service
          </button>
        </div>
      </div>
    </section>
  );
};

export default TransportSection;