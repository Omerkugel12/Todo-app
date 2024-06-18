import { Button } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import Checkbox from "@mui/material/Checkbox";
import Tooltip from "@mui/material/Tooltip";
import { Link } from "react-router-dom";

export function TodoItem(props) {
  const { todo, toggleTodo, removeTodo } = props;
  return (
    <li key={todo.id}>
      <div className="input-and-labael">
        <Checkbox checked={todo.isComplete} onChange={() => toggleTodo(todo)} />
        <Link to={todo.id}>
          <label
            style={{
              textDecoration: todo.isComplete ? "line-through" : "none",
              color: todo.isComplete ? "grey" : "",
            }}
          >
            {todo.title}
          </label>
        </Link>
      </div>
      <Tooltip title="Remove todo" placement="top-start">
        <Button
          variant="outlined"
          color="error"
          onClick={() => removeTodo(todo.id)}
        >
          <DeleteIcon />
        </Button>
      </Tooltip>
    </li>
  );
}
