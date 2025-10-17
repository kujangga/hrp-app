'use client';

import React from 'react';
import Link from 'next/link';

const ServiceGatewaySection = () => {
  const services = [
    {
      id: 1,
      title: 'Talent Directory (Photographers & Videographers)',
      description: 'Browse our curated selection of graded professionals for your photography and videography needs',
      icon: (
        <svg className="w-12 h-12 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
      cta: 'Browse Talent',
      link: '/talent',
      gradient: 'from-purple-500 to-indigo-600',
      features: ['Grade System A-E', 'Real-time Availability', 'Portfolio Preview']
    },
    {
      id: 2,
      title: 'Equipment Rental',
      description: 'Rent professional photography and videography equipment for your productions',
      icon: (
        <svg className="w-12 h-12 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      ),
      cta: 'Rent Gear',
      link: '/equipment',
      gradient: 'from-blue-500 to-teal-600',
      features: ['High-quality Gear', 'Flexible Rental Periods', 'Equipment Bundles']
    },
    {
      id: 3,
      title: 'Team Transport',
      description: 'Professional transportation services for your photography teams',
      icon: (
        <svg className="w-12 h-12 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
      cta: 'Book Transport',
      link: '/transport',
      gradient: 'from-green-500 to-emerald-600',
      features: ['Reliable Vehicles', 'Nation-wide Coverage', 'Professional Drivers']
    }
  ];

  return (
    <section className="py-16 bg-gradient-to-b from-gray-50 to-white px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Your Complete Production Marketplace
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Access all our services from one platform - talent, equipment, and transport in a single solution
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service) => (
            <div 
              key={service.id} 
              className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
            >
              <div className={`p-8 bg-gradient-to-r ${service.gradient} text-white`}>
                <div className="flex justify-center mb-6">
                  {service.icon}
                </div>
                <h3 className="text-xl font-bold text-center">{service.title}</h3>
              </div>
              
              <div className="p-8">
                <p className="text-gray-600 text-center mb-6">{service.description}</p>
                
                <div className="mb-6">
                  <ul className="space-y-2">
                    {service.features.map((feature, index) => (
                      <li key={index} className="flex items-center">
                        <svg className="w-4 h-4 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <Link href={service.link} passHref>
                  <button className={`w-full py-3 px-6 rounded-lg font-bold text-white bg-gradient-to-r ${service.gradient} hover:opacity-90 transition-opacity`}>
                    {service.cta}
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServiceGatewaySection;