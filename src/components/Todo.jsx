import { Link } from 'react-router-dom'
import { useContext } from 'react'
import { TodoContext } from '../contexts/todoContext'

function Todo({ todo }) {
  const { completeTodo, removeTodo } = useContext(TodoContext)
  return (
    <div
      className="todo"
      style={{ textDecoration: todo.isCompleted ? 'line-through' : '' }}
    >
      <Link to={`/todo/${todo.id}`}>{todo.text}</Link>
      <div>
        <button onClick={() => completeTodo(todo)}>Complete</button>
        <button onClick={() => removeTodo(todo)}>x</button>
      </div>
    </div>
  )
}

export default Todo
