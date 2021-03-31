import React from "react";
import GameRow from "./GameRow";
import { Grid } from "@material-ui/core";
import { partition } from "./utils";

function Game({ game, gameDispatch }) {
  return (
    <Grid container item spacing={0} alignItems="stretch">
      {partition(5, game.words).map((group, idx) => (
        <GameRow key={idx} group={group} gameDispatch={gameDispatch} />
      ))}
    </Grid>
  );
}

export default Game;
