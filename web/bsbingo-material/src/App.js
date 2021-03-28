import React from "react";
import Header from "./Header";
import Dashboard from "./Dashboard";
import Game from "./Game";
import { Container, Grid } from "@material-ui/core";

function App() {
  return (
    <>
      <Header />
      <Grid container spacing={3} justify="center" style={{ padding: 170 }}>
        <Grid item>
          <Dashboard />
          <Game />
        </Grid>
      </Grid>
    </>
  );
}

export default App;
