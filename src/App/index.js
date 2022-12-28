import React from 'react';
import { AppUI } from './AppUI';

import './App.css';

const defaultTodos = [
  {text: 'cortar cebolla', completed: true },
  {text: 'Tomar el curso de intro a React', completed: false },
  {text: 'Llorar con la llorona', completed: false }
]

function App() {
  // Estado inicial de nuestros TODOs
  const [todos, setTodos] = React.useState(defaultTodos);

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

      setTodos(newTodos);
  };


  //funcion de eliminar todo
  const deleteTodo = (text) => {
    const todoIndex = todos.findIndex(todo => todo.text === text);
  
    const newTodos = [...todos];
    newTodos.splice(todoIndex, 1);

    setTodos(newTodos);
  };


  return (
    <AppUI 
        total={totalTodos}
        completed={completedTodos}
                searchValue={searchValue}
        setSearchValue={setSearchValue}
    />
  );
}

export default App;
