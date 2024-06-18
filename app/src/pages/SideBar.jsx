import React from "react";
import { Outlet } from "react-router";
import { useState } from "react";

function SideBar() {
  const [todos, setTodos] = useState([]);
  return (
    <>
      <div>SideBar</div>
      <Outlet context={[todos, setTodos]} />
    </>
  );
}

export default SideBar;
