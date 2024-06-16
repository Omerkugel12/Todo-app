import { useEffect, useRef, useState } from "react";
import { AddTodoForm } from "./components/AddTodoForm";
import { TodoList } from "./components/TodoList";
import { TodoStatistics } from "./components/TodoStatistics";
import axios from "axios";
import { Filter } from "./components/Filter";

const todosUrl = "http://localhost:8001/todos";

function App() {
  const [todos, setTodos] = useState([]);
  // const [newTodoTitle, setNewTodoTitle] = useState("");
  const newTitleInputRef = useRef("");
  const [query, setQuery] = useState("");

  useEffect(() => {
    console.log("hello");
  }, []);

  useEffect(() => {
    newTitleInputRef.current.focus();
    console.log(todos);
  }, [todos]);

  useEffect(() => {
    async function getData() {
      try {
        const response = await axios.get(todosUrl);
        const data = response.data;
        console.log(data);
        setTodos(data);
      } catch (error) {
        console.log(error);
      }
    }
    getData();
  }, []);

  const filterTodos = todos.filter((todo) => {
    return todo.title.toLowerCase().includes(query.toLowerCase());
  });

  // function removeTodo(todoId) {
  //   const updatedTodos = todos.filter((todo) => todo.id !== todoId);
  //   setTodos(updatedTodos);
  //   return updatedTodos;
  // }

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

  // function toggleTodo(todoId) {
  //   const updatedTodos = todos.map((todo) => {
  //     if (todo.id === todoId) {
  //       return {
  //         ...todo,
  //         isComplete: !todo.isComplete,
  //       };
  //     }
  //     return todo;
  //   });
  //   setTodos(updatedTodos);
  // }

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

  // function addTodo(ev) {
  //   ev.preventDefault();
  //   const newTodo = {
  //     id: makeId(2),
  //     title: newTodoTitle,
  //     isComplete: false,
  //   };

  //   const updatedTodos = [...todos];
  //   updatedTodos.push(newTodo);
  //   setTodos(updatedTodos);
  //   setNewTodoTitle("");
  // }
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
    <div className="main-container">
      <h1>Todos</h1>
      <AddTodoForm addTodo={addTodo} newTitleInputRef={newTitleInputRef} />
      <Filter query={query} setQuery={setQuery} />
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
  );
}

export default App;
