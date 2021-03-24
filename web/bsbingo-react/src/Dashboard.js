import React, { useState, useEffect } from "react";
import { formatDuration } from "./utils";
import { DateTime } from "luxon";

function Dashboard({ gameState, setGameState, gameDispatch }) {
  let [startTime, setStartTime] = useState(DateTime.now());
  let [endTime, setEndTime] = useState(DateTime.now());
  let [timer, setTimer] = useState(undefined);

  useEffect(() => {
    if (gameState === "running" && !timer) {
      setStartTime(DateTime.now());
      let timerHandle = setInterval(() => setEndTime(DateTime.now()), 1000);
      setTimer(timerHandle);
    }
    if (gameState !== "running" && timer) {
      clearInterval(timer);
      setTimer(undefined);
      setEndTime(DateTime.now());
    }
  }, [gameState, timer]);

  return (
    <div className="dashboard">
      <div className="dashboard-left">
        <button
          className="btn new-game"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setGameState("stopped");
            gameDispatch({ type: "new" });
          }}
        >
          New Game
        </button>
        <button
          className="btn start-game"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setGameState("running");
          }}
        >
          Start Game
        </button>
      </div>
      <div className="dashboard-right">
        <div className="time-title">Elapsed Time: </div>
        <div className="elapsed-time" id="elapsed-time">
          {formatDuration(startTime, endTime)}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
