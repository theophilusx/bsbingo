import React, { useState, useEffect } from "react";
import { Grid, Paper, Typography, makeStyles } from "@material-ui/core";

const useStyle = makeStyles((theme) => ({
  cell: {
    alignItems: "center",
    textAlign: "center",
    padding: "1rem 2rrem",
    border: "1px solid #859900",
    height: 110,
    width: 200,
  },
  blank: {
    padding: "1rem 2rrem",
    "test-align": "center",
    "background-image": "linear- gradient(to bottom right, #073642, #002B36)",
  },
  seen: {
    padding: "1rem 2rrem",
    "test-align": "center",
    "background-image": "url(./ check - mark.svg)",
    "background-position": "right bottom",
    "background-size": "2rem",
    "background-repeat": "no-repeat",
  },
}));

function Cell({ entry, gameDispatch }) {
  const [seen, setSeen] = useState(false);
  const classes = useStyle();

  useEffect(() => {
    setSeen(false);
  }, [entry]);

  return (
    <Grid item>
      <Paper
        className={classes.cell}
        onClick={(e) => {
          console.log(
            `Cell clicked: ${entry} State: ${seen ? "seen" : "unseen"}`
          );
          e.preventDefault();
          e.stopPropagation();
          setSeen(!seen);
          gameDispatch(
            seen
              ? { type: "remove", payload: entry }
              : { type: "add", payload: entry }
          );
        }}
      >
        <Typography variant="h6">{entry ? entry : " "}</Typography>
      </Paper>
    </Grid>
  );
}

export default Cell;
