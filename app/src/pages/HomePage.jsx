import React from "react";
import { Link } from "react-router-dom";

function HomePage() {
  const totalTodos = 10; // Example data - replace with actual stats
  const completedTodos = 6; // Example data - replace with actual stats
  const activeTodos = totalTodos - completedTodos; // Example calculation

  return (
    <div className="home-container">
      <div className="header-home-page-container">
        <div className="header-home-page">
          <h1>Welcome to My Todo List App</h1>
          <p>
            Keep track of your tasks and stay organized with our easy-to-use
            todo list app.
          </p>
        </div>
      </div>

      <div className="features">
        <h2>Key Features</h2>
        <ul>
          <li>Manage tasks with ease</li>
          <li>Organize tasks by categories</li>
          <li>Set reminders and due dates</li>
          <li>Track progress with statistics</li>
        </ul>
        <button>
          <Link to="/todo" className="cta-button">
            Get Started
          </Link>
        </button>
      </div>

      <div className="statistics">
        <h2>Statistics</h2>
        <p>Total Todos: {totalTodos}</p>
        <p>Completed Todos: {completedTodos}</p>
        <p>Active Todos: {activeTodos}</p>
      </div>

      <div className="navigation">
        <h2>Get Started</h2>
        <Link to="/todos" className="start-button">
          Start Managing Todos
        </Link>
      </div>
    </div>
  );
}

export default HomePage;
