import { Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import TextField from "@mui/material/TextField";

export function AddTodoForm(props) {
  const { addTodo, newTitleInputRef } = props;
  return (
    <form onSubmit={addTodo} id="create-todo-form">
      <h3>Add todo</h3>
      <TextField
        label="Enter new todo"
        color="success"
        focused
        type="text"
        inputRef={newTitleInputRef}
        required
        sx={{
          "& input": {
            color: "green", // Change font color here
          },
        }}
      />
      <Button
        type="submit"
        variant="contained"
        color="success"
        endIcon={<AddIcon />}
      >
        Add todo
      </Button>
    </form>
  );
}
