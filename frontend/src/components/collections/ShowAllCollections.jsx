import React from 'react';

// Mock data for collections, now including images
const collections = [
  { id: 1, name: 'Collection 1', description: 'Explore our amazing first collection.', image: 'https://via.placeholder.com/300x200/000000/FFFFFF?text=Collection+1' },
  { id: 2, name: 'Collection 2', description: 'Discover the magic in the second collection.', image: 'https://via.placeholder.com/300x200/000000/FFFFFF?text=Collection+2' },
  { id: 3, name: 'Collection 3', description: 'Dive into the depths of the third collection.', image: 'https://via.placeholder.com/300x200/000000/FFFFFF?text=Collection+3' },
  { id: 4, name: 'Collection 4', description: 'Check out the exclusive fourth collection.', image: 'https://via.placeholder.com/300x200/000000/FFFFFF?text=Collection+4' },
  { id: 5, name: 'Collection 5', description: 'Experience the fifth collection with premium features.', image: 'https://via.placeholder.com/300x200/000000/FFFFFF?text=Collection+5' },
  { id: 6, name: 'Collection 6', description: 'Unveil the wonders in the sixth collection.', image: 'https://via.placeholder.com/300x200/000000/FFFFFF?text=Collection+6' },
];

const ShowAllCollections = () => {
  return (
    <div className="min-h-screen bg-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-screen-xl mx-auto">
        <h2 className="text-4xl font-semibold text-gray-800 text-center mb-10">All Collections</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {collections.map((collection) => (
            <div
              key={collection.id}
              className="relative bg-white border border-gray-200 rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
            >
              <div
                className="w-full h-56 bg-cover bg-center rounded-t-xl"
                style={{ backgroundImage: `url(${collection.image})` }}
              ></div>

              <div className="p-6">
                <h3 className="text-2xl font-semibold text-gray-900">{collection.name}</h3>
                <p className="text-sm text-gray-600 mt-2">{collection.description}</p>
                <button className="mt-4 w-full py-2 px-4 text-sm text-white bg-gray-800 rounded-lg transition-all duration-300 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50">
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ShowAllCollections;
