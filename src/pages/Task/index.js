import React, { useState } from 'react'
import { uid } from 'uid'
import TaskHeader from '../../components/TaskHeader/TaskHeader'
import TaskInput from '../../components/Input/TaskInput'
import { SelectPriority } from '../../components/SelectLevels/SelectLevels'
import { SelectComplexity } from '../../components/SelectLevels/SelectLevels'
import TimeInput from '../../components/TimeInput/TimeInput'
import SubCheckList from '../../components/Subcheck/SubCheckList'
import Tags from '../../components/Tags/Tags'
import { useContext } from 'react'
import { TodoContext } from '../../contexts/taskContext'
import { useNavigate } from 'react-router-dom'

function Index() {
  // const { addTask } = useContext(TodoContext)
  const { tasks, setInStorage, setTasks } = useContext(TodoContext)
  const [task, setTask] = useState({
    value: '',
    priority: 0,
    complexity: 0,
    date: null,
    time: null,
    percent: 0,
    isComplete: false,
    checkList: [],
    tags: [],
    id: uid(),
  })

  const navigate = useNavigate()
  const handleInputValue = val => {
    if (!val) return
    setTask(prevTask => ({
      ...prevTask,
      value: val,
    }))
  }

  const handleCheckList = checklist => {
    setTask(prevState => ({
      ...prevState,
      checkList: checklist,
    }))
  }

  const handleComplexity = val => {
    setTask(prevTask => ({
      ...prevTask,
      complexity: val,
    }))
  }
  const handlePriority = val => {
    setTask(prevTask => ({
      ...prevTask,
      priority: val,
    }))
  }

  const handleTags = val => {
    setTask(prevTask => ({
      ...prevTask,
      tags: !val ? [] : [val],
    }))
  }
  const handleDate = val => {
    setTask(prevTask => ({
      ...prevTask,
      date: val,
    }))
  }
  const handleTime = val => {
    setTask(prevTask => ({
      ...prevTask,
      time: val,
    }))
  }

  const addTask = e => {
    e.preventDefault()
    if (task.value) {
      const updatedTask = [...tasks, task]
      setInStorage(updatedTask)
      setTasks(updatedTask)
    }
    setTask({
      value: '',
      priority: 0,
      complexity: 0,
      date: null,
      time: null,
      percent: 0,
      isComplete: false,
      checkList: [],
      tags: [],
      id: uid(),
    })
    navigate('/')
  }

  return (
    <div className="container p-10">
      <TaskHeader />
      <TaskInput handleInputValue={handleInputValue} />
      <SelectPriority handlePriority={handlePriority} />
      <SelectComplexity handleComplexity={handleComplexity} />
      <TimeInput handleDate={handleDate} handleTime={handleTime} />
      <SubCheckList
        checklistItems={task.checkList}
        handleCheckList={handleCheckList}
      />
      <Tags handleTags={handleTags} />
      <div className="flex justify-center">
        <button
          onClick={addTask}
          className="px-10 py-2 mt-8 text-white bg-[#0D99FF] rounded-lg "
        >
          Save a task
        </button>
      </div>
    </div>
  )
}

export default Index
