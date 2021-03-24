import React, { useState, useEffect } from "react";

function Cell({ entry, gameDispatch }) {
  let [seen, setSeen] = useState(false);

  useEffect(() => {
    setSeen(false);
  }, [entry]);

  return (
    <div
      className={`cell-data ${entry ? "" : "blank-cell"} ${
        entry && seen ? "seen-word" : ""
      }`}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        setSeen(!seen);
        gameDispatch(
          seen
            ? { type: "remove", payload: entry }
            : { type: "add", payload: entry }
        );
      }}
    >
      {entry ? entry : ""}
    </div>
  );
}

export default Cell;
