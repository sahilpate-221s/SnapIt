import React from "react";

const CreateCollection = ({ onClose }) => {
  return (
    <div className="relative w-full max-w-md bg-white rounded-lg shadow-lg p-6 mx-auto">
      {/* Close Button */}
      <button
        className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-2xl focus:outline-none"
        onClick={onClose}
      >
        &times;
      </button>

      {/* Modal Title */}
      <h2 className="text-xl md:text-2xl font-bold text-gray-800 text-center mb-6">
        Create Collection
      </h2>

      {/* Collection Name Input */}
      <div className="mb-4">
        <label
          htmlFor="collectionName"
          className="block text-sm font-medium text-gray-700"
        >
          Collection Name
        </label>
        <input
          type="text"
          id="collectionName"
          className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-black focus:border-black text-gray-900"
          placeholder="Enter collection name"
        />
      </div>

      {/* Description Input */}
      <div className="mb-6">
        <label
          htmlFor="description"
          className="block text-sm font-medium text-gray-700"
        >
          Description
        </label>
        <textarea
          id="description"
          className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-black focus:border-black text-gray-900"
          placeholder="Enter description"
          rows={3}
        ></textarea>
      </div>

      {/* Create Collection Button */}
      <button
        className="w-full bg-black text-white py-2 px-4 rounded-lg text-sm font-medium hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-all duration-200"
        onClick={onClose}
      >
        Create Collection
      </button>
    </div>
  );
};

export default CreateCollection;
