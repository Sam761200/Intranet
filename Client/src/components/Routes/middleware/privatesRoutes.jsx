import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../../context/AuthContext";

const PrivateRoutes = ({ children }) => {
  const AuthContext = useContext(AuthContext);
  const navigate = useNavigate();
  return AuthContext ? children : navigate("/");
};

export default PrivateRoutes;