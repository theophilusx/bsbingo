import React from "react";
import { Grid, Button, Toolbar } from "@material-ui/core";

function Dashboard() {
  return (
    <Toolbar>
      <div>
        <Button>New Game</Button>
      </div>
      <div>
        <Button>Start Game</Button>
      </div>
      <div>
        <div>Elapsed Time</div>
      </div>
    </Toolbar>
  );
}

export default Dashboard;
