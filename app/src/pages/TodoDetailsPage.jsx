import React, { useEffect, useState } from "react";
import {
  Navigate,
  useNavigate,
  useOutletContext,
  useParams,
} from "react-router";
import axios from "axios";

const todosUrl = "http://localhost:8001/todos";

function TodoDetailsPage() {
  const { todoId } = useParams();
  const [todo, setTodo] = useState({});
  const navigate = useNavigate();
  const [todos, setTodos] = useOutletContext(); //defined in page SideBar which is the parent of 'todo' url
  const [isDeleteing, setisDeleteing] = useState(null);
  useEffect(() => {
    async function fetchTodo() {
      try {
        const res = await axios.get(`${todosUrl}/${todoId}`);
        const data = res.data;
        setTodo(data);
      } catch (error) {
        console.log(error);
      }
    }
    fetchTodo();
  }, [todoId]);

  async function removeTodo(todoId) {
    try {
      await axios.delete(`${todosUrl}/${todoId}`);
      setTodos((prevTodos) => {
        return prevTodos.filter((todo) => todo.id !== todoId);
      });
      setisDeleteing(true);
      setTimeout(() => {
        navigate("/todo", { replace: true });
      }, 3000);
    } catch (error) {
      console.log(error);
      setisDeleteing(false);
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
        {/* {isDeleteing ? <p>Deleting...</p> : <p>failed to delete</p>} */}
        {isDeleteing ? <p>Deleting...</p> : null}
        {isDeleteing === false ? <p>Failed to delete</p> : null}
      </div>
    </div>
  );
}

export default TodoDetailsPage;
