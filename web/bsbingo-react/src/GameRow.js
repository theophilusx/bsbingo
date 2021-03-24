import React from "react";
import Cell from "./Cell";
import { strToKey } from "./utils";

function GameRow({ group, gameDispatch }) {
  return (
    <div className="row">
      {group.map((word, idx) => (
        <Cell
          key={strToKey(word ? word : `blank_${idx}`)}
          entry={word}
          gameDispatch={gameDispatch}
        />
      ))}
    </div>
  );
}

export default GameRow;
