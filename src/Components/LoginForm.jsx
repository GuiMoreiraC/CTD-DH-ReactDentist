import styles from "./Form.module.css";

import { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext";

import useApi from "../Hooks/useApi";

const LoginForm = () => {
  const navigate = useNavigate();
  const { setToken } = useContext(AuthContext);
  const [errorMessage, setErrorMessage] = useState("");
  const { data, error, shouldFetch } = useApi();

  useEffect(() => {
    if (data && !error) {
      // Salvar o token no usando a Context API
      setToken(data.token);
      
      /// Redirecionamos o usuário para a Home
      navigate("/home");

    }

    // Mostrar erro de login
    if (error) {
      error.response.status == 400 
        ? setErrorMessage("Credenciais inválidas")
        : setErrorMessage("Ocorreu um erro. Tente novamente mais tarde.");

    }

  }, [data, error, navigate]);
  
  const handleSubmit = async (e) => {
    e.preventDefault();

    const login = e.target.elements.login.value.trim();
    const password = e.target.elements.password.value.trim();

    /// Validações
    // Verificar se todos os campos obrigatórios foram preenchidos
    if (!login || !password) {
      !login
        ? setErrorMessage("O campo de login é obrigatório")
        : setErrorMessage("O campo de Senha é obrigatório");
      return;

    }

    // Validar comprimento do campo de login
    if (login.length <= 5 || password.length <=7) {
      login.length <= 5
        ? setErrorMessage("O campo de login deve ter comprimento maior que 5")
        : setErrorMessage("O campo de Senha deve ter no minimo 8 caracteres");
      return;

    }

    // Enviar os dados do formulário para a rota da API que faz o login (/auth)
    await shouldFetch("auth", {
      username: login,
      password: password,

    });

  };

  return (
    <>
      <div className={`text-center card container ${styles.card}`}>
        <div className={`card-body ${styles.CardBody}`}>
          <form onSubmit={handleSubmit} noValidate>
            <input
              className={`form-control ${styles.inputSpacing}`}
              placeholder="Login"
              name="login"
              required
            />
            <input
              className={`form-control ${styles.inputSpacing}`}
              placeholder="Password"
              name="password"
              type="password"
              required
            />
            <button className="btn btn-primary" type="submit">
              Send
            </button>
          </form>
          {errorMessage && (
            <div className="alert alert-danger mt-3" role="alert">
              {errorMessage}
            </div>
          )}
        </div>
      </div>
    </>

  );

};

export default LoginForm;
