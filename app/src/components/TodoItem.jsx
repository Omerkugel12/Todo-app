import { Button } from "@mui/material"
import DeleteIcon from '@mui/icons-material/Delete';
import Checkbox from "@mui/material/Checkbox";
import Tooltip from '@mui/material/Tooltip';

export function TodoItem(props) {
    const {todo,toggleTodo,removeTodo} = props
    return (
        <li key={todo.id}>
                <div className="input-and-labael">
                  <Checkbox 
                    checked={todo.isComplete}
                    onChange={() => toggleTodo(todo)}/>
                  <label>{todo.title}</label>
                </div>
                <Tooltip title="Remove todo" placement="top-start">
                <Button variant='outlined' color="error"
                  onClick={() => removeTodo(todo.id)}
                >
                  <DeleteIcon/>
                </Button>
                </Tooltip>
              </li>
    )
}