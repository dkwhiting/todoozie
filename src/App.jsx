import './App.css'
import { useSelector, useDispatch } from 'react-redux'
import { addTodo, deleteTodo } from './features/Todos/todoSlice'

function App() {
  const todos = useSelector((state) => state.todos.todos)

  return (
    <div className="App">
      {todos.map(todo => {
        return (
          <div key={todo.id}>
            {todo.name}
          </div>
        )
      })}
    </div>
  )
}

export default App
