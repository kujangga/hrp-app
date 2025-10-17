'use client';

import { useState } from 'react';

const ServicesSection = () => {
  const [activeService, setActiveService] = useState(0);
  
  const services = [
    {
      id: 1,
      title: "Smart Replacement System",
      description: "Never worry about no-shows. If your photographer can't make it, we automatically replace them with another professional of the same grade.",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
        </svg>
      ),
      features: [
        "Automatic replacement guarantee",
        "Same grade assurance",
        "24/7 backup support",
        "Zero additional cost"
      ]
    },
    {
      id: 2,
      title: "Grade System Intelligence",
      description: "Our A-E grading system with premium visualization ensures you know exactly what quality level you're getting, from entry-level to premium professionals.",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      features: [
        "Transparent quality indicators",
        "Price-quality correlation",
        "Tiered professional standards",
        "Performance tracking"
      ]
    },
    {
      id: 3,
      title: "Core Intelligence Platform",
      description: "Beyond photographers, book equipment rentals and transportation in one place for your complete production needs.",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
        </svg>
      ),
      features: [
        "Smart availability matching",
        "Grade-consistency guarantee",
        "Multi-service integration",
        "Real-time booking updates"
      ]
    }
  ];

  // Grade system visualization data
  const grades = [
    {
      id: 'A',
      name: 'Premium Grade A',
      description: 'Industry-leading professionals with extensive portfolios',
      priceRange: 'Rp 2,500,000 - 5,000,000',
      badgeColor: 'from-yellow-400 to-yellow-600',
      features: ['Top-tier quality', 'High-end equipment', 'Exclusive access']
    },
    {
      id: 'B',
      name: 'Professional Grade B',
      description: 'Experienced professionals with consistent quality',
      priceRange: 'Rp 1,500,000 - 2,500,000',
      badgeColor: 'from-gray-400 to-gray-600',
      features: ['High quality', 'Good equipment', 'Reliable service']
    },
    {
      id: 'C',
      name: 'Standard Grade C',
      description: 'Competent professionals with solid portfolios',
      priceRange: 'Rp 750,000 - 1,500,000',
      badgeColor: 'from-blue-400 to-blue-600',
      features: ['Good quality', 'Basic equipment', 'Consistent service']
    }
  ];

  return (
    <div className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-base font-semibold text-purple-600 tracking-wide uppercase">Core Intelligence</h2>
          <p className="mt-2 text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Smart Talent Matching & Rental Platform
          </p>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 mx-auto">
            Our innovative platform with smart replacement and grade system ensures the perfect match for your photography needs
          </p>
        </div>

        <div className="mt-16">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Service Cards */}
            <div className="lg:col-span-1">
              <div className="space-y-6">
                {services.map((service, index) => (
                  <div
                    key={service.id}
                    className={`p-6 rounded-xl cursor-pointer transition-all duration-300 ${
                      activeService === index
                        ? 'bg-white shadow-lg border-2 border-purple-500'
                        : 'bg-white hover:shadow-md'
                    }`}
                    onClick={() => setActiveService(index)}
                  >
                    <div className="flex items-start">
                      <div className={`flex-shrink-0 p-2 rounded-lg ${
                        activeService === index 
                          ? 'bg-purple-100 text-purple-600' 
                          : 'bg-gray-100 text-gray-600'
                      }`}>
                        {service.icon}
                      </div>
                      <div className="ml-4">
                        <h3 className={`text-lg font-medium ${
                          activeService === index ? 'text-purple-700' : 'text-gray-900'
                        }`}>
                          {service.title}
                        </h3>
                        <p className="mt-2 text-gray-600 text-sm">
                          {service.description}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Active Service Detail */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl shadow-lg p-8 h-full">
                <div className="flex items-center">
                  <div className="flex-shrink-0 p-3 bg-purple-100 text-purple-600 rounded-lg">
                    {services[activeService].icon}
                  </div>
                  <h3 className="ml-4 text-2xl font-bold text-gray-900">
                    {services[activeService].title}
                  </h3>
                </div>
                
                <p className="mt-6 text-lg text-gray-600">
                  {services[activeService].description}
                </p>
                
                <div className="mt-8">
                  <h4 className="text-lg font-semibold text-gray-900">Key Features</h4>
                  <ul className="mt-4 space-y-3">
                    {services[activeService].features.map((feature, index) => (
                      <li key={index} className="flex items-start">
                        <div className="flex-shrink-0">
                          <svg className="h-5 w-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <p className="ml-3 text-gray-700">{feature}</p>
                      </li>
                    ))}
                  </ul>
                </div>
                
                {/* Interactive Demo */}
                {activeService === 0 && (
                  <div className="mt-10 p-6 bg-purple-50 rounded-lg">
                    <h4 className="text-lg font-semibold text-purple-900">How Smart Replacement Works</h4>
                    <div className="mt-4 flex items-center justify-between flex-wrap">
                      <div className="text-center mb-4 min-w-[120px]">
                        <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-white shadow">
                          <span className="text-lg font-bold text-purple-600">1</span>
                        </div>
                        <p className="mt-2 text-sm text-purple-800">Book Photographer</p>
                      </div>
                      <div className="h-0.5 w-16 bg-purple-300 hidden sm:block"></div>
                      <div className="text-center mb-4 min-w-[120px]">
                        <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-white shadow">
                          <span className="text-lg font-bold text-purple-600">2</span>
                        </div>
                        <p className="mt-2 text-sm text-purple-800">Monitor Status</p>
                      </div>
                      <div className="h-0.5 w-16 bg-purple-300 hidden sm:block"></div>
                      <div className="text-center mb-4 min-w-[120px]">
                        <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-white shadow">
                          <span className="text-lg font-bold text-purple-600">3</span>
                        </div>
                        <p className="mt-2 text-sm text-purple-800">Automatic Replacement</p>
                      </div>
                      <div className="h-0.5 w-16 bg-purple-300 hidden sm:block"></div>
                      <div className="text-center mb-4 min-w-[120px]">
                        <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-500 shadow">
                          <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <p className="mt-2 text-sm text-purple-800">Guaranteed Service</p>
                      </div>
                    </div>
                    <div className="mt-6 bg-white p-4 rounded-lg">
                      <div className="flex items-start">
                        <div className="flex-shrink-0">
                          <svg className="h-5 w-5 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        </div>
                        <p className="ml-3 text-sm text-gray-700">
                          <span className="font-medium text-purple-700">Did you know?</span> Our smart replacement system has a 98% success rate in finding suitable replacements with the same grade.
                        </p>
                      </div>
                    </div>
                  </div>
                )}
                
                {/* Grade System Visualization - Only show for Grade System Intelligence section */}
                {activeService === 1 && (
                  <div className="mt-10">
                    <h4 className="text-lg font-semibold text-gray-900 mb-6">Grade System Visualization</h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      {grades.map((grade) => (
                        <div key={grade.id} className="border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition-shadow">
                          <div className={`h-2 bg-gradient-to-r ${grade.badgeColor}`}></div>
                          <div className="p-5">
                            <div className="flex justify-between items-start">
                              <div>
                                <h5 className="text-xl font-bold text-gray-900">Grade {grade.id}</h5>
                                <p className="text-gray-600 mt-1">{grade.name}</p>
                              </div>
                              <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-bold ${grade.badgeColor} bg-gradient-to-r text-white`}>
                                Premium
                              </span>
                            </div>
                            <p className="mt-3 text-gray-700">{grade.description}</p>
                            <div className="mt-4">
                              <p className="font-bold text-indigo-600">{grade.priceRange}</p>
                            </div>
                            <ul className="mt-4 space-y-2">
                              {grade.features.map((feature, idx) => (
                                <li key={idx} className="flex items-center text-sm text-gray-600">
                                  <svg className="w-4 h-4 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 00-1.414 0l-8 8a1 1 0 000 1.414l8 8a1 1 0 001.414-1.414L9.414 16 16.707 8.707a1 1 0 000-1.414z" clipRule="evenodd" />
                                  </svg>
                                  {feature}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="mt-6 text-center">
                      <button className="text-indigo-600 font-medium hover:text-indigo-800">
                        Learn More About Grading →
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        
        {/* Bundle Packages */}
        <div className="mt-20">
          <div className="text-center">
            <h3 className="text-2xl font-bold text-gray-900">Complete Production Packages</h3>
            <p className="mt-2 text-gray-600">Save more with our bundled services</p>
          </div>
          
          <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "Essential Package",
                description: "Perfect for small events and personal shoots",
                price: "Save 15%",
                features: ["Photographer", "Basic equipment", "Digital gallery"],
                color: "bg-blue-500"
              },
              {
                name: "Professional Package",
                description: "Ideal for corporate events and weddings",
                price: "Save 25%",
                features: ["Photographer + Assistant", "Premium equipment", "Digital gallery", "10 printed photos"],
                color: "bg-purple-500",
                popular: true
              },
              {
                name: "Premium Package",
                description: "Complete solution for large productions",
                price: "Save 35%",
                features: ["2 Photographers", "Full equipment set", "Transportation", "Digital gallery", "20 printed photos", "Album"],
                color: "bg-indigo-500"
              }
            ].map((bundle, index) => (
              <div key={index} className={`relative rounded-2xl shadow-lg overflow-hidden ${
                bundle.popular ? 'ring-2 ring-purple-500 transform scale-105' : 'bg-white'
              }`}>
                {bundle.popular && (
                  <div className="absolute top-0 right-0 bg-purple-500 text-white px-4 py-1 text-sm font-bold rounded-bl-lg">
                    MOST POPULAR
                  </div>
                )}
                <div className={`p-6 ${bundle.popular ? 'bg-purple-50' : 'bg-gray-50'}`}>
                  <h4 className="text-xl font-bold text-gray-900">{bundle.name}</h4>
                  <p className="mt-2 text-gray-600">{bundle.description}</p>
                  <div className="mt-4">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium text-white ${bundle.color}`}>
                      {bundle.price}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <ul className="space-y-3">
                    {bundle.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start">
                        <svg className="h-5 w-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="ml-3 text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <button className={`mt-6 w-full py-3 px-4 rounded-lg font-medium ${
                    bundle.popular 
                      ? 'bg-purple-600 text-white hover:bg-purple-700' 
                      : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                  }`}>
                    Select Package
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServicesSection;