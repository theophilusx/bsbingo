import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { Container, CssBaseline, MuiThemeProvider } from "@material-ui/core";
import theme from "./theme";

ReactDOM.render(
  <React.StrictMode>
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="lg">
        <App />
      </Container>
    </MuiThemeProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
