import React, { useState, useEffect, useReducer } from "react";
import Header from "./Header";
import Dashboard from "./Dashboard";
import Game from "./Game";
import { Grid } from "@material-ui/core";
import { newGame } from "./utils";
import { words } from "./words";

function gameReducer(state, action) {
  switch (action.type) {
    case "add":
      return {
        words: state.words,
        seen: [...state.seen, action.payload],
      };
    case "remove":
      return {
        words: state.words,
        seen: state.seen.filter((w) => w !== action.payload),
      };
    case "new":
      return {
        words: newGame(words, 20, 5),
        seen: [],
      };
    default:
      throw new Error(`gameReducer: Unknown action type: ${action.type}`);
  }
}

function App() {
  let [gameState, setGameState] = useState("stopped");
  let [game, gameDispatch] = useReducer(gameReducer, {
    words: newGame(words, 20, 5),
    seen: [],
  });

  useEffect(() => {
    if (game.seen.length === 15) {
      setGameState("complete");
    }
  }, [game]);

  return (
    <Grid container direction="column" spacing={3}>
      <Grid container item>
        <Header />
      </Grid>
      <Grid container item>
        <Dashboard
          gameState={gameState}
          setGameState={setGameState}
          gameDispatch={gameDispatch}
        />
      </Grid>
      <Grid container item>
        <Game game={game} gameDispatch={gameDispatch} />
      </Grid>
    </Grid>
  );
}

export default App;
