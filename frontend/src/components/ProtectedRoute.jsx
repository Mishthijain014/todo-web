import React from "react";
import { Navigate } from "react-router-dom";

/**
 * Client-Side Routing Component: Protected Route Guard
 * Concept: Client-side routing & JWT token validation
 */
const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
