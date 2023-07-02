import { fireEvent, render, screen } from "../../test-utils"
import Login from '../../../Routes/Login';
import App from "../../../App";
import userEvent from "@testing-library/user-event";
import axios from "axios";
import Home from "../../../Routes/Home";
import Card from "../../../Components/Card";

describe("Testes na página de Login, Contexto Global e Renderização de Cards", () => {
  
  // TESTAR RENDERIZAÇÃO DE PÁGINA DE LOGIN
  test('Deve renderizar a página de Login', () => {
    render(<Login />)
    expect(screen.findByText('Login')).not.toBeNull();
    expect(screen.findByText('Send')).not.toBeNull();
  });
  
  // TESTAR REGISTRO DE TEMA NO LOCALSTORAGE
  test('Deve registrar o tema no localstorage', () => {
    render(<App/>)
    expect(localStorage.getItem("theme")).not.toBeNull()
  })
  
  // TESTAR ALTERAÇÃO DE TEMA NO LOCALSTORAGE
  test('Deve alterar o tema no localstorage', () => {

    render(<App/>)
    let control = localStorage.getItem("theme");
    let test = "";
  
    expect(control).not.toBeNull()
    
    // CLICAR NO BOTÃO DE TEMA, ALTERAR E CAPTURAR O NOVO VALOR
    let themeButton =  screen.getByTestId("themeButton")
    fireEvent.click(themeButton)
    test = localStorage.getItem("theme")

    // TESTAR SE O VALOR ANTIGO DO TEMA FOI ALTERADO
    expect(control).not.toEqual(test);
  })

    // TESTAR REALIZAÇÃO DE LOGIN
    test('Login maior que 5 caracteres e senha maior que 7', () => {
        localStorage.removeItem("theme")
        localStorage.removeItem("token")

        render(<Login/>)
  
        let loginInput = screen.getByTestId("login")
        let passwordInput = screen.getByTestId("password")
        let sendButton = screen.getByText("Send")

        userEvent.type(loginInput, "dentistaAdmin")
        userEvent.type(passwordInput, "admin123")
        userEvent.click(sendButton)

        // VERIFICAÇÃO DAS VALIDAÇÕESC
        expect(screen.findByTestId("alert")).not.toBe({}) 
      })

      test('Deve requisitar à API a autenticação do login e realizar o acesso à página Home se retornado válido', async () => {
        let response = await axios.post("https://dhodonto.ctdprojetointegrador.com/auth",{
          "username": "dentistaAdmin",
          "password": "admin123"
        })

        // VERIFICA SE O RETORNO DA API NÃO É NULO
        expect(response.data.token).not.toBeNull()
        localStorage.setItem("token", response.data.token)

        // RENDERIZA HOME 
        render (<Home />)
        expect(screen.getByTestId("homeTitle")).toBeInTheDocument();      
      })

      test('Deve renderizar um card', () => {
        const name = 'John Doe';
        const user = 'john@example.com';
        render(<Card name={name} user={user} />);
        expect(screen.getByText(name)).toBeInTheDocument();
        expect(screen.getByText(user)).toBeInTheDocument();
      });
    })

