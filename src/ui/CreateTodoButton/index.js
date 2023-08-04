import React from "react";
import './CreateTodoButton.css';

function CreateTodoButton(props){
  /*const onClickButton = () => {
    setOpenModal(!openModal);
  };*/
    
    return (
      <button 
        className="CreateTodoButton"
        onClick={props.onClick}
      >
      +
      </button>
    );
};

export { CreateTodoButton };