import React from 'react'
import { useContext, useState } from 'react'
import { TodoContext } from '../../contexts/taskContext'

function TaskInput({ handleInputValue }) {
  const [value, setValue] = useState('')
  const { tasks } = useContext(TodoContext)

  const handleInputChange = e => {
    setValue(e.target.value)
    handleInputValue(e.target.value)
  }

  return (
    <>
      <p className="text-lg mb-5">Task Name</p>
      <input
        onChange={handleInputChange}
        value={value}
        className="border  px-20 rounded-2xl text-lg py-2 "
        type="text"
        placeholder="Name of task..."
      />
    </>
  )
}

export default TaskInput
