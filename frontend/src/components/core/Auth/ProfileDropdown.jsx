import React, { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaCaretDown } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom"; // Import useNavigate
import { logout } from "../../../services/operations/authAPI";

function ProfileDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const user = useSelector((state) => state.profile.user);
  const profilePictureUrl =
    user?.profilePicture || "https://via.placeholder.com/150"; // Replace with actual profile picture URL

  const dispatch = useDispatch();
  const navigate = useNavigate(); // Use navigate hook

  const dropdownRef = useRef(null); // Create a reference for the dropdown to detect outside clicks

  // Function to toggle the dropdown
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  // Function to handle logout
  const handleLogout = () => {
    dispatch(logout(navigate)); // Pass navigate to logout action
  };

  // Handle clicks outside the dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false); // Close the dropdown if the click is outside
      }
    };

    // Add event listener to detect outside clicks
    document.addEventListener("mousedown", handleClickOutside);

    // Clean up the event listener when component is unmounted
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
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
            <Link
              to="/dashboard"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              Dashboard
            </Link>
            <Link
              to="/create-collections" // Adjust the path as necessary
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              Create Collections
            </Link>
            <div
              onClick={handleLogout}
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              Logout
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProfileDropdown;
