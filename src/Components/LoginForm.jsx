import { useState } from "react";
import styles from "./Form.module.css";

const LoginForm = () => {
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = (e) => {

    // Nesse handlesubmit você deverá usar o preventDefault,
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

    // enviar os dados do formulário e enviá-los no corpo da requisição 
    // para a rota da api que faz o login /auth
    // lembre-se que essa rota vai retornar um Bearer Token e o mesmo deve ser salvo
    // no localstorage para ser usado em chamadas futuras
    // Com tudo ocorrendo corretamente, o usuário deve ser redirecionado a página principal,com react-router (/home)
    // Lembre-se de usar um alerta para dizer se foi bem sucedido ou ocorreu um erro

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
