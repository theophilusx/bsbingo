import React, { useReducer } from "react";
import GameRow from "./GameRow";
import { newGame, partition } from "./utils";
import { words } from "./words";

const initialGame = newGame(words, 20, 5);

function reducer(state, action) {
  switch (action.type) {
    case "seen":
      return {
        ...state,
        seen: [...state.seen, action.word],
        complete:
          state.seen.length + 1 === state.size - state.blanks ? true : false,
      };
    case "unseen":
      return {
        ...state,
        seen: state.seen.filter((w) => w !== action.word),
        complete:
          state.seen.length - 1 === state.size - state.blanks ? true : false,
      };
    case "new":
      return newGame(words, 20, 5);
    default:
      throw new Error(`Unknown dispatcher action: ${action.type}`);
  }
}

function Game() {
  let [game, dispatch] = useReducer(reducer, initialGame);

  return (
    <>
      <div>
        <p>Seen: {JSON.stringify(game.seen, null, " ")}</p>
        <p>Complete: {game.complete ? "true" : "false"}</p>
      </div>
      <div className="card">
        {partition(5, game.words).map((group, idx) => (
          <GameRow key={idx} group={group} dispatch={dispatch} />
        ))}
      </div>
    </>
  );
}

export default Game;
