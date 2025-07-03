import React, { useState } from 'react';

// --- Categories Component ---
const categories = [
  { name: 'Rooms', icon: 'https://placehold.co/24x24/cccccc/ffffff?text=R' },
  { name: 'Cabins', icon: 'https://placehold.co/24x24/cccccc/ffffff?text=C' },
  { name: 'Amazing views', icon: 'https://placehold.co/24x24/cccccc/ffffff?text=V' },
  { name: 'Beachfront', icon: 'https://placehold.co/24x24/cccccc/ffffff?text=B' },
  { name: 'Tiny homes', icon: 'https://placehold.co/24x24/cccccc/ffffff?text=T' },
  { name: 'Luxe', icon: 'https://placehold.co/24x24/cccccc/ffffff?text=L' },
  { name: 'Treehouses', icon: 'https://placehold.co/24x24/cccccc/ffffff?text=H' },
  { name: 'Lakefront', icon: 'https://placehold.co/24x24/cccccc/ffffff?text=K' },
  { name: 'Camping', icon: 'https://placehold.co/24x24/cccccc/ffffff?text=P' },
  { name: 'Castles', icon: 'https://placehold.co/24x24/cccccc/ffffff?text=S' },
  { name: 'Ski-in/out', icon: 'https://placehold.co/24x24/cccccc/ffffff?text=S' },
  { name: 'A-frames', icon: 'https://placehold.co/24x24/cccccc/ffffff?text=A' },
  { name: 'Boats', icon: 'https://placehold.co/24x24/cccccc/ffffff?text=O' },
  { name: 'Islands', icon: 'https://placehold.co/24x24/cccccc/ffffff?text=I' },
  { name: 'New', icon: 'https://placehold.co/24x24/cccccc/ffffff?text=N' },
  { name: 'Design', icon: 'https://placehold.co/24x24/cccccc/ffffff?text=D' },
  { name: 'Arctic', icon: 'https://placehold.co/24x24/cccccc/ffffff?text=A' },
  { name: 'Caves', icon: 'https://placehold.co/24x24/cccccc/ffffff?text=C' },
  { name: 'Domes', icon: 'https://placehold.co/24x24/cccccc/ffffff?text=D' },
  { name: 'Houseboats', icon: 'https://placehold.co/24x24/cccccc/ffffff?text=H' },
];

const Categories: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState('Rooms');

  return (
    <div className="top-[73px] z-40 bg-white border-b border-gray-200 py-4 shadow-sm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between overflow-x-auto whitespace-nowrap scrollbar-hide">
        <div className="flex space-x-8">
          {categories.map((category) => (
            <button
              key={category.name}
              className={`flex flex-col items-center p-2 rounded-lg transition-colors duration-200 ${
                activeCategory === category.name
                  ? 'text-black border-b-2 border-black'
                  : 'text-gray-500 hover:text-gray-800'
              }`}
              onClick={() => setActiveCategory(category.name)}
            >
              <img src={category.icon} alt={category.name} className="h-6 w-6 mb-1" />
              <span className="text-xs font-semibold">{category.name}</span>
            </button>
          ))}
        </div>
        <button className="hidden md:flex items-center border border-gray-300 rounded-lg px-4 py-2 ml-4 text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-colors duration-200 flex-shrink-0">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon></svg>
          Filters
        </button>
      </div>
    </div>
  );
};

export default Categories;
