import { useParams } from 'react-router-dom'
import { useContext } from 'react'
import { TodoContext } from '../contexts/todoContext'

function Todo() {
  const { id } = useParams()
  const { todos } = useContext(TodoContext)
  const todo = todos.find(todo => todo.id === id)

  if (!todo) return <div>No todo found</div>

  return (
    <div>
      <h1>{todo.text}</h1>
      <p>{todo.isCompleted ? 'Completed' : 'Incomplete'}</p>
    </div>
  )
}

export default Todo
