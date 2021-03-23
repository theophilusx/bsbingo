import React, { useState, useEffect } from "react";
import GameRow from "./GameRow";
import { partition } from "./utils";

function Game({ gameWords, seenWordDispatch }) {
  let [row1, setRow1] = useState([]);
  let [row2, setRow2] = useState([]);
  let [row3, setRow3] = useState([]);
  let [row4, setRow4] = useState([]);
  let [row5, setRow5] = useState([]);

  useEffect(() => {
    let groups = partition(5, gameWords);
    setRow1(groups[0]);
    setRow2(groups[1]);
    setRow3(groups[2]);
    setRow4(groups[3]);
    setRow5(groups[4]);
  }, [gameWords]);

  return (
    <>
      <div className="card">
        <GameRow group={row1} seenWordDispatch={seenWordDispatch} />
        <GameRow group={row2} seenWordDispatch={seenWordDispatch} />
        <GameRow group={row3} seenWordDispatch={seenWordDispatch} />
        <GameRow group={row4} seenWordDispatch={seenWordDispatch} />
      </div>
    </>
  );
}

export default Game;
