import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import axios from "axios";

const todosUrl = "http://localhost:8001/todos";

function TodoDetailsPage() {
  const { todoId } = useParams();
  const [todo, setTodo] = useState({});

  useEffect(() => {
    return async function fetchTodo() {
      try {
        const res = await axios.get(`${todosUrl}/${todoId}`);
        const data = res.data;
        setTodo(data);
      } catch (error) {
        console.log(error);
      }
    };
  }, [todoId]);

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

  return (
    <div className="main-container-wrapper">
      <div className="main-container">
        <div className="todo-details-container">
          <p>{todo.title}</p>
          {todo.isComplete ? <p>Status: Completed</p> : <p>Status: Active</p>}
        </div>
        <button onClick={() => removeTodo(todoId)}>Remove</button>
      </div>
    </div>
  );
}

export default TodoDetailsPage;
