// ProtectedRoute.js
import React from "react";
import { Navigate, Outlet } from "react-router-dom";

function ProtectedRoute() {
  const authToken = localStorage.getItem("authToken"); 

  return authToken ? <Outlet /> : <Navigate to="/signin" />;
}

export default ProtectedRoute;
