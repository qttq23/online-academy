import React, { useState } from "react"
import { fade, makeStyles } from "@material-ui/core/styles"
import { AppBar, Grid, Hidden, InputAdornment, TextField, Toolbar, Typography } from "@material-ui/core"
import Button from "@material-ui/core/Button"
import { NavLink } from "react-router-dom"
import NestedMenu from "./NestedMenu"
import IconButton from "@material-ui/core/IconButton"
import InputBase from '@material-ui/core/InputBase'
import SearchIcon from "@material-ui/icons/Search"

import store from '../../redux/store'
import myModel from '../../helpers/myModel'
import {
  Link,
} from 'react-router-dom'

const useStyles = makeStyles((theme) => ({
  style: {
    background: "#fff",
  },
  title: {
    fontFamily: "Arial",
    fontSize: 22,
    fontWeight: 550,
  },
  textField: {
    width: 500,
    color: "white",
    background: "white",
  },
  signInButton: {
    fontSize: 15,
    width: 100,
    background: "#e91e63",
    color: "#fff",
    padding: "10px",
    textAlign: "center",
    borderRadius: "5px",
    textTransform: "none",
    textDecoration: "none",
    fontWeight: "900",
  },
  signUpButton: {
    fontSize: 15,
    width: 100,
    color: "#e91e63",
    borderColor: "#e91e63",
    marginLeft: "10px",
    padding: "10px",
    textAlign: "center",
    borderRadius: "5px",
    textTransform: "none",
    textDecoration: "none",
    fontWeight: "900"
  },
  resize: {
    padding: theme.spacing(1),
    fontSize: 13,
  },
  search: {
    position: 'relative',
    border: "2px solid #e91e63",
    borderRadius: "25px",
    backgroundColor: "#FFF",
    color: "black",
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
  },
}))

const Header = () => {
  const classes = useStyles()

  // render
  let account = store.getState().account

  return (
    <Grid container>
      <AppBar position="static" className={classes.style}>
        <Toolbar>
          <NestedMenu></NestedMenu>
          <Grid item md={2} sm={12}>
            <Typography variant="h5" className={classes.title}>
              <NavLink to="/" style={{ textDecoration: "none", color: "#e91e63" }}>
                Onlademy
              </NavLink>
            </Typography>
          </Grid>
          <Grid item md={1}>
          </Grid>
          <Grid item md={6}>
            <Hidden only={["sm", "xs"]}>
              <div className={classes.search}>
                <div className={classes.searchIcon}>
                  <SearchIcon style={{ color: "#e91e63" }} />
                </div>
                <InputBase
                  placeholder="Search…"
                  style={{
                    width: "100%"
                  }}
                  classes={{
                    root: classes.inputRoot,
                    input: classes.inputInput,
                  }}
                  inputProps={{ 'aria-label': 'search' }}
                />
              </div>
            </Hidden>
          </Grid>
          <Grid item md={1}>
          </Grid>
          {
            account ? (
              <Grid md={2}>
                <NavLink
                  to="/profile"
                  style={{ textDecoration: "none", color: "#00f" }}
                >
                  <Button className={classes.signUpButton}>avatar, {account.name}</Button>
                </NavLink>
              </Grid>
            ) : (
              <Grid md={2} style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-end"
              }}>
                <Hidden only={["sm", "xs"]}>
                    <NavLink
                      to="/signup"
                      style={{ textDecoration: "none", color: "#FFF", width: "100px" }}
                    >
                      <Button variant="contained" className={classes.signInButton}>Sign Up</Button>
                    </NavLink>
                  </Hidden>
                  <Hidden only={["sm", "xs"]}>
                    <NavLink
                      to="/signin"
                      style={{ textDecoration: "none", color: "#00f", width: "100px" }}
                    >
                      <Button variant="outlined" className={classes.signUpButton}>Sign In</Button>
                    </NavLink>
                  </Hidden>
              </Grid>
            )
          }
        </Toolbar>
      </AppBar>
    </Grid>
  )
}

export default Header