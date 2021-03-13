import React from "react";
import GameRow from "./GameRow";

function Game() {
  let words = [
    ["one", "two", "three", "four", "five"],
    ["six", "seven", "eight", "nine", "ten"],
    ["eleven", "twelve", "thriteen", "fourteen", "fifteen"],
    ["sixteen", "seventeen", "eighteen", "nineteen", "twenty"],
  ];

  return (
    <div className="card">
      {words.map((w, idx) => (
        <GameRow key={idx} words={w} />
      ))}
    </div>
  );
}

export default Game;
