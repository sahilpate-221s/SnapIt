import React, { useState, useEffect } from "react";
import div1Image from "../assets/div1Image.jpg";
import div2Image from "../assets/div2Image.jpg";
import div3Image from "../assets/div3Image.jpg";
import div4Image from "../assets/div4Image.jpg";
import div5Image from "../assets/div5Image.jpg";
import college1 from "../assets/college1.jpg";
import college2 from "../assets/college2.jpg";
import college3 from "../assets/college3.png";
import college4 from "../assets/college4.png";
import college5 from "../assets/college5.png";
import college6 from "../assets/college6.png";
import college7 from "../assets/college7.png";
import Footer from "../components/common/Footer";

const Explore = () => {
  const [showMore, setShowMore] = useState(false);
  const [isSmallDevice, setIsSmallDevice] = useState(false);

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
            {[
              { img: college7, text: "Div 1" },
              { img: college3, text: "Div 2" },
              { img: college4, text: "Div 3" },
              { img: college6, text: "Div 4" },
            ].map((item, index) => (
              <div
                key={index}
                className="h-48 rounded-lg overflow-hidden shadow-md relative hover:scale-105 transition-transform duration-300"
              >
                <img
                  src={item.img}
                  alt={item.text}
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-0 w-full flex items-center justify-center bg-black bg-opacity-50 text-white py-2 backdrop-blur-sm">
                  {item.text}
                </div>
              </div>
            ))}
          </div>

          {/* Right Side (Single Div with Height Equal to Left Side) */}
          <div className="w-full md:w-1/2 h-[25rem] rounded-2xl overflow-hidden shadow-lg relative hover:scale-105 transition-transform duration-300">
            <img
              src={college7}
              alt="Div 5"
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-0 w-full flex items-center justify-center bg-black bg-opacity-50 text-white py-4 backdrop-blur-sm">
              Div 5
            </div>
          </div>
        </div>

        {/* Hidden Reversed Split Layout */}
        {!isSmallDevice && showMore && (
          <div className="flex flex-col md:flex-row gap-4 lg:m-6 lg:mt-20">
            {/* Left Side (Single Div with Height Equal to Right Side) */}
            <div className="w-full md:w-1/2 h-[25rem] rounded-2xl overflow-hidden shadow-lg relative hover:scale-105 transition-transform duration-300">
              <img
                src={college2}
                alt="Div 5 (Reversed)"
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-0 w-full flex items-center justify-center bg-black bg-opacity-50 text-white py-4 backdrop-blur-sm">
                Div 5 (Reversed)
              </div>
            </div>

            {/* Right Side (2x2 Grid) */}
            <div className="w-full md:w-1/2 grid grid-cols-2 gap-4">
              {[
                { img: college4, text: "Div 4 (Reversed)" },
                { img: college2, text: "Div 3 (Reversed)" },
                { img: college6, text: "Div 2 (Reversed)" },
                { img: college2, text: "Div 1 (Reversed)" },
              ].map((item, index) => (
                <div
                  key={index}
                  className="h-48 rounded-lg overflow-hidden shadow-md relative hover:scale-105 transition-transform duration-300"
                >
                  <img
                    src={item.img}
                    alt={item.text}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-0 w-full flex items-center justify-center bg-black bg-opacity-50 text-white py-2 backdrop-blur-sm">
                    {item.text}
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
      <div className="lg:m-6  mt-12 md:mt-16">
        <span className="text-2xl text-gray-500 font-diphylleia">
          Browse By Tags
        </span>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6 lg:mb-4">
          {[
            { img: college1, text: "College 1" },
            { img: college2, text: "College 2" },
            { img: college3, text: "College 3" },
            { img: college4, text: "College 4" },
            { img: college6, text: "College 5" },
            { img: college5, text: "College 6" },
            { img: college3, text: "College 7" },
            { img: college4, text: "College 8" },
          ].map((item, index) => (
            <div
              key={index}
              className="h-[16rem] w-full rounded-xl overflow-hidden shadow-md relative flex flex-col justify-end cursor-pointer hover:scale-105 transition-transform duration-300"
            >
              <img
                src={item.img}
                alt={item.text}
                className="w-full h-full object-cover"
              />
              <div className="w-full bg-black bg-opacity-50 text-white text-center py-2 backdrop-blur-sm">
                {item.text}
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
