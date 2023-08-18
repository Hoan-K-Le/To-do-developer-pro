import React from 'react'
import { useState } from 'react'
import moment from 'moment'

function TimeInput({ handleTime, handleDate }) {
  const [selectedDate, setSelectedDate] = useState('')
  const [selectedTime, setSelectedTime] = useState('')

  const handleDateChange = e => {
    const dateValue = e.target.value
    handleDate(dateValue)
    setSelectedDate(dateValue)
  }

  const handleTimeChange = e => {
    const timeValue = e.target.value
    handleTime(timeValue)
    setSelectedTime(timeValue)
  }

  return (
    <div className="flex justify-between mt-5">
      <input
        type="date"
        onChange={handleDateChange}
        className="border rounded-xl px-2 py-2"
        value={selectedDate}
      />
      <input
        onChange={handleTimeChange}
        value={selectedTime}
        type="time"
        className="border rounded-xl px-4 py-2"
      />
    </div>
  )
}

export default TimeInput
