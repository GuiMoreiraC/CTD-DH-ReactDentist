import { useContext } from "react";
import Card from "../Components/Card";
import { ApiDataContext } from "../Components/ApiDataContext";

const Home = () => {

  const apiData = useContext(ApiDataContext); //busca dados do contexto da API
  const dentistList = apiData.dentistList; //define a variavel dentisList com a lista de dentistas obtida na consulta
 
  return (
    <>
      <h1>Home</h1>
      <div className="card-grid container">
        {dentistList && dentistList.map((dentist) => (  // Verifica se dentistList existe, evitando erro do map executar com a lista vazia
  
          <Card
            name={dentist.nome + " " + dentist.sobrenome}
            matricula={dentist.matricula}
            key={dentist.matricula}
          />
        ))}
      </div>
    </>
  );
};

export default Home;
