// Navbar.jsx
import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import Logout from "../Log/Logout";
import { AuthContext } from "../../context/AuthContext"; // Importez AuthContext

const Navbar = () => {
  const { isAdmin } = useContext(AuthContext); // Utilisez useContext pour accéder à isAdmin

  return (
    <nav>
      <div className="nav-container">
        <div className="homeNav">
          <NavLink exact to="/">
            Home
          </NavLink>
        </div>
        <div className="collaborateursNav">
          <NavLink exact to="/collaborateurs">
            Collaborateurs
          </NavLink>
        </div>
        {isAdmin && ( // Afficher conditionnellement ce lien
          <div className="Add">
            <NavLink exact to="/addcollaborateur">
              Ajouter 
            </NavLink>
          </div>
        )}
        <div className="Logout">
          <Logout />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
