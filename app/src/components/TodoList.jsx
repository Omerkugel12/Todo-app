import { TodoItem } from "./TodoItem";

export function TodoList(props) {
    const {todos,toggleTodo,removeTodo} = props
    return (
        <>
        <ul>
          {todos.map((todo) => {
            return (
              <TodoItem key={todo.id} todo={todo} toggleTodo={props.toggleTodo} removeTodo={props.removeTodo}/>
            );
          })}
        </ul>
        </>
    )
}