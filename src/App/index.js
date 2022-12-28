import React from 'react';
import { AppUI } from './AppUI';

import './App.css';

function useLocalStorage(itemName,initialValue){

  const localStorageItem = localStorage.getItem(itemName);
  let parsedItem;

  if(!localStorageItem){
    localStorage.setItem(itemName, JSON.stringify(initialValue));
    parsedItem = initialValue;
  } else {
    parsedItem = JSON.parse(localStorageItem)
  }


  const [item, setItem] = React.useState(parsedItem);

  const saveItem = (newItem)=> {
  const stringifiedItem = JSON.stringify(newItem);
  localStorage.setItem(itemName, stringifiedItem);
  setItem(newItem)
  }

  return [
    item,
    saveItem
  ];
}


function App() {
  const [todos, saveTodos] = useLocalStorage('TODOS_V1', []);

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
