'use client';

import { useState, useEffect } from 'react';

interface Testimonial {
  id: number;
  name: string;
  role: string;
  company?: string;
  content: string;
  rating: number;
  type: 'client' | 'photographer' | 'corporate';
  avatar: string;
  video?: string;
}

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  
  const testimonials: Testimonial[] = [
    {
      id: 1,
      name: "Maya Sari",
      role: "Wedding Client",
      content: "HRP made our wedding photography so stress-free. When our original photographer had an emergency, they found us an equally amazing replacement within hours. The quality was exceptional!",
      rating: 5,
      type: "client",
      avatar: ""
    },
    {
      id: 2,
      name: "David Lim",
      role: "Corporate Marketing Director",
      company: "TechGlobal Indonesia",
      content: "We've used HRP for multiple corporate events and product shoots. The grade system helps us select the right photographer for each project, and the automatic replacement guarantee gives us peace of mind.",
      rating: 5,
      type: "corporate",
      avatar: ""
    },
    {
      id: 3,
      name: "Andreas Wibowo",
      role: "Grade A Photographer",
      content: "Joining HRP has transformed my career. The platform brings me consistent high-quality bookings that match my expertise level. The payment system is reliable and the support team is fantastic.",
      rating: 5,
      type: "photographer",
      avatar: ""
    },
    {
      id: 4,
      name: "Sophia Chen",
      role: "Event Client",
      content: "The booking process was incredibly smooth. I loved being able to see real portfolios from graded photographers and knowing exactly what to expect. Will definitely use HRP again!",
      rating: 4,
      type: "client",
      avatar: ""
    },
    {
      id: 5,
      name: "James Wilson",
      role: "Grade B Photographer",
      content: "HRP's grading system is fair and transparent. It motivates me to improve my skills to reach the next level. The platform has helped me build a sustainable photography business.",
      rating: 5,
      type: "photographer",
      avatar: ""
    }
  ];

  // Auto-rotate testimonials
  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, [isAutoPlaying, testimonials.length]);

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) => 
      (prevIndex + 1) % testimonials.length
    );
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'client': return 'bg-blue-100 text-blue-800';
      case 'photographer': return 'bg-purple-100 text-purple-800';
      case 'corporate': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'client': return 'Client';
      case 'photographer': return 'Photographer';
      case 'corporate': return 'Corporate';
      default: return '';
    }
  };

  return (
    <div className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-base font-semibold text-purple-600 tracking-wide uppercase">Testimonials</h2>
          <p className="mt-2 text-3xl font-extrabold text-gray-900 sm:text-4xl">
            What Our Community Says
          </p>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 mx-auto">
            Real stories from clients and photographers who have transformed their experience with HRP
          </p>
        </div>

        {/* Testimonial Carousel */}
        <div className="mt-16">
          <div className="relative max-w-4xl mx-auto">
            {/* Main Testimonial */}
            <div 
              className="bg-white rounded-2xl shadow-xl p-8 md:p-12 transition-opacity duration-300"
              onMouseEnter={() => setIsAutoPlaying(false)}
              onMouseLeave={() => setIsAutoPlaying(true)}
            >
              <div className="flex flex-col md:flex-row items-center">
                {/* Avatar */}
                <div className="flex-shrink-0 mb-6 md:mb-0 md:mr-8">
                  <div className="bg-gray-200 border-2 border-dashed rounded-xl w-24 h-24" />
                </div>
                
                {/* Content */}
                <div className="text-center md:text-left">
                  <div className="flex justify-center md:justify-start">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        className={`h-6 w-6 ${i < testimonials[currentIndex].rating ? 'text-yellow-400' : 'text-gray-300'}`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  
                  <blockquote className="mt-6">
                    <p className="text-xl text-gray-600 italic">
                      &quot;{testimonials[currentIndex].content}&quot;
                    </p>
                  </blockquote>
                  
                  <div className="mt-8">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between">
                      <div>
                        <p className="text-lg font-bold text-gray-900">
                          {testimonials[currentIndex].name}
                        </p>
                        <p className="text-gray-600">
                          {testimonials[currentIndex].role}
                          {testimonials[currentIndex].company && (
                            <span className="block">{testimonials[currentIndex].company}</span>
                          )}
                        </p>
                      </div>
                      
                      <span className={`mt-4 sm:mt-0 inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getTypeColor(testimonials[currentIndex].type)}`}>
                        {getTypeLabel(testimonials[currentIndex].type)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Navigation Arrows */}
            <button
              onClick={goToPrevious}
              className="absolute top-1/2 left-0 transform -translate-y-1/2 -translate-x-4 bg-white rounded-full p-2 shadow-md hover:bg-gray-50 focus:outline-none"
              aria-label="Previous testimonial"
            >
              <svg className="h-6 w-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            
            <button
              onClick={goToNext}
              className="absolute top-1/2 right-0 transform -translate-y-1/2 translate-x-4 bg-white rounded-full p-2 shadow-md hover:bg-gray-50 focus:outline-none"
              aria-label="Next testimonial"
            >
              <svg className="h-6 w-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
            
            {/* Dots Indicator */}
            <div className="flex justify-center mt-8 space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`h-3 w-3 rounded-full ${
                    index === currentIndex ? 'bg-purple-600' : 'bg-gray-300'
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Trust Indicators */}
        <div className="mt-20">
          <div className="bg-gradient-to-r from-purple-600 to-indigo-700 rounded-2xl p-8 text-white">
            <div className="max-w-4xl mx-auto">
              <div className="text-center">
                <h3 className="text-2xl font-bold">Why Clients Trust HRP</h3>
                <p className="mt-2 text-purple-100">
                  Our commitment to quality and reliability is backed by real results
                </p>
              </div>
              
              <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                  { 
                    number: "99.8%", 
                    label: "Replacement Success Rate", 
                    description: "Our smart replacement system finds suitable replacements within 2 hours" 
                  },
                  { 
                    number: "4.8/5", 
                    label: "Average Rating", 
                    description: "Based on 2,000+ verified client reviews" 
                  },
                  { 
                    number: "1,247+", 
                    label: "Active Photographers", 
                    description: "Professionals across Indonesia and Southeast Asia" 
                  }
                ].map((stat, index) => (
                  <div key={index} className="text-center">
                    <p className="text-4xl font-bold">{stat.number}</p>
                    <p className="mt-2 text-lg font-semibold">{stat.label}</p>
                    <p className="mt-1 text-purple-100 text-sm">{stat.description}</p>
                  </div>
                ))}
              </div>
              
              {/* Guarantees */}
              <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  {
                    title: "Quality Guarantee",
                    description: "Every photographer is verified and graded for consistent quality",
                    icon: (
                      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                      </svg>
                    )
                  },
                  {
                    title: "Replacement Guarantee",
                    description: "Automatic replacement if your photographer can't make it",
                    icon: (
                      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                      </svg>
                    )
                  }
                ].map((guarantee, index) => (
                  <div key={index} className="flex items-start p-4 bg-white bg-opacity-10 rounded-lg">
                    <div className="flex-shrink-0">
                      {guarantee.icon}
                    </div>
                    <div className="ml-4">
                      <h4 className="font-bold">{guarantee.title}</h4>
                      <p className="mt-1 text-purple-100 text-sm">{guarantee.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Testimonials;