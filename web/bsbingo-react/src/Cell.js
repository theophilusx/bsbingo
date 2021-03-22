import React, { useState } from "react";

function Cell({ entry, dispatch }) {
  let [word] = useState(entry);
  let [seen, setSeen] = useState(word ? false : true);

  return (
    <div
      className={`cell-data ${word ? "" : "blank-cell"} ${
        word && seen ? "seen-word" : ""
      }`}
      onClick={() => {
        setSeen(!seen);
        dispatch(
          seen ? { type: "unseen", word: word } : { type: "seen", word: word }
        );
      }}
    >
      {word ? word : ""}
    </div>
  );
}

export default Cell;
