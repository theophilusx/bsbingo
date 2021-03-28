import React from "react";
import Header from "./Header";
import Dashboard from "./Dashboard";
import Game from "./Game";
import { Container, Grid } from "@material-ui/core";

function App() {
  return (
    <>
      <Header />
      <Dashboard />
      <Game />
    </>
  );
}

export default App;
