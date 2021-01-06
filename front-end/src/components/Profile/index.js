import React from 'react';
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

  return (
    <main>
      <Container maxWidth="sm" className={classes.heroContent}>
        <Typography className={classes.title} align="start" color="textPrimary">
          Profile
        </Typography>
        <Grid container direction="row">
          <Grid item container direction="column" alignItems="center" justify="center" xs={6}>
            <Grid item>
              <Avatar src="https://i.pinimg.com/originals/6c/ce/de/6ccede86e8a11d520f5e7a3386d46ff0.jpg" className={classes.avatar} />
            </Grid>
          </Grid>
          <Grid item container direction="column" xs={6}>
            <List className={classes.list}>
              <Divider />
              <ListItem>
                <ListItemText primary="Full name" secondary="Christian Dior" />
              </ListItem>
              <Divider />
              <ListItem>
                <ListItemText primary="Email" secondary="1234567@student.hcmus.edu.vn" />
              </ListItem>
              <Divider />
              <ListItem>
                <ListItemText primary="Member since" secondary="Nov 6, 2020" />
              </ListItem>
              <Divider />
            </List>
          </Grid>
        </Grid>
        <Grid item container direction="column" alignItems="center" justify="center" xs={12}>
          <Button variant="outlined" align="center" className={classes.button}>
            Update your profile
          </Button>
        </Grid>
      </Container>
    </main>
  );
}