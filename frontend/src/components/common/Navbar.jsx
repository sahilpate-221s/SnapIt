import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import logo from "../../assets/logo.png";
import { useSelector } from "react-redux";
import ProfileDropdown from "../core/Auth/ProfileDropdown"; // Import the ProfileDropdown component

const Navbar = () => {
  const { token } = useSelector((state) => state.auth); // Get token from Redux state
  const { user } = useSelector((state) => state.profile); // Get user info from Redux state
  const location = useLocation(); // Get the current route
  const [isMenuOpen, setIsMenuOpen] = useState(false); // Manage menu toggle for mobile

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Explore", path: "/explore" },
    { name: "Create", path: "/create" },
    { name: "Collections", path: "/collections" },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-white h-20 shadow-md flex items-center">
      <div className="container mx-auto flex justify-between items-center w-11/12 max-w-maxContent">
        {/* Left Section: Logo and Search or Navigation Links */}
        <div className="flex items-center space-x-4">
          <img src={logo} alt="Logo" className="h-12" />{" "}
          {/* Adjusted logo size for taller navbar */}
          {token ? (
            <div className="relative items-center hidden md:flex">
              <input
                type="text"
                placeholder="Search"
                className="font-serif h-8 md:w-40 lg:w-80 rounded-full p-2 border border-gray-300"
              />
              <div className="absolute right-2 bg-gray-200 p-1 rounded-full">
                <FaSearch className="text-gray-500" />
              </div>
            </div>
          ) : (
            <div className="hidden md:flex items-center space-x-1">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`${
                    location.pathname === item.path
                      ? "bg-gray-400 text-black"
                      : "text-gray-600 hover:text-black"
                  } px-2 py-1 rounded-md`}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* Right Section: Navigation Links or ProfileDropdown */}
        <div className="flex items-center space-x-4 md:space-x-6">
          {token ? (
            <div className="hidden md:flex flex-row md:space-x-2 lg:space-x-6">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`${
                    location.pathname === item.path
                      ? "bg-gray-400 text-black"
                      : "text-gray-600 hover:text-black"
                  } px-2 py-1 rounded-md`}
                >
                  {item.name}
                </Link>
              ))}
              <ProfileDropdown />
            </div>
          ) : (
            <div className="hidden md:flex space-x-1">
              <Link
                to="/register"
                className="text-gray-600 hover:text-black hover:bg-gray-200 px-3 py-1 rounded-md"
              >
                Register
              </Link>
              <Link
                to="/login"
                className="text-gray-600 hover:text-black hover:bg-gray-200 px-3 py-1 rounded-md"
              >
                Login
              </Link>
            </div>
          )}

          {/* Mobile Menu Toggle */}
          <button
            className="text-black md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <AiOutlineMenu size={24} />
          </button>
        </div>
      </div>

      {/* Mobile Sliding Drawer Menu */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-white shadow-md z-50 transform ${
          isMenuOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out`}
      >
        <div className="flex justify-between items-center p-4 border-b border-gray-300">
          <img src={logo} alt="Logo" className="h-8" />
          <button className="text-black" onClick={() => setIsMenuOpen(false)}>
            <AiOutlineClose size={24} />
          </button>
        </div>

        <div className="flex flex-col mt-4 space-y-2 px-4">
          {navItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className={`${
                location.pathname === item.path
                  ? "bg-gray-400 text-black rounded-xl"
                  : "text-gray-600 hover:text-black hover:rounded-xl"
              } px-3 py-2`}
              onClick={() => setIsMenuOpen(false)}
            >
              {item.name}
            </Link>
          ))}
        </div>

        <div className="flex flex-col mt-4 space-y-2 px-4 border-t border-gray-300 pt-4">
          {token ? (
            <ProfileDropdown />
          ) : (
            <>
              <Link
                to="/register"
                className="text-gray-600 hover:text-black hover:bg-gray-200 px-3 py-2 rounded-md"
                onClick={() => setIsMenuOpen(false)}
              >
                Register
              </Link>
              <Link
                to="/login"
                className="text-gray-600 hover:text-black hover:bg-gray-200 px-3 py-2 rounded-md"
                onClick={() => setIsMenuOpen(false)}
              >
                Login
              </Link>
            </>
          )}
        </div>
      </div>

      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setIsMenuOpen(false)}
        />
      )}
    </nav>
  );
};

export default Navbar;
