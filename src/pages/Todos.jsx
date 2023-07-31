import { useContext } from 'react'
import Todo from '../components/Todo'
import TodoForm from '../components/TodoForm'
import { TodoContext } from '../contexts/todoContext'

const Todos = () => {
  const { todos } = useContext(TodoContext)
  return (
    <div className="todo-list">
      <TodoForm />
      {todos.map(todo => (
        <Todo key={todo.id} todo={todo} />
      ))}
    </div>
  )
}

export default Todos
