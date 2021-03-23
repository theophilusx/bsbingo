import React, { useState, useReducer, useEffect } from "react";
import "./App.css";
import Header from "./Header";
import Dashboard from "./Dashboard";
import Footer from "./Footer";
import Game from "./Game";
import { newGame } from "./utils";
import { words } from "./words";

function seenWordReducer(state, action) {
  switch (action.type) {
    case "add":
      return [...state, action.payload];
    case "remove":
      return state.filter((w) => w !== action.payload);
    case "reset":
      return [];
    default:
      throw new Error(`seenWordReducer: Unknown action type: ${action.type}`);
  }
}

function App() {
  let [gameState, setGameState] = useState("stopped");
  let [gameWords, setGameWords] = useState(newGame(words, 20, 5));
  let [seenWords, seenWordDispatch] = useReducer(seenWordReducer, []);

  useEffect(() => {
    if (seenWords.length === 15) {
      setGameState("complete");
    }
  }, [seenWords]);

  return (
    <div>
      <Header />
      <main>
        <Dashboard
          gameState={gameState}
          setGameState={setGameState}
          setGameWords={setGameWords}
          seenWordDispatch={seenWordDispatch}
        />
        <div className="game-card" id="game-card">
          <Game gameWords={gameWords} seenWordDispatch={seenWordDispatch} />
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default App;
