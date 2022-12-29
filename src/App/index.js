import React from 'react';
import { AppUI } from './AppUI';

import './App.css';

function useLocalStorage(itemName,initialValue){

  // Creamos el estado inicial para nuestros errores y carga
  const [error, setError] = React.useState(false);
  const [loading, setLoading] = React.useState(true);
  const [item, setItem] = React.useState(initialValue);
  
  React.useEffect(() => {

    // Simulamos un segundo de delay de carga 
        setTimeout(() => {
          // Manejamos la tarea dentro de un try/catch por si ocurre algún error
          try {
            const localStorageItem = localStorage.getItem(itemName);
            let parsedItem;
    
            if(!localStorageItem){
              localStorage.setItem(itemName, JSON.stringify(initialValue));
              parsedItem = initialValue;
            } else {
              parsedItem = JSON.parse(localStorageItem)
            }
    
            setItem(parsedItem);
          } catch (error){
              // En caso de un error lo guardamos en el estado
              setError(error);
          } finally {
            // También podemos utilizar la última parte del try/cath (finally) para terminar la carga
            setLoading(false);
          }

        }, 100);
  });

  const saveItem = (newItem)=> {
    // Manejamos la tarea dentro de un try/catch por si ocurre algún error
    try {
      const stringifiedItem = JSON.stringify(newItem);
      localStorage.setItem(itemName, stringifiedItem);
      setItem(newItem)
    }catch(error){
      // En caso de algún error lo guardamos en el estado
      setError(error);
    }
  };

  // Para tener un mejor control de los datos retornados, podemos regresarlos dentro de un objeto
  return {
    item,
    saveItem,
    loading,
    error
  };
}


function App() {
  // Desestructuramos los nuevos datos de nustro custom hook
  const {
    item: todos, 
    saveItem: saveTodos,
    loading,
    error
  } = useLocalStorage('TODOS_V1', []);

  // Estado inicial de nuestros TODOs

  // El estado de nuestra búsqueda
  const [searchValue, setSearchValue] = React.useState('');
  
  // Cantidad de TODOs completados
  const completedTodos = todos.filter(todo => !!todo.completed).length;
  // Cantidad total de TODOs
  const totalTodos = todos.length; 

  // Creamos una nueva variable en donde guardaremos las coincidencias con la búsqueda
  let searchedTodos = [];

  if(!searchValue.length >= 1){
    searchedTodos = todos;
  }else {
    searchedTodos = todos.filter(todo => {
      const todoText = todo.text.toLowerCase();
      const searchText = searchValue.toLowerCase();
      return todoText.includes(searchText);
    })
  };

  const completeTodo = (text) => {
    const todoIndex = todos.findIndex(todo => todo.text === text);
    
    const newTodos = [...todos];

    //otra forma
    newTodos[todoIndex].completed = true

    //otra forma
    //newTodos[todoIndex] = {
    // text: todos[todoIndex].text,
    // completed: true

    saveTodos(newTodos);
  };


  //funcion de eliminar todo
  const deleteTodo = (text) => {
    const todoIndex = todos.findIndex(todo => todo.text === text);
  
    const newTodos = [...todos];
    newTodos.splice(todoIndex, 1);

    saveTodos(newTodos);
  };

  return (
    <AppUI
      loading={loading}
      error={error}
      totalTodos={totalTodos}
      completedTodos={completedTodos}
      searchValue={searchValue}
      setSearchValue={setSearchValue}
      searchedTodos={searchedTodos}
      completeTodo={completeTodo}
      deleteTodo={deleteTodo}
    />
  );
}

export default App;
