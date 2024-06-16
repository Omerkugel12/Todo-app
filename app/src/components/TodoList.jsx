import { TodoItem } from "./TodoItem";

export function TodoList(props) {
    const {todos,toggleTodo,removeTodo} = props
    return (
        <>
        <ul>
          {todos.map((todo) => {
            return (
              <TodoItem todo={todo} toggleTodo={props.toggleTodo} removeTodo={props.removeTodo}/>
            );
          })}
        </ul>
        </>
    )
}