import React, { createContext, useState, useEffect, useReducer } from 'react';
import axios from 'axios';

//Contexto de autenticação/ token JWT

const initialState = {
    token: null,
};

const GlobalContext = createContext(initialState);

const authReducer = (state, action) => {
    switch (action.type) {
        case 'SET_TOKEN':
            return { ...state, token: action.payload };
        case 'CLEAR_TOKEN':
            return { ...state, token: null };
        default:
            return state;
    }
};

const GlobalProvider = ({ children }) => {
    const [state, dispatch] = useReducer(authReducer, initialState);

    const setToken = token => {
        dispatch({ type: 'SET_TOKEN', payload: token });
        localStorage.setItem('token', token);
    };

    const clearToken = () => {
        dispatch({ type: 'CLEAR_TOKEN' });
        localStorage.removeItem('token');
    };

    useEffect(() => {
        const storedToken = localStorage.getItem('token');
        if (storedToken) {
            dispatch({ type: 'SET_TOKEN', payload: storedToken });
        }
    }, []);

    //-------------------------------------------------------------------------------------------

    const [apiData, setApiData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Buscar dentistas na API
                const response1 = await axios.get(
                    'https://dhodonto.ctdprojetointegrador.com/dentista'
                );
                const dentistList = response1.data;

                // Busca pacientes
                const response2 = await axios.get(
                    'https://dhodonto.ctdprojetointegrador.com/paciente'
                );
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
    //---------------------------------------------------------------------------------------------------

    const [theme, setTheme] = useState(localStorage.getItem("theme") === null ? "light" : localStorage.getItem("theme"));

    const toggleTheme = () => {
        setTheme(theme === "light" ? "dark" : "light");
        if (theme == "light") {
            localStorage.setItem("theme", "light")            
        } else {
            localStorage.setItem("theme", "dark")
        }
    };

    useEffect(() => {
            localStorage.setItem("theme", theme)
      },[theme])
    //-------------------------------------------------------------

   

    return (
        <GlobalContext.Provider
            value={{ token: state.token, setToken, clearToken, apiData, theme, toggleTheme }}
        >
            {children}
        </GlobalContext.Provider>
    );
};

export { GlobalContext, GlobalProvider };
