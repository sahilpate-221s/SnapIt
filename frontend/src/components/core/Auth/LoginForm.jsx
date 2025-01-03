import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../../../services/operations/authAPI";
// import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

const LoginForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { email, password } = formData;

  const handleOnChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await dispatch(login(email, password, navigate));
    } catch (error) {
      console.error("Login failed", error);
      alert("Invalid credentials or server error."); // Replace with toast for better UX
    } finally {
      setIsLoading(false);
    }
  };

  const isFormValid = email && password;

  return (
    <div>
      <form onSubmit={handleOnSubmit}>
        {/* Email field */}
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            required
            type="email"
            name="email"
            value={email}
            onChange={handleOnChange}
            placeholder="Enter email address"
            aria-label="Enter your email"
            className="w-full rounded-lg bg-gray-800 p-3 text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Password field */}
        <div className="mb-6 relative">
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">
            Password
          </label>
          <input
            required
            type={showPassword ? "text" : "password"}
            name="password"
            value={password}
            onChange={handleOnChange}
            placeholder="Enter Password"
            aria-label="Enter your password"
            className="w-full rounded-lg bg-gray-800 p-3 text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {/* <span
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute top-10 right-3 cursor-pointer text-gray-400"
          >
            {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
          </span> */}
        </div>

        {/* Forgot Password Link */}
        <div className="mb-4 text-right">
          <Link to="/forgot-password" className="text-sm text-blue-500 hover:underline">
            Forgot Password?
          </Link>
        </div>

        {/* Login Button */}
        <button
          type="submit"
          className={`w-full px-6 py-3 rounded-lg text-white ${
            isFormValid && !isLoading ? "bg-blue-500 hover:bg-blue-600" : "bg-gray-400"
          } transition duration-300`}
          disabled={!isFormValid || isLoading}
        >
          {isLoading ? "Logging in..." : "Login"}
        </button>

        {/* Don't have an account? Text */}
        <p className="mt-4 text-center text-sm">
          Don't have an account?{" "}
          <Link to="/register" className="text-blue-500 hover:underline">
            Sign up here
          </Link>
        </p>
      </form>
    </div>
  );
};

export default LoginForm;
