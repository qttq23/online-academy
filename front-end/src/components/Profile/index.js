import React, { useState, useEffect } from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles, fade } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import Link from '@material-ui/core/Link';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Button from '@material-ui/core/Button';

import store from '../../redux/store'
import myRequest from "../../helpers/myRequest";
import myModel from '../../helpers/myModel'
import myConfig from '../../helpers/myConfig'
import {
    Redirect,
    useRouteMatch
} from 'react-router-dom';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import MyDialog from '../MyDialog/index.js'

const useStyles = makeStyles((theme) => ({
    heroContent: {
        backgroundColor: "white",
        padding: theme.spacing(4, 4),
        marginTop: 40,
        marginBottom: 30,
        height: '50vh'
    },
    title: {
        fontFamily: "Arial",
        fontSize: 22,
        fontWeight: 550,
        marginBottom: 10
    },
    avatar: {
        marginTop: 10,
        width: theme.spacing(20),
        height: theme.spacing(20),
    },
    showMore: {
        textDecoration: 'none',
        color: '#005580',
        '&:hover': {
            color: fade(theme.palette.info.light, 1),
        }
    },
    button: {
        marginTop: 30,
        borderColor: "#005580",
        color: '#005580'
    },
    list: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
    },
}));

export default function Profile() {
    const classes = useStyles();

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [description, setDescription] = useState('')
    const [isRedirect, setIsRedirect] = useState(false)
    let { path, url } = useRouteMatch();

    // password dialog
    const [open, setOpen] = useState(false);
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');

    function handlePasswordDialogClose() {
        setOpen(false)
    }

    function handlePasswordDialogConfirm() {

        let item = {
            oldPassword,
            newPassword
        }
        console.log(item)

                // validate
        if (!oldPassword || oldPassword == '') {
            setDialogMessage("old password cannot be empty")
            setDialogType('error')
            return;
        }
        if (!newPassword || newPassword == '') {
            setDialogMessage("new password cannot be empty")
            setDialogType('error')
            return;
        }


        myRequest({
                method: 'post',
                url: `${myConfig.apiServerAddress}/api/accounts/${account.id}/newPassword`,
                data: item,
                headers: {
                    'x-access-token': localStorage.getItem('accessToken')
                }
            },
            function ok(response) {
                console.log('profile: change password ok: ')
                setDialogMessage('Change password succesfully!')
                setDialogType('success')

                handleReLogin()

            },
            function fail(error) {
                console.log('profile: change password failed: ', error.response.data.error)

                setDialogMessage(error.response.data.error)
                setDialogType('error')


                // console.log(error.message)
            }
        )

    }

    function handleOldPasswordChanged(event) {
        setOldPassword(event.target.value)
    }

    function handleNewPasswordChanged(event) {
        setNewPassword(event.target.value)
    }


    const [dialogType, setDialogType] = useState('close')
    const [dialogMessage, setDialogMessage] = useState('')
    function handleMyDialogClose() {
        setDialogType('close')
    }

    function handleNameChanged(event) {
        setName(event.target.value)
    }

    function handleEmailChanged(event) {
        setEmail(event.target.value)
    }

    function handleDescriptionChanged(event) {
        setDescription(event.target.value)
    }

    function handleChangePasswordClicked(event) {
        setOpen(true)
    }

    function handleUpdateButtonClicked(event) {

        console.log('profile: ')
        console.log('profile: name: ', name)
        console.log('profile: email: ', email)
        console.log('profile: description: ', description)

        // validate
        if (!name || name == '') {
            setDialogMessage("'Name' cannot be empty")
            setDialogType('error')
            return;
        }
        if (!email  || email == '') {
            setDialogMessage('Email cannot be empty')
            setDialogType('error')
            return;
        }

        let re = new RegExp(myConfig.emailPattern)
        let match = email.match(re)
        if (!match) {
            setDialogMessage('Email not valid')
            setDialogType('error')
            return;
        }

        function updateAccount() {

            let accountId = store.getState().account.id
            let updateData = {
                name,
                email,
                description
            }
            let accessToken = localStorage.getItem('accessToken')
            let refreshToken = localStorage.getItem('refreshToken')

            myModel.updateAccountInfo(
                accessToken,
                accountId,
                updateData,
                function ok(response) {


                    // update store
                    store.dispatch({
                        type: 'set_account',
                        payload: {
                            data: response.data
                        }
                    })

                    // alert('update succesfully!')
                    setDialogMessage('update succesfully!')
                    setDialogType('success')

                },
                function fail(error) {

                    let err = error.response.data.error
                    if (err.name == myConfig.error.name.JWT_EXPIRED) {

                        console.log('refreshing token...')
                        myModel.refreshAccessToken({
                                accessToken,
                                refreshToken
                            },
                            function ok(response) {

                                // store
                                localStorage.setItem('accessToken', response.data.accessToken)

                                console.log('re-update')
                                updateAccount()
                            },
                            function fail(error2) {
                                if (error2.response.status == myConfig.error.status.REFRESH_TOKEN_EXPIRED) {

                                    handleReLogin()

                                }
                            }
                        )

                    } else if (err.name == myConfig.error.name.JWT_ERROR) {
                        handleReLogin()
                    }

                }

            )
        }



        updateAccount()


    }

    function handleReLogin() {
        alert('Please login again')
        setIsRedirect(true)
    }

    // state updated when account available
    let account = store.getState().account
    useEffect(function() {
        setName(account ? account.name : '')
        setEmail(account ? account.email : '')
        setDescription(account ? account.description : '')
    }, [account])


    // redirect to login
    if (isRedirect || !localStorage.getItem('accessToken')) {

        localStorage.removeItem('accessToken')
        localStorage.removeItem('refreshToken')
        store.dispatch({
            type: 'set_account',
            payload: {
                data: null
            }
        })


        return <Redirect to={{
      pathname: "/login",
      state: { returnUrl: url }
    }} />
    }


    return (
        <main>
        <MyDialog type={dialogType} handleClose={handleMyDialogClose}
    message={dialogMessage}></MyDialog>


      <Container maxWidth="sm" className={classes.heroContent}>
        <Typography className={classes.title} align="start" color="textPrimary">
          Profile
        </Typography>
        <Grid container direction="row">
          <Grid item container direction="column" alignItems="center" justify="center" xs={6}>
            <Grid item>
              <Avatar src={account? account.imageUrl: ''} className={classes.avatar} />
            </Grid>
          </Grid>
          <Grid item container direction="column" xs={6}>
            <List className={classes.list}>
              {/* <Divider /> */}
              <ListItem>
                {/* <ListItemText primary="Full name" secondary={name} /> */}
                <TextField id="inputName" label="Full name" 
                value={name} onChange={handleNameChanged}/>
              </ListItem>
              {/* <Divider /> */}
              <ListItem>
                <TextField id="inputEmail" label="Email" 
                  value={email} onChange={handleEmailChanged}/>
                {/* <ListItemText primary="Email" secondary={email} /> */}
              </ListItem>
              {/* <Divider /> */}
              <ListItem>
                <TextField id="inputDescription" label="Desription" 
                  value={description} onChange={handleDescriptionChanged}/>
                {/* <ListItemText primary="Description" secondary={description} /> */}
              </ListItem>
              {/* <Divider /> */}
            </List>
          </Grid>
        </Grid>
        <Grid item container direction="column" alignItems="center" justify="center" xs={12}>
          <Button variant="outlined" align="center" className={classes.button}
          onClick={handleUpdateButtonClicked}>
            Update your profile
          </Button>
          <Button variant="outlined" align="center" className={classes.button}
          onClick={handleChangePasswordClicked}>
            Change password
          </Button>
        </Grid>
      </Container>

       <Dialog open={open} onClose={handlePasswordDialogClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Change password</DialogTitle>
        <DialogContent>

          <TextField
            autoFocus
            margin="dense"
            id="oldpass"
            label="Old password"
            type="password"
            fullWidth
            value={oldPassword}
            onChange={handleOldPasswordChanged}
          />
          <TextField
            autoFocus
            margin="dense"
            id="newpass"
            label="New password"
            type="password"
            fullWidth
            value={newPassword}
            onChange={handleNewPasswordChanged}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handlePasswordDialogClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handlePasswordDialogConfirm} color="primary">
            Add
          </Button>
        </DialogActions>
      </Dialog>


    </main>
    );
}