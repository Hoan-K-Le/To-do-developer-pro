import React from 'react'
import { useState } from 'react'

interface ChangeProps {
  handleChange: (data: { key: string; value: string }) => void
}

function TimeInput({ handleChange }: ChangeProps) {
  const [selectedDate, setSelectedDate] = useState('')
  const [selectedTime, setSelectedTime] = useState('')

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const dateValue = e.target.value
    handleChange({ key: 'date', value: dateValue })
    setSelectedDate(dateValue)
  }

  const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const timeValue = e.target.value
    handleChange({ key: 'time', value: timeValue })
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
