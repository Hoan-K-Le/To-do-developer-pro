import { useParams } from 'react-router-dom'

function Todo({ todos }) {
  const { id } = useParams()
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
