import { useState } from "react";
import { AddTodoForm } from "./components/AddTodoForm";
import { TodoList } from "./components/TodoList";
import { TodoStatistics } from "./components/TodoStatistics";

// const todosData = []
const todosData = [
  { id: "1", title: "Learn React", isComplete: false },
  { id: "2", title: "Build a Todo App", isComplete: false },
  { id: "3", title: "Read JavaScript Documentation", isComplete: true },
  { id: "4", title: "Write Unit Tests", isComplete: false },
  { id: "5", title: "Implement Context", isComplete: true },
  { id: "6", title: "Create Portfolio Website", isComplete: false },
  { id: "7", title: "Learn TypeScript", isComplete: false },
  { id: "8", title: "Refactor Codebase", isComplete: true },
  { id: "9", title: "Optimize Performance", isComplete: false },
  { id: "10", title: "Deploy to Production", isComplete: true },
];

function makeId(length) {
  let result = "";
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

function App() {
  const [todos, setTodos] = useState(todosData);
  const [newTodoTitle, setNewTodoTitle] = useState("");

  function removeTodo(todoId) {
    const updatedTodos = todos.filter((todo) => todo.id !== todoId);
    setTodos(updatedTodos);
    return updatedTodos;
  }

  function toggleTodo(todoId) {
    const updatedTodos = todos.map((todo) => {
      if (todo.id === todoId) {
        return {
          ...todo,
          isComplete: !todo.isComplete,
        };
      }
      return todo;
    });
    setTodos(updatedTodos);
  }

  function addTodo(ev) {
    ev.preventDefault();
    const newTodo = {
      id: makeId(2),
      title: newTodoTitle,
      isComplete: false,
    };

    const updatedTodos = [...todos];
    updatedTodos.push(newTodo);
    setTodos(updatedTodos);
    setNewTodoTitle("");
  }

  function completedTodos() {
    const completedTodosArr = todos.filter((todo) => todo.isComplete);
    return completedTodosArr.length;
  }

  function activeTodos() {
    const activeTodosArr = todos.filter((todo) => !todo.isComplete);
    return activeTodosArr.length;
  }

  function calculateCompletedPrecentage() {
    if (todos.length === 0) {
      return 0;
    }
    return (completedTodos() / todos.length) * 100;
  }

  return (
    <div className="main-container">
      <h1>Todos</h1>
      <AddTodoForm addTodo={addTodo} newTodoTitle={newTodoTitle} setNewTodoTitle={setNewTodoTitle} />
      {todos.length === 0 ? (
        <p>No available data</p>
      ) : (
        <TodoList todos={todos} toggleTodo={toggleTodo} removeTodo={removeTodo}/>
      )}
      <TodoStatistics todos={todos} completedTodos={completedTodos} calculateCompletedPrecentage={calculateCompletedPrecentage} activeTodos={activeTodos}/>
    </div>
  );
}

export default App;
