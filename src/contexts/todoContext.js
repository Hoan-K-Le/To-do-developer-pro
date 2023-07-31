import { createContext, useState } from 'react'
import { uid } from 'uid'

export const TodoContext = createContext()

export const TodoProvider = ({ children }) => {
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
    <TodoContext.Provider value={{ todos, addTodo, completeTodo, removeTodo }}>
      {children}
    </TodoContext.Provider>
  )
}
