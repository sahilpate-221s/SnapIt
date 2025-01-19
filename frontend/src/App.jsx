import { useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import Home from "./pages/Home";
import Navbar from "./components/common/Navbar";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import All from "./pages/All";
import PrivateRoute from "./components/core/Auth/PrivateRoute";
import Explore from "./pages/Explore";
import CreatePost from "./components/core/Posts/CreatePost";
import Error from "./pages/Error";
import LoggedHomePage from "./components/core/Posts/LoggedHomePage";
import Dashboard from "./components/core/Dashboard/Dashboard";

function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.profile);
  const { token } = useSelector((state) => state.auth); // token
  return (
    <div className="w-screen min-h-screen">
      <Navbar />
      <Routes>
        <Route path="/" element={token ? <LoggedHomePage /> : <Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Signup />} />
        <Route path="/explore" element={<Explore />} />

        <Route
          path="/create"
          element={
            <PrivateRoute>
              <CreatePost />
            </PrivateRoute>
          }
        />

        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route path="/error" element={<Error />} />
      </Routes>
    </div>
  );
}

export default App;
