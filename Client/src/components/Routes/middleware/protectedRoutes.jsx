// components/ProtectedRoute.jsx
import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../../../context/AuthContext';

const ProtectedRoute = ({ children }) => {
  const { isAdmin } = useContext(AuthContext);

  if (!isAdmin) {
    // Rediriger vers la page d'accueil ou de connexion si l'utilisateur n'est pas admin
    return <Navigate to="/" />;
  }

  return children;
};

export default ProtectedRoute;
