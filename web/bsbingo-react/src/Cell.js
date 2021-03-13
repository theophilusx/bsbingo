import React from "react";

function Cell({ word, idx }) {
  let cls = `cell-data ${word ? "" : "blank-cell"}`;

  return (
    <div className={cls} id={`cell-${idx}`}>
      {word}{" "}
    </div>
  );
}

export default Cell;
