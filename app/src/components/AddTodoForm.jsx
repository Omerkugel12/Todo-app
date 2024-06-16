export function AddTodoForm(props) {
    const {addTodo,newTodoTitle,setNewTodoTitle} = props
    return (
        <form onSubmit={addTodo} id="create-todo-form">
        <h3>Add todo</h3>
        <input
          type="text"
          value={newTodoTitle}
          onChange={(ev) => setNewTodoTitle(ev.target.value)}
          placeholder="Enter todo..."
        />
        <button className="add-todo-btn">Add todo</button>
      </form>
    )
}