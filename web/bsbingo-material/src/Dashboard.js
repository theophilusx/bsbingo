import React from "react";
import { Grid, Button } from "@material-ui/core";

function Dashboard() {
  return (
    <Grid container direction="row" spacing={10}>
      <Grid item>
        <Button>New Game</Button>
      </Grid>
      <Grid item>
        <Button>Start Game</Button>
      </Grid>
      <Grid item>
        <div>Elapsed Time</div>
      </Grid>
    </Grid>
  );
}

export default Dashboard;
