'use client';

import { useState } from 'react';

const CtaSection = () => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitStatus('success');
      setEmail('');
      
      // Reset status after 5 seconds
      setTimeout(() => {
        setSubmitStatus('idle');
      }, 5000);
    }, 1500);
  };
  
  return (
    <div className="py-16 bg-gradient-to-r from-purple-700 to-indigo-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-2 lg:gap-16 items-center">
          {/* For Clients */}
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-900">Ready to Book Your Perfect Photographer?</h2>
              <p className="mt-2 text-gray-600">
                Find and book verified professionals with our smart matching system
              </p>
            </div>
            
            <div className="mt-8">
              <div className="grid grid-cols-3 gap-4 text-center">
                {[
                  { number: "1,247+", label: "Photographers" },
                  { number: "99.8%", label: "Replacement Rate" },
                  { number: "4.8/5", label: "Client Rating" }
                ].map((stat, index) => (
                  <div key={index} className="p-4 bg-purple-50 rounded-lg">
                    <p className="text-xl font-bold text-purple-700">{stat.number}</p>
                    <p className="mt-1 text-sm text-gray-600">{stat.label}</p>
                  </div>
                ))}
              </div>
              
              <div className="mt-8">
                <button 
                  onClick={() => {
                    // In a real app, this would navigate to the booking flow
                    alert('Navigating to booking flow');
                  }}
                  className="w-full bg-gradient-to-r from-purple-600 to-indigo-700 text-white font-bold py-4 px-6 rounded-lg hover:from-purple-700 hover:to-indigo-800 transition duration-300 transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
                >
                  Find a Photographer Now
                </button>
                
                <div className="mt-4 text-center">
                  <p className="text-sm text-gray-600">
                    No account needed • Instant booking confirmation
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          {/* For Photographers */}
          <div className="mt-12 lg:mt-0 bg-white bg-opacity-10 backdrop-blur-lg rounded-2xl p-8 border border-white border-opacity-20">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-white">Join Our Network of Professional Photographers</h2>
              <p className="mt-2 text-purple-100">
                Grow your business with consistent bookings and fair compensation
              </p>
            </div>
            
            <div className="mt-8 space-y-6">
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-10 w-10 rounded-full bg-white bg-opacity-20">
                    <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-white">Verified Professional Grade</h3>
                  <p className="mt-1 text-purple-100">
                    Our transparent grading system ensures fair pricing based on your skills
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-10 w-10 rounded-full bg-white bg-opacity-20">
                    <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-white">Consistent Bookings</h3>
                  <p className="mt-1 text-purple-100">
                    Access a steady stream of clients matched to your specialties and availability
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-10 w-10 rounded-full bg-white bg-opacity-20">
                    <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-white">Fair Compensation</h3>
                  <p className="mt-1 text-purple-100">
                    Competitive rates with transparent pricing and fast payments
                  </p>
                </div>
              </div>
              
              <div className="mt-8">
                <button 
                  onClick={() => {
                    // In a real app, this would navigate to the photographer registration
                    alert('Navigating to photographer registration');
                  }}
                  className="w-full bg-white text-purple-700 font-bold py-4 px-6 rounded-lg hover:bg-gray-100 transition duration-300 focus:outline-none focus:ring-2 focus:ring-white"
                >
                  Become a Photographer
                </button>
                
                <div className="mt-4 text-center">
                  <p className="text-sm text-purple-100">
                    Free registration • No commission fees
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Newsletter Signup */}
        <div className="mt-16 max-w-3xl mx-auto">
          <div className="bg-white bg-opacity-10 backdrop-blur-lg rounded-2xl p-8 border border-white border-opacity-20">
            <div className="text-center">
              <h3 className="text-2xl font-bold text-white">Stay Updated</h3>
              <p className="mt-2 text-purple-100">
                Get the latest news, promotions, and photographer spotlights
              </p>
            </div>
            
            <form onSubmit={handleSubmit} className="mt-6 sm:flex">
              <div className="min-w-0 flex-1">
                <label htmlFor="email" className="sr-only">Email address</label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="block w-full px-4 py-3 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                  required
                />
              </div>
              <div className="mt-3 sm:mt-0 sm:ml-3">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-lg text-white ${
                    isSubmitting 
                      ? 'bg-purple-400' 
                      : 'bg-purple-600 hover:bg-purple-700'
                  } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500`}
                >
                  {isSubmitting ? 'Subscribing...' : 'Subscribe'}
                </button>
              </div>
            </form>
            
            {submitStatus === 'success' && (
              <div className="mt-4 p-3 bg-green-500 bg-opacity-20 rounded-lg text-center">
                <p className="text-green-100">Thank you for subscribing! Check your email for confirmation.</p>
              </div>
            )}
            
            {submitStatus === 'error' && (
              <div className="mt-4 p-3 bg-red-500 bg-opacity-20 rounded-lg text-center">
                <p className="text-red-100">Something went wrong. Please try again.</p>
              </div>
            )}
            
            <div className="mt-4 text-center">
              <p className="text-xs text-purple-200">
                By subscribing, you agree to our Privacy Policy and consent to receive updates.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CtaSection;