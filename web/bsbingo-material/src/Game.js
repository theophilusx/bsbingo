import React from "react";
import Cell from "./Cell";
import { Grid } from "@material-ui/core";

function Game({ game, gameDispatch }) {
  return (
    <Grid
      container
      item
      spacing={0}
      direction="row"
      alignItems="stretch"
      justify="center"
    >
      {game.words.map((word, idx) => (
        <Cell key={idx} entry={word} gameDispatch={gameDispatch} />
      ))}
      {/* {partition(5, game.words).map((group, idx) => ( */}
      {/*   <GameRow key={idx} group={group} gameDispatch={gameDispatch} /> */}
      {/* ))} */}
    </Grid>
  );
}

export default Game;
