import React, { useState, useContext, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { TodoContext } from '../../contexts/taskContext'
import { uid } from 'uid'
function EditTask({}) {
  const [complexity, setComplexity] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])
  const [priority, setPriority] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])
  const [newChecklist, setNewChecklist] = useState('')
  const [editTask, setEditTask] = useState({
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
  const { updateTask, getTaskObj } = useContext(TodoContext)

  const { taskId } = useParams()

  const taskToEdit = getTaskObj(taskId)

  const handleEditChange = val => {
    setEditTask(prevTask => ({
      ...prevTask,
      [val.key]: val.value,
    }))
  }

  const handleAddCheckList = () => {
    if (!newChecklist) return
    const newChecklists = [
      ...editTask.checkList,
      { id: uid(), value: newChecklist, isComplete: false },
    ]
    setEditTask(prevTask => ({
      ...prevTask,
      checkList: newChecklists,
    }))
    setNewChecklist('')
  }

  const handleRemoveCheckList = listId => {
    const updatedTask = editTask.checkList.filter(item => item.id !== listId)
    // setNewChecklistItems(updatedTask)
    handleEditChange({ key: 'checkList', value: updatedTask })
  }

  const handleSave = () => {
    // Update the task name with the new value
    if (taskToEdit) {
      const updatedTask = {
        ...taskToEdit,
        value: editTask.value,
        priority: editTask.priority,
        complexity: editTask.complexity,
        date: editTask.date,
        time: editTask.time,
        checkList: editTask.checkList,
        tags: !editTask.tags ? [] : [editTask.tags],
      }
      updateTask(updatedTask)
    }
  }

  useEffect(() => {
    if (taskToEdit) {
      setEditTask(prevTask => ({
        ...prevTask,
        value: taskToEdit.value,
        priority: taskToEdit.priority,
        complexity: taskToEdit.complexity,
        time: taskToEdit.time,
        date: taskToEdit.date,
        tags: taskToEdit.tags,
      }))
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
        onChange={e =>
          handleEditChange({ key: 'value', value: e.target.value })
        }
        value={editTask.value}
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
                onClick={() =>
                  handleEditChange({ key: 'priority', value: num })
                }
                className={` w-7 bg-blue-100 rounded-full ${
                  editTask.priority === num ? 'border bg-blue-300' : ''
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
                onClick={() =>
                  handleEditChange({ key: 'complexity', value: num })
                }
                className={`w-7 bg-blue-100 rounded-full ${
                  editTask.complexity === num ? 'border bg-blue-300' : ''
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
          onChange={e =>
            handleEditChange({ key: 'date', value: e.target.value })
          }
          className="border rounded-xl px-2 py-2"
          value={editTask.date}
        />
        <input
          onChange={e =>
            handleEditChange({ key: 'time', value: e.target.value })
          }
          value={editTask.time}
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
      {editTask.checkList.length > 0 &&
        editTask.checkList.map(item => (
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
          onChange={e =>
            handleEditChange({ key: 'tags', value: e.target.value })
          }
          value={editTask.tags}
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
