import { createContext, useState } from 'react'

export const TodoContext = createContext()

export const TodoProvider = ({ children }) => {
  const [tasks, setTasks] = useState([])

  return (
    <TodoProvider.Provider value={{ tasks }}>{children}</TodoProvider.Provider>
  )
}
