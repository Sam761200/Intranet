// AuthContext.js
import React, { createContext, useState, useEffect } from 'react';
import { jwtDecode as jwt_decode } from 'jwt-decode';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authToken, setAuthToken] = useState(() => {
    const storedToken = localStorage.getItem("jwtToken");
    return storedToken || null;
  });
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    if (authToken) {
      try {
        const decoded = jwt_decode(authToken);
        console.log(decoded)
        const adminStatus = decoded.isAdmin || false;
        setIsAdmin(adminStatus);
        console.log("Statut d'admin:", adminStatus); // Affiche le statut d'administrateur
      } catch (error) {
        console.error('Erreur lors du décodage du JWT:', error);
      }
    }
  }, [authToken]);
  

  return (
    <AuthContext.Provider value={{ authToken, isAdmin, setAuthToken }}>
      {children}
    </AuthContext.Provider>
  );
};
