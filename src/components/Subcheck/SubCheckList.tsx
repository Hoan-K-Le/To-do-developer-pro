import React from 'react'
import { useContext, useState } from 'react'
import { uid } from 'uid'
import { ChecklistItems } from '../../contexts/taskContext'

interface ChangeProps {
  handleChange: (data: { key: string; value: any }) => void
  checklistItems: ChecklistItems[]
}

function SubCheckList({ handleChange, checklistItems }: ChangeProps) {
  const [checkList, setCheckList] = useState<string>('')
  const [checkListItems, setCheckListItems] = useState<ChecklistItems[]>([])

  const handleRemoveCheckList = (id: string) => {
    const updatedChecklist = checkListItems.filter(
      checkList => checkList.id !== id
    )

    setCheckListItems(updatedChecklist)
    handleChange({ key: 'checkList', value: updatedChecklist })
  }

  const handleAddCheckList = () => {
    if (!checkList) return
    const newChecklist = [
      ...checklistItems,
      { id: uid(), value: checkList, isComplete: false },
    ]
    setCheckListItems(newChecklist)
    handleChange({ key: 'checkList', value: newChecklist })
    setCheckList('')
  }

  return (
    <>
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
          onClick={handleAddCheckList}
          className="absolute bg-[#0D99FF] p-1 text-white rounded-full right-3 top-5 text-3xl"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            className="w-6 h-6"
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
                className="w-6 h-6"
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
    </>
  )
}

export default SubCheckList
