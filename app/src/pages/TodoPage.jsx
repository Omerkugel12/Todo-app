import React from "react";
import { useEffect, useState } from "react";
import { TodoList } from "../components/TodoList";
import { TodoStatistics } from "../components/TodoStatistics";
import axios from "axios";
import { Filter } from "../components/Filter";

const todosUrl = "http://localhost:8001/todos";

function TodoPage() {
  const [todos, setTodos] = useState([]);

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
    <div className="main-container-wrapper">
      <div className="main-container">
        <h1>Todos</h1>
        <Filter
          query={query}
          setQuery={setQuery}
          filterByIsComplete={filterByIsComplete}
          setFilterByIsComplete={setFilterByIsComplete}
        />
        {todos.length === 0 ? (
          <p>No available data</p>
        ) : (
          <TodoList
            todos={filterTodos}
            toggleTodo={toggleTodo}
            removeTodo={removeTodo}
          />
        )}
        <TodoStatistics
          todos={todos}
          completedTodos={completedTodos}
          calculateCompletedPrecentage={calculateCompletedPrecentage}
          activeTodos={activeTodos}
        />
      </div>
    </div>
  );
}

export default TodoPage;
