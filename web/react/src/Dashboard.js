"use strict";

import React from "react";

function Dashboard() {
  return (
    <div className="dashboard">
      <div className="dashboard-left">
        <button className="btn new-game">New Game</button>
        <button className="btn start-game">Start Game</button>
      </div>
      <div className="dashboard-right">
        <div className="time-title">Elapsed Time: </div>
        <div className="elapsed-time" id="elapsed-time">
          00:00:00
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
