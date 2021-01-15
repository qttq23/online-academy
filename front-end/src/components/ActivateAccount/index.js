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
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

export default function ActivateAccount(props) {
    const classes = useStyles();

    console.log('activate: ', props)
    let defaultEmail = ''
    try{
        defaultEmail = props.location.state.email
    }
    catch(e){}

    const [email, setEmail] = useState(defaultEmail)
    const [activateCode, setActivateCode] = useState('')
    const [isRedirectLogin, setIsRedirectLogin] = useState(false)

    function handleEmailChanged(event) {
        setEmail(event.target.value)
    }
    function handleActivateCodeChanged(event) {
        setActivateCode(event.target.value)
    }

    function handleActivateClicked(event) {
        event.preventDefault()
        event.target.disabled = true

        myModel.activateAccount(
            {
                email: email,
                activeCode: activateCode
            },
            function ok(response) {
                alert('account is activated')
                setIsRedirectLogin(true)
            },
            function fail(error) {
                alert('fail to activate account')
            }
        )
    }


    // render
    if (isRedirectLogin) {

        return <Redirect to='/login' />
    }


    // render the form to receive activation code
    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Activate Account
          </Typography>
                <form className={classes.form} noValidate>
                    <Grid container spacing={2}>


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
                            />
                        </Grid>

                        <Grid item xs={12} sm={12}>
                            <TextField
                                name="activateCode"
                                variant="outlined"
                                required
                                fullWidth
                                id="activateCode"
                                label="Activation Code"
                                autoFocus

                                value={activateCode}
                                onChange={handleActivateCodeChanged}
                            />
                        </Grid>

                    </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        onClick={handleActivateClicked}
                    >
                        Activate
            </Button>

                </form>
            </div>
            <Box mt={5}>
            </Box>
        </Container>
    )


}