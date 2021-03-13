import React from "react";
import Cell from "./Cell";

function GameRow({ words }) {
  return (
    <div className="row">
      {words.map((word, idx) => (
        <Cell key={idx} word={word} idx={idx} />
      ))}
    </div>
  );
}

export default GameRow;
