import React from "react";
import { useLocalStorage } from "./useLocalStorage";

function useTodos(){
  // Nos traemos todo el estado y las funciones de nuestra aplicación que queremos globales
  // Desestructuramos los nuevos datos de nustro custom hook
  const {
      item: todos, 
      saveItem: saveTodos,
      sincronizeItem: sincronizeTodos,
      loading,
      error
  } = useLocalStorage('TODOS_V2', []);

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

  // Función para añadir un nuevo TODO
  const addTodo = (text) => {
  
    const id = newTodoId(todos)

    //Logica para validar si tiene texto para enviar
    if (!text.trim()) {
        alert("El nombre está vacío, escribe algo");
        return;
    }

    const newTodos = [...todos]

    newTodos.push({
      completed: false,
      text,
      id
    });

    saveTodos(newTodos);
  };

  
  const getTodo = (id) => {
    const todoIndex = todos.findIndex(todo => todo.id === id);
    return todos[todoIndex];
  }

  const completeTodo = (id) => {
    const todoIndex = todos.findIndex(todo => todo.id === id);
    
    const newTodos = [...todos];

    //otra forma
    newTodos[todoIndex].completed = !newTodos[todoIndex].completed // por si marco por error el chulo de completado, lo podre desmarcar 
    //otra forma
    //newTodos[todoIndex] = {
    // text: todos[todoIndex].text,
    // completed: true

    saveTodos(newTodos);
  };

  const editTodo = (id, newText) => {
    const todoIndex = todos.findIndex(todo => todo.id === id);
    
    const newTodos = [...todos];

    //otra forma
    newTodos[todoIndex].text = newText // por si marco por error el chulo de completado, lo podre desmarcar 
    //otra forma
    //newTodos[todoIndex] = {
    // text: todos[todoIndex].text,
    // completed: true

    saveTodos(newTodos);
  };

  //funcion de eliminar todo
  const deleteTodo = (id) => {
    const todoIndex = todos.findIndex(todo => todo.id === id);
  
    const newTodos = [...todos];
    newTodos.splice(todoIndex, 1);

    saveTodos(newTodos);
  };

  
  const state = {
    loading,
    error,
    totalTodos,
    completedTodos,
    searchValue,
    searchedTodos,
    getTodo,
  };
  
  const stateUpdaters = {
    setSearchValue,
    addTodo,
    completeTodo,
    editTodo,
    deleteTodo,
    sincronizeTodos,
  };

  return { state, stateUpdaters };
};

function newTodoId(todoList) {
  if (!todoList.length) {
    return 1;
  }
  
  const idList = todoList.map(todo => todo.id);
  const idMax = Math.max(...idList);
  return idMax + 1;
}


export { useTodos };