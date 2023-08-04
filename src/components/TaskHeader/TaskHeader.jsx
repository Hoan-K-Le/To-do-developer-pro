import React from 'react'
import { Link } from 'react-router-dom'

function TaskHeader() {
  return (
    <div className="flex mb-5 items-center p-3 ">
      <div className="">
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
      </div>
      <p className=" text-center text-2xl flex-grow">Add New Task</p>
    </div>
  )
}

export default TaskHeader
