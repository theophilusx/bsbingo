import React from "react";
import Cell from "./Cell";

function GameRow({ group, seenWordDispatch }) {
  return (
    <div className="row">
      {group.map((word, idx) => (
        <Cell key={idx} entry={word} seenWordDispatch={seenWordDispatch} />
      ))}
    </div>
  );
}

export default GameRow;
