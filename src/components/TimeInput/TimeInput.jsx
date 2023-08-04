import React from 'react'
import { useContext } from 'react'
import { TodoContext } from '../../contexts/taskContext'

function TimeInput() {
  const { handleTime, handleDate, selectedTime } = useContext(TodoContext)
  return (
    <div className="flex justify-between mt-5">
      <input
        type="date"
        onChange={e => handleDate(e.target.value)}
        className="border rounded-xl px-2 py-2"
      />
      <input
        onChange={e => handleTime(e.target.value)}
        value={selectedTime}
        type="time"
        className="border rounded-xl px-4 py-2"
      />
    </div>
  )
}

export default TimeInput
