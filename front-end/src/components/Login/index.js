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


const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignIn(props) {
  const classes = useStyles();

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  function handleEmailChanged(event) {

    setEmail(event.target.value)
  }

  function handlePasswordChanged(event) {

    setPassword(event.target.value)
  }

  function handleSubmitClicked(event){
    
    // prevent default submit event
    event.preventDefault()
    // disable button while processing
    event.target.disabled = true

    console.log('signin: handleSubmitclicked: ')
    console.log('signin: email: ', email)
    console.log('signin: password: ', password)
    
    myModel.checkCredential(
      {email, password},
      function ok(response){
        
        console.log('login: ok: ', response.data)

        // persist to local storage in case tab closed
        localStorage.setItem('accessToken', response.data.accessToken)
        localStorage.setItem('refreshToken', response.data.refreshToken)
        localStorage.setItem('accountId', response.data.accountId)

        // get info, store to re-render page
        let accountId = response.data.accountId
        myModel.getAccountInfo(
          accountId,
          function ok(response) {

            // store info
            store.dispatch({
              type: 'set_account',
              payload: {
                data: response.data
              }
            })
          },
          function fail(error) {
            // ??.......
          }
        )


      },
      function fail(error){
        console.log('login: fail: ', error)
        alert(error)
        // handle error??
        // ........................
        event.target.disabled = false
      } 
    )

  }


  // render
  let accessToken = localStorage.getItem('accessToken')
  if(accessToken){

    // already login, redirect
    let redirectUrl = '/home'
    try {
      redirectUrl = props.location.state.returnUrl
    }catch(e){}
    return <Redirect to={redirectUrl} />
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
          </Typography>
        <form className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus

            value={email}
            onChange={handleEmailChanged}
          />
          <TextField
            variant="outlined"
            margin="normal"
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
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}

            onClick={handleSubmitClicked}
          >
            Sign In
            </Button>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
                </Link>
            </Grid>
            <Grid item>
              <Link href="/signup" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={8}>
      </Box>
    </Container>
  );
}