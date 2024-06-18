import React from "react";
import { AddTodoForm } from "../components/AddTodoForm";
import { useRef } from "react";
import { Outlet } from "react-router";

function CreateTodoPage() {
  const newTitleInputRef = useRef("");
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
  return (
    <div className="modal">
      <div className="modal-content">
        <AddTodoForm addTodo={addTodo} newTitleInputRef={newTitleInputRef} />
      </div>
    </div>
  );
}

export default CreateTodoPage;
