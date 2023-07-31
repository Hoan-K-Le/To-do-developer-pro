import { createContext } from 'react'

export const TodoContext = createContext()

const ToDoProvider = ({ children }) => {
  return <TodoContext.Provider>{children}</TodoContext.Provider>
}
