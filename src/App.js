import React, { useState, useRef, useEffect } from 'react';
import TodoList from './TodoList'
import uuidv4 from 'uuid/v4'

const LOCAL_STORAGE_KEY = 'todoApp.todos'

function App() {
  const [todos, setTodos] = useState([])
  const todoNameRef = useRef()

  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))
    if (storedTodos) setTodos(storedTodos)
  }, [])

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos))
  }, [todos])

  function toggleTodo(id) {
    const newTodos = [...todos]
    const todo = newTodos.find(todo => todo.id === id)
    todo.complete = !todo.complete
    setTodos(newTodos)
  }

  function handleAddTodo(e) {
    const name = todoNameRef.current.value
    if (name === '') return
    setTodos(prevTodos => {
      return [...prevTodos, { id: uuidv4(), name: name, complete: false}]
    })
    todoNameRef.current.value = null
  }

  function handleClearTodos() {
    const newTodos = todos.filter(todo => !todo.complete)
    setTodos(newTodos)
  }

  return (
    <>
    <div className="col-md-6">
      <div className="row">
        <div className="col">
          <h3 className="text-lg-center">To Do List!</h3>
        </div>
      </div>
      <div className="row">
        <div className="col">
          <TodoList todos={todos} toggleTodo={toggleTodo} />
        </div>
      </div>
      <div className="row p-1">
        <div className="col">
            <div className="form-floating p-1">
              <input ref={todoNameRef} type="text" id="todoTitle" placeholder="Todo title" className="form-control" />
              <label htmlFor="todoTitle">Todo title</label>
            </div>
        </div>
        <div className="col d-inline-flex ">    
          <button className="btn btn-primary btn-block p-2" onClick={handleAddTodo}>Add Todo</button>
          <button className="btn btn-primary btn-block p-2" onClick={handleClearTodos}>Clear Complete</button>
        </div>
      </div>
      <div className="row">
        <div className="col">
          <h5 className="text-lg-left p-1 ">{todos.filter(todo => !todo.complete).length} left to do</h5>
        </div>
      </div>
    </div>
    </>
  )
}

export default App;