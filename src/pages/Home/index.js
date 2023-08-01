import React from 'react'
import { Link } from 'react-router-dom'

function index() {
  return (
    <div className="container flex flex-col items-center p-10 ">
      {/* Input search filter */}
      <div className="">
        <input
          className="px-20 rounded-xl py-2 border"
          type="text"
          placeholder="Search..."
        />
      </div>
      {/* 2 select sort and filter by tags */}
      <div className="flex gap-12 pt-10">
        <select className="border px-5 py-2 font-bold">
          <option className="">Default</option>
          <option>Asc date</option>
          <option>desc date</option>
          <option>asc compelx</option>
          <option>desc complx</option>
          <option>asc prio</option>
          <option>desc prio</option>
        </select>
        <select className="border px-10 py-2 font-bold">
          <option>Filter</option>
        </select>
      </div>
      {/* new task btn/link that will go to the add new task page */}
      <div className="pt-10">Where to implement the task list</div>
      <Link to="/task">
        <button className="pt-4 bg-[#0D99FF] rounded-xl text-lg text-white px-12 flex items-center justify-center mt-4 pb-4">
          Add Task
        </button>
      </Link>
    </div>
  )
}

export default index
