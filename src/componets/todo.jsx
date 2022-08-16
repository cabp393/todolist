import { useState } from 'react'

export function Todo({ item, onUpdate, onDelete }) {
  const [isEdit, setIsEdit] = useState(false)

  function FormEdit() {
    const [newValue, setNewValue] = useState(item.title)

    function handleSubmit(e) {
      e.preventDefault()
    }

    function handleChange(e) {
      const value = e.target.value
      setNewValue(value)
    }

    function handleClickUpdate(e) {
      e.preventDefault()
      onUpdate(item.id, newValue)
      setIsEdit(false)
    }

    return (
      <form className="todoUpdateForm" onSubmit={handleSubmit}>
        <input
          type="text"
          className="todoInput"
          onChange={handleChange}
          value={newValue}
          autoFocus
        />
        <button className="buttonEdit" onClick={handleClickUpdate}>
          Update
        </button>
      </form>
    )
  }

  function TodoElement() {
    return (
      <div className="todoInfo">
        <div className="todoTitle">{item.title}</div>
        <button className="buttonEdit" onClick={() => setIsEdit(true)}>
          Edit
        </button>
        <button className="buttonDelete" onClick={e => onDelete(item.id)}>
          Delete
        </button>
      </div>
    )
  }

  return <div className="todo">{isEdit ? <FormEdit /> : <TodoElement />}</div>
}
