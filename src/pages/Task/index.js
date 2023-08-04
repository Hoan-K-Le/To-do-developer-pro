import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { uid } from 'uid'
import TaskHeader from '../../components/TaskHeader/TaskHeader'
import TaskInput from '../../components/Input/TaskInput'

function Index() {
  const [priority, setPriority] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])
  const [complexity, setComplexity] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])
  const [selectedPriority, setSelectedPriority] = useState(null)
  const [selectedComplexity, setSelectedComplexity] = useState(null)
  const [selectedDate, setSelectedDate] = useState('')
  const [selectedTime, setSelectedTime] = useState('')
  const [tasks, setTasks] = useState([])
  const [value, setValue] = useState('')
  const [checkList, setCheckList] = useState('')
  const [checkListItems, setCheckListItems] = useState([])
  const [tagValue, setTagValue] = useState('')

  const handlePriority = selectPriority => {
    if (!selectPriority) return
    setSelectedPriority(selectPriority)
  }
  const handleComplexity = selectComplexity => {
    if (!selectComplexity) return
    setSelectedComplexity(selectComplexity)
  }

  const handleDate = selectDate => {
    if (!selectDate) return
    setSelectedDate(selectDate)
  }

  const handleTime = selectTime => {
    if (!selectTime) return
    setSelectedTime(selectTime)
  }

  const setInStorage = list => {
    return localStorage.setItem('tasks', JSON.stringify(list))
  }
  const addTask = () => {
    if (!value) return
    const newTask = {
      value,
      priority: selectedPriority,
      complexity: selectedComplexity,
      date: selectedDate,
      time: selectedTime,
      isComplete: false,
      percent: 0,
      checkList: checkListItems,
      tags: [tagValue],
      id: uid(),
    }
    setTasks(prevTask => [...prevTask, newTask])
    setValue('')
    setSelectedComplexity(null)
    setSelectedPriority(null)
    setSelectedDate('')
    setSelectedTime('')
    setCheckListItems([])
    setTagValue('')
    setInStorage([...tasks, newTask])
  }

  const handleRemoveCheckList = id => {
    setCheckListItems(prevState =>
      prevState.filter(checkList => checkList.id !== id)
    )
  }

  const handleCheckList = () => {
    if (!checkList) return
    setCheckListItems(prevState => [
      ...prevState,
      { id: uid(), value: checkList, isComplete: false },
    ])
    setCheckList('')
  }

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem('tasks'))
    if (storedTasks) {
      setTasks(storedTasks)
    }
  }, [])
  return (
    <div className="container  p-10">
      <TaskHeader />
      {/* <p className="text-lg mb-5">Task Name</p>
      <input
        onChange={e => setValue(e.target.value)}
        value={value}
        className="border  px-20 rounded-2xl text-lg py-2 "
        type="text"
        placeholder="Name of task..."
      /> */}
      <TaskInput setValue={setValue} value={value} />
      <p className="mt-4 text-lg">Select Priority Level</p>
      <div className="flex justify-around mt-4 gap-2">
        {priority.length > 0 &&
          priority.map(num => (
            <div className="">
              {/* <input type="radio" className="p-2" value={num} /> */}
              <button
                onClick={() => handlePriority(num)}
                className={` w-7 bg-blue-100 rounded-full ${
                  selectedPriority === num ? 'border bg-blue-300' : ''
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
                  selectedComplexity === num ? 'border bg-blue-300' : ''
                }`}
                value={num}
              >
                {num}
              </button>
            </div>
          ))}
      </div>
      {/* Month/ time section */}
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

      {/* subchecklist */}
      <p className="text-xl mt-4">Add Checklist</p>
      <div className="pt-4 flex relative">
        <input
          value={checkList}
          onChange={e => setCheckList(e.target.value)}
          className="w-full p-2 rounded-xl"
          type="text"
          placeholder="Add item"
        />
        <button
          onClick={handleCheckList}
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
      {checkListItems.length > 0 &&
        checkListItems.map(item => (
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
          onChange={e => setTagValue(e.target.value)}
          value={tagValue}
          className="w-full p-2 rounded-xl"
          type="text"
          placeholder="Tag1, Tag2, Tag3, ..."
        />
      </div>
      <div className="flex justify-center">
        <button
          onClick={addTask}
          className="px-10 py-2 mt-8 text-white bg-[#0D99FF] rounded-lg "
        >
          Save a task
        </button>
      </div>
    </div>
  )
}

export default Index
