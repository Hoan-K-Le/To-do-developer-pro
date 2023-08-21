import { MouseEventHandler, useState } from 'react'
import { uid } from 'uid'
import TaskHeader from '../../components/TaskHeader/TaskHeader'
import TaskInput from '../../components/Input/TaskInput'
import { SelectPriority } from '../../components/SelectLevels/SelectLevels'
import { SelectComplexity } from '../../components/SelectLevels/SelectLevels'
import TimeInput from '../../components/TimeInput/TimeInput'
import SubCheckList from '../../components/Subcheck/SubCheckList'
import Tags from '../../components/Tags/Tags'
import { useContext } from 'react'
import { TodoContext, Task } from '../../contexts/taskContext'
import { useNavigate } from 'react-router-dom'

function Index() {
  // const { addTask } = useContext(TodoContext)
  const { tasks, setInStorage, setTasks } = useContext(TodoContext)

  const [task, setTask] = useState<Task>({
    value: '',
    priority: 0,
    complexity: 0,
    date: '',
    time: '',
    percent: 0,
    isComplete: false,
    checkList: [],
    tags: [],
    id: uid(),
  })

  const navigate = useNavigate()

  const handleChange = (val: { key: string; value: any }) => {
    setTask(prevTask => ({
      ...prevTask,
      [val.key]: val.value,
    }))
  }

  const addTask = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    if (task.value) {
      const updatedTask = [...tasks, task]
      setInStorage(updatedTask)
      setTasks(updatedTask)
    }
    setTask({
      value: '',
      priority: 0,
      complexity: 0,
      date: '',
      time: '',
      percent: 0,
      isComplete: false,
      checkList: [],
      tags: [],
      id: uid(),
    })
    navigate('/')
  }

  return (
    <div className="container p-10">
      <TaskHeader />
      <TaskInput handleChange={handleChange} />
      <SelectPriority handleChange={handleChange} />
      <SelectComplexity handleChange={handleChange} />
      <TimeInput handleChange={handleChange} />
      <SubCheckList
        handleChange={handleChange}
        checklistItems={task.checkList}
      />
      <Tags handleChange={handleChange} />
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
