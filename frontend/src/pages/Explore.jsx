import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Footer from "../components/common/Footer";

const Explore = () => {
  const [showMore, setShowMore] = useState(false);
  const [isSmallDevice, setIsSmallDevice] = useState(false);
  
  // Fetch posts from Redux state
  const posts = useSelector((state) => state.posts.posts);

  // Shuffle function to randomize the array of posts
  const shuffleArray = (array) => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  // Get shuffled posts (images will be part of each post)
  const shuffledPosts = shuffleArray(posts);

  // Handle responsiveness
  useEffect(() => {
    const handleResize = () => {
      setIsSmallDevice(window.innerWidth <= 768); // Small devices (tablet or smaller)
    };

    handleResize(); // Check initial window size
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="min-h-screen p-8 w-full max-w-11/12 mx-auto">
      {/* Main Heading */}
      <h1 className="text-5xl md:text-8xl font-caveat text-center mb-4 md:mb-12">
        Explore
      </h1>
      <span className="sm:text-sm text-xl lg:text-2xl text-gray-500 font-diphylleia lg:ml-12 lg:mb-12 mt-4">
        Explore the best from the university
      </span>
      <div className="container mx-auto md:mt-5 lg:mt-0">
        {/* Split Layout */}
        <div className="flex flex-col md:flex-row gap-4 lg:m-6 md:mb-12">
          {/* Left Side (2x2 Grid) */}
          <div className="w-full md:w-1/2 grid grid-cols-2 gap-4">
            {shuffledPosts.slice(0, 4).map((post, index) => (
              <div
                key={index}
                className="h-48 rounded-lg overflow-hidden shadow-md relative hover:scale-105 transition-transform duration-300"
              >
                <img
                  src={post.images[0]?.url || "/placeholder.png"} // Fallback to placeholder if no image
                  alt={post.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-0 w-full flex items-center justify-center bg-black bg-opacity-50 text-white py-2 backdrop-blur-sm">
                  {post.title}
                </div>
              </div>
            ))}
          </div>

          {/* Right Side (Single Div with Height Equal to Left Side) */}
          <div className="w-full md:w-1/2 h-[25rem] rounded-2xl overflow-hidden shadow-lg relative hover:scale-105 transition-transform duration-300">
            <img
              src={shuffledPosts[4]?.images[0]?.url || "/placeholder.png"}
              alt="Div 5"
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-0 w-full flex items-center justify-center bg-black bg-opacity-50 text-white py-4 backdrop-blur-sm">
              {shuffledPosts[4]?.title}
            </div>
          </div>
        </div>

        {/* Hidden Reversed Split Layout */}
        {!isSmallDevice && showMore && (
          <div className="flex flex-col md:flex-row gap-4 lg:m-6 lg:mt-20">
            {/* Left Side (Single Div with Height Equal to Right Side) */}
            <div className="w-full md:w-1/2 h-[25rem] rounded-2xl overflow-hidden shadow-lg relative hover:scale-105 transition-transform duration-300">
              <img
                src={shuffledPosts[5]?.images[0]?.url || "/placeholder.png"}
                alt="Div 5 (Reversed)"
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-0 w-full flex items-center justify-center bg-black bg-opacity-50 text-white py-4 backdrop-blur-sm">
                {shuffledPosts[5]?.title}
              </div>
            </div>

            {/* Right Side (2x2 Grid) */}
            <div className="w-full md:w-1/2 grid grid-cols-2 gap-4">
              {shuffledPosts.slice(6, 10).map((post, index) => (
                <div
                  key={index}
                  className="h-48 rounded-lg overflow-hidden shadow-md relative hover:scale-105 transition-transform duration-300"
                >
                  <img
                    src={post.images[0]?.url || "/placeholder.png"}
                    alt={post.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-0 w-full flex items-center justify-center bg-black bg-opacity-50 text-white py-2 backdrop-blur-sm">
                    {post.title}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Show More Button */}
        {!isSmallDevice && (
          <div className="flex items-center justify-center mt-6 md:mt-8">
            <button
              onClick={() => setShowMore(!showMore)}
              className="bg-gray-300 border h-16 rounded-2xl w-[10rem] hover:bg-gray-400 transition-colors"
            >
              {showMore ? "Show Less" : "Show More"}
            </button>
          </div>
        )}
      </div>

      {/* Browse By Tags */}
      <div className="lg:m-6 mt-12 md:mt-16">
        <span className="text-2xl text-gray-500 font-diphylleia">
          Browse By Tags
        </span>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6 lg:mb-4">
          {shuffledPosts.slice(0, 8).map((post, index) => (
            <div
              key={index}
              className="h-[16rem] w-full rounded-xl overflow-hidden shadow-md relative flex flex-col justify-end cursor-pointer hover:scale-105 transition-transform duration-300"
            >
              <img
                src={post.images[0]?.url || "/placeholder.png"}
                alt={post.title}
                className="w-full h-full object-cover"
              />
              <div className="w-full bg-black bg-opacity-50 text-white text-center py-2 backdrop-blur-sm">
                {post.title}
              </div>
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Explore;
