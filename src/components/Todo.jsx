import { Link } from 'react-router-dom'

function Todo({ todo, completeTodo, removeTodo }) {
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
