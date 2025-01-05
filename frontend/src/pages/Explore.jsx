import React from "react";
import div1Image from "../assets/div1Image.jpg";
import div2Image from "../assets/div2Image.jpg";
import div3Image from "../assets/div3Image.jpg";
import div4Image from "../assets/div4Image.jpg";
import div5Image from "../assets/div5Image.jpg";
import college1 from "../assets/college1.jpg";
import college2 from "../assets/college2.jpg";
import college3 from "../assets/college3.png";
import college4 from "../assets/college4.png";
import Footer from "../components/common/Footer";

const Explore = () => {
  return (
    <div className="min-h-screen  p-8 w-11/12 mx-auto">
      {/* Main Heading */}
      <h1 className="text-5xl md:text-8xl font-caveat text-center mb-8">
        Explore
      </h1>
      <span className="text-2xl text-gray-500 font-diphylleia lg:ml-6">Explore the best from the university</span>
      <div className="container mx-auto ">
        {/* Split Layout */}
        <div className="flex flex-col md:flex-row gap-4 lg:m-6">
          {/* Left Side (2x2 Grid) */}
          <div className="w-full md:w-1/2 grid grid-cols-2 gap-4">
            <div className="h-48 rounded-lg overflow-hidden shadow-md hover:scale-105 transition-transform duration-300">
              <img
                src={div1Image}
                alt="Div 1"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="h-48 rounded-lg overflow-hidden shadow-md hover:scale-105 transition-transform duration-300">
              <img
                src={div2Image}
                alt="Div 2"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="h-48 rounded-lg overflow-hidden shadow-md hover:scale-105 transition-transform duration-300">
              <img
                src={div3Image}
                alt="Div 3"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="h-48 rounded-lg overflow-hidden shadow-md hover:scale-105 transition-transform duration-300">
              <img
                src={div4Image}
                alt="Div 4"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Right Side (Single Div with Height Equal to Left Side) */}
          <div className="w-full md:w-1/2 h-[25rem] rounded-2xl overflow-hidden shadow-lg hover:scale-105 transition-transform duration-300">
            <img
              src={div5Image}
              alt="Div 5"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        <div className="flex items-center justify-center">
          <button className=" bg-gray-300 border h-16 rounded-2xl w-[10rem] ">
            Show more
          </button>
        </div>
      </div>

      {/* browse by tags */}

      <div className="lg: m-6">
        <span className="text-2xl text-gray-500 font-diphylleia ">Browse By Tags</span>
        <div className="flex flex-row items-center justify-between mx-auto lg:mb-6 mt-3 ">
          <div className="h-[16rem] rounded-xl  bg-gray-300  w-[18rem]  cursor-pointer">
            div1
          </div>
          <div className="h-[16rem] rounded-xl  bg-gray-300  w-[18rem] cursor-pointer">
            div2
          </div>
          <div className="h-[16rem] rounded-xl  bg-gray-300  w-[18rem] cursor-pointer">
            div3
          </div>
          <div className="h-[16rem] rounded-xl  bg-gray-300  w-[18rem] cursor-pointer">
            div4
          </div>
        </div>

        <div className="flex flex-row items-center justify-between mx-auto ">
          <div className="h-[16rem] rounded-xl  bg-gray-300  w-[18rem] cursor-pointer">
            div1
          </div>
          <div className="h-[16rem] rounded-xl  bg-gray-300  w-[18rem] cursor-pointer">
            div2
          </div>
          <div className="h-[16rem] rounded-xl  bg-gray-300  w-[18rem] cursor-pointer">
            div3
          </div>
          <div className="h-[16rem] rounded-xl  bg-gray-300  w-[18rem] cursor-pointer">
            div4
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Explore;
