import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import ReactPlayer from 'react-player/lazy';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import YouTubeIcon from '@material-ui/icons/YouTube';

const useStyles = makeStyles((theme) => ({
  heroContent: {
    backgroundColor: "white",
    padding: theme.spacing(4, 4),
    marginTop: 5,
    marginBottom: 30
  },
  home: {
    fontFamily: "Arial",
    fontSize: 22,
    fontWeight: 550,
    marginTop: 40,
  },
  title: {
    fontFamily: "Arial",
    fontSize: 20,
    fontWeight: 500,
    marginBottom: 20,
    marginTop: 2,
  },
  video: {
    display: 'flex',
    justifyContent: 'center',
    height: '65vh'
  },
  prevButton: {
    borderColor: "#304550",
    color: '#304550',
    "&:hover": {
      backgroundColor: '#304550',
      color: 'white'
    },
  },
  nextButton: {
    width: '250px',
    borderColor: "#005580",
    color: '#005580',
    "&:hover": {
      backgroundColor: '#005580',
      color: 'white'
    },
  }
}));

export default function VideoPlayer() {
  const classes = useStyles();

  return (
    <main>
      <Container maxWidth="lg">
        <Typography className={classes.home} align="start">
          <Link href="#" onClick={(event) => event.preventDefault()} style={{ textDecoration: "none", color: "black" }}>
            2020 Complete Python Bootcamp From Zero to Hero in Python
          </Link>
        </Typography>
      </Container>
      <Container maxWidth="lg" className={classes.heroContent}>
        <Grid container spacing={1} xs={12}>
          <Grid item style={{ marginLeft: 28 }}>
            <YouTubeIcon fontSize="large" />
          </Grid>
          <Grid item xs={10}>
            <Typography className={classes.title} align="start" color="textPrimary">
              Course Introduction
            </Typography>
          </Grid>
        </Grid>
        <div className={classes.video}>
          <ReactPlayer
            width='95%'
            height='95%'
            controls
            url='https://www.youtube.com/watch?v=ysz5S6PUM-U'
            onReady={() => console.log('onReady callback')}
            onStart={() => console.log('onStart callback')}
            onPause={() => console.log('onPause callback')}
            onEnded={() => console.log('onEnded callback')}
            onError={() => console.log('onError callback')}
          />
        </div>
        <Grid container spacing={2} justify="center">
          <Grid item>
            <Button variant="outlined" className={classes.prevButton} startIcon={<ArrowBackIosIcon />}>
              Previous
              </Button>
          </Grid>
          <Grid item>
            <Button variant="outlined" className={classes.nextButton} endIcon={<ArrowForwardIosIcon />}>
              Next
              </Button>
          </Grid>
        </Grid>
      </Container>
    </main>
  );
};