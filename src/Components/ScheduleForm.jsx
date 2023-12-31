import { useContext, useState } from "react";
import styles from "./ScheduleForm.module.css";
import axios from "axios";
import { GlobalContext } from "../Context/GlobalContext";

const ScheduleForm = () => {
  const { apiData, theme } = useContext(GlobalContext); //busca dados do contexto da API
  const dentistList = apiData.dentistList; //define a variavel dentisList com a lista de dentistas obtida na consulta
  const pacientList = apiData.pacientList; //define a variavel pacientList com a lista de pacientes obtida na consulta

  const [appointmentDate, setAppointmentDate] = useState("");

  const [pacient, setPacient] = useState("");
  const [dentist, setDentist] = useState("");
  const token = localStorage.getItem("token");

  function handleChangeSelectDentist(event) {
    setDentist(event.target.value); //define o valor do estado com a matricula do dentista selecionado no select
  }
  function handleChangeSelectPacient(event) {
    setPacient(event.target.value); //define o valor do estado com a matricula do paciente selecionado no select
  }
  function handleDateSelect(event) {
    const selectedDate = event.target.value;
    if (selectedDate !== "") {
      setAppointmentDate(selectedDate);
    }
  }
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {

      const response = await axios.post(
        "https://dhodonto.ctdprojetointegrador.com/consulta",
        {
          paciente: {
            matricula: pacient
          },
          dentista: {
            matricula: dentist
          },
          dataHoraAgendamento: appointmentDate
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      console.log(response);
      if (response.status === 200) {
        alert("Consulta agendada com sucesso")
        window.location.href = "/home";
      }
    } catch (e) {
      console.log(e);
      const msg = e.response ? e.response.data : 'Ocorreu um erro durante o agendamento da consulta';
      alert(msg);
    }
 
    //Nesse handlesubmit você deverá usar o preventDefault,
    //obter os dados do formulário e enviá-los no corpo da requisição 
    //para a rota da api que marca a consulta
    //lembre-se que essa rota precisa de um Bearer Token para funcionar.
    //Lembre-se de usar um alerta para dizer se foi bem sucedido ou ocorreu um erro
  };

  return (
    <>
      {/* //Na linha seguinte deverá ser feito um teste se a aplicação
        // está em dark mode e deverá utilizar o css correto */}
      <div
        className={`text-center container`}
      >
        <form onSubmit={handleSubmit}>
          <div className={`row ${styles.rowSpacing}`}>
            <div className="col-sm-12 col-lg-6">
              <label htmlFor="dentist" className="form-label">
                Dentist
              </label>
              <select className="form-select" name="dentist" id="dentist" onChange={handleChangeSelectDentist}>
                <option>-- Selecione --</option>
                {/*Aqui deve ser feito um map para listar todos os dentistas*/}
                {dentistList && dentistList.map((dentist) => {
                  return (
                    <option key={dentist.matricula} value={dentist.matricula}>
                      {dentist.nome + " " + dentist.sobrenome}
                    </option>
                  )
                })}

              </select>
            </div>
            <div className="col-sm-12 col-lg-6">
              <label htmlFor="patient" className="form-label">
                Patient
              </label>
              <select className="form-select" name="patient" id="patient" onChange={handleChangeSelectPacient}>
                <option>-- Selecione --</option>
                {/*Aqui deve ser feito um map para listar todos os pacientes*/}
                {pacientList && pacientList.map((pacient) => {
                  return (
                    <option key={pacient.matricula} value={pacient.matricula}>
                      {pacient.nome + " " + pacient.sobrenome}
                    </option>
                  )
                })}
              </select>
            </div>
          </div>
          <div className={`row ${styles.rowSpacing}`}>
            <div className="col-12">
              <label htmlFor="appointmentDate" className="form-label">
                Date
              </label>
              <input
                className="form-control"
                id="appointmentDate"
                name="appointmentDate"
                type="datetime-local"
                value={appointmentDate}
                onChange={handleDateSelect}
              />
            </div>
          </div>
          <div className={`row ${styles.rowSpacing}`}>
            {/* //Na linha seguinte deverá ser feito um teste se a aplicação
        // está em dark mode e deverá utilizar o css correto */}
            <button
              className={theme === "light" ? `btn btn-light` : `btn btn-dark`}
              type="submit"
            //data-bs-dismiss="modal"
            >
              Schedule
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default ScheduleForm;
