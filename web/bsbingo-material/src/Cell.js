import React from "react";
import { Grid, Paper } from "@material-ui/core";

function Cell() {
  return (
    <Grid item xs={2}>
      <Paper>
        <div>Cell</div>
      </Paper>
    </Grid>
  );
}

export default Cell;
