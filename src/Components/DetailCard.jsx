import { useEffect,useState,useContext } from "react";
import ScheduleFormModal from "./ScheduleFormModal";
import styles from "./DetailCard.module.css";
import axios from "axios";
import { useParams } from 'react-router-dom';
import { GlobalContext } from "../Context/GlobalContext";

const DetailCard = () => {
  const [dentist,setDentist] = useState({});
  const [username, setUsername] = useState("")
  const params = useParams();
  const dentistID = params.id;
  const {theme} = useContext(GlobalContext);
  const token =localStorage.getItem("token");
  useEffect(() => {
    //Nesse useEffect, você vai fazer um fetch na api passando o 
    //id do dentista que está vindo do react-router e carregar os dados em algum estado
    getdDentist();
  },[]);

  async function getdDentist(id){
    const response = await axios.get(`https://dhodonto.ctdprojetointegrador.com/dentista?matricula=${dentistID}`)
    setDentist(response.data);
    setUsername(response.data.usuario.username);
}
  return (
    //As instruções que estão com {''} precisam ser 
    //substituídas com as informações que vem da api
    <>
      <h1>Detail about Dentist {dentist.nome+" "+dentist.sobrenome} </h1>
      <section className={`card col-sm-12 col-lg-6 container ${theme === "light"? "" : styles.cardDark}`}>
        {/* //Na linha seguinte deverá ser feito um teste se a aplicação
        // está em dark mode e deverá utilizar o css correto */}
        <div
          className={`card-body row ${theme === "light"? "" : styles.cardDark}`}
        >
          <div className="col-sm-12 col-lg-6">
            <img
              className="card-img-top"
              src="/images/doctor.jpg"
              alt="doctor placeholder"
            />
          </div>
          <div className="col-sm-12 col-lg-6">
            <ul className="list-group">
              <li className="list-group-item">Nome: {dentist.nome}</li>
              <li className="list-group-item">
                Sobrenome: {dentist.sobrenome}
              </li>
              <li className="list-group-item">
                Matricula: {dentist.matricula}
              </li>
              <li className="list-group-item">
                Usuário: {username}
              </li>
            </ul>
            <div className="text-center">
              {/* //Na linha seguinte deverá ser feito um teste se a aplicação
              // está em dark mode e deverá utilizado o css correto */}
              {<button
                data-bs-toggle="modal"
                disabled={token!==null?false:true}
                data-bs-target="#exampleModal"
                className={`btn ${styles.button
                  } ${theme === "light" ? "btn-light" : "btn-dark"}`}
              >
                Marcar consulta
              </button>
              }
              
            </div>
          </div>
        </div>
      </section>
      <ScheduleFormModal />
    </>
  );
};

export default DetailCard;
