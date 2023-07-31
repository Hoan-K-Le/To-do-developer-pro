import { useState, useContext } from 'react'
import { TodoContext } from '../contexts/todoContext'

function TodoForm() {
  const [value, setValue] = useState('')
  const { addTodo } = useContext(TodoContext)

  const handleSubmit = e => {
    e.preventDefault()
    if (!value) return
    addTodo(value)
    setValue('')
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        className="input"
        value={value}
        onChange={e => setValue(e.target.value)}
      />
    </form>
  )
}

export default TodoForm
