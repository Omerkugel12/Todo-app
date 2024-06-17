import React from "react";
import { AddTodoForm } from "../components/AddTodoForm";
import { useRef } from "react";

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
  return <AddTodoForm addTodo={addTodo} newTitleInputRef={newTitleInputRef} />;
}

export default CreateTodoPage;
