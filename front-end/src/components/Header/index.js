import React, { useState, useEffect } from "react";
import { fade, makeStyles } from "@material-ui/core/styles";
import { AppBar, Grid, Hidden, InputAdornment, TextField, Toolbar, Typography } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import { NavLink } from "react-router-dom";
import NestedMenu from "./NestedMenu";
import IconButton from "@material-ui/core/IconButton";
import SearchIcon from "@material-ui/icons/Search";

import myRequest from "../../helpers/myRequest";
import myConfig from '../../helpers/myConfig';
import store from '../../redux/store'
import myModel from '../../helpers/myModel'
import {
    Link,
    Redirect
} from 'react-router-dom';
import { Menu, MenuItem } from "@material-ui/core";
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

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

        const [menuPosition, setMenuPosition] = useState('');
        const handleRightClick = (event) => {
            if (menuPosition) {
                return;
            }
            event.preventDefault();
            setMenuPosition({
                top: event.pageY - 10,
                left: event.pageX,
            });
        };


        const [redirectUrl, setRedirectUrl] = useState('');
        const [keyword, setKeyword] = useState('')

        function handleKeywordChanged(event) {
            setKeyword(event.target.value)
        }

        function handleSearchClicked() {
            console.log('header: keyword: ', keyword)
            setRedirectUrl(`/courseList?fields=search&keyword=${keyword}`)
        }

        useEffect(function() {

            myRequest({
                    method: 'get',
                    url: `${myConfig.apiServerAddress}/api/categories`,
                },
                function ok(response) {
                    store.dispatch({
                        type: 'set_categories',
                        payload: {
                            data: response.data
                        }
                    });

                },
            )
        }, [])

        // render
        let account = store.getState().account
        let categories = store.getState().categories

        return (
            <Grid container>
            <AppBar position="static" className={classes.style}>
                <Toolbar>
                    <NestedMenu categories={categories}></NestedMenu>
                    <Grid item md={2} sm={12}>
                        <Typography variant="h5" className={classes.title}>
                            <NavLink to="/" style={{ textDecoration: "none", color: "#fff" }}>
                                Academy Online
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
                                        <InputAdornment onClick={handleSearchClicked}>
                                            <IconButton>
                                                <SearchIcon />
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                    classes: {
                                        input: classes.resize,
                                    },
                                }}
                                value={keyword}
                                onChange={handleKeywordChanged}
                            />

                        </Hidden>
                    </Grid>

                           <Menu
                                open={!!menuPosition}
                                onClose={() => setMenuPosition(null)}
                                anchorReference="anchorPosition"
                                anchorPosition={menuPosition}
                                
                                >
                                {
                                    account && account.type == 2 ? 
                                    (<MenuItem >Student</MenuItem>) : ''
                                }
                                {
                                    account && account.type == 1 ? 
                                    (<MenuItem >Teacher</MenuItem>): ''
                                }
                                {
                                    account && account.type == 0 ? 
                                    (
                                       <NavLink
                                            to="/admin/dashboard"
                                            style={{ textDecoration: "none", color: "#00f" }}
                                        >
                                        <MenuItem onClick={()=>{setMenuPosition(null)}} >
                                        Admin Dashboard
                                        </MenuItem>

                                        </NavLink>
                                    )
                                    : ''
                                }

                                <NavLink
                                    to="/profile"
                                    style={{ textDecoration: "none", color: "#00f" }}
                                        >
                                <MenuItem onClick={()=>{setMenuPosition(null)}}>Profile</MenuItem>
                                </NavLink>

                                <NavLink
                                    to="/courses/registered"
                                    style={{ textDecoration: "none", color: "#00f" }}
                                        >
                                <MenuItem onClick={()=>{setMenuPosition(null)}}>Register List</MenuItem>
                                </NavLink>
                                
                                <NavLink
                                    to="/courses/watchList"
                                    style={{ textDecoration: "none", color: "#00f" }}
                                        >
                                <MenuItem onClick={()=>{setMenuPosition(null)}}>Wish List</MenuItem>
                                </NavLink>
                   
                                {
                                    account && account.type == 1 ? 
                                    (
                                        <NavLink
                                            to="/courses/teachList"
                                            style={{ textDecoration: "none", color: "#00f" }}
                                                >
                                        <MenuItem onClick={()=>{setMenuPosition(null)}}>Teach List</MenuItem>
                                        </NavLink>
                                    )
                                    : ''
                                }

                                <NavLink
                                    to="/logout"
                                    style={{ textDecoration: "none", color: "#00f" }}
                                        >
                                <MenuItem onClick={()=>{setMenuPosition(null)}}>Log out</MenuItem>
                                </NavLink>
                                


                            </Menu>

                    {
                        account ? 

                            (
                                <Button className={classes.signUpButton}
                                onClick={handleRightClick}
                                startIcon={<AccountCircleIcon />}
                                >
                                {account.name}
                                </Button>
     
                                )
                                    :
                                        (
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
                                        )
                        } 
                                {
                                    account ? '' :
                                        (
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
                                        )
                                }





    </Toolbar> 
    </AppBar> { redirectUrl != '' ? (<Redirect to={redirectUrl} />) : '' } 
    </Grid>
);
};

export default Header;