import { CircularProgress } from "@mui/material";

export function TodoStatistics(props) {
  const { todos, completedTodos, calculateCompletedPrecentage, activeTodos } =
    props;
  return (
    <div className="statistics-container">
      <h3>Statistics</h3>
      <div className="statistic-item">
        <p>Total todos:</p>
        <p>{todos.length}</p>
      </div>
      <div className="statistic-item">
        <p>Completed todos:</p>
        <p>{completedTodos()}</p>
        <div className="progress-bar-container">
        <CircularProgress variant="determinate" value={calculateCompletedPrecentage() } />
            {/* <div className="progress-bar">
              <div className="progress-bar-fill" style={{width:`${calculateCompletedPrecentage()}%`}}></div>
            </div> */}
            <span className="precentage">{calculateCompletedPrecentage().toFixed(2)}%</span>
          </div>
      </div>
      <div className="statistic-item">
        <p>Active todos:</p>
        <p>{activeTodos()}</p>
      </div>
    </div>
  );
}
