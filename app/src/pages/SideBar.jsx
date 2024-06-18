import React from "react";
import { Outlet } from "react-router";
import { useState } from "react";
import ViewSidebarIcon from "@mui/icons-material/ViewSidebar";

function SideBar() {
  const [todos, setTodos] = useState([]);
  const [isOpening, setIsOpening] = useState(false);

  return (
    <>
      <button className="side-bar-btn" onClick={() => setIsOpening(!isOpening)}>
        <ViewSidebarIcon />
      </button>
      {isOpening ? (
        <div className="sidenav">
          <a href="#about">About</a>
          <a href="#services">Services</a>
          <a href="#clients">Clients</a>
          <a href="#contact">Contact</a>
        </div>
      ) : null}
      <Outlet context={[todos, setTodos]} />
    </>
  );
}

export default SideBar;
