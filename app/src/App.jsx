import { useEffect, useRef, useState } from "react";
import { AddTodoForm } from "./components/AddTodoForm";
import { TodoList } from "./components/TodoList";
import { TodoStatistics } from "./components/TodoStatistics";
import axios from "axios";
import { Filter } from "./components/Filter";
import { Route, Routes } from "react-router";
import HomePage from "./pages/HomePage";
import TodoPage from "./pages/TodoPage";
import TodoDetailsPage from "./pages/TodoDetailsPage";
import NotFoundPage from "./pages/NotFoundPage";
import CreateTodoPage from "./pages/CreateTodoPage";
import SideBar from "./components/SideBar";

const todosUrl = "http://localhost:8001/todos";

function App() {
  const [todos, setTodos] = useState([]);
  const newTitleInputRef = useRef("");
  const [query, setQuery] = useState("");
  const [filterByIsComplete, setFilterByIsComplete] = useState("all");

  const filterTodos = todos.filter((todo) => {
    const isMatchByTitle = todo.title
      .toLowerCase()
      .includes(query.toLowerCase());
    if (filterByIsComplete === "all") {
      return isMatchByTitle;
    } else if (filterByIsComplete === "active") {
      return isMatchByTitle && todo.isComplete === false;
    } else if (filterByIsComplete === "complete") {
      return isMatchByTitle && todo.isComplete === true;
    }
  });

  useEffect(() => {
    async function getData() {
      try {
        const response = await axios.get(todosUrl);
        const data = response.data;
        setTodos(data);
      } catch (error) {
        console.log(error);
      }
    }
    getData();
  }, []);

  async function removeTodo(todoId) {
    try {
      await axios.delete(`${todosUrl}/${todoId}`);
      setTodos((prevTodos) => {
        return prevTodos.filter((todo) => todo.id !== todoId);
      });
    } catch (error) {
      console.log(error);
    }
  }

  async function toggleTodo(todoToUpdate) {
    try {
      const res = await axios.patch(`${todosUrl}/${todoToUpdate.id}`, {
        isComplete: !todoToUpdate.isComplete,
      });
      const updatedTodo = res.data;
      setTodos((prevTodos) => {
        return prevTodos.map((todo) => {
          if (todo.id === todoToUpdate.id) {
            return updatedTodo;
          }
          return todo;
        });
      });
    } catch (error) {
      console.log(error);
    }
  }

  async function addTodo(ev) {
    ev.preventDefault();
    const newTodo = {
      title: newTitleInputRef.current.value,
      isComplete: false,
    };
    try {
      const { data: newTodoPosted } = await axios.post(todosUrl, newTodo);
      setTodos((prevTodos) => {
        return [...prevTodos, newTodoPosted];
      });
      newTitleInputRef.current.value = "";
    } catch (error) {
      console.log(error);
    }
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
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/todo" element={<SideBar />}>
        <Route index element={<TodoPage />} />
        <Route path=":todoId" element={<TodoDetailsPage />} />
        <Route path="create" element={<CreateTodoPage />} />
      </Route>
      <Route path="/*" element={<NotFoundPage />} />
    </Routes>

    //   <div className="main-container">
    //     <h1>Todos</h1>
    //     <AddTodoForm addTodo={addTodo} newTitleInputRef={newTitleInputRef} />
    //     <Filter query={query} setQuery={setQuery} filterByIsComplete={filterByIsComplete} setFilterByIsComplete={setFilterByIsComplete}/>
    //     {todos.length === 0 ? (
    //       <p>No available data</p>
    //     ) : (
    //       <TodoList
    //         todos={filterTodos}
    //         toggleTodo={toggleTodo}
    //         removeTodo={removeTodo}
    //       />
    //     )}
    //     <TodoStatistics
    //       todos={todos}
    //       completedTodos={completedTodos}
    //       calculateCompletedPrecentage={calculateCompletedPrecentage}
    //       activeTodos={activeTodos}
    //     />
    //   </div>
  );
}

export default App;
