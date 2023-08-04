import React from 'react';
import { useTodos } from '../useTodos';
import { TodoHeader } from '../../ui/TodoHeader';
import { TodoCounter } from '../../ui/TodoCounter';
import { TodoSearch } from '../../ui/TodoSearch';
import { TodoList } from '../../ui/TodoList';
import { TodoItem } from '../../ui/TodoItem';
import { TodosError } from '../../ui/TodosError';
import { TodosLoading } from '../../ui/TodosLoading';
import { EmptyTodos } from '../../ui/EmptyTodos';
import { TodoForm } from '../../ui/TodoForm';
import { CreateTodoButton } from '../../ui/CreateTodoButton';
import { Modal } from '../../ui/Modal';
import { ChangeAlertWithStorageListener } from '../../ui/ChangeAlert';

function HomePage() {

  const {
    error,
    loading,
    searchedTodos,
    completeTodo,
    deleteTodo,
    openModal,
    setOpenModal,
    totalTodos,
    completedTodos,
    searchValue,
    setSearchValue,
    addTodo,
    sincronizeTodos,
  } = useTodos();
  
  return (
    <React.Fragment>
      <TodoHeader loading={loading}>
        <TodoCounter
          totalTodos={totalTodos}
          completedTodos={completedTodos}
        />
        <TodoSearch
          searchValue={searchValue}
          setSearchValue={setSearchValue}
        />
      </TodoHeader>

      <TodoList
        error={error}
        loading={loading}
        totalTodos={totalTodos}
        searchedTodos={searchedTodos}
        searchText={searchValue}
        onError={() => <TodosError />}
        onLoading={() => <TodosLoading />}
        onEmptyTodos={() => <EmptyTodos />}
        onEmptySearchResults={
          (searchText) => <p>No hay resultados para {searchText}</p>
        }
        // render={todo => (
        //   <TodoItem
        //     key={todo.text}
        //     text={todo.text}
        //     completed={todo.completed}
        //     onComplete={() => completeTodo(todo.text)}
        //     onDelete={() => deleteTodo(todo.text)}
        //   />
        // )}
      >
        {todo => (
          <TodoItem
            key={todo.id}
            text={todo.text}
            completed={todo.completed}
            onComplete={() => completeTodo(todo.id)}
            onDelete={() => deleteTodo(todo.id)}
          />
        )}
      </TodoList>

      {!!openModal && (
        <Modal>
          <TodoForm 
            addTodo={addTodo}
            setOpenModal={setOpenModal}
          />
        </Modal>
      )}

      <CreateTodoButton
        setOpenModal={setOpenModal}
      />

      <ChangeAlertWithStorageListener 
        sincronize={sincronizeTodos}
      />
    </React.Fragment>
  );
}

export default HomePage;