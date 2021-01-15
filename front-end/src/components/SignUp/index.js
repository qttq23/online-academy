import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';


import myModel from '../../helpers/myModel'
import {
    Redirect,
} from 'react-router-dom';
import store from '../../redux/store'
import { RadioGroup, Radio } from '@material-ui/core';
import MyDialog from '../MyDialog/index.js'
import myConfig from '../../helpers/myConfig'

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: 120,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: "white",
        padding: "20px",
        borderRadius: "5px",
    },
    form: {
        width: '100%',
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

export default function SignUp() {
    const classes = useStyles();

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [type, setType] = useState(2) // student
    const [isActivate, setIsActivate] = useState(false)

    const account = store.getState().account

    const [dialogType, setDialogType] = useState('close')
    const [dialogMessage, setDialogMessage] = useState('')

    function handleDialogClose() {
        setDialogType('close')
    }

    function handleNameChanged(event) {
        setName(event.target.value)
    }

    function handleEmailChanged(event) {
        setEmail(event.target.value)
    }

    function handlePasswordChanged(event) {
        setPassword(event.target.value)
    }

    function handleTypeChanged(event) {
        console.log(typeof event.target.value)
        setType(parseInt(event.target.value))
    }

    function handleSubmitClicked(event) {

        event.preventDefault()
        event.target.disabled = true

        setDialogType('default')

        let newAccount = { name, email, password }
        if (account && account.type == 0) {
            newAccount.type = type
        }
        console.log('signup: new account: ', newAccount)

        // validate
        if (!name || name == '') {
            setDialogMessage("'Name' cannot be empty")
            setDialogType('error')
            return;
        }
        if (!email || !password || email == '' || password == '') {
            setDialogMessage('Email or Password cannot be empty')
            setDialogType('error')
            return;
        }

        let re = new RegExp(myConfig.emailPattern)
        let match = email.match(re)
        console.log('login: match: ', match)
        if (!match) {
            setDialogMessage('Email not valid')
            setDialogType('error')
            return;
        }



        myModel.registerAccount(
            newAccount,
            localStorage.getItem('accessToken'),
            function ok(response) {

                // if register ok, re-render view for input activation code
                setIsActivate(true)

            },
            function fail(error) {
                // alert(error)
                setDialogMessage('Fail to register new account')
                setDialogType('error')

                // enable button for later try
                event.target.disabled = false
            }
        )

    }



    // render
    if (isActivate) {

        return <Redirect to={{
      pathname: "/activate",
      state: { email: email }
    }}
    />
    }

    // regular view
    return (
        <Container component="main" maxWidth="xs">
                    <MyDialog type={dialogType} handleClose={handleDialogClose}
             message={dialogMessage}></MyDialog>

      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Sign Up
          </Typography>
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12}>
              <TextField
                autoComplete="fname"
                name="fullName"
                variant="outlined"
                required
                fullWidth
                id="fullName"
                label="Full Name"
                autoFocus

                value={name}
                onChange={handleNameChanged}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"

                value={email}
                onChange={handleEmailChanged}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"

                value={password}
                onChange={handlePasswordChanged}
              />
            </Grid>

            {
              account && account.type == 0 ?
              (
                   <RadioGroup aria-label="gender" name="gender1" onChange={handleTypeChanged}>
                  <FormControlLabel value="1" control={<Radio />} label="Teacher" />
                  <FormControlLabel value="2" control={<Radio />} label="Student" />
                </RadioGroup>
                )
              : ''

            }


            {/* <Grid item xs={12}>
                <FormControlLabel
                    control={<Checkbox value="allowExtraEmails" color="primary" />}
                    label="I want to receive inspiration, marketing promotions and updates via email."
                />
              </Grid> */}
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={handleSubmitClicked}
          >
            Sign Up
            </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link href="/login" variant="body2">
                Already have an account? Sign in
                </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={5}>
      </Box>
    </Container>
    );
}