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

function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.profile);
  return (
    <div className="w-screen min-h-screen">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Signup />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/all" element={
          <PrivateRoute>
            <All />
           </PrivateRoute>
        } />


        <Route path="/create" element = {<CreatePost/>} />
      </Routes>
    </div>

    

    
  );
}

export default App;
