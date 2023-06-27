import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Form.module.css";

const LoginForm = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate(); // Adicionando o useNavigate

  const handleSubmit = async (e) => {
    e.preventDefault();

    const login = e.target.elements.login.value.trim();
    const password = e.target.elements.password.value.trim();

    // Verificar se todos os campos obrigatórios foram preenchidos
    if (!login || !password) {
      setErrorMessage("Verifique suas informações novamente");
      return;
    }

    // Validar comprimento do campo de login
    if (login.length <= 5) {
      setErrorMessage("O campo de login deve ter comprimento maior que 5");
      return;
    }

    try {
      // Enviar os dados do formulário para a rota da API que faz o login (/auth)
      const response = await fetch("https://dhodonto.ctdprojetointegrador.com/auth", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: login,
          password: password,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        const token = data.token;
        const tipo = data.tipo;

        // Salvar o token no localStorage usando a Context API
        localStorage.setItem("token", token);
        //localStorage.setItem("Tipo", tipo);

        // Redirecionar o usuário para a página Home (/home)
        navigate("/home"); // Utilizando o navigate para redirecionar

      } else {
        setErrorMessage("Ocorreu um erro ao fazer o login. Verifique suas informações novamente.");
      }
    } catch (error) {
      setErrorMessage("Ocorreu um erro ao fazer o login. Por favor, tente novamente mais tarde.");
    }
  };

  return (
    <>
      <div className={`text-center card container ${styles.card}`}>
        <div className={`card-body ${styles.CardBody}`}>
          <form onSubmit={handleSubmit}>
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
