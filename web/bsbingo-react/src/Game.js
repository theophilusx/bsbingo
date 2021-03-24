import React from "react";
import GameRow from "./GameRow";
import { partition } from "./utils";

function Game({ game, gameDispatch }) {
  return (
    <>
      <div className="card">
        {partition(5, game.words).map((group, idx) => (
          <GameRow key={idx} group={group} gameDispatch={gameDispatch} />
        ))}
      </div>
    </>
  );
}

export default Game;
