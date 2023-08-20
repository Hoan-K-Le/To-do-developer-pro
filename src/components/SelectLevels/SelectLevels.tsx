import React from 'react'
import { useContext, useState } from 'react'
import { TodoContext } from '../../contexts/taskContext'
interface ChangeProps {
  handleChange: (data: { key: string; value: number }) => void
}

export const SelectPriority = ({ handleChange }: ChangeProps) => {
  const [priority, setPriority] = useState<number[]>([
    1,
    2,
    3,
    4,
    5,
    6,
    7,
    8,
    9,
    10,
  ])

  const [selectedPriority, setSelectedPriority] = useState<number | null>(null)

  const handleAddPriority = (selectPriority: number) => {
    if (!selectPriority) return
    handleChange({ key: 'priority', value: selectPriority })
    setSelectedPriority(selectPriority)
  }

  return (
    <>
      <p className="mt-4 text-lg">Select Priority Level</p>
      <div className="flex justify-around mt-4 gap-2">
        {priority.length > 0 &&
          priority.map(num => (
            <div className="">
              {/* <input type="radio" className="p-2" value={num} /> */}
              <button
                onClick={() => handleAddPriority(num)}
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

export const SelectComplexity = ({ handleChange }: ChangeProps) => {
  const [complexity, setComplexity] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])
  const [selectedComplexity, setSelectedComplexity] = useState<number | null>(
    null
  )
  const handleAddComplexity = (selectComplexity: number) => {
    if (!selectComplexity) return
    handleChange({ key: 'complexity', value: selectComplexity })
    setSelectedComplexity(selectComplexity)
  }

  return (
    <>
      <p className="text-lg mt-4">Select Complexity Level</p>
      <div className="mt-4 justify-around flex gap-2">
        {complexity.length > 0 &&
          complexity.map(num => (
            <div>
              <button
                onClick={() => handleAddComplexity(num)}
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
