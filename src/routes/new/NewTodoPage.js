import React from 'react';
import { TodoForm } from '../../ui/TodoForm';
import { useTodos } from '../useTodos';

function NewTodoPage() {
  const { stateUpdaters, loading } = useTodos();
  const { addTodo } = stateUpdaters;
  
  return (
    <TodoForm
    	loading={loading}
      label="Escribe tu nuevo TODO"
      submitText="Añadir"
      submitEvent={(text) => addTodo(text)}
    />
  );
}

export { NewTodoPage };