'use client';

import React, { useState } from 'react';
import { useSession } from 'next-auth/react';
import Link from 'next/link';

const TransportPage = () => {
  const { data: session } = useSession();
  
  const vehicleTypes = [
    {
      id: 1,
      name: 'Luxury Van',
      capacity: '6-8 people',
      features: ['AC', 'Power Outlets', 'Wi-Fi', 'Comfortable Seating', 'Professional Driver'],
      price: 'Rp 1,200,000/day',
      description: 'Perfect for transporting your entire crew with comfort and style.',
      icon: '🚐'
    },
    {
      id: 2,
      name: 'Professional SUV',
      capacity: '4-5 people',
      features: ['All-Terrain', 'GPS Tracking', 'Premium Audio', 'Reclining Seats', 'Climate Control'],
      price: 'Rp 850,000/day',
      description: 'Ideal for smaller crews and challenging terrains.',
      icon: '🚙'
    },
    {
      id: 3,
      name: 'Cargo Transport',
      capacity: 'Equipment & Gear',
      features: ['Climate Control', 'Secure Locks', 'GPS Tracking', 'Large Capacity', 'Loading Ramp'],
      price: 'Rp 1,500,000/day',
      description: 'Safe and secure transportation for all your equipment and gear.',
      icon: '🚚'
    },
    {
      id: 4,
      name: 'Executive Sedan',
      capacity: '3-4 people',
      features: ['Premium Leather', 'Privacy Glass', 'Champagne Service', 'Professional Driver', 'Charging Ports'],
      price: 'Rp 950,000/day',
      description: 'Luxury option for VIP clients or small executive teams.',
      icon: '🚗'
    },
    {
      id: 5,
      name: 'Motorcycle Courier',
      capacity: 'Equipment Delivery',
      features: ['Fast Delivery', 'GPS Tracking', 'Secure Packaging', 'Same-Day Service', 'Flexible Scheduling'],
      price: 'Rp 300,000/day',
      description: 'Quick transport for urgent equipment delivery needs.',
      icon: '🏍️'
    },
    {
      id: 6,
      name: 'Hybrid Van',
      capacity: '4-6 people',
      features: ['Eco-Friendly', 'Fuel Efficient', 'Quiet Operation', 'Spacious Interior', 'Modern Amenities'],
      price: 'Rp 1,000,000/day',
      description: 'Environmentally friendly option with modern comfort features.',
      icon: '🚛'
    }
  ];

  const benefits = [
    {
      title: 'Reliability',
      description: 'Punctual arrival and professional drivers with extensive experience',
      icon: (
        <svg className="w-8 h-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    },
    {
      title: 'Team Capacity',
      description: 'Perfect for crews of all sizes and equipment needs',
      icon: (
        <svg className="w-8 h-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      )
    },
    {
      title: 'Location Coverage',
      description: 'Nation-wide coverage with local expertise and knowledge',
      icon: (
        <svg className="w-8 h-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      )
    },
    {
      title: 'Flexible Scheduling',
      description: '24/7 availability with custom scheduling options',
      icon: (
        <svg className="w-8 h-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    }
  ];

  const [costCalculation, setCostCalculation] = useState({
    from: '',
    to: '',
    teamSize: '1-3',
    vehicleType: 'luxury-van'
  });

  const [calculatedCost, setCalculatedCost] = useState(0);
  const [isCalculated, setIsCalculated] = useState(false);

  const calculateCost = () => {
    // Simple cost calculation logic (in a real app, this would be more complex)
    let baseCost = 0;
    switch(costCalculation.vehicleType) {
      case 'luxury-van': baseCost = 1200000; break;
      case 'professional-suv': baseCost = 850000; break;
      case 'cargo-transport': baseCost = 1500000; break;
      case 'executive-sedan': baseCost = 950000; break;
      case 'motorcycle-courier': baseCost = 300000; break;
      case 'hybrid-van': baseCost = 1000000; break;
      default: baseCost = 1000000;
    }

    // Distance-based cost factor
    const distanceFactor = costCalculation.from.toLowerCase() === costCalculation.to.toLowerCase() ? 1 : 1.5;
    
    // Team size factor
    const sizeFactor = 
      costCalculation.teamSize === '1-3' ? 1 : 
      costCalculation.teamSize === '4-6' ? 1.2 : 
      costCalculation.teamSize === '7-10' ? 1.5 : 2;

    const finalCost = baseCost * distanceFactor * sizeFactor;
    setCalculatedCost(Math.round(finalCost));
    setIsCalculated(true);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setCostCalculation(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-purple-50">
      {/* Hero Section */}
      <section className="py-16 px-4 bg-gradient-to-r from-indigo-600 to-purple-700 text-white">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Team Transport Services</h1>
          <p className="text-xl text-indigo-100 mb-8 max-w-3xl mx-auto">
            Reliable and professional transportation services for your photography and videography crews. 
            Safe, punctual, and comfortable transport for your team and equipment.
          </p>
          <div className="flex justify-center space-x-4">
            <Link 
              href="/#services" 
              className="bg-white text-indigo-600 font-semibold py-3 px-6 rounded-lg hover:bg-gray-100 transition duration-300"
            >
              View Vehicles
            </Link>
            <Link 
              href="/#calculate" 
              className="bg-transparent border-2 border-white text-white font-semibold py-3 px-6 rounded-lg hover:bg-white hover:text-indigo-600 transition duration-300"
            >
              Calculate Cost
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div className="p-6">
              <div className="text-4xl font-bold text-indigo-600 mb-2">200+</div>
              <div className="text-gray-600">Vehicles Available</div>
            </div>
            <div className="p-6">
              <div className="text-4xl font-bold text-indigo-600 mb-2">12K+</div>
              <div className="text-gray-600">Successful Trips</div>
            </div>
            <div className="p-6">
              <div className="text-4xl font-bold text-indigo-600 mb-2">99.2%</div>
              <div className="text-gray-600">On-Time Arrival</div>
            </div>
            <div className="p-6">
              <div className="text-4xl font-bold text-indigo-600 mb-2">4.9/5</div>
              <div className="text-gray-600">Customer Rating</div>
            </div>
          </div>
        </div>
      </section>

      {/* Key Benefits */}
      <section id="benefits" className="py-16 px-4 bg-gradient-to-b from-white to-purple-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose Our Transport Services?
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Professional, reliable, and efficient transport solutions for your team
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            {benefits.map((benefit, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg p-6 text-center border border-gray-100 hover:shadow-xl transition duration-300">
                <div className="flex justify-center mb-4">
                  {benefit.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{benefit.title}</h3>
                <p className="text-gray-600">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Vehicle Types */}
      <section id="services" className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Vehicle Fleet
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Choose from our diverse range of vehicles to match your specific needs
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {vehicleTypes.map((vehicle) => (
              <div key={vehicle.id} className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition duration-300">
                <div className="p-6">
                  <div className="text-center mb-4">
                    <div className="text-5xl mb-2">{vehicle.icon}</div>
                    <h3 className="text-xl font-bold text-gray-900">{vehicle.name}</h3>
                    <p className="text-gray-600">{vehicle.capacity}</p>
                  </div>
                  <div className="mb-4">
                    <p className="text-gray-700 text-sm mb-3">{vehicle.description}</p>
                    <p className="text-2xl font-bold text-indigo-600 mb-3">{vehicle.price}</p>
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
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Cost Calculator */}
      <section id="calculate" className="py-16 px-4 bg-gradient-to-b from-purple-50 to-white">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Calculate Your Transport Cost
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Get an instant estimate for your transport needs
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-8 mb-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">From Location</label>
                <input 
                  type="text" 
                  name="from"
                  placeholder="Departure city or address" 
                  className="w-full bg-gray-50 border border-gray-300 rounded-lg py-3 px-4 text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  value={costCalculation.from}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">To Location</label>
                <input 
                  type="text" 
                  name="to"
                  placeholder="Destination city or address" 
                  className="w-full bg-gray-50 border border-gray-300 rounded-lg py-3 px-4 text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  value={costCalculation.to}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Team Size</label>
                <select 
                  name="teamSize"
                  className="w-full bg-gray-50 border border-gray-300 rounded-lg py-3 px-4 text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  value={costCalculation.teamSize}
                  onChange={handleInputChange}
                >
                  <option value="1-3">1-3 people</option>
                  <option value="4-6">4-6 people</option>
                  <option value="7-10">7-10 people</option>
                  <option value="10+">10+ people</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Vehicle Type</label>
                <select 
                  name="vehicleType"
                  className="w-full bg-gray-50 border border-gray-300 rounded-lg py-3 px-4 text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  value={costCalculation.vehicleType}
                  onChange={handleInputChange}
                >
                  <option value="luxury-van">Luxury Van</option>
                  <option value="professional-suv">Professional SUV</option>
                  <option value="cargo-transport">Cargo Transport</option>
                  <option value="executive-sedan">Executive Sedan</option>
                  <option value="motorcycle-courier">Motorcycle Courier</option>
                  <option value="hybrid-van">Hybrid Van</option>
                </select>
              </div>
            </div>

            <div className="text-center mb-8">
              {isCalculated ? (
                <div className="bg-indigo-50 rounded-lg p-6">
                  <p className="text-gray-600 mb-2">Estimated Cost:</p>
                  <p className="text-3xl font-bold text-indigo-600">Rp {calculatedCost.toLocaleString()}</p>
                  <p className="text-gray-500 text-sm mt-2">Price may vary based on actual distance and requirements</p>
                </div>
              ) : (
                <p className="text-gray-500">Enter your details to get an estimate</p>
              )}
            </div>

            <div className="text-center">
              <button 
                onClick={calculateCost}
                className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-8 rounded-lg text-lg shadow-lg transition duration-300"
              >
                Calculate Transport Cost
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              What Our Clients Say
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Don't just take our word for it - hear from our satisfied clients
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-50 rounded-xl p-6">
              <div className="flex items-center mb-4">
                <div className="bg-gray-200 border-2 border-dashed rounded-xl w-16 h-16" />
                <div className="ml-4">
                  <h4 className="font-bold text-gray-900">Andi Pratama</h4>
                  <p className="text-gray-600">Wedding Photographer</p>
                </div>
              </div>
              <p className="text-gray-700 italic">"The transport service was exceptional. Our crew arrived on time and comfortable. Highly recommend!"</p>
              <div className="flex text-yellow-400 mt-2">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                  </svg>
                ))}
              </div>
            </div>

            <div className="bg-gray-50 rounded-xl p-6">
              <div className="flex items-center mb-4">
                <div className="bg-gray-200 border-2 border-dashed rounded-xl w-16 h-16" />
                <div className="ml-4">
                  <h4 className="font-bold text-gray-900">Siti Rahma</h4>
                  <p className="text-gray-600">Event Videographer</p>
                </div>
              </div>
              <p className="text-gray-700 italic">"Professional drivers and well-maintained vehicles made our multi-location shoot stress-free."</p>
              <div className="flex text-yellow-400 mt-2">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                  </svg>
                ))}
              </div>
            </div>

            <div className="bg-gray-50 rounded-xl p-6">
              <div className="flex items-center mb-4">
                <div className="bg-gray-200 border-2 border-dashed rounded-xl w-16 h-16" />
                <div className="ml-4">
                  <h4 className="font-bold text-gray-900">Budi Santoso</h4>
                  <p className="text-gray-600">Commercial Director</p>
                </div>
              </div>
              <p className="text-gray-700 italic">"Reliable and punctual. Exactly what we needed for our team during the corporate event."</p>
              <div className="flex text-yellow-400 mt-2">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                  </svg>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-gradient-to-r from-indigo-600 to-purple-700 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Book Transport Services?</h2>
          <p className="text-xl text-indigo-100 mb-8">
            Experience reliable and comfortable transport for your team and equipment.
          </p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <Link 
              href="/booking" 
              className="bg-white text-indigo-600 font-bold py-4 px-8 rounded-lg text-lg hover:bg-gray-100 transition duration-300"
            >
              Book Transport Now
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
              <h3 className="text-xl font-bold text-gray-900 mb-2">Verified Drivers</h3>
              <p className="text-gray-600">All drivers are professionally licensed and background checked</p>
            </div>
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Secure Transport</h3>
              <p className="text-gray-600">All vehicles are equipped with safety features and insurance coverage</p>
            </div>
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Punctual Service</h3>
              <p className="text-gray-600">On-time arrival guaranteed with real-time tracking</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default TransportPage;