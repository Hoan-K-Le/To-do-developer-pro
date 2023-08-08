import React, { useState, useEffect } from 'react'

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
    <div className="container p-10">
      <TaskHeader />
      <TaskInput />
      <SelectPriority />
      <SelectComplexity />
      <TimeInput />
      <SubCheckList />
      <Tags />
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
