import React from 'react'
import { useContext } from 'react'
import { TodoContext } from '../../contexts/taskContext'

function TaskInput() {
  const { setValue, value } = useContext(TodoContext)
  return (
    <>
      <p className="text-lg mb-5">Task Name</p>
      <input
        onChange={e => setValue(e.target.value)}
        value={value}
        className="border  px-20 rounded-2xl text-lg py-2 "
        type="text"
        placeholder="Name of task..."
      />
    </>
  )
}

export default TaskInput
