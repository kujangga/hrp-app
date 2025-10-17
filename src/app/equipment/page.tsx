'use client';

import React, { useState } from 'react';
import { useSession } from 'next-auth/react';
import Link from 'next/link';

const EquipmentPage = () => {
  const { data: session } = useSession();
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const equipmentItems = [
    {
      id: 1,
      name: 'Professional Camera Body',
      price: 'Rp 500,000/day',
      category: 'Cameras',
      image: '/placeholder-camera.jpg',
      features: ['Full Frame Sensor', '4K Video', 'Weather Sealed', '24.2 MP Resolution'],
      description: 'High-quality camera for professional photography and videography with exceptional image quality.'
    },
    {
      id: 2,
      name: 'Drone with Gimbal',
      price: 'Rp 350,000/day',
      category: 'Aerial',
      image: '/placeholder-drone.jpg',
      features: ['4K Video', 'GPS Stabilization', '20min Flight', 'Foldable Design'],
      description: 'Professional drone for capturing stunning aerial shots with smooth gimbal stabilization.'
    },
    {
      id: 3,
      name: 'Professional Lighting Kit',
      price: 'Rp 250,000/day',
      category: 'Lighting',
      image: '/placeholder-lighting.jpg',
      features: ['LED Panel', 'Softbox Included', 'Battery Powered', 'Adjustable Color Temperature'],
      description: 'Complete lighting solution for studio and outdoor photography with adjustable brightness.'
    },
    {
      id: 4,
      name: 'Professional Audio Kit',
      price: 'Rp 200,000/day',
      category: 'Audio',
      image: '/placeholder-audio.jpg',
      features: ['Wireless Mics', 'Audio Mixer', 'Digital Recorder', 'XLR Connectors'],
      description: 'Professional audio setup for high-quality sound recording during video shoots.'
    },
    {
      id: 5,
      name: 'Stabilizer Gimbal',
      price: 'Rp 180,000/day',
      category: 'Stabilizers',
      image: '/placeholder-gimbal.jpg',
      features: ['3-Axis Stabilization', 'Pan-Follow Mode', 'Camera Control', '12 Hour Battery'],
      description: 'Advanced gimbal system for smooth, cinematic camera movements and shots.'
    },
    {
      id: 6,
      name: 'Travel Tripod',
      price: 'Rp 120,000/day',
      category: 'Support',
      image: '/placeholder-tripod.jpg',
      features: ['Aluminum Construction', 'Adjustable Height', 'Panoramic Head', 'Carry Bag Included'],
      description: 'Lightweight yet sturdy tripod for all your photography needs while traveling.'
    }
  ];

  const categories = [
    { id: 'all', name: 'All Equipment' },
    { id: 'cameras', name: 'Cameras' },
    { id: 'aerial', name: 'Aerial' },
    { id: 'lighting', name: 'Lighting' },
    { id: 'audio', name: 'Audio' },
    { id: 'stabilizers', name: 'Stabilizers' },
    { id: 'support', name: 'Support' }
  ];

  const bundleSavings = [
    '25% discount on photographer + equipment bundles',
    'Free transport for orders over 5 items',
    'Priority availability during peak seasons'
  ];

  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredEquipment = equipmentItems.filter(item => {
    const matchesCategory = selectedCategory === 'all' || 
      item.category.toLowerCase().includes(selectedCategory);
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

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
    <div className="min-h-screen bg-gradient-to-b from-white to-purple-50">
      {/* Hero Section */}
      <section className="py-16 px-4 bg-gradient-to-r from-indigo-600 to-purple-700 text-white">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Professional Equipment Rental</h1>
          <p className="text-xl text-indigo-100 mb-8 max-w-3xl mx-auto">
            Access high-quality photography and videography equipment for your projects. 
            From cameras to drones, lighting to audio - everything you need to bring your vision to life.
          </p>
          <div className="flex justify-center space-x-4">
            <Link 
              href="/#equipment" 
              className="bg-white text-indigo-600 font-semibold py-3 px-6 rounded-lg hover:bg-gray-100 transition duration-300"
            >
              Browse Equipment
            </Link>
            <Link 
              href="/#contact" 
              className="bg-transparent border-2 border-white text-white font-semibold py-3 px-6 rounded-lg hover:bg-white hover:text-indigo-600 transition duration-300"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="p-6">
              <div className="text-4xl font-bold text-indigo-600 mb-2">500+</div>
              <div className="text-gray-600">Equipment Items</div>
            </div>
            <div className="p-6">
              <div className="text-4xl font-bold text-indigo-600 mb-2">4,500+</div>
              <div className="text-gray-600">Bookings Completed</div>
            </div>
            <div className="p-6">
              <div className="text-4xl font-bold text-indigo-600 mb-2">99%</div>
              <div className="text-gray-600">Customer Satisfaction</div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Equipment Carousel */}
      <section id="featured" className="py-16 px-4 bg-gradient-to-b from-white to-purple-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Featured Equipment
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Check out our most popular equipment rentals for your next project
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
                {equipmentItems.slice(0, 3).map((item, index) => (
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
                        <p className="text-gray-600 mb-4">{item.description}</p>
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
              {equipmentItems.slice(0, 3).map((_, index) => (
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
        </div>
      </section>

      {/* Full Inventory Section */}
      <section id="inventory" className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Full Equipment Inventory
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Browse our complete equipment catalog and find everything you need
            </p>
          </div>

          {/* Search and Filter */}
          <div className="mb-8 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="w-full md:w-1/3">
              <input
                type="text"
                placeholder="Search equipment..."
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category.id}
                  className={`px-4 py-2 rounded-full text-sm font-medium ${
                    selectedCategory === category.id
                      ? 'bg-indigo-600 text-white'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                  onClick={() => setSelectedCategory(category.id)}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>

          {/* Equipment Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredEquipment.map((item) => (
              <div key={item.id} className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-xl transition duration-300">
                <div className="p-6">
                  <div className="bg-gray-200 border-2 border-dashed rounded-xl w-full h-48 mb-4 flex items-center justify-center">
                    <span className="text-gray-500">Image: {item.name}</span>
                  </div>
                  <div className="inline-block bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-sm font-medium mb-3">
                    {item.category}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{item.name}</h3>
                  <p className="text-gray-600 mb-4 text-sm">{item.description}</p>
                  <div className="flex justify-between items-center mb-4">
                    <p className="text-xl font-bold text-indigo-600">{item.price}</p>
                    <button className="bg-indigo-100 hover:bg-indigo-200 text-indigo-700 font-medium py-2 px-4 rounded-lg transition duration-300">
                      View Details
                    </button>
                  </div>
                  <div className="space-y-1">
                    <h4 className="font-semibold text-gray-800 text-sm">Features:</h4>
                    <ul className="space-y-1">
                      {item.features.slice(0, 3).map((feature, idx) => (
                        <li key={idx} className="flex items-center text-xs">
                          <svg className="w-3 h-3 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-gradient-to-r from-indigo-600 to-purple-700 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Rent Professional Equipment?</h2>
          <p className="text-xl text-indigo-100 mb-8">
            Join thousands of photographers and videographers who trust our equipment for their projects.
          </p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <Link 
              href="/booking" 
              className="bg-white text-indigo-600 font-bold py-4 px-8 rounded-lg text-lg hover:bg-gray-100 transition duration-300"
            >
              Book Equipment Now
            </Link>
            <Link 
              href="/contact" 
              className="bg-transparent border-2 border-white text-white font-bold py-4 px-8 rounded-lg text-lg hover:bg-white hover:text-indigo-600 transition duration-300"
            >
              Contact Support
            </Link>
          </div>
        </div>
      </section>
      
      {/* Trust Section */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Verified Equipment</h3>
              <p className="text-gray-600">All equipment is professionally maintained and verified for quality</p>
            </div>
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Secure Transactions</h3>
              <p className="text-gray-600">All bookings are secure with our guarantee and insurance coverage</p>
            </div>
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Fast Delivery</h3>
              <p className="text-gray-600">Equipment delivered on time and ready to use for your shoot</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default EquipmentPage;