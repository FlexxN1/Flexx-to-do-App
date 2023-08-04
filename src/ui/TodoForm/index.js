import React from "react";
import { useNavigate } from 'react-router-dom';
import './TodoForm.css';

function TodoForm(props){
    const navigate = useNavigate();

    // Creamos un estado para nuestro nuevo TODO
    const [newTodoValue, setNewTodoValue] = React.useState(props.defaultTodoText || '');
    
    // Creamos una función para actualizar el estado de nuestro nuevo TODO
    const onChange = (event) =>{
        setNewTodoValue(event.target.value);
    }

    // Función para cerrar el modal

    const onCancel = () => {
        navigate('/');
    };

    // Función para agregar nuestro nuevo TODO
    const onSubmit = (event) =>{

        // prevent default para evitar recargar la página
        event.preventDefault();
        //si no tiene texto, no deja añadir
        //if(newTodoValue.length <= 0)return;

        // Utilizamos nuestra función para añadir nuestro TODO
        //addTodo(newTodoValue);

        // Cerramos nustro modal
        //setOpenModal(false);
        
        // También estaría bien resetear nuestro formulario
        //setNewTodoValue('')

        props.submitEvent(newTodoValue);

        navigate('/');
    }


    return (
        <form onSubmit={onSubmit}>
        <label>{props.label}</label>
        <textarea
            value={newTodoValue}
            onChange={onChange}
            placeholder="Escribe una nueva tarea"
        />
        <div className="TodoForm-buttonContainer">
            <button
                type="button"
                className="TodoForm-button TodoForm-button--cancel"
                onClick={onCancel}
                >
            Cancelar
            </button>
            <button
                type="submit"
                className="TodoForm-button TodoForm-button--add"
            >
                {props.submitText}
            </button>
        </div>
        </form>
    );
};

export { TodoForm  };