import { createContext, useState, useEffect } from 'react'

import { useNavigate } from 'react-router-dom'

export const TodoContext = createContext<any>(null)

export interface ChecklistItems {
  id: string
  isComplete: boolean
  value: string
}

export interface Task {
  id: string
  checkList: ChecklistItems[]
  percent: number
  value: string
  priority: number
  complexity: number
  isComplete: boolean
  date: string
  time: string
  tags: string[]
}

export const TaskProvider = ({ children }: { children: any }) => {
  const [tasks, setTasks] = useState<Task[]>([])

  const navigate = useNavigate()

  const setInStorage = (list: []) => {
    return localStorage.setItem('tasks', JSON.stringify(list))
  }

  const getTaskObj = (taskId: string) => {
    return tasks.find((task: Task) => task.id === taskId)
  }

  const updateTask = (updatedTask: any) => {
    setTasks((prevTasks: any) => {
      const updatedTasks = prevTasks.map((task: any) =>
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
    const storedTasks = JSON.parse(localStorage.getItem('tasks') as any)
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
