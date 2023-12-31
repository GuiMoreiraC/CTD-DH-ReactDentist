import styles from "./Form.module.css";

import { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { GlobalContext } from "../Context/GlobalContext";

import useApi from "../Hooks/useApi";

const LoginForm = () => {
  const navigate = useNavigate();
  const { theme, setToken } = useContext(GlobalContext);
  const [errorMessage, setErrorMessage] = useState("");
  const { data, error, shouldFetch } = useApi();

  useEffect(() => {
    if (data && !error) {
      // Salvar o token no usando a Context API
      setToken(data.token);
      localStorage.setItem("token", data.token);
      alert("Login realizado com sucesso!");
      /// Redirecionamos o usuário para a Home
      navigate("/home");

    }

    // Mostrar erro de login
    if (error) {
      error.response.status === 400
        ? setErrorMessage("Verifique suas informações novamente. Credenciais inválidas")
        : setErrorMessage("Ocorreu um erro. Verifique ou tente novamente mais tarde.");

    }

  }, [data, error, navigate, setToken]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const login = e.target.elements.login.value.trim();
    const password = e.target.elements.password.value.trim();

    /// Validações
    // Verificar se todos os campos obrigatórios foram preenchidos
    if (!login || !password) {
      !login
        ? setErrorMessage("Verifique suas informações novamente.")
        : setErrorMessage("Verifique suas informações novamente.");
      return;

    }

    // Validar comprimento do campo de login
    if (login.length <= 5 || password.length <= 7) {
      setErrorMessage("Verifique suas informações novamente.")
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
      <div className={`text-center card container ${styles.card} ${theme === "light" ? "light" : "dark"}`}>
        <div className={`card-body ${styles.CardBody}`}>
          <form onSubmit={handleSubmit} noValidate>
            <input
              data-testid="login"
              className={`form-control ${styles.inputSpacing}`}
              placeholder="Login"
              name="login"
              required
            />
            <input
              data-testid="password"
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
            <div className="alert alert-danger mt-3" role="alert" data-testid="alert">
              {errorMessage}
            </div>
          )}
        </div>
      </div>
    </>

  );

};

export default LoginForm;
