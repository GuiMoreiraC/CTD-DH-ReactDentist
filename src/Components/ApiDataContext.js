import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

const ApiDataContext = createContext();

const ApiDataProvider = ({ children }) => {
  const [apiData, setApiData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Buscar dentistas na API
        const response1 = await axios.get("https://dhodonto.ctdprojetointegrador.com/dentista");
        const dentistList = response1.data;

        // Busca pacientes
        const response2 = await axios.get("https://dhodonto.ctdprojetointegrador.com/paciente");
        const pacientList = response2.data.body;

        // Combina os resultados em um único objeto, para que possa ser possível exportar ambos como globais
        const combinedData = {
          dentistList,
          pacientList,
        };

        setApiData(combinedData);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  return (
    <ApiDataContext.Provider value={apiData}>
      {children}
    </ApiDataContext.Provider>
  );
};

export { ApiDataContext, ApiDataProvider };