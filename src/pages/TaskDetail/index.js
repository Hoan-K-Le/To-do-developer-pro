import React, { useContext } from 'react'
import { Link, useParams } from 'react-router-dom'
import { TodoContext } from '../../contexts/taskContext'
import { parse, format } from 'date-fns'
import { useNavigate } from 'react-router-dom'

function Index() {
  const { taskId } = useParams()
  const { tasks, setTasks, setInStorage, getTaskObj } = useContext(TodoContext)
  const getTask = getTaskObj(taskId)
  const navigate = useNavigate()

  const checklistComplete = checklistId => {
    const updatedCheckLists = tasks.map(task => {
      if (task.id === taskId) {
        const updatedChecklist = task.checkList.map(list => {
          if (list.id === checklistId) {
            return { ...list, isComplete: !list.isComplete }
          }
          return list
        })

        // Calculate the new completePercentage
        const updatedCompleteCheckListCount = updatedChecklist.filter(
          list => list.isComplete
        ).length

        const updatedCompletePercentage =
          updatedCompleteCheckListCount > 0
            ? (updatedCompleteCheckListCount / updatedChecklist.length) * 100
            : 0

        // Update the task with the new percentage
        const updatedTask = {
          ...task,
          percent: updatedCompletePercentage,
          checkList: updatedChecklist,
        }

        return updatedTask
      }
      return task
    })
    // Update the state with the updated checklist
    setTasks(updatedCheckLists)
    setInStorage(updatedCheckLists)
  }

  const handleDelete = taskId => {
    setTasks(prevTask => {
      if (!prevTask) return
      const updatedTask = prevTask.filter(task => task.id !== taskId)
      setInStorage(updatedTask)
      setTasks(updatedTask)
    })
    navigate('/')
  }

  const handleRepeatTask = () => {
    setTasks(prevTask => {
      const updatedTask = prevTask.map(task => {
        if (task.id === taskId) {
          const updatedCheckList = task.checkList.map(list => {
            return {
              ...list,
              isComplete: false,
            }
          })

          return { ...task, percent: 0, checkList: updatedCheckList }
        }
        return task
      })
      setTasks(updatedTask)
      setInStorage(updatedTask)
      return updatedTask
    })
  }

  const currentDate = new Date()
  const selectedDate = getTask.date

  // add a conditinal rendering just incase if the selectDate is empty or undefined
  const parsedSelectedDate = selectedDate
    ? parse(selectedDate, 'yyyy-MM-dd', new Date())
    : null

  const formattedDate = parsedSelectedDate
    ? format(parsedSelectedDate, 'EEEE MMM dd')
    : null

  const daysDifference = parsedSelectedDate
    ? Math.floor((parsedSelectedDate - currentDate) / (1000 * 60 * 60 * 24))
    : 0

  return (
    <div className="container p-10 w-[500px]">
      <div className="flex mb-5 items-center p-3 justify-between ">
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
        <p className=" text-center text-2xl flex-grow">Task Details</p>

        <Link to={`/task/${taskId}/edit`}>
          <button className="bg-blue-200 p-1 rounded-full">
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
                d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"
              />
            </svg>
          </button>
        </Link>
      </div>
      {/* details */}
      <div className="bg-white p-5 rounded-xl flex flex-col items-start  ">
        <div className="flex items-center gap-2 ml-1 mb-4">
          <div
            className={`${
              daysDifference <= 3 && daysDifference >= 0
                ? 'bg-orange-300 font-bold'
                : daysDifference <= 0
                ? 'bg-red-500 font-bold'
                : 'bg-blue-400 font-bold'
            } h-[1rem] rounded-full w-[1rem]`}
          ></div>
          <span className="font-bold text-xl">{getTask?.value ?? ''}</span>
        </div>
        {/* duedates priority etc etc */}
        {getTask && (
          <div className="flex items-center gap-2 mb-2">
            <span className="mr-1">
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
                  d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5"
                />
              </svg>
            </span>
            <span className="mr-2 text-xl">Due Date: </span>
            <span
              className={`${
                daysDifference <= 3 && daysDifference >= 0
                  ? 'text-orange-300 font-bold'
                  : daysDifference <= 0
                  ? 'text-red-500 font-bold'
                  : 'text-blue-400 font-bold'
              } text-xl`}
            >
              {getTask?.date ? formattedDate : 'No Set Date'}
            </span>
          </div>
        )}

        {/* Priority: low (4/10) */}
        <div className="flex items-center mt-1 gap-2 mb-2">
          <span className="mr-1">
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
                d="M12 19.5v-15m0 0l-6.75 6.75M12 4.5l6.75 6.75"
              />
            </svg>
          </span>
          <span className="mr-2 text-xl">Priority: </span>
          <span className="text-xl">({getTask?.priority ?? 0}/10)</span>
        </div>
        {/* complexity */}
        <div className="flex items-center gap-2 ">
          <span className="mr-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z"
              />
            </svg>
          </span>
          <span className="mr-2 text-xl">Complexity: </span>
          <span className="text-xl">({getTask?.complexity ?? 0}/10)</span>
        </div>
        {/* progress bar */}
        <div className="w-full mt-4">
          <div className="flex items-center justify-between">
            <span className="text-xl">Task Complete</span>
            <span className="text-xl">{getTask?.percent ?? 0}%</span>
          </div>
          <div className="w-full  relative border rounded-xl h-[1rem] mt-4 ">
            <div
              className={`rounded-xl  bg-pink-300 h-[1rem]`}
              style={{ width: `${getTask?.percent ?? 0}%` }}
            ></div>
          </div>
        </div>

        {/* checklist for subtasks */}
      </div>
      <div className="w-full mt-4">
        {getTask?.checkList && getTask.checkList.length > 0 ? (
          <p className="text-xl">Checklist for subtasks</p>
        ) : (
          ''
        )}
        {getTask?.checkList &&
          getTask.checkList.map(list => (
            <div className="">
              <button
                onClick={() => checklistComplete(list.id)}
                className="flex w-full justify-between my-4 items-center p-3 rounded-3xl bg-white"
              >
                <span className="text-xl ">{list.value}</span>
                <span
                  className={`${
                    list.isComplete ? 'bg-blue-400' : 'bg-blue-200'
                  } rounded-3xl p-2 `}
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
                      d="M4.5 12.75l6 6 9-13.5"
                    />
                  </svg>
                </span>
              </button>
            </div>
          ))}
      </div>
      {/* repeat/delete task */}
      <div className="flex flex-col items-center ">
        <div className="flex justify-center w-full  p-2 ">
          <button
            onClick={handleRepeatTask}
            className="flex justify-center bg-[#0D99FF] w-10/12 p-4 rounded-2xl items-center text-white gap-4 text-xl hover:text-gray-200"
          >
            <span>
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
                  d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
                />
              </svg>
            </span>
            <span>Repeat Task</span>
          </button>
        </div>

        <div className="flex justify-center w-full p-2 ">
          <button
            onClick={() => handleDelete(getTask.id)}
            className="flex justify-center bg-[#ffe0de] w-10/12 p-4 rounded-2xl items-center text-black gap-4 text-xl hover:text-green-700"
          >
            <span>
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
                  d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                />
              </svg>
            </span>
            <span>Delete Task</span>
          </button>
        </div>
      </div>
    </div>
  )
}

export default Index
