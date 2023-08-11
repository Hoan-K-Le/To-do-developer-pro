import React, { useState, useContext, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { TodoContext } from '../../contexts/taskContext'
import {
  SelectPriority,
  SelectComplexity,
} from '../../components/SelectLevels/SelectLevels'
import TimeInput from '../../components/TimeInput/TimeInput'
import SubCheckList from '../../components/Subcheck/SubCheckList'
import Tags from '../../components/Tags/Tags'
function EditTask() {
  const [newValue, setNewValue] = useState('')
  const {
    tasks,
    updateTask,
    selectedPriority,
    selectedComplexity,
    setSelectedPriority,
    setSelectedComplexity,
    selectedDate,
    selectedTime,
    setSelectedTime,
    setSelectedDate,
    checkListItems,
    setCheckListItems,
    setCheckList,
    setTagValue,
    tagValue,
  } = useContext(TodoContext)

  const { taskId } = useParams()

  const taskToEdit = tasks.find(task => task.id === taskId)

  const handleSave = () => {
    // Update the task name with the new value
    if (taskToEdit) {
      const updatedTask = {
        ...taskToEdit,
        value: newValue,
        priority: selectedPriority,
        complexity: selectedComplexity,
        date: selectedDate,
        time: selectedTime,
        checkList: checkListItems,
        tags: !tagValue ? [] : [tagValue],
      }
      updateTask(updatedTask)
    }
    clearEdit()
  }
  const clearEdit = () => {
    setSelectedPriority(null)
    setSelectedComplexity(null)
    setCheckListItems([])
    setSelectedTime('')
    setSelectedDate('')
    setCheckList('')
    setTagValue('')
  }

  useEffect(() => {
    if (taskToEdit) {
      setNewValue(taskToEdit.value)
      setSelectedPriority(taskToEdit.priority)
      setSelectedComplexity(taskToEdit.complexity)
      setSelectedTime(taskToEdit.time)
      setSelectedDate(taskToEdit.date)
      setCheckListItems(taskToEdit.checkList)
      setTagValue(taskToEdit.tags)
    }
  }, [taskToEdit])

  return (
    <div className="container p-10 w-[450px]">
      <div className="flex mb-5 items-center p-3 justify-between ">
        <Link to="/">
          <button className="rounded-full bg-white p-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-6 h-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
              />
            </svg>
          </button>
        </Link>
        <p className=" text-center text-2xl flex-grow">Edit Task</p>
      </div>
      <p className="text-lg mb-5">Task Name</p>
      <input
        onChange={e => setNewValue(e.target.value)}
        value={newValue}
        className="border px-20 rounded-2xl text-lg py-2"
        type="text"
        placeholder="Edit Task"
      />
      <SelectPriority />
      <SelectComplexity />
      <TimeInput />
      <SubCheckList />
      <Tags />
      <button
        onClick={handleSave}
        className="bg-blue-500 text-white px-4 py-2 rounded mt-4"
      >
        Save
      </button>
    </div>
  )
}

export default EditTask
