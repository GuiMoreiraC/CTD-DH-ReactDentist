import React, { createContext, useReducer } from 'react';

const initialState = {
  token: null,
};

const AuthContext = createContext(initialState);

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

const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  const setToken = (token) => {
    dispatch({ type: 'SET_TOKEN', payload: token });
  };

  const clearToken = () => {
    dispatch({ type: 'CLEAR_TOKEN' });
  };

  return (
    <AuthContext.Provider value={{ token: state.token, setToken, clearToken }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
