import React from "react";
import { Navigate } from "react-router-dom";

export const PrivateRoute = ({ Component }) => {
  const auth = localStorage.getItem("user");
  return auth ? <Component /> : <Navigate to='/' />;
};
