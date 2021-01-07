import React, { useState } from 'react'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'
import Link from '@material-ui/core/Link'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import Container from '@material-ui/core/Container'

import { makeStyles } from '@material-ui/core/styles'
import { useHistory } from 'react-router-dom'
import { setUserSession } from '../../utils/Common'

import axios from 'axios'

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(15),
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
}))

const useFormInput = initialValue => {
  const [value, setValue] = useState(initialValue);

  const handleChange = e => {
    setValue(e.target.value);
  }
  return {
    value,
    onChange: handleChange
  }
}

const SignIn = (props) => {
  const classes = useStyles()
  const history = useHistory()

  const email = useFormInput('')
  const password = useFormInput('')
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)

  const handleSignIn = () => {
    console.log("Handling...")
    setError(null)
    setLoading(true)
    axios.post('http://localhost:9999/api/auth/login', { email: email.value, password: password.value }).then(resp => {
      console.log("Gotcha!")
      setLoading(true)
      setUserSession(resp.data.token, resp.data.user)
      history.push('/home')
    }).catch(err => {
      setLoading(false)
      console.log("Error!")
      // if (err.response.status === 401)
      //   setError(err.response.data.message)
      // else
      setError("Something went wrong. Please try again later.")
    })
  }

  return (
    <Container component="main" maxWidth="sm">
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form}>
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
            {...email}
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
            {...password}
          />
          {error && <><p style={{ color: 'red' }}>{error}</p><br /></>}
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
            disabled={loading}
            onClick={handleSignIn}
          >
            {loading ? 'Loading...' : 'Login'}
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
    </Container>
  )
}

export default SignIn