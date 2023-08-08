import React, { useState, useContext } from 'react'
import { useParams, Link } from 'react-router-dom'
import { TodoContext } from '../../contexts/taskContext'

function EditTask() {
  const [edited, setEdited] = useState(false)
  const [newValue, setNewValue] = useState('')
  const { tasks, updateTask, setInStorage } = useContext(TodoContext)
  const { taskId } = useParams()

  const taskToEdit = tasks.find(task => task.id === taskId)

  const handleSave = () => {
    // Update the task name with the new value
    if (taskToEdit) {
      const updatedTask = { ...taskToEdit, value: newValue }
      updateTask(updatedTask) // Assuming updateTask updates the task in your context
      setEdited(true)
    }
  }
  return (
    <div className="container p-10 w-[450px]">
      <div className="flex mb-5 items-center p-3 justify-between ">
        {/* ... */}
      </div>
      <p className="text-lg mb-5">Task Name</p>
      <input
        onChange={e => setNewValue(e.target.value)}
        value={newValue}
        className="border px-20 rounded-2xl text-lg py-2"
        type="text"
        placeholder="Edit Task"
      />
      <button
        onClick={handleSave}
        className="bg-blue-500 text-white px-4 py-2 rounded mt-4"
      >
        Save
      </button>
      {edited && (
        <p className="text-green-500 mt-2">Task edited successfully!</p>
      )}
    </div>
  )
}

export default EditTask
