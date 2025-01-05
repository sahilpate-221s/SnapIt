import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { FaCaretDown } from 'react-icons/fa';

function ProfileDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const user = useSelector((state) => state.profile.user);
  const profilePictureUrl = user?.profilePictureUrl || 'https://via.placeholder.com/150'; // Replace with actual profile picture URL

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative inline-block text-left">
      <div
        className="flex items-center space-x-2 cursor-pointer"
        onClick={toggleDropdown}
      >
        <div className="border-2 border-black rounded-full p-0.5">
          <img
            src={profilePictureUrl}
            alt="Profile"
            className="w-8 h-8 rounded-full"
          />
        </div>
        <FaCaretDown className="text-black" />
      </div>
      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg">
          <div className="py-1">
            <a
              href="/dashboard"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              Dashboard
            </a>
            <a
              href="/logout"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              Logout
            </a>
            <a
              href="/logout"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              Create Collections
            </a>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProfileDropdown;