export function TodoItem(props) {
    const {todo,toggleTodo,removeTodo} = props
    return (
        <li key={todo.id}>
                <div className="input-and-labael">
                  <input
                    type="checkbox"
                    id="checkbox"
                    checked={todo.isComplete}
                    onChange={() => toggleTodo(todo.id)}
                  />
                  <label>{todo.title}</label>
                </div>
                <button
                  className="remove-todo-btn"
                  onClick={() => removeTodo(todo.id)}
                >
                  Remove
                </button>
              </li>
    )
}