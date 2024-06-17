import { TodoItem } from "./TodoItem";

export function TodoList({ todos, toggleTodo, removeTodo }) {
  // console.log(todos);
  // console.log(typeof todos);
  return (
    <ul className="todo-list">
      {todos.map((todo) => {
        return (
          <TodoItem
            key={todo.id}
            todo={todo}
            toggleTodo={toggleTodo}
            removeTodo={removeTodo}
          />
        );
      })}
    </ul>
  );
}
