import React from "react";
import { Navigate } from "react-router-dom";
import AuthService from "../services/AuthService";

export const PrivateRoute = ({ Component }) => {
  const auth = localStorage.getItem("user");
  if (auth) {
    const parsedAuth = JSON.parse(auth);
    if (parsedAuth.roles.find((e) => e === "ADMIN")) {
      AuthService.logout();
      return <Navigate to="/" />;
    } else {
      return <Component />;
    }
  } else {
    return <Navigate to="/" />;
  }
};
