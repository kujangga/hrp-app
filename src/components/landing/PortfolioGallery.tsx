'use client';

import { useState } from 'react';

interface PortfolioItem {
  id: number;
  photographer: string;
  grade: 'A' | 'B' | 'C' | 'D' | 'E';
  category: 'Wedding' | 'Corporate' | 'Portrait' | 'Event' | 'Fashion';
  location: string;
  imageUrl: string;
  likes: number;
}

const PortfolioGallery = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedGrade, setSelectedGrade] = useState<'A' | 'B' | 'C' | 'D' | 'E' | 'all'>('all');
  
  // Mock portfolio data
  const portfolioItems: PortfolioItem[] = [
    {
      id: 1,
      photographer: "Andreas Wibowo",
      grade: "A",
      category: "Wedding",
      location: "Bali",
      imageUrl: "https://images.unsplash.com/photo-1519699047748-de8e457a634e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      likes: 245
    },
    {
      id: 2,
      photographer: "Sarah Chen",
      grade: "B",
      category: "Corporate",
      location: "Jakarta",
      imageUrl: "https://images.unsplash.com/photo-1519741497674-611481863552?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      likes: 189
    },
    {
      id: 3,
      photographer: "Budi Santoso",
      grade: "C",
      category: "Portrait",
      location: "Bandung",
      imageUrl: "https://images.unsplash.com/photo-1519699047748-de8e457a634e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      likes: 156
    },
    {
      id: 4,
      photographer: "Maria Gunawan",
      grade: "A",
      category: "Fashion",
      location: "Jakarta",
      imageUrl: "https://images.unsplash.com/photo-1519741497674-611481863552?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      likes: 321
    },
    {
      id: 5,
      photographer: "James Wilson",
      grade: "B",
      category: "Event",
      location: "Singapore",
      imageUrl: "https://images.unsplash.com/photo-1519699047748-de8e457a634e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      likes: 98
    },
    {
      id: 6,
      photographer: "Dewi Kusuma",
      grade: "D",
      category: "Portrait",
      location: "Yogyakarta",
      imageUrl: "https://images.unsplash.com/photo-1519741497674-611481863552?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      likes: 76
    },
    {
      id: 7,
      photographer: "Rina Putri",
      grade: "A",
      category: "Wedding",
      location: "Bali",
      imageUrl: "https://images.unsplash.com/photo-1519699047748-de8e457a634e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      likes: 298
    },
    {
      id: 8,
      photographer: "Michael Tan",
      grade: "C",
      category: "Corporate",
      location: "Surabaya",
      imageUrl: "https://images.unsplash.com/photo-1519741497674-611481863552?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      likes: 142
    },
    {
      id: 9,
      photographer: "Lisa Wijaya",
      grade: "B",
      category: "Fashion",
      location: "Jakarta",
      imageUrl: "https://images.unsplash.com/photo-1519699047748-de8e457a634e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      likes: 176
    }
  ];

  // Get unique categories for filter
  const categories = Array.from(new Set(portfolioItems.map(item => item.category)));

  // Filter portfolio items based on selections
  const filteredItems = portfolioItems.filter(item => {
    if (selectedCategory !== 'all' && item.category !== selectedCategory) {
      return false;
    }
    if (selectedGrade !== 'all' && item.grade !== selectedGrade) {
      return false;
    }
    return true;
  });

  // Get grade info for display
  const getGradeInfo = (grade: string) => {
    switch (grade) {
      case 'A': return { color: 'bg-yellow-400 text-yellow-900' };
      case 'B': return { color: 'bg-green-400 text-green-900' };
      case 'C': return { color: 'bg-blue-400 text-blue-900' };
      case 'D': return { color: 'bg-indigo-400 text-indigo-900' };
      case 'E': return { color: 'bg-purple-400 text-purple-900' };
      default: return { color: '' };
    }
  };

  return (
    <div className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-base font-semibold text-purple-600 tracking-wide uppercase">Portfolio Gallery</h2>
          <p className="mt-2 text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Exceptional Work from Our Photographers
          </p>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 mx-auto">
            Explore stunning photography from our graded professionals across all categories
          </p>
        </div>

        {/* Filters */}
        <div className="mt-12">
          <div className="flex flex-wrap justify-center gap-4">
            <div>
              <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
                Category
              </label>
              <select
                id="category"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="rounded-lg border border-gray-300 bg-white py-2 px-3 text-base shadow-sm focus:border-purple-500 focus:outline-none focus:ring-purple-500 sm:text-sm"
              >
                <option value="all">All Categories</option>
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
            
            <div>
              <label htmlFor="grade" className="block text-sm font-medium text-gray-700 mb-1">
                Grade
              </label>
              <select
                id="grade"
                value={selectedGrade}
                onChange={(e) => setSelectedGrade(e.target.value as 'A' | 'B' | 'C' | 'D' | 'E' | 'all')}
                className="rounded-lg border border-gray-300 bg-white py-2 px-3 text-base shadow-sm focus:border-purple-500 focus:outline-none focus:ring-purple-500 sm:text-sm"
              >
                <option value="all">All Grades</option>
                <option value="A">Grade A (Premium)</option>
                <option value="B">Grade B (Professional)</option>
                <option value="C">Grade C (Standard)</option>
                <option value="D">Grade D (Entry)</option>
                <option value="E">Grade E (Basic)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Gallery */}
        <div className="mt-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map((item) => {
              const gradeInfo = getGradeInfo(item.grade);
              return (
                <div 
                  key={item.id} 
                  className="group relative overflow-hidden rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300"
                >
                  {/* Image */}
                  <div className="aspect-square bg-gray-200 border-2 border-dashed rounded-xl w-full" />
                  
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                      <div className="flex justify-between items-end">
                        <div>
                          <h3 className="font-bold text-lg">{item.photographer}</h3>
                          <p className="text-sm text-gray-300">{item.category} • {item.location}</p>
                        </div>
                        <span className={`text-xs px-2 py-1 rounded-full ${gradeInfo.color}`}>
                          Grade {item.grade}
                        </span>
                      </div>
                      
                      <div className="mt-3 flex items-center justify-between">
                        <button className="inline-flex items-center px-3 py-1 bg-purple-600 text-white text-sm font-medium rounded-full hover:bg-purple-700">
                          Book Photographer
                        </button>
                        <div className="flex items-center text-gray-300">
                          <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                          </svg>
                          <span className="ml-1">{item.likes}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Load More Button */}
        <div className="mt-12 text-center">
          <button className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-purple-700 bg-purple-100 hover:bg-purple-200">
            Load More Portfolio Items
            <svg className="ml-2 -mr-1 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default PortfolioGallery;