import axios from "axios";
import React, { useState, useContext } from "react";
import { useNavigate } from 'react-router-dom';
import { AuthContext } from "../../context/AuthContext";

const SignInForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({ email: "", password: "" });
  const navigate = useNavigate();
  const { setAuthToken } = useContext(AuthContext);

  const handleLogin = (e) => {
    e.preventDefault();
    axios({
      method: "post",
      url: `${import.meta.env.VITE_API_URL}api/user/login`,
      withCredentials: true,
      data: {
        email,
        password,
      },
    })
      .then((res) => {
        console.log("REPONSE", res);
        if (res.data.errors) {
          setErrors(res.data.errors);
          console.log(res.data.errors);
        } else {
           // Extraire le jeton JWT de l'en-tête de la réponse
           const token = res.headers["authorization"].split(' ')[1];
           console.log("Token reçu:", token);
           setAuthToken(token);
           console.log("Token", token)
          
           localStorage.setItem("jwtToken", token);
           
           navigate('/');
        }
      })
      .catch((err) => {
        console.log(err);
        setErrors(err.response.data.errors);
      });
  };
  return (
    <form onSubmit={handleLogin} id="sign-up-form">
      <label htmlFor="email">Email</label>
      <br />
      <input
        type="text"
        name="email"
        id="email"
        onChange={(e) => setEmail(e.target.value)}
        value={email}
      />
      <div className="email error">{errors.email}</div>
      <br />
      <label htmlFor="password">Mot de passe</label>
      <br />
      <input
        type="password"
        name="password"
        id="password"
        onChange={(e) => setPassword(e.target.value)}
        value={password}
      />
      <div className="password error">{errors.password}</div>
      <br />
      <input type="submit" value="Se connecter" />
    </form>
  );
};

export default SignInForm;