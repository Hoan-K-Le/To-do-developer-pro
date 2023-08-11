import { createContext, useState, useEffect } from 'react'
import { uid } from 'uid'
import { useNavigate } from 'react-router-dom'
export const TodoContext = createContext()

export const TaskProvider = ({ children }) => {
  const [priority, setPriority] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])
  const [complexity, setComplexity] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])
  const [selectedPriority, setSelectedPriority] = useState(null)
  const [selectedComplexity, setSelectedComplexity] = useState(null)
  const [selectedDate, setSelectedDate] = useState('')
  const [selectedTime, setSelectedTime] = useState('')
  const [tasks, setTasks] = useState([])
  const [value, setValue] = useState('')
  const [checkList, setCheckList] = useState('')
  const [checkListItems, setCheckListItems] = useState([])
  const [tagValue, setTagValue] = useState('')

  const navigate = useNavigate()

  const handlePriority = selectPriority => {
    if (!selectPriority) return
    setSelectedPriority(selectPriority)
  }
  const handleComplexity = selectComplexity => {
    if (!selectComplexity) return
    setSelectedComplexity(selectComplexity)
  }

  const handleDate = selectDate => {
    if (!selectDate) return
    setSelectedDate(selectDate)
  }

  const handleTime = selectTime => {
    if (!selectTime) return
    setSelectedTime(selectTime)
  }

  const setInStorage = list => {
    return localStorage.setItem('tasks', JSON.stringify(list))
  }

  const updateTask = updatedTask => {
    setTasks(prevTasks => {
      const updatedTasks = prevTasks.map(task =>
        task.id === updatedTask.id ? { ...task, ...updatedTask } : task
      )
      // Update the tasks in state
      setTasks(updatedTasks)

      // Update tasks in local storage
      setInStorage(updatedTasks)
      navigate('/')
      return updatedTasks
    })
  }

  const handleDelete = taskId => {
    setTasks(prevTask => {
      if (!prevTask) return
      const updatedTask = prevTask.filter(task => task.id !== taskId)
      setInStorage(updatedTask)
      setTasks(updatedTask)
      navigate('/')
      return updatedTask
    })
  }

  const addTask = () => {
    if (!value) return
    const newTask = {
      value,
      priority: selectedPriority,
      complexity: selectedComplexity,
      date: selectedDate,
      time: selectedTime,
      isComplete: false,
      percent: 0,
      checkList: checkListItems,
      tags: !tagValue ? [] : [tagValue],
      id: uid(),
    }
    setTasks(prevTask => [...prevTask, newTask])
    setValue('')
    setSelectedComplexity(null)
    setSelectedPriority(null)
    setSelectedDate('')
    setSelectedTime('')
    setTagValue('')
    setCheckListItems([])
    navigate('/')
    setInStorage([...tasks, newTask])
  }

  const handleRemoveCheckList = id => {
    setCheckListItems(prevState =>
      prevState.filter(checkList => checkList.id !== id)
    )
  }

  const handleCheckList = () => {
    if (!checkList) return
    setCheckListItems(prevState => [
      ...prevState,
      { id: uid(), value: checkList, isComplete: false },
    ])
    setCheckList('')
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
        addTask,
        updateTask,
        ///////////////
        // Values/tags
        value,
        tagValue,
        setTagValue,
        setValue,
        ////////////////
        // Checklist related stuff
        checkList,
        setCheckList,
        checkListItems,
        setCheckListItems,
        handleCheckList,
        handleRemoveCheckList,
        ///////////////
        // Complexities
        complexity,
        handleComplexity,
        selectedComplexity,
        setSelectedComplexity,
        ///////////////
        // Priorities
        priority,
        setPriority,
        handlePriority,
        selectedPriority,
        setSelectedPriority,
        //////////////
        // Time/Date
        handleTime,
        handleDate,
        selectedDate,
        selectedTime,
        setSelectedTime,
        setSelectedDate,
        /////////////

        // Delete
        handleDelete,
      }}
    >
      {children}
    </TodoContext.Provider>
  )
}
