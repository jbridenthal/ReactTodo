import React from 'react'

export default function Todo({ todo, toggleTodo }) {
  function handleTodoClick() {
    toggleTodo(todo.id)
  }
  
  return (
    <li className="list-group-item btn text-start" onClick={handleTodoClick}>  
        <div>
            {!todo.complete && <i className="far fa-square" style={{color: "lightblue"}}></i>}
            {todo.complete && <i className="fas fa-check" style={{color: "lightgreen"}}></i>}
            &nbsp;
        <span className="label label-success">
        {todo.complete && <s> {todo.name}</s>}
        {!todo.complete && todo.name}
        </span>
        </div>
    </li>
  )
}