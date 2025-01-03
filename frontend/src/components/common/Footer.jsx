import { FaFacebookF, FaTwitter, FaInstagram } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="w-11/12 mx-auto py-8 mt-16 bg-white text-black ">
      <div className=" flex flex-col md:flex-row justify-between items-center">
        {/* Left Side - Logo or Branding */}
        <div className="flex items-center space-x-4">
          <div className="text-2xl font-caveat">CampusLife</div>
          <span className="text-sm text-gray-500">Empowering University Moments</span>
        </div>

        {/* Center - Links Section */}
        <div className="mt-4 md:mt-0 flex space-x-6">
          <a href="#home" className="hover:text-gray-700 transition duration-200">
            Home
          </a>
          <a href="#about" className="hover:text-gray-700 transition duration-200">
            About
          </a>
          <a href="#contact" className="hover:text-gray-700 transition duration-200">
            Contact
          </a>
          <a href="#explore" className="hover:text-gray-700 transition duration-200">
            Explore
          </a>
        </div>

        {/* Right Side - Social Icons */}
        <div className="mt-4 md:mt-0 flex space-x-4">
          <a href="#" className="text-xl hover:text-gray-700 transition duration-200">
            <FaFacebookF />
          </a>
          <a href="#" className="text-xl hover:text-gray-700 transition duration-200">
            <FaTwitter />
          </a>
          <a href="#" className="text-xl hover:text-gray-700 transition duration-200">
            <FaInstagram />
          </a>
        </div>
      </div>

      {/* Bottom Section - Copyright */}
      <div className="mt-6 text-center text-sm text-gray-500">
        &copy; 2025 CampusLife. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
