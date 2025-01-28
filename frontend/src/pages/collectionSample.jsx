import React from "react";

const Collections = () => {
  const collections = [
    {
      _id: "1",
      name: "Nature Photography",
      description: "A breathtaking collection of nature's beauty.",
      posts: Array(12).fill("post"),
    },
    {
      _id: "2",
      name: "Tech Innovations",
      description: "Discover the cutting-edge tech shaping our world.",
      posts: Array(8).fill("post"),
    },
    {
      _id: "3",
      name: "Travel Diaries",
      description: "Relive adventures from across the globe.",
      posts: Array(15).fill("post"),
    },
    {
      _id: "4",
      name: "Design Inspirations",
      description: "Explore creative and inspiring designs.",
      posts: Array(10).fill("post"),
    },
  ];

  return (
    <div className="min-h-screen bg-white py-16 px-6 relative overflow-hidden">
      <h1 className="text-5xl font-bold text-center text-black mb-16">
        My Collections
      </h1>

      {/* Grid with dynamic cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-12">
        {collections.map((collection) => (
          <div
            key={collection._id}
            className="group relative w-full h-[350px] cursor-pointer rounded-lg transform transition-all duration-300"
          >
            {/* Card Background with soft hover effects */}
            <div
              className="absolute inset-0 transform transition-all duration-300 group-hover:scale-105 group-hover:rotate-1 group-hover:shadow-lg"
              style={{
                background: "#f9f9f9", // light gray
                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                borderRadius: "12px",
              }}
            ></div>

            <div
              className="relative w-full h-full bg-white border-2 border-gray-200 rounded-lg shadow-sm group-hover:bg-gray-50 p-6 overflow-hidden transition-all duration-300"
            >
              {/* Collection Thumbnail/Avatar
              <div className="absolute top-4 left-4">
                <div className="w-16 h-16 bg-gray-400 rounded-full flex items-center justify-center text-white font-bold text-xl">
                  {collection.name.charAt(0)}
                </div>
              </div> */}

              {/* Collection Name */}
              <div className="mt-12 text-xl font-semibold text-gray-800 group-hover:text-black">
                {collection.name}
              </div>

              {/* Description */}
              <div className="mt-4 text-gray-600 text-sm line-clamp-3">
                {collection.description}
              </div>

              {/* Hover Effects - View More Button */}
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300">
                <button className="px-6 py-2 text-sm font-medium text-gray-800 bg-white border-2 border-gray-300 rounded-lg shadow-sm hover:bg-gray-100 transition-all duration-200">
                  View Posts
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Collections;
