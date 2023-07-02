import Card from "../Components/Card";

import { useContext, useEffect } from "react";
import { GlobalContext } from "../Context/GlobalContext";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const {apiData, token} = useContext(GlobalContext); //busca dados do contexto da API
  const dentistList = apiData.dentistList; //define a variavel dentisList com a lista de dentistas obtida na consulta

  // const tokenHistory =localStorage.getItem('token')
 
  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
    
  }, [token, navigate]);

  return (
    <>
      <h1 data-testid="homeTitle">Home</h1>
      <div className="card-grid container">
        {dentistList && dentistList.map((dentist) => (  // Verifica se dentistList existe, evitando erro do map executar com a lista vazia
  
          <Card
            name={dentist.nome + " " + dentist.sobrenome}
            matricula={dentist.matricula}
            user={dentist.usuario.username}
            key={dentist.matricula}
          />
        ))}
      </div>
    </>
  );
};

export default Home;
