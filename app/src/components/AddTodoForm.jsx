import { Button } from "@mui/material"

export function AddTodoForm(props) {
    const {addTodo,newTitleInputRef} = props
    return (
        <form onSubmit={addTodo} id="create-todo-form">
        <h3>Add todo</h3>
        <input
          type="text"
          ref={newTitleInputRef}
          placeholder="Enter todo..."
          required
        />
        <Button type="submit" variant="contained" color="success">Add todo</Button>
      </form>
    )
}