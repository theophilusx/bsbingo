import React from "react";
import Cell from "./Cell";
import { Grid } from "@material-ui/core";

function GameRow() {
  return (
    <Grid
      container
      direction="row"
      justify="space-around"
      alignment="center"
      spacing={2}
    >
      <Cell />
      <Cell />
      <Cell />
      <Cell />
      <Cell />
    </Grid>
  );
}

export default GameRow;
