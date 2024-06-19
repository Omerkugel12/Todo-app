import React from "react";
import { AddTodoForm } from "../components/AddTodoForm";
import { useRef } from "react";
import { Outlet, useNavigate, useOutletContext } from "react-router";
import axios from "axios";

const todosUrl = "http://localhost:8001/todos";

function CreateTodoPage() {
  const [todos, setTodos] = useOutletContext();
  const newTitleInputRef = useRef("");
  const navigate = useNavigate();

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
      navigate("/todo");
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <>
      <button onClick={() => navigate("/todo")}>x</button>
      <AddTodoForm addTodo={addTodo} newTitleInputRef={newTitleInputRef} />
      <Outlet />
    </>
  );
}

export default CreateTodoPage;
