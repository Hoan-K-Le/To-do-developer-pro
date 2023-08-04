import React from 'react'
import { useContext } from 'react'
import { TodoContext } from '../../contexts/taskContext'

export const SelectPriority = () => {
  const { priority, handlePriority, selectedPriority } = useContext(TodoContext)
  return (
    <>
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
    </>
  )
}

export const SelectComplexity = () => {
  const { complexity, handleComplexity, selectedComplexity } = useContext(
    TodoContext
  )
  return (
    <>
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
    </>
  )
}
