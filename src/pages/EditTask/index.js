import React, { useState, useContext, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { TodoContext } from '../../contexts/taskContext'
import {
  SelectPriority,
  SelectComplexity,
} from '../../components/SelectLevels/SelectLevels'
import TimeInput from '../../components/TimeInput/TimeInput'
import SubCheckList from '../../components/Subcheck/SubCheckList'
import { uid } from 'uid'
import Tags from '../../components/Tags/Tags'
function EditTask() {
  const [complexity, setComplexity] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])
  const [priority, setPriority] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])
  const [newValue, setNewValue] = useState('')
  const [newPriority, setNewPriority] = useState('')
  const [newComplexity, setNewComplexity] = useState('')
  const [newSelectedDate, setNewSelectedDate] = useState(null)
  const [newSelectedTime, setNewSelectedTime] = useState(null)
  const [newChecklist, setNewChecklist] = useState('')
  const [newChecklistItems, setNewChecklistItems] = useState([])
  const [newTag, setNewTag] = useState('')
  const { tasks, updateTask, getTaskObj } = useContext(TodoContext)

  const { taskId } = useParams()

  const taskToEdit = getTaskObj(taskId)

  const handlePriority = selectPriority => {
    setNewPriority(selectPriority)
  }

  const handleComplexity = selectComplexity => {
    setNewComplexity(selectComplexity)
  }

  const handleDateChange = selectDate => {
    setNewSelectedDate(selectDate)
  }
  const handleTimeChange = selectTime => {
    setNewSelectedTime(selectTime)
  }

  const handleAddCheckList = () => {
    if (!newChecklist) return
    const newChecklists = [
      ...newChecklistItems,
      { id: uid(), value: newChecklist, isComplete: false },
    ]
    setNewChecklistItems(newChecklists)
    setNewChecklist('')
  }

  const handleRemoveCheckList = listId => {
    const updatedTask = newChecklistItems.filter(item => item.id !== listId)
    setNewChecklistItems(updatedTask)
  }

  const handleSave = () => {
    // Update the task name with the new value
    if (taskToEdit) {
      const updatedTask = {
        ...taskToEdit,
        value: newValue,
        priority: newPriority,
        complexity: newComplexity,
        date: newSelectedDate,
        time: newSelectedTime,
        checkList: newChecklistItems,
        tags: !newTag ? [] : [newTag],
      }
      updateTask(updatedTask)
    }
    clearEdit()
  }
  const clearEdit = () => {
    setNewPriority('')
    setNewComplexity('')
    setNewChecklistItems([])
    setNewSelectedTime(null)
    setNewSelectedDate(null)
    setNewChecklist('')
    setNewTag('')
  }

  const handleTagChange = e => {
    setNewTag(e.target.value)
  }

  useEffect(() => {
    if (taskToEdit) {
      setNewValue(taskToEdit.value)
      setNewPriority(taskToEdit.priority)
      setNewComplexity(taskToEdit.complexity)
      setNewSelectedTime(taskToEdit.time)
      setNewSelectedDate(taskToEdit.date)
      setNewTag(taskToEdit.tags)
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
      <p className="mt-4 text-lg">Select Priority Level</p>
      <div className="flex justify-around mt-4 gap-2">
        {priority.length > 0 &&
          priority.map(num => (
            <div className="">
              <button
                onClick={() => handlePriority(num)}
                className={` w-7 bg-blue-100 rounded-full ${
                  newPriority === num ? 'border bg-blue-300' : ''
                }`}
                value={num}
              >
                {num}
              </button>
            </div>
          ))}
      </div>
      <p className="text-lg mt-4">Select Complexity Level</p>
      <div className="mt-4 justify-around flex gap-2">
        {complexity.length > 0 &&
          complexity.map(num => (
            <div>
              <button
                onClick={() => handleComplexity(num)}
                className={`w-7 bg-blue-100 rounded-full ${
                  newComplexity === num ? 'border bg-blue-300' : ''
                }`}
                value={num}
              >
                {num}
              </button>
            </div>
          ))}
      </div>
      <div className="flex justify-between mt-5">
        <input
          type="date"
          onChange={e => handleDateChange(e.target.value)}
          className="border rounded-xl px-2 py-2"
          value={newSelectedDate}
        />
        <input
          onChange={e => handleTimeChange(e.target.value)}
          value={newSelectedTime}
          type="time"
          className="border rounded-xl px-4 py-2"
        />
      </div>
      <p className="text-xl mt-4">Add Checklist</p>
      <div className="pt-4 flex relative">
        <input
          value={newChecklist}
          onChange={e => setNewChecklist(e.target.value)}
          className="w-full p-2 rounded-xl"
          type="text"
          placeholder="Add item"
        />
        <button
          onClick={handleAddCheckList}
          className="absolute bg-[#0D99FF] p-1 text-white rounded-full right-3 top-5 text-3xl"
        >
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
              d="M12 4.5v15m7.5-7.5h-15"
            />
          </svg>
        </button>
      </div>
      {newChecklistItems.length > 0 &&
        newChecklistItems.map(item => (
          <div className="border flex p-2 my-2 relative rounded-xl bg-white">
            <p className="text-xl">{item.value}</p>
            <button
              onClick={() => handleRemoveCheckList(item.id)}
              className="absolute bg-[#F55858CC] text-white p-1 rounded-full border right-3 top-1"
            >
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
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        ))}
      <div className="pt-4">
        <p className="text-xl mb-4">Add Tags</p>
        <input
          onChange={handleTagChange}
          value={newTag}
          className="w-full p-2 rounded-xl"
          type="text"
          placeholder="Tag1, Tag2, Tag3, ..."
        />
      </div>
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
