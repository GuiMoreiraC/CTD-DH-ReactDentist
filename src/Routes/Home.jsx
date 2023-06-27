import { useEffect, useState } from "react";
import Card from "../Components/Card";
import axios from "axios";

const Home = () => {
  const [dentistList, setDentistList] = useState([]);

  useEffect(() => {
    //Nesse useEffect, deverá ser obtido todos os dentistas da API
    //Armazena-los em um estado para posteriormente fazer um map
    //Usando o componente <Card />
    getDentistas();
  }, []);
  async function getDentistas() {
    try {
      const response = await axios.get("https://dhodonto.ctdprojetointegrador.com/dentista");
      console.log(response.data);
      setDentistList(response.data)
    } catch (e) {
      console.log(e);
    }
  }
  return (
    <>
      <h1>Home</h1>
      <div className="card-grid container">
      {dentistList.map((dentist) =>{
          return(
            <Card
            name={dentist.nome+" "+dentist.sobrenome}
            matricula={dentist.matricula}
            key={dentist.matricula}
             />
          )
        })}
      </div>
    </>
  );
};

export default Home;
