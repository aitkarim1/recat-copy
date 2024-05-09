import React, { createContext, useReducer, useContext } from 'react';
import { useEffect } from 'react';

// Crea el contexto
const AppContext = createContext();

// Hook para acceder al contexto
const useAppContext = () => {
  return useContext(AppContext);
};

// Define el estado inicial
const initialState = {

  name: '',
  error: null,
};

// Define el reducer
const reducer = (state, action) => {
  switch (action.type) {
    case 'SET_NAME':
      return {
        ...state,
        name: action.value, // Corregido para no almacenar el nombre como una matriz
      };
    case 'SET_ERROR':
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
  
};



// Exporta el contexto y el proveedor
const AppProvider = ({ children }) => {
 
const [state, dispatch] = useReducer(reducer, initialState);
  
useEffect(() => {
  const fetchUserData = async () => {
    try {
      const response = await fetch('http://localhost:4000/user-check', {
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
      });
      const content = await response.json();
      dispatch({ type: 'SET_NAME', value: content.name });
      
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: error.message });
    }
  };

  fetchUserData();
}, [dispatch]);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};

export { AppProvider, useAppContext };
