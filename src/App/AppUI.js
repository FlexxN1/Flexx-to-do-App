import React from "react";
import { TodoContext } from '../TodoContext';
import { TodoCounter } from '../TodoCounter';
import { TodoSearch } from '../TodoSearch';
import { TodoForm } from '../TodoForm';
import { TodoList } from '../TodoList';
import { TodoItem } from '../TodoItem';
import { CreateTodoButton } from '../CreateTodoButton';
import { Modal } from '../Modal';
import { TodosError } from '../TodosError';
import { TodosLoading } from '../TodosLoading';
import { EmptyTodos } from '../EmptyTodos';

function AppUI(){
    const {
        error,
        loading,
        searchedTodos,
        completeTodo,
        deleteTodo,
        openModal,
        setOpenModal
        } = React.useContext(TodoContext);

    return (
        <> {/*tambien se puede hacer React.Fragment*/}
            <TodoCounter />
            <TodoSearch />
            
            {/* Podemos acceder a nuestro contexto con el consumer */}
            <TodoList>
                {/* Mostramos un mensaje en caso de que ocurra algún error*/}
                {error && <TodosError error={error} />}
                {/* Mostramos un mensaje de cargando, cuando la aplicación está cargando los datos */}
                {loading && <TodosLoading />}
                {/* Si terminó de cargar y no existen TODOs, se muestra un mensaje para crear el primer TODO */}
                {(!loading && !searchedTodos.length) && <EmptyTodos />}

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
            {!!openModal && (
                <Modal>
                    <TodoForm />
                </Modal>
            )}

            <CreateTodoButton
                setOpenModal={setOpenModal}
                openModal={openModal}
            />
        </>
    );
};


export { AppUI };