import React from 'react'
import { Link } from 'react-router-dom'
import { useContext, useState } from 'react'
import { TodoContext } from '../../contexts/taskContext'
import { parse } from 'date-fns'

function Index() {
  const [sorted, SetSorted] = useState('default')
  const [filterValue, setFilterValue] = useState('')
  const [tags, setTags] = useState('')

  const { tasks, handleCompleteTask } = useContext(TodoContext)

  const handleTags = e => {
    setTags(e.target.value)
  }

  const handleFilter = e => {
    setFilterValue(e.target.value)
  }
  const handleSort = e => {
    SetSorted(e.target.value)
  }

  let sortedList = [...tasks]

  // filter the list
  let filteredList = sortedList

  if (tags) {
    filteredList = sortedList.filter(task => task.tags.includes(tags))
  }

  if (filterValue) {
    filteredList = filteredList.filter(task =>
      task.value.toLowerCase().includes(filterValue.toLowerCase())
    )
  }

  const tasksWithTags = tasks.filter(task => task.tags && task.tags.length > 0)

  switch (sorted) {
    case 'ascPriority':
      sortedList.sort((a, b) => a.priority - b.priority)
      break
    case 'descPriority':
      sortedList.sort((a, b) => b.priority - a.priority)
      break
    case 'ascComplexity':
      sortedList.sort((a, b) => a.complexity - b.complexity)
      break
    case 'descComplexity':
      sortedList.sort((a, b) => b.complexity - a.complexity)
      break
  }

  const getDaysDiff = tasks.map(task => {
    const currentDate = new Date()
    const selectedDate = task.date
      ? parse(task.date, 'yyyy-MM-dd', new Date())
      : null

    const daysDifference = selectedDate
      ? Math.ceil((selectedDate - currentDate) / (1000 * 60 * 60 * 24))
      : 0

    if (daysDifference <= 3 && daysDifference >= 0) {
      return 'text-orange-300 font-bold'
    } else if (daysDifference < 0) {
      return 'text-red-500 font-bold '
    } else {
      return 'text-blue-400 font-bold'
    }
  })
  const getBorderColor = percent => {
    if (percent <= 25) {
      return 'border-red-500'
    } else if (percent <= 75) {
      return 'border-yellow-500'
    } else {
      return 'border-green-500'
    }
  }

  const getDaysDiffBg = tasks.map(task => {
    const currentDate = new Date()
    const selectedDate = task.date
      ? parse(task.date, 'yyyy-MM-dd', new Date())
      : null

    const daysDifference = selectedDate
      ? Math.floor((selectedDate - currentDate) / (1000 * 60 * 60 * 24))
      : 0

    if (daysDifference <= 3 && daysDifference >= 0) {
      return 'bg-orange-300'
    } else if (daysDifference < 0) {
      return 'bg-red-500'
    } else {
      return 'bg-blue-400'
    }
  })

  return (
    <div className="container w-[450px] flex flex-col items-center mt-4 ">
      {/* Input search filter */}
      <div className="w-full relative flex items-center">
        <span className="absolute left-2 bottom-4">
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
              d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
            />
          </svg>
        </span>

        <input
          onChange={handleFilter}
          className=" px-10 w-full text-lg  rounded-2xl py-3 border"
          type="text"
          placeholder="Search..."
        />
      </div>
      {/* 2 select sort and filter by tags */}

      <div className="flex gap-12 pt-10 w-full ">
        <select
          onChange={handleSort}
          className="border w-6/12 flex-grow text-center  rounded-xl py-3 font-bold"
        >
          <option value={sorted} className="">
            Default
          </option>
          <option value="ascPriority">Asc Priority</option>
          <option value="descPriority">Desc Priority</option>
          <option value="ascComplexity">Asc Complex</option>
          <option value="descComplexity">Desc Complex</option>
        </select>
        <select
          onChange={handleTags}
          className="border w-6/12 py-2 text-center flex-grow rounded-2xl font-bold"
          value={tags}
        >
          <option value="">All Tags</option>
          {tasksWithTags.map(task => (
            <option key={task.id} value={task.tags}>
              {task.tags}
            </option>
          ))}
        </select>
      </div>
      {/* new task btn/link that will go to the add new task page */}
      {filteredList.length > 0 &&
        filteredList.map((task, i) => (
          <div
            className={`border w-full mt-4 rounded-2xl ${
              task.isComplete ? 'bg-blue-100' : 'bg-white'
            } p-5`}
          >
            {/* the blue mark with edit and checkmark button */}
            <div className="flex justify-between items-center mb-2">
              <div className="flex items-center gap-2">
                <div
                  className={`${getDaysDiffBg[i]} h-[1rem] rounded-full w-[1rem]`}
                ></div>
                <span className="font-bold">{task.value}</span>
              </div>
              <div className="flex gap-8">
                <Link to={`/task/${task.id}/edit`}>
                  <button className="bg-blue-200 p-1 rounded-full">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="gray"
                      class="w-4 h-4"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"
                      />
                    </svg>
                  </button>
                </Link>
                <button
                  onClick={() => handleCompleteTask(task.id)}
                  className="bg-blue-200 p-1 rounded-full"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="gray"
                    class="w-5 h-5"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M4.5 12.75l6 6 9-13.5"
                    />
                  </svg>
                </button>
              </div>
            </div>
            {/* DueDate */}
            <div className="flex items-center">
              <span className="mr-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="w-4 h-4"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5"
                  />
                </svg>
              </span>
              <span className="mr-2">Due Date: </span>
              <span className={`${getDaysDiff[i]}`}>
                {task?.date ?? 'No set Date'}
              </span>
            </div>
            {/* Priority: low (4/10) */}
            <div className="flex items-center mt-1 relative">
              <span className="mr-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="w-4 h-4"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M12 19.5v-15m0 0l-6.75 6.75M12 4.5l6.75 6.75"
                  />
                </svg>
              </span>
              <span className="mr-2">Priority: </span>
              <span>
                {task.priority < 5
                  ? 'Low'
                  : task.priority > 5 && task.priority < 7
                  ? 'Moderate'
                  : task.priority > 7
                  ? 'High'
                  : ''}{' '}
                ({!task.priority ? '0' : task.priority}/10)
              </span>
            </div>
            {/* complexity */}
            <div className="flex items-center relative justify-between">
              <div className="flex items-center">
                <span className="mr-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-4 h-4"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z"
                    />
                  </svg>
                </span>
                <span className="mr-2">Complexity: </span>
                <span>
                  {task.complexity < 5
                    ? 'Low'
                    : task.complexity > 5 && task.complexity < 7
                    ? 'Moderate'
                    : task.complexity > 7
                    ? 'High'
                    : ''}{' '}
                  ({!task.complexity ? '0' : task.complexity}/10)
                </span>
              </div>
              <div
                className={`border-2 w-[4rem] h-[4rem] flex items-center justify-center p-1 right-0 absolute text-center rounded-full ${getBorderColor(
                  task?.percent
                )}`}
              >
                <span>{(task?.percent ?? 0).toFixed(0)}%</span>
              </div>
            </div>
            <div className="mt-2 items-center flex ">
              <span
                className={`${
                  task.tags.length === 0
                    ? 'border-none'
                    : 'bg-blue-400 border rounded-xl px-2 text-gray-900 '
                }  text-gray-500 text-sm`}
              >
                {!task.tags ? '' : task.tags}
              </span>
            </div>
            <Link to={`/task/${task.id}`}>
              <button className="text-xs text-blue-500 mt-3">
                Task Details
              </button>
            </Link>
          </div>
        ))}
      <Link to="/task">
        <button className="pt-4 bg-[#0D99FF] rounded-xl text-lg text-white px-12 flex items-center justify-center mt-4 pb-4">
          Add Task
        </button>
      </Link>
    </div>
  )
}

export default Index
