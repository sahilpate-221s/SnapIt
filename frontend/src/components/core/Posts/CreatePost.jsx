import React from "react";
import { FaPlus } from "react-icons/fa";

const CreatePost = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      {/* Main Container */}
      <div className="container w-11/12 max-w-4xl bg-white p-8 rounded-xl shadow-lg">
        <h1 className="text-3xl font-bold text-gray-800 text-center mb-6">
          Create a Post
        </h1>

        <div className="flex flex-col md:flex-row gap-8">
          {/* Left Side - File Upload Section */}
          <div className="flex items-center justify-center w-full md:w-1/2">
            <div className="flex flex-col items-center justify-center w-full p-6 bg-gray-50 rounded-lg shadow-md">
              <div className="flex flex-col items-center justify-center h-full cursor-pointer">
                <div className="w-12 h-12 mb-4 flex items-center justify-center bg-blue-100 text-blue-500 rounded-full shadow-sm">
                  <FaPlus size={20} />
                </div>
                <p className="text-gray-600 font-medium">Choose a file</p>
                <p className="mt-2 text-sm text-gray-400 text-center">
                  We recommend high-quality .jpg files, less than 10MB.
                </p>
              </div>
            </div>
          </div>

          {/* Right Side - Form Section */}
          <div className="flex items-center justify-center w-full md:w-1/2">
            <form className="w-full">
              <div className="mb-6">
                <label
                  htmlFor="title"
                  className="block text-sm font-medium text-gray-700"
                >
                  Title
                </label>
                <input
                  type="text"
                  id="title"
                  className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
                  placeholder="Enter your title"
                  required
                />
              </div>

              <div className="mb-6">
                <label
                  htmlFor="description"
                  className="block text-sm font-medium text-gray-700"
                >
                  Description
                </label>
                <textarea
                  id="description"
                  rows={4}
                  className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
                  placeholder="Enter a description"
                  required
                ></textarea>
              </div>

              <div className="mb-6">
                <label
                  htmlFor="tag"
                  className="block text-sm font-medium text-gray-700"
                >
                  Tags
                </label>
                <input
                  type="text"
                  id="pin"
                  className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
                  placeholder="add tags"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full px-6 py-3 text-white bg-blue-500 rounded-lg shadow-md hover:bg-blue-600 focus:ring-2 focus:ring-blue-400 focus:outline-none"
              >
                Add+
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePost;
