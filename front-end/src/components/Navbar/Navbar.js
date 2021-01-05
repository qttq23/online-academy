import React from "react";
import { fade, makeStyles } from "@material-ui/core/styles";
import { AppBar, Grid, Toolbar, Typography, Hidden } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import IconButton from "@material-ui/core/IconButton";
import InputAdornment from "@material-ui/core/InputAdornment";
import SearchIcon from "@material-ui/icons/Search";
import { NavLink } from "react-router-dom";
import HoverMenu from "./HoverMenu";

const useStyles = makeStyles((theme) => ({
    style: {
        background: "#005580",
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
    logInButton: {
        fontSize: 15,
        marginLeft: theme.spacing(6),
    },
    signUpButton: {
        background: "white",
        color: "#005580",
        fontWeight: 600,
        textTransform: "none",
        "&:hover": {
            backgroundColor: fade(theme.palette.common.white, 0.8),
        },
    },
    resize: {
        padding: theme.spacing(1),
        fontSize: 13,
    },
}));

const Header = () => {
    const classes = useStyles();

    return (
        <Grid container>
            <AppBar position="static" className={classes.style}>
                <Toolbar>
                    <Grid item md={2} sm={12}>
                        <Typography variant="h5" className={classes.title}>
                            <NavLink to="/" style={{ textDecoration: "none", color: "#fff" }}>
                                Academy
                            </NavLink>
                        </Typography>
                    </Grid>
                    <Grid item md={2}>
                        <Hidden only={["sm", "xs"]}>
                            <HoverMenu />
                        </Hidden>
                    </Grid>
                    <Grid item md={6}>
                        <Hidden only={["sm", "xs"]}>
                            <TextField
                                className={classes.textField}
                                placeholder="What do you want to learn?"
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment>
                                            <IconButton>
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
                            <Typography className={classes.logInButton}>
                                <NavLink
                                    to="/login"
                                    style={{ textDecoration: "none", color: "#fff" }}
                                >
                                    Login
                                </NavLink>
                            </Typography>
                        </Hidden>
                    </Grid>
                    <Grid item md={1}>
                        <Hidden only={["sm", "xs"]}>
                            <NavLink
                                to="/signup"
                                style={{ textDecoration: "none", color: "#00f" }}
                            >
                                <Button className={classes.signUpButton}>Join for Free</Button>
                            </NavLink>
                        </Hidden>
                    </Grid>
                </Toolbar>
            </AppBar>
        </Grid>
    );
};

export default Header;