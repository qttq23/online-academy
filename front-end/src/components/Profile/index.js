import React, {useState} from 'react';
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
import myModel from '../../helpers/myModel'
import {
  Redirect,
} from 'react-router-dom';
import TextField from '@material-ui/core/TextField';

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

  let account = store.getState().account
  const [name, setName] = useState(account? account.name: '')
  const [email, setEmail] = useState(account? account.email: '')
  const [description, setDescription] = useState(account? account.description: '')

  function handleNameChanged(event){
    setName(event.target.value)
  }
  function handleEmailChanged(event) {
    setEmail(event.target.value)
  }
  function handleDescriptionChanged(event) {
    setDescription(event.target.value)
  }

  function handleUpdateButtonClicked(event){

    console.log('profile: ')
    console.log('profile: name: ', name)
    console.log('profile: email: ', email)
    console.log('profile: description: ', description)



    function updateAccount(){
      
      let accountId = store.getState().account.id
      let updateData = {
        name, email, description
      }
      let accessToken = localStorage.getItem('accessToken')
      let refreshToken = localStorage.getItem('refreshToken')

      myModel.updateAccountInfo(
        accessToken,
        accountId,
        updateData,
        function ok(response) {
          
          alert('update succesfully!')

          // update store
          store.dispatch({
            type: 'set_account',
            payload: {
              data: response.data
            }
          })

          // setName(response.data.name)
          // setEmail(response.data.email)
          // setDescription(response.data.description)
        },
        function fail(error) {
          
          let err = error.response.data.error
          if (err.name == "TokenExpiredError") {

            console.log('refreshing token...')
            myModel.refreshAccessToken(
              {
                accessToken, refreshToken
              },
              function ok(response) {

                // store
                localStorage.setItem('accessToken', response.data.accessToken)

                console.log('re-update')
                updateAccount()
              },
              function fail(error2) {
                alert(error2.message)
              }
            )

          }
        }

      )
    }

    updateAccount()


  }

  function handleChangePasswordClicked(event){

  }

  return (
    <main>
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
    </main>
  );
}