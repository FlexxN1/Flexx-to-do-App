import React from "react";
import { useLocalStorage } from "./useLocalStorage";

function useTodos(){
  // Nos traemos todo el estado y las funciones de nuestra aplicación que queremos globales
  // Desestructuramos los nuevos datos de nustro custom hook
  const {
      item: todos, 
      saveItem: saveTodos,
      loading,
      error
  } = useLocalStorage('TODOS_V1', []);

  // El estado de nuestra búsqueda
  const [searchValue, setSearchValue] = React.useState('');
  const [openModal, setOpenModal] = React.useState(false);

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

  // Función para añadir un nuevo TODO
  const addTodo = (text) => {

    //Logica para validar si tiene texto para enviar
    if (!text.trim()) {
        alert("El nombre está vacío, escribe algo");
        return;
    }

    const newTodos = [...todos];
    newTodos.push({
      id:todos.length + 1,
      completed: false,
      text
    });

    saveTodos(newTodos);
  };

  const completeTodo = (text) => {
    const todoIndex = todos.findIndex(todo => todo.text === text);
    
    const newTodos = [...todos];

    //otra forma
    newTodos[todoIndex].completed = !newTodos[todoIndex].completed // por si marco por error el chulo de completado, lo podre desmarcar 
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

    return {
          loading,
          error,
          totalTodos,
          completedTodos,
          searchValue,
          setSearchValue,
          searchedTodos,
          addTodo,
          completeTodo,
          deleteTodo,
          openModal,
          setOpenModal
    };
};

export { useTodos };