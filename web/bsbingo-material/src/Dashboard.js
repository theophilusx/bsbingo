import React, { useState, useEffect } from "react";
import { Grid, Button, Typography, makeStyles } from "@material-ui/core";
import { formatDuration } from "./utils";
import { DateTime } from "luxon";

const useStyles = makeStyles((theme) => ({
  dashboard: {
    margin: theme.spacing(1),
  },
  elapsedTitle: {
    color: theme.palette.success.main,
  },
  elapsedTime: {
    color: theme.palette.info.main,
  },
}));

function Dashboard({ gameState, setGameState, gameDispatch }) {
  let [startTime, setStartTime] = useState(DateTime.now());
  let [endTime, setEndTime] = useState(DateTime.now());
  let [timer, setTimer] = useState(undefined);
  const classes = useStyles();

  useEffect(() => {
    if (gameState === "running" && !timer) {
      setStartTime(DateTime.now());
      let timerHandle = setInterval(() => setEndTime(DateTime.now()), 1000);
      setTimer(timerHandle);
    }
    if (gameState !== "running" && timer) {
      clearInterval(timer);
      setTimer(undefined);
      setEndTime(DateTime.now());
    }
  }, [gameState, timer]);

  return (
    <Grid container item direction="row" alignItems="center" justify="center">
      <Grid container item xs={6} justify="space-around" alignItems="center">
        <Grid item>
          <Button
            variant="contained"
            color="primary"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setGameState("stopped");
              gameDispatch({ type: "new" });
            }}
          >
            New Game
          </Button>
        </Grid>
        <Grid item>
          <Button
            variant="contained"
            color="primary"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setGameState("running");
            }}
          >
            Start Game
          </Button>
        </Grid>
      </Grid>
      <Grid container item xs={6} justify="center" spacing={2}>
        <Grid item>
          <Typography variant="h6" className={classes.elapsedTitle}>
            Elapsed Time:
          </Typography>
        </Grid>
        <Grid item>
          <Typography variant="h6" className={classes.elapsedTime}>
            {formatDuration(startTime, endTime)}
          </Typography>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default Dashboard;
