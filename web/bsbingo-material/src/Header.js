import React from "react";
import Logo from "./bull.svg";
import { Paper, Grid, Typography, makeStyles } from "@material-ui/core";
import theme from "./theme";

const useStyles = makeStyles((theme) => ({
  title: {
    marginLeft: theme.spacing(2),
    color: theme.palette.success.main,
  },
  subtitle: {
    marginLeft: theme.spacing(2),
    color: theme.palette.info.main,
    fontStyle: "italic",
  },
  logo: {
    width: "150px",
  },
}));

export function Header() {
  const classes = useStyles(theme);

  return (
    <Grid
      container
      direction="row"
      justify="flex-start"
      alignItems="center"
      component={Paper}
    >
      <Grid item>
        <img src={Logo} alt="logo" className={classes.logo} />
      </Grid>
      <Grid item>
        <Typography variant="h3" component="h1" className={classes.title}>
          Bullshit Bingo
        </Typography>
        <Typography variant="h6" component="h3" className={classes.subtitle}>
          Make meetings fun again!
        </Typography>
      </Grid>
    </Grid>
  );
}

export default Header;

// <SvgIcon component={Logo} viewBox="0 0 600 476.6" />
