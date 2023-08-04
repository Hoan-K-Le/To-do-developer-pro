import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { uid } from 'uid'
import TaskHeader from '../../components/TaskHeader/TaskHeader'
import TaskInput from '../../components/Input/TaskInput'
import { SelectPriority } from '../../components/SelectLevels/SelectLevels'
import { SelectComplexity } from '../../components/SelectLevels/SelectLevels'
import TimeInput from '../../components/TimeInput/TimeInput'
import SubCheckList from '../../components/Subcheck/SubCheckList'
import Tags from '../../components/Tags/Tags'
import { useContext } from 'react'
import { TodoContext } from '../../contexts/taskContext'

function Index() {
  const { addTask } = useContext(TodoContext)

  return (
    <div className="container  p-10">
      <TaskHeader />
      <TaskInput
      //  setValue={setValue} value={value}
      />
      <SelectPriority
      // priority={priority}
      // handlePriority={handlePriority}
      // selectedPriority={selectedPriority}
      />
      <SelectComplexity
      // complexity={complexity}
      // handleComplexity={handleComplexity}
      // selectedComplexity={selectedComplexity}
      />
      <TimeInput
      // handleDate={handleDate}
      // handleTime={handleTime}
      // selectedTime={selectedTime}
      />
      <SubCheckList
      // setCheckList={setCheckList}
      // checkList={checkList}
      // handleCheckList={handleCheckList}
      // checkListItems={checkListItems}
      // handleRemoveCheckList={handleRemoveCheckList}
      />
      <Tags
      // setTagValue={setTagValue} tagValue={tagValue}
      />
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
