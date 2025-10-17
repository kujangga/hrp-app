'use client';

import { useState } from 'react';

const HowItWorks = () => {
  const [activeTab, setActiveTab] = useState<'client' | 'photographer'>('client');
  
  const clientSteps = [
    {
      id: 1,
      title: "Select Location & Date",
      description: "Choose your preferred location and date for the photography service",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      )
    },
    {
      id: 2,
      title: "Choose Photographer",
      description: "Browse and select from our graded photographers based on your needs",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      )
    },
    {
      id: 3,
      title: "Smart Replacement",
      description: "If needed, our system automatically finds a replacement with same grade",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
        </svg>
      )
    },
    {
      id: 4,
      title: "Confirm Booking",
      description: "Review and confirm your booking with secure payment processing",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    }
  ];
  
  const photographerSteps = [
    {
      id: 1,
      title: "Create Profile",
      description: "Set up your professional profile with portfolio and specialties",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      )
    },
    {
      id: 2,
      title: "Get Graded",
      description: "Our team evaluates your skills and assigns a professional grade",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      )
    },
    {
      id: 3,
      title: "Set Availability",
      description: "Manage your calendar and set when you're available for bookings",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      )
    },
    {
      id: 4,
      title: "Receive Bookings",
      description: "Get notified of new bookings and manage your photography schedule",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
        </svg>
      )
    }
  ];

  return (
    <div className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-base font-semibold text-purple-600 tracking-wide uppercase">How It Works</h2>
          <p className="mt-2 text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Simple Process, Exceptional Results
          </p>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 mx-auto">
            Whether you&apos;re booking a photographer or joining our team, our process is designed for simplicity and reliability
          </p>
        </div>

        {/* Tabs for Client vs Photographer */}
        <div className="mt-12">
          <div className="flex justify-center">
            <div className="inline-flex rounded-md shadow-sm" role="group">
              <button
                type="button"
                className={`px-6 py-3 text-base font-medium rounded-l-lg ${
                  activeTab === 'client'
                    ? 'bg-purple-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
                onClick={() => setActiveTab('client')}
              >
                For Clients
              </button>
              <button
                type="button"
                className={`px-6 py-3 text-base font-medium rounded-r-lg ${
                  activeTab === 'photographer'
                    ? 'bg-purple-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
                onClick={() => setActiveTab('photographer')}
              >
                For Photographers
              </button>
            </div>
          </div>

          {/* Timeline */}
          <div className="mt-16">
            <div className="relative">
              {/* Vertical line */}
              <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-purple-200"></div>
              
              {/* Steps */}
              <div className="space-y-12">
                {(activeTab === 'client' ? clientSteps : photographerSteps).map((step, index) => (
                  <div 
                    key={step.id} 
                    className={`relative flex flex-col md:flex-row ${
                      index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                    } items-center`}
                  >
                    {/* Step number and line connector for mobile */}
                    <div className="md:hidden flex items-center justify-center mb-4">
                      <div className="flex items-center justify-center h-10 w-10 rounded-full bg-purple-600 text-white font-bold">
                        {step.id}
                      </div>
                      {index < (activeTab === 'client' ? clientSteps.length : photographerSteps.length) - 1 && (
                        <div className="h-12 w-0.5 bg-purple-200"></div>
                      )}
                    </div>
                    
                    {/* Left side - Icon and number */}
                    <div className={`hidden md:flex items-center justify-center flex-shrink-0 w-1/2 ${
                      index % 2 === 0 ? 'md:justify-end pr-8' : 'md:justify-start pl-8'
                    }`}>
                      <div className="relative">
                        <div className="flex items-center justify-center h-16 w-16 rounded-full bg-purple-100">
                          <div className="flex items-center justify-center h-12 w-12 rounded-full bg-purple-600 text-white">
                            {step.icon}
                          </div>
                        </div>
                        <div className="absolute top-0 right-0 flex items-center justify-center h-8 w-8 rounded-full bg-white border-2 border-purple-600 text-purple-600 font-bold">
                          {step.id}
                        </div>
                      </div>
                    </div>
                    
                    {/* Right side - Content */}
                    <div className={`mt-4 md:mt-0 md:w-1/2 ${
                      index % 2 === 0 ? 'md:pl-8' : 'md:pr-8 md:text-right'
                    }`}>
                      <div className="bg-white p-6 rounded-xl shadow-md">
                        <h3 className="text-xl font-bold text-gray-900">{step.title}</h3>
                        <p className="mt-2 text-gray-600">{step.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Additional Info */}
        <div className="mt-20 bg-gradient-to-r from-purple-600 to-indigo-700 rounded-2xl p-8 text-white">
          <div className="max-w-3xl mx-auto text-center">
            <h3 className="text-2xl font-bold">Why Our Process Works</h3>
            <p className="mt-4 text-lg text-purple-100">
              Our streamlined approach combines technology and human expertise to ensure you get exactly what you need, 
              when you need it, with complete peace of mind.
            </p>
            <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { title: "Real-time Availability", description: "Instant booking confirmation with live availability" },
                { title: "Quality Assurance", description: "Verified photographers with transparent grading" },
                { title: "Smart Matching", description: "Automatic pairing based on your specific requirements" }
              ].map((item, index) => (
                <div key={index} className="p-4 bg-white bg-opacity-10 rounded-lg">
                  <h4 className="font-bold">{item.title}</h4>
                  <p className="mt-2 text-sm text-purple-100">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;