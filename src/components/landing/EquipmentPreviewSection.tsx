'use client';

import React, { useState } from 'react';

const EquipmentPreviewSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const equipmentItems = [
    {
      id: 1,
      name: 'Professional Camera Body',
      price: 'Rp 500,000/day',
      category: 'Cameras',
      image: '/placeholder-camera.jpg',
      features: ['Full Frame Sensor', '4K Video', 'Weather Sealed']
    },
    {
      id: 2,
      name: 'Drone with Gimbal',
      price: 'Rp 350,000/day',
      category: 'Aerial',
      image: '/placeholder-drone.jpg',
      features: ['4K Video', 'GPS Stabilization', '20min Flight']
    },
    {
      id: 3,
      name: 'Professional Lighting Kit',
      price: 'Rp 250,000/day',
      category: 'Lighting',
      image: '/placeholder-lighting.jpg',
      features: ['LED Panel', 'Softbox Included', 'Battery Powered']
    },
    {
      id: 4,
      name: 'Professional Audio Kit',
      price: 'Rp 200,000/day',
      category: 'Audio',
      image: '/placeholder-audio.jpg',
      features: ['Wireless Mics', 'Audio Mixer', 'Record Player']
    }
  ];

  const bundleSavings = [
    '25% discount on photographer + equipment bundles',
    'Free transport for orders over 5 items',
    'Priority availability during peak seasons'
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === equipmentItems.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? equipmentItems.length - 1 : prev - 1));
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  return (
    <section className="py-16 px-4 bg-gradient-to-b from-white to-purple-50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Need Gear? Rent Professional Equipment Seamlessly.
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            High-quality equipment available for rent. All-in-one solution for your photography and videography needs.
          </p>
        </div>

        {/* Bundle Savings Callout */}
        <div className="bg-indigo-50 border border-indigo-100 rounded-xl p-6 mb-12">
          <h3 className="text-xl font-semibold text-indigo-900 mb-3">Bundle Package Savings</h3>
          <p className="text-indigo-700 mb-4">
            Save big when you book talent, equipment, and transport together!
          </p>
          <ul className="space-y-2">
            {bundleSavings.map((savings, index) => (
              <li key={index} className="flex items-center text-indigo-700">
                <svg className="w-5 h-5 text-indigo-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                {savings}
              </li>
            ))}
          </ul>
        </div>

        {/* Equipment Carousel */}
        <div className="mb-10">
          <div className="relative overflow-hidden rounded-2xl bg-white shadow-xl">
            {/* Carousel Slide */}
            <div className="flex transition-transform duration-500 ease-in-out" style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
              {equipmentItems.map((item, index) => (
                <div key={index} className="w-full flex-shrink-0 px-4 py-8">
                  <div className="flex flex-col md:flex-row items-center">
                    <div className="md:w-1/2 mb-6 md:mb-0 md:pr-8 flex justify-center">
                      <div className="bg-gray-200 border-2 border-dashed rounded-xl w-64 h-64 flex items-center justify-center">
                        <span className="text-gray-500">Equipment Image: {item.name}</span>
                      </div>
                    </div>
                    <div className="md:w-1/2 text-center md:text-left">
                      <div className="inline-block bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-sm font-medium mb-3">
                        {item.category}
                      </div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-2">{item.name}</h3>
                      <p className="text-2xl font-bold text-indigo-600 mb-4">{item.price}</p>
                      <div className="mb-6">
                        <h4 className="font-semibold text-gray-900 mb-2">Key Features:</h4>
                        <ul className="space-y-1">
                          {item.features.map((feature, idx) => (
                            <li key={idx} className="flex items-center">
                              <svg className="w-4 h-4 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                              </svg>
                              {feature}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <button className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-6 rounded-lg transition duration-300">
                        Rent Equipment
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Carousel Controls */}
            <button 
              onClick={prevSlide}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-lg hover:bg-gray-50 transition"
              aria-label="Previous equipment"
            >
              <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button 
              onClick={nextSlide}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-lg hover:bg-gray-50 transition"
              aria-label="Next equipment"
            >
              <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          {/* Carousel Indicators */}
          <div className="flex justify-center mt-6 space-x-2">
            {equipmentItems.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full ${
                  currentSlide === index ? 'bg-indigo-600' : 'bg-gray-300'
                }`}
                aria-label={`Go to equipment ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* CTA Button */}
        <div className="text-center">
          <button className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-bold py-4 px-8 rounded-lg text-lg shadow-lg transition duration-300 transform hover:scale-105">
            Explore Full Inventory
          </button>
        </div>
      </div>
    </section>
  );
};

export default EquipmentPreviewSection;