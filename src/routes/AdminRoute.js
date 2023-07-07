import React from "react";
import { Navigate } from "react-router-dom";
import AuthService from "../services/AuthService";

export const AdminRoute = ({ Component }) => {
  // const auth = JSON.parse(localStorage.getItem("user"));
  // if (auth.roles.find((e) => e === "ADMIN")) {
  //   return <Component />;
  // } else {
  //   return <Navigate to="/" />;
  // }

  const auth = localStorage.getItem("user");
  if (auth) {
    const parsedAuth = JSON.parse(auth);
    if (parsedAuth.roles.find((e) => e === "ADMIN")) {
      return <Component />;
    } else {
      AuthService.logout();
      return <Navigate to="/" />;
    }
  } else {
    return <Navigate to="/" />;
  }
  // return auth ? <Component /> : <Navigate to='/' />;
};
