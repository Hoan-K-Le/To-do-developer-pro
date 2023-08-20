import React from 'react'
import { useState } from 'react'

function TaskInput({ handleChange }) {
  const [value, setValue] = useState('')

  const handleInputChange = e => {
    setValue(e.target.value)
    handleChange({ key: 'value', value: e.target.value })
  }

  return (
    <>
      <p className="text-lg mb-5">Task Name</p>
      <input
        onChange={handleInputChange}
        value={value}
        name="value"
        className="border  px-20 rounded-2xl text-lg py-2 "
        type="text"
        placeholder="Name of task..."
      />
    </>
  )
}

export default TaskInput
