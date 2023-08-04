import React from 'react'

function TaskInput({ setValue, value }) {
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
