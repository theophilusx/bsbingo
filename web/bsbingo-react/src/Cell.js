import React, { useState, useEffect } from "react";

function Cell({ entry, seenWordDispatch }) {
  let [word, setWord] = useState(entry);
  let [seen, setSeen] = useState(word ? false : true);

  useEffect(() => {
    setWord(entry);
    setSeen(false);
  }, [entry]);

  return (
    <div
      className={`cell-data ${word ? "" : "blank-cell"} ${
        word && seen ? "seen-word" : ""
      }`}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        setSeen(!seen);
        seenWordDispatch(
          seen
            ? { type: "remove", payload: word }
            : { type: "add", payload: word }
        );
      }}
    >
      {word ? word : ""}
    </div>
  );
}

export default Cell;
