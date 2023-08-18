import { createContext, useState, useEffect } from 'react'
import { uid } from 'uid'
import { useNavigate } from 'react-router-dom'

export const TodoContext = createContext()

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([])

  const navigate = useNavigate()

  const setInStorage = list => {
    return localStorage.setItem('tasks', JSON.stringify(list))
  }

  const getTaskObj = taskId => {
    return tasks.find(task => task.id === taskId)
  }

  const updateTask = updatedTask => {
    setTasks(prevTasks => {
      const updatedTasks = prevTasks.map(task =>
        task.id === updatedTask.id
          ? {
              ...task,
              ...updatedTask,
            }
          : task
      )
      // Update the tasks in state
      setTasks(updatedTasks)
      // Update tasks in local storage
      setInStorage(updatedTasks)
      navigate('/')
      return updatedTasks
    })
  }

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem('tasks'))
    if (storedTasks) {
      setTasks(storedTasks)
    }
  }, [])

  return (
    <TodoContext.Provider
      value={{
        setInStorage,
        ///////////////
        // Tasks related
        tasks,
        updateTask,
        setTasks,
        /////////////
        getTaskObj,
        // Delete
      }}
    >
      {children}
    </TodoContext.Provider>
  )
}
