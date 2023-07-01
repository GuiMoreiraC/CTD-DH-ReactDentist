import LoginForm from "../Components/LoginForm";

import { useContext, useEffect } from "react";
import { GlobalContext } from "../Context/GlobalContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (token) {
      navigate("/home");
    }
    
  }, [token, navigate]);

  return (
    <>
      <h1>Login</h1>
      <LoginForm />
    </>
  );
};

export default Login;
