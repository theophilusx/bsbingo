import React from "react";
import Cell from "./Cell";
import { strToKey } from "./utils";

function GameRow({ group, seenWordDispatch }) {
  return (
    <div className="row">
      {group.map((word, idx) => (
        <Cell
          key={strToKey(word ? word : `blank_${idx}`)}
          entry={word}
          seenWordDispatch={seenWordDispatch}
        />
      ))}
    </div>
  );
}

export default GameRow;
