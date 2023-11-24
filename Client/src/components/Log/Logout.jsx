import React, {useContext} from "react";
import axios from "axios";
import cookie from "js-cookie";
import iconLogout from "../../assets/logout.svg";
import { useNavigate } from 'react-router-dom';
import { AuthContext } from "../../context/AuthContext";

const Logout = () => {
    const navigate = useNavigate(); 
    const { setAuthToken } = useContext(AuthContext);

    const handleLogout = () => {
        localStorage.removeItem('jwtToken'); 
        setAuthToken(null);
        navigate('/');
    };
    
    return (
        <li onClick={handleLogout}>
            <img src={iconLogout} alt="logout" className="logoutc" />
        </li>
    );
};

export default Logout;
