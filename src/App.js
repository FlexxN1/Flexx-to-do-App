import React from 'react';
import { TodoCounter } from './TodoCounter';
import { TodoSearch } from './TodoSearch';

import './App.css';

const todos = [
  {text: 'cortar cebolla', complete: false },
  {text: 'Tomar el curso de intro a React', complete: false },
  {text: 'Llorar con la llorona', complete: false }
]

function App() {
  return (
    <> {/*tambien se puede hacer React.Fragment*/}
      <TodoCounter />
      <h2>has completado 2 de 3 todos</h2>
      <TodoSearch />
      
      <TodoList>
          {todos.map(todo => (
            <TodoItem />
          ))}
      </TodoList>
      
      <CreateTodoButton />
      <button></button>
    </>
  );
}

export default App;
