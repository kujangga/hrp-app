'use client';

import { useState } from 'react';

interface Talent {
  id: number;
  name: string;
  grade: 'A' | 'B' | 'C' | 'D' | 'E';
  rating: number;
  reviewCount: number;
  price: number;
  location: string;
  available: boolean;
  specialties: string[];
  portfolio: string[];
  talentType: 'Photographer' | 'Videographer';
}

const TalentShowcase = () => {
  const [selectedGrade, setSelectedGrade] = useState<'A' | 'B' | 'C' | 'D' | 'E' | 'all'>('all');
  const [selectedSpecialty, setSelectedSpecialty] = useState<string>('all');
  
  // Mock data for talents (photographers & videographers)
  const talents: Talent[] = [
    {
      id: 1,
      name: "Andreas Wibowo",
      grade: "A",
      rating: 4.9,
      reviewCount: 124,
      price: 2500000,
      location: "Jakarta",
      available: true,
      specialties: ["Wedding", "Portrait"],
      portfolio: [
        "https://images.unsplash.com/photo-1519699047748-de8e457a634e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1519741497674-611481863552?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1519699047748-de8e457a634e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
      ],
      talentType: "Photographer"
    },
    {
      id: 2,
      name: "Sarah Chen",
      grade: "B",
      rating: 4.7,
      reviewCount: 89,
      price: 1800000,
      location: "Bandung",
      available: true,
      specialties: ["Corporate", "Event"],
      portfolio: [
        "https://images.unsplash.com/photo-1519699047748-de8e457a634e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1519741497674-611481863552?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1519699047748-de8e457a634e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
      ],
      talentType: "Videographer"
    },
    {
      id: 3,
      name: "Budi Santoso",
      grade: "C",
      rating: 4.5,
      reviewCount: 67,
      price: 1200000,
      location: "Bali",
      available: false,
      specialties: ["Event", "Portrait"],
      portfolio: [
        "https://images.unsplash.com/photo-1519699047748-de8e457a634e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1519741497674-611481863552?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1519699047748-de8e457a634e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
      ],
      talentType: "Photographer"
    },
    {
      id: 4,
      name: "Maria Gunawan",
      grade: "A",
      rating: 4.8,
      reviewCount: 156,
      price: 3200000,
      location: "Jakarta",
      available: true,
      specialties: ["Wedding", "Fashion"],
      portfolio: [
        "https://images.unsplash.com/photo-1519699047748-de8e457a634e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1519741497674-611481863552?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1519699047748-de8e457a634e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
      ],
      talentType: "Photographer"
    },
    {
      id: 5,
      name: "James Wilson",
      grade: "B",
      rating: 4.6,
      reviewCount: 92,
      price: 1950000,
      location: "Singapore",
      available: true,
      specialties: ["Corporate", "Product"],
      portfolio: [
        "https://images.unsplash.com/photo-1519699047748-de8e457a634e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1519741497674-611481863552?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1519699047748-de8e457a634e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
      ],
      talentType: "Videographer"
    },
    {
      id: 6,
      name: "Dewi Kusuma",
      grade: "C",
      rating: 4.3,
      reviewCount: 43,
      price: 800000,
      location: "Yogyakarta",
      available: true,
      specialties: ["Portrait", "Event"],
      portfolio: [
        "https://images.unsplash.com/photo-1519699047748-de8e457a634e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1519741497674-611481863552?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1519699047748-de8e457a634e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
      ],
      talentType: "Photographer"
    }
  ];

  // Get unique specialties for filter
  const specialties = Array.from(
    new Set(talents.flatMap(p => p.specialties))
  );

  // Filter talents based on selections
  const filteredTalents = talents.filter(talent => {
    if (selectedGrade !== 'all' && talent.grade !== selectedGrade) {
      return false;
    }
    if (selectedSpecialty !== 'all' && !talent.specialties.includes(selectedSpecialty)) {
      return false;
    }
    return true;
  });

  // Get grade info for display
  const getGradeInfo = (grade: string) => {
    switch (grade) {
      case 'A': return { name: 'Premium', color: 'bg-yellow-400 text-yellow-900', price: '3M - 5M IDR/day' };
      case 'B': return { name: 'Professional', color: 'bg-green-400 text-green-900', price: '2M - 3M IDR/day' };
      case 'C': return { name: 'Standard', color: 'bg-blue-400 text-blue-900', price: '1.2M - 2M IDR/day' };
      case 'D': return { name: 'Entry', color: 'bg-indigo-400 text-indigo-900', price: '800K - 1.2M IDR/day' };
      case 'E': return { name: 'Basic', color: 'bg-purple-400 text-purple-900', price: '500K - 800K IDR/day' };
      default: return { name: '', color: '', price: '' };
    }
  };

  return (
    <div className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-base font-semibold text-purple-600 tracking-wide uppercase">Talent Directory</h2>
          <p className="mt-2 text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Graded Photographers & Videographers
          </p>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 mx-auto">
            Choose from our curated selection of 1,247+ verified professionals based on your needs
          </p>
        </div>

        {/* Grade System Explanation */}
        <div className="mt-16">
          <div className="text-center">
            <h3 className="text-2xl font-bold text-gray-900">Understanding Our Grade System</h3>
            <p className="mt-2 text-gray-600">Our A-E grading ensures transparent quality and pricing</p>
          </div>
          
          <div className="mt-8 grid grid-cols-1 md:grid-cols-5 gap-4">
            {['A', 'B', 'C', 'D', 'E'].map((grade) => {
              const gradeInfo = getGradeInfo(grade);
              return (
                <div 
                  key={grade}
                  className={`p-4 rounded-lg cursor-pointer transition-all duration-300 ${
                    selectedGrade === grade 
                      ? 'ring-2 ring-purple-500 bg-purple-50' 
                      : 'bg-gray-50 hover:bg-gray-100'
                  }`}
                  onClick={() => setSelectedGrade(grade as 'A' | 'B' | 'C' | 'D' | 'E' | 'all')}
                >
                  <div className="flex flex-col items-center">
                    <span className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg ${gradeInfo.color}`}>
                      {grade}
                    </span>
                    <h4 className="mt-2 font-semibold text-gray-900">{gradeInfo.name}</h4>
                    <p className="mt-1 text-sm text-gray-600 text-center">{gradeInfo.price}</p>
                  </div>
                </div>
              );
            })}
          </div>
          
          <div className="mt-6 text-center">
            <button 
              className="text-purple-600 font-medium hover:text-purple-800"
              onClick={() => setSelectedGrade('all')}
            >
              {selectedGrade !== 'all' ? 'View All Grades' : 'All Grades Selected'}
            </button>
          </div>
        </div>

        {/* Specialty Filter */}
        <div className="mt-10">
          <div className="flex flex-wrap justify-center gap-2">
            <button
              className={`px-4 py-2 rounded-full text-sm font-medium ${
                selectedSpecialty === 'all'
                  ? 'bg-purple-600 text-white'
                  : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
              }`}
              onClick={() => setSelectedSpecialty('all')}
            >
              All Specialties
            </button>
            {specialties.map((specialty) => (
              <button
                key={specialty}
                className={`px-4 py-2 rounded-full text-sm font-medium ${
                  selectedSpecialty === specialty
                    ? 'bg-purple-600 text-white'
                    : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                }`}
                onClick={() => setSelectedSpecialty(specialty)}
              >
                {specialty}
              </button>
            ))}
          </div>
        </div>

        {/* Talent Grid */}
        <div className="mt-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredTalents.slice(0, 6).map((talent) => { // Show only first 6 talents
              const gradeInfo = getGradeInfo(talent.grade);
              return (
                <div key={talent.id} className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200 hover:shadow-xl transition-shadow duration-300">
                  <div className="p-6">
                    <div className="flex items-start">
                      <div className="flex-shrink-0">
                        <div className="bg-gray-200 border-2 border-dashed rounded-xl w-16 h-16" />
                      </div>
                      <div className="ml-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className="text-lg font-bold text-gray-900">{talent.name}</h3>
                            <div className="text-sm text-gray-500">{talent.talentType}</div>
                          </div>
                          <span className={`text-xs px-2 py-1 rounded-full ${gradeInfo.color}`}>
                            Grade {talent.grade}
                          </span>
                        </div>
                        <div className="mt-1 flex items-center">
                          <div className="flex">
                            {[...Array(5)].map((_, i) => (
                              <svg
                                key={i}
                                className={`h-4 w-4 ${i < Math.floor(talent.rating) ? 'text-yellow-400' : 'text-gray-300'}`}
                                fill="currentColor"
                                viewBox="0 0 20 20"
                              >
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                              </svg>
                            ))}
                          </div>
                          <span className="ml-2 text-sm text-gray-600">
                            {talent.rating} ({talent.reviewCount})
                          </span>
                        </div>
                        <div className="mt-1 flex items-center justify-between">
                          <p className="text-sm text-gray-600">
                            {talent.location}
                          </p>
                          <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                            talent.available ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                          }`}>
                            {talent.available ? 'Available' : 'Unavailable'}
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-4">
                      <p className="text-lg font-bold text-gray-900">
                        {talent.price.toLocaleString()} IDR<span className="text-sm font-normal text-gray-600">/day</span>
                      </p>
                    </div>
                    
                    <div className="mt-4">
                      <div className="flex flex-wrap gap-1">
                        {talent.specialties.map((specialty) => (
                          <span 
                            key={specialty} 
                            className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800"
                          >
                            {specialty}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    {/* Portfolio Preview */}
                    <div className="mt-4 grid grid-cols-3 gap-2">
                      {talent.portfolio.slice(0, 3).map((img, index) => (
                        <div key={index} className="aspect-square bg-gray-200 border-2 border-dashed rounded-lg" />
                      ))}
                    </div>
                    
                    <div className="mt-6 flex space-x-3">
                      <button className="flex-1 bg-purple-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-purple-700 transition-colors">
                        View Profile
                      </button>
                      <button 
                        className={`p-2 border border-gray-300 rounded-lg hover:bg-gray-50 ${
                          talent.available ? 'text-indigo-600' : 'text-gray-400'
                        }`}
                        disabled={!talent.available}
                      >
                        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* View All CTA */}
        <div className="mt-12 text-center">
          <button className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700">
            View All Professionals (1,247+)
            <svg className="ml-2 -mr-1 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default TalentShowcase;