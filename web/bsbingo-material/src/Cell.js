import React, { useState, useEffect } from "react";
import {
  Grid,
  Typography,
  makeStyles,
  Card,
  CardContent,
} from "@material-ui/core";

const useStyle = makeStyles((theme) => ({
  root: {
    display: "inline-flex",
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center",
    border: "1px solid #859900",
    height: 110,
  },
  cell: {
    textAlign: "center",
  },
  blank: {
    "background-image": "linear- gradient(to bottom right, #073642, #002B36)",
  },
  seen: {
    backgroundImage: "url(./ check - mark.svg)",
    backgroundPosition: "right bottom",
    backgroundSize: "2rem",
    backgroundRepeat: "no-repeat",
  },
}));

function Cell({ entry, gameDispatch }) {
  const [seen, setSeen] = useState(false);
  const classes = useStyle();

  useEffect(() => {
    setSeen(false);
  }, [entry]);

  return (
    <Grid item xs={12} sm={6} md={3} className={classes.root}>
      <Typography variant="h6">{entry ? entry : ""}</Typography>
    </Grid>
  );
}

export default Cell;
