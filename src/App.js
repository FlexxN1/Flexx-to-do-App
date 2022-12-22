import React from 'react';
import { TodoCounter } from './TodoCounter';
import { TodoSearch } from './TodoSearch';
import { TodoList } from './TodoList';
import { TodoItem } from './TodoItem';
import { CreateTodoButton } from './CreateTodoButton';

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
      <TodoSearch />
      
      <TodoList>
        {todos.map(todo => (
            <TodoItem key={todo.text} text={todo.text}/>
        ))}
      </TodoList>
      
      <CreateTodoButton />
    </>
  );
}

export default App;
