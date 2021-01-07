import React, { useState } from "react";
import { fade, makeStyles } from "@material-ui/core/styles";
import { AppBar, Grid, Hidden, InputAdornment, TextField, Toolbar, Typography } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import { NavLink } from "react-router-dom";
import NestedMenu from "./NestedMenu";
import IconButton from "@material-ui/core/IconButton";
import SearchIcon from "@material-ui/icons/Search";

const useStyles = makeStyles((theme) => ({
  style: {
    background: "#fccf14",
  },
  title: {
    fontFamily: "Arial",
    fontSize: 22,
    fontWeight: 550,
  },
  textField: {
    width: 500,
    color: "white",
    caretColor: "white",
    background: "#2f3180",
    borderRadius: "5px"
  },
  signInButton: {
    borderColor: "#1d1e4e",
    fontWeight: 600,
    textTransform: "none",
    marginLeft: theme.spacing(3)
  },
  signUpButton: {
    background: "#1d1e4e",
    color: "#fff",
    fontWeight: 600,
    textTransform: "none"
  },
  resize: {
    color: "white",
    padding: theme.spacing(1),
    fontSize: 13,
  },
}));

const Header = () => {
  const classes = useStyles();

  const [value, setValue] = useState();

  return (
    <Grid container>
      <AppBar position="static" className={classes.style}>
        <Toolbar>
          <NestedMenu></NestedMenu>
          <Grid item md={2} sm={12}>
            <Typography variant="h5" className={classes.title}>
              <NavLink to="/" style={{ textDecoration: "none", color: "#1d1e4e", fontWeight: "bold" }}>
                Onlademy
              </NavLink>
            </Typography>
          </Grid>
          <Grid item md={2}>
            {/*<Hidden only={["sm", "xs"]}>*/}
            {/*    <NestedMenu />*/}
            {/*</Hidden>*/}
          </Grid>
          <Grid item md={6}>
            <Hidden only={["sm", "xs"]}>
              <TextField
                className={classes.textField}
                placeholder="What do you want to learn?"
                InputProps={{
                  startAdornment: (
                    <InputAdornment>
                      <IconButton style={{ color: "white" }}>
                        <SearchIcon />
                      </IconButton>
                    </InputAdornment>
                  ),
                  classes: {
                    input: classes.resize,
                  },
                }}
              />

            </Hidden>
          </Grid>
          <Grid item md={1}>
            <Hidden only={["sm", "xs"]}>
              <NavLink
                to="/signin"
                style={{ textDecoration: "none", color: "#1d1e4e" }}
              >
                <Button variant="outlined" className={classes.signInButton}
                >Sign In</Button>
              </NavLink>
            </Hidden>
          </Grid>
          <Grid item md={1}>
            <Hidden only={["sm", "xs"]}>
              <NavLink
                to="/signup"
                style={{ textDecoration: "none", color: "#fff" }}
              >
                <Button className={classes.signUpButton}>Sign Up</Button>
              </NavLink>
            </Hidden>
          </Grid>
        </Toolbar>
      </AppBar>
    </Grid>
  );
};

export default Header;