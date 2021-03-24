import React, { useState, useReducer, useEffect } from "react";
import "./App.css";
import Header from "./Header";
import Dashboard from "./Dashboard";
import Footer from "./Footer";
import Game from "./Game";
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
    <div>
      <Header />
      <main>
        <Dashboard
          gameState={gameState}
          setGameState={setGameState}
          gameDispatch={gameDispatch}
        />
        <div className="game-card" id="game-card">
          <Game game={game} gameDispatch={gameDispatch} />
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default App;
