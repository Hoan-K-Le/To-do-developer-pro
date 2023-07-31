import React, { useState } from 'react'
import { uid } from 'uid'
import { BrowserRouter as Router, Link, Route, Routes } from 'react-router-dom'
import Todos from './pages/Todos'
import TodoDetail from './pages/Todo'

function App() {
  const [todos, setTodos] = useState([])

  const addTodo = text => {
    const newTodos = [...todos, { text, isCompleted: false, id: uid() }]
    setTodos(newTodos)
  }

  const completeTodo = todo => {
    setTodos(todos =>
      todos.map(t =>
        t.id === todo.id ? { ...t, isCompleted: !t.isCompleted } : t
      )
    )
  }

  const removeTodo = todo => {
    setTodos(todos => todos.filter(t => t.id !== todo.id))
  }

  return (
    <Router>
      <nav>
        <Link to="/">Home</Link>
      </nav>
      <Routes>
        <Route
          exact
          path="/"
          element={
            <Todos
              todos={todos}
              addTodo={addTodo}
              completeTodo={completeTodo}
              removeTodo={removeTodo}
            />
          }
        />

        <Route path="/todo/:id" element={<TodoDetail todos={todos} />} />
      </Routes>
    </Router>
  )
}

export default App
