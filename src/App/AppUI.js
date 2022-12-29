import React from "react";
import { TodoContext } from '../TodoContext';
import { TodoCounter } from '../TodoCounter';
import { TodoSearch } from '../TodoSearch';
import { TodoList } from '../TodoList';
import { TodoItem } from '../TodoItem';
import { CreateTodoButton } from '../CreateTodoButton';

function AppUI(){
    return (
        <> {/*tambien se puede hacer React.Fragment*/}
            <TodoCounter />
            <TodoSearch />
            
            {/* Podemos acceder a nuestro contexto con el consumer */}
            <TodoContext.Consumer>
                {({
                    error,
                    loading,
                    searchedTodos,
                    completeTodo,
                    deleteTodo,
                }) => (
                    <TodoList>
                        {/* Mostramos un mensaje en caso de que ocurra algún error*/}
                        {error && <p>Desespérate, hubo un error...</p>}
                        {/* Mostramos un mensaje de cargando, cuando la aplicación está cargando los datos */}
                        {loading && <p>Estamos cargando, no desesperes...</p>}
                        {/* Si terminó de cargar y no existen TODOs, se muestra un mensaje para crear el primer TODO */}
                        {(!loading && !searchedTodos.length) && <p>¡Crea tu primer TODO!</p>}

                        {/* Regresamos solamente los TODOs buscados */}
                        {searchedTodos.map(todo => (
                            <TodoItem 
                            key={todo.text} 
                            text={todo.text}
                            completed={todo.completed}
                            onComplete={() => completeTodo(todo.text)}
                            onDelete={() => deleteTodo(todo.text)}
                            />
                        ))}
                    </TodoList>
                )}
            </TodoContext.Consumer>
            
            <CreateTodoButton />
        </>
    );
};


export { AppUI };