import Todo from '../components/Todo'
import TodoForm from '../components/TodoForm'

const Todos = ({ todos, completeTodo, removeTodo, addTodo }) => (
  <div className="todo-list">
    <TodoForm addTodo={addTodo} />
    {todos.map(todo => (
      <Todo
        key={todo.id}
        todo={todo}
        completeTodo={completeTodo}
        removeTodo={removeTodo}
      />
    ))}
  </div>
)

export default Todos
