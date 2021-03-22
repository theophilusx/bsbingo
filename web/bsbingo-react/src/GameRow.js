import React from "react";
import Cell from "./Cell";

function GameRow({ group, dispatch }) {
  return (
    <div className="row">
      {group.map((word, idx) => (
        <Cell key={idx} entry={word} dispatch={dispatch} />
      ))}
    </div>
  );
}

export default GameRow;
