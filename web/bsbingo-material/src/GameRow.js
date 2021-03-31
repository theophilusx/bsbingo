import React from "react";
import Cell from "./Cell";
import { Grid } from "@material-ui/core";
import { strToKey } from "./utils";

function GameRow({ group, gameDispatch }) {
  return (
    <Grid
      container
      direction="row"
      justify="center"
      alignItems="stretch"
      spacing={0}
    >
      {group.map((word, idx) => (
        <Cell
          key={strToKey(word ? word : `blank_${idx}`)}
          entry={word}
          gameDispatch={gameDispatch}
        />
      ))}
    </Grid>
  );
}

export default GameRow;
