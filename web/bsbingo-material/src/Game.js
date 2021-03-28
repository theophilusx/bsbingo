import React from "react";
import GameRow from "./GameRow";
import { Grid } from "@material-ui/core";

function Game() {
  return (
    <Grid item>
      <GameRow />
      <GameRow />
      <GameRow />
      <GameRow />
    </Grid>
  );
}

export default Game;
