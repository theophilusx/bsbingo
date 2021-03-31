import { createMuiTheme } from "@material-ui/core/styles";

const theme = createMuiTheme({
  palette: {
    type: "dark",
    background: {
      default: "#002b36",
      paper: "#073642",
    },
    text: {
      primary: "#93a1a1",
      secondary: "#839496",
      disabled: "#586e75",
    },
    primary: {
      main: "#006DF0",
    },
    secondary: {
      main: "#5D1064",
    },
    error: {
      main: "#dc322f",
    },
    warning: {
      main: "#cb4b16",
    },
    info: {
      main: "#b58900",
    },
    success: {
      main: "#859900",
    },
  },
});

export default theme;
