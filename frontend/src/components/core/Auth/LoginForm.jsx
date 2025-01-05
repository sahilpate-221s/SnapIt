import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../../../services/operations/authAPI";

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

  const handleOnSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    dispatch(login(email, password, navigate));

    setIsLoading(false);
  };

  return (
    <form onSubmit={handleOnSubmit}>
      {/* Email field */}
      <label className="w-full">
        <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-black">
          Email Address <sup className="text-red-300">*</sup>
        </p>
        <input
          type="text"
          required
          name="email"
          value={email}
          onChange={handleOnChange}
          placeholder="Enter email address"
          style={{
            boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
          }}
          className="w-full rounded-[0.5rem] bg-white p-[12px] text-black border"
        />
      </label>

      {/* Password field */}
      <div className="mb-6 relative">
        <label
          htmlFor="password"
          className="block text-sm font-medium text-gray-700"
        >
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
          className="w-full rounded-lg bg-white p-3 text-black border"
        />
        <button
          type="button"
          onClick={() => setShowPassword((prev) => !prev)}
          className="absolute top-9 right-3 text-gray-500 hover:text-gray-700"
        >
          {showPassword ? "Hide" : "Show"}
        </button>
      </div>

      {/* Forgot Password Link */}
      <div className="mb-4 text-right">
        <Link
          to="/forgot-password"
          className="text-sm text-blue-500 hover:underline"
        >
          Forgot Password?
        </Link>
      </div>

      {/* Login Button */}
      <button
        type="submit"
        className={`w-full px-6 py-3 rounded-lg text-white transition duration-300`}
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
  );
};

export default LoginForm;
