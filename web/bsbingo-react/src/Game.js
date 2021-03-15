import React from "react";
import GameRow from "./GameRow";
import wordList from "./words";

function Game() {
  console.dir(wordList);
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
