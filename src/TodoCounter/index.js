import React from 'react';
import './TodoCounter.css';

function TodoCounter({ totalTodos, completedTodos }){
    return (
      <h2 className='TodoCounter' >has completado {completedTodos} de {totalTodos} todos</h2>
    )
}

export { TodoCounter };