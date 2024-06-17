import { Route, Routes } from "react-router";
import HomePage from "./pages/HomePage";
import TodoPage from "./pages/TodoPage";
import TodoDetailsPage from "./pages/TodoDetailsPage";
import NotFoundPage from "./pages/NotFoundPage";
import CreateTodoPage from "./pages/CreateTodoPage";
import { Link, NavLink } from "react-router-dom";
// import SideBar from "./components/SideBar";

function App() {
  function TopNavBar(props) {
    const { href, children } = props;
    return (
      <NavLink
        style={({ isActive }) => {
          return isActive ? { color: "red" } : {};
        }}
        to={href}
      >
        {children}
      </NavLink>
    );
  }

  return (
    <>
      <nav className="nav-bar">
        <h1>Todos</h1>
        <ul className="nav-ul">
          <li>
            <TopNavBar className="nav-item" href="/">
              Home
            </TopNavBar>
          </li>
          <li>
            <TopNavBar className="nav-item" href="/todo">
              Todo
            </TopNavBar>
          </li>
        </ul>
      </nav>
      {/* <div className="routes"> */}
      <Routes>
        <Route path="/" element={<HomePage />} />
        {/* <Route path="/todo" element={<SideBar />}> */}
        <Route path="/todo">
          <Route index element={<TodoPage />} />
          <Route path=":todoId" element={<TodoDetailsPage />} />
          <Route path="create" element={<CreateTodoPage />} />
        </Route>
        <Route path="/*" element={<NotFoundPage />} />
      </Routes>
      {/* </div> */}
    </>
  );
}

export default App;
