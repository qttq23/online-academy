import React, { useState, useEffect } from "react";
import { fade, makeStyles } from "@material-ui/core/styles";
import { AppBar, Grid, Hidden, InputAdornment, TextField, Toolbar, Typography } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import { NavLink } from "react-router-dom";
import NestedMenu from "./NestedMenu";
import IconButton from "@material-ui/core/IconButton";
import InputBase from '@material-ui/core/InputBase'
import SearchIcon from "@material-ui/icons/Search";
import MoreVertIcon from '@material-ui/icons/MoreVert';

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
import Checkbox from '@material-ui/core/Checkbox';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

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

    const [nameChecked, setNameChecked] = React.useState(true);
    const [categoryChecked, setCategoryChecked] = React.useState(true);
    const [topicChecked, setTopicChecked] = React.useState(true);
    const [openOption, setOpenOption] = React.useState(false);

    function handleKeywordChanged(event) {
        setKeyword(event.target.value)
    }

    function handleSearchClicked() {
        console.log('header: keyword: ', keyword)
        let option = ''
        if (nameChecked) {
            option += 'name,'
        }
        if (categoryChecked) {
            option += 'category.name,'
        }
        if (topicChecked) {
            option += 'category.topic,'
        }
        if (option != '') {
            option = option.substring(0, option.length - 1); // remove last ','

        }
        console.log('header: option: ', option)

        setRedirectUrl(`/courseList?fields=search&keyword=${keyword}&option=${option}`)
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
              <NavLink to="/" style={{ textDecoration: "none", color: "#e91e63" }}>
                Onlademy
              </NavLink>
            </Typography>
          </Grid>
          <Grid item md={1}>
          </Grid>
          <Grid item md={6}>
            <Hidden only={["sm", "xs"]}>
            
            

              <TextField
                                className={classes.textField}
                                placeholder="What do you want to learn?"
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment >
                                            <IconButton onClick={handleSearchClicked}>
                                                <SearchIcon />
                                            </IconButton>

                                            <IconButton aria-label="options" 
                                            onClick={()=>{setOpenOption(true)}}>
                                              <MoreVertIcon />
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
          <Grid item md={1}>
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
                (<MenuItem >Teacher</MenuItem>) : ''
            }
            {
              account && account.type == 0 ?
                (
                  <NavLink
                    to="/admin/dashboard"
                    style={{ textDecoration: "none", color: "#00f" }}
                  >
                    <MenuItem onClick={() => { setMenuPosition(null) }} >
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
              <MenuItem onClick={() => { setMenuPosition(null) }}>Profile</MenuItem>
            </NavLink>

            <NavLink
              to="/courses/registered"
              style={{ textDecoration: "none", color: "#00f" }}
            >
              <MenuItem onClick={() => { setMenuPosition(null) }}>Register List</MenuItem>
            </NavLink>

            <NavLink
              to="/courses/watchList"
              style={{ textDecoration: "none", color: "#00f" }}
            >
              <MenuItem onClick={() => { setMenuPosition(null) }}>Wish List</MenuItem>
            </NavLink>

            {
              account && account.type == 1 ?
                (
                  <NavLink
                    to="/courses/teachList"
                    style={{ textDecoration: "none", color: "#00f" }}
                  >
                    <MenuItem onClick={() => { setMenuPosition(null) }}>Teach List</MenuItem>
                  </NavLink>


                )
                : ''
            }
            {
              account && account.type == 1 ?
                (
                  <NavLink
                    to="/add-course"
                    style={{ textDecoration: "none", color: "#00f" }}
                  >
                    <MenuItem onClick={() => { setMenuPosition(null) }}>Add Course</MenuItem>
                  </NavLink>


                )
                : ''
            }

            <NavLink
              to="/logout"
              style={{ textDecoration: "none", color: "#00f" }}
            >
              <MenuItem onClick={() => { setMenuPosition(null) }}>Log out</MenuItem>
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
      </AppBar> { redirectUrl != '' ? (<Redirect to={redirectUrl} />) : '' } 

       <Dialog open={openOption} onClose={()=>{setOpenOption(false)}}
        aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Select field to search on</DialogTitle>
        <DialogContent>

        course name:
        <Checkbox
          checked={nameChecked}
          onChange={(event)=>{setNameChecked(event.target.checked)}}
          inputProps={{ 'aria-label': 'primary checkbox' }}
        />

        category:
        <Checkbox
          checked={categoryChecked}
          onChange={(event)=>{setCategoryChecked(event.target.checked)}}
          inputProps={{ 'aria-label': 'primary checkbox' }}
        />

        topic:
        <Checkbox
          checked={topicChecked}
          onChange={(event)=>{setTopicChecked(event.target.checked)}}
          inputProps={{ 'aria-label': 'primary checkbox' }}
        />

        </DialogContent>
      </Dialog>

    </Grid>
    )
}


export default Header