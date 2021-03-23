import React, { useState, useEffect } from "react";
import GameRow from "./GameRow";
import { partition } from "./utils";

function Game({ gameWords, seenWordDispatch }) {
  return (
    <>
      <div className="card">
        {partition(5, gameWords).map((group, idx) => (
          <GameRow
            key={idx}
            group={group}
            seenWordDispatch={seenWordDispatch}
          />
        ))}
      </div>
    </>
  );
}

export default Game;
