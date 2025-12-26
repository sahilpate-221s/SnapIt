// import React from 'react';
// import { useSelector } from 'react-redux';
// import { Navigate } from 'react-router-dom';

// const PrivateRoute = ({ children }) => {
//   const { token } = useSelector((state) => state.auth);

//   console.log('Token:', token); // Debug: Log the token

//   if (token !== null) {
//     return children;
//   } else {
//     return <Navigate to="/login" />;
//   }
// };

// export default PrivateRoute;




import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const location = useLocation();
  const auth = useSelector((state) => state.auth);

  const token = auth?.token?.token;
  const expiry = auth?.token?.expiry;

  const isTokenValid =
    token && expiry && Date.now() < expiry;

  if (!isTokenValid) {
    return (
      <Navigate
        to="/login"
        replace
        state={{ from: location }}
      />
    );
  }

  return children;
};

export default PrivateRoute;
