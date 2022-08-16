import { useEffect } from 'react'
import { useState } from 'react'
import { Todo } from './todo'
import './todoApp.css'

export default function TodoApp() {
  const [title, setTitle] = useState('')
  const [todos, setTodos] = useState(
    localStorage.getItem('tasks')
      ? JSON.parse(localStorage.getItem('tasks'))
      : []
  )

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(todos))
  }, [todos])

  function handleChange(e) {
    const value = e.target.value
    setTitle(value)
  }

  function handleSumit(e) {
    e.preventDefault()
    const newTodo = {
      id: crypto.randomUUID(),
      title: title,
      completed: false,
    }
    setTodos([newTodo, ...todos])
    setTitle('')
  }

  function handleUpdate(id, value) {
    const temp = [...todos]
    const item = temp.find(item => item.id == id)
    item.title = value
    setTodos(temp)
  }

  function handleDelete(id) {
    const temp = todos.filter(item => item.id != id)
    setTodos(temp)
  }

  return (
    <div className="todoContainer">
      <form className="todoCreateForm" onSubmit={handleSumit}>
        <input
          className="todoInput"
          onChange={handleChange}
          value={title}
          type="text"
          autoFocus
        />
        <button className="buttonCreate" onClick={handleSumit}>
          Crear
        </button>
      </form>
      <div className="todosContainer">
        {todos.map(item => (
          <Todo
            key={item.id}
            item={item}
            onUpdate={handleUpdate}
            onDelete={handleDelete}
          />
        ))}
      </div>
    </div>
  )
}
