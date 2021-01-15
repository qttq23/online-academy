import React, { useEffect, useState } from 'react';
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


import myRequest from "../../helpers/myRequest";
import myConfig from '../../helpers/myConfig';
import myModel from '../../helpers/myModel';
import store from '../../redux/store'
import {
    useParams,
    Redirect,
    useRouteMatch
} from "react-router-dom";
import firebase from '../../helpers/myFirebase.js'
import MyDialog from '../MyDialog/index.js'


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

export default function VideoPlayer(props) {
    const classes = useStyles();

    let { videoId } = useParams();
    var storage = firebase.storage().ref('');

    const [dialogType, setDialogType] = useState('close')
    const [dialogMessage, setDialogMessage] = useState('')
    function handleMyDialogClose() {
        setDialogType('close')
    }

    console.log('videoplayer: create')

    useEffect(function() {

        setVideoUrl('')

        myRequest({
                method: 'get',
                url: `${myConfig.apiServerAddress}/api/videos/${videoId}`,
                params: {
                    filter: '{"include": {"relation":  "chapter", "scope": {"include": {"relation": "course"}  }  }}'
                }
            },
            function ok(response) {
                store.dispatch({
                    type: 'set_video',
                    payload: {
                        data: response.data
                    }
                });

            },
        )
    }, [videoId])


    const [videoUrl, setVideoUrl] = useState('')
    let courseName = ''
    let chapterName = ''
    let videoDescription = ''
    let courseLink = ''
    let video = store.getState().video
    if (video) {
        courseName = video.chapter.course.name
        chapterName = video.chapter.name
        videoDescription = video.description
        courseLink = '/courses/' + video.chapter.course.id

        if (videoUrl == '') {


            let accessToken = localStorage.getItem('accessToken')
            myModel.getStorageToken(
                accessToken,
                function ok(response) {

                    let token = response.data.readToken
                    console.log('storage token: ', token)
                    authWithFirebase(token,
                        function ok() {

                            console.log('getting url for: ', video.videoUrl)
                            storage.child(video.videoUrl).getDownloadURL().then(function(url) {

                                console.log(url)
                                setVideoUrl(url)

                                setDialogType('close')
                            }).catch(function(error) {
                                console.log(error)

                                setVideoUrl('')
                                setDialogMessage('You have to enroll to this course to watch its videos')
                                setDialogType('error')
                            });
                        },
                        function fail(error) {

                            console.log('fail to authen with firebase')
                        })
                },
                function fail(error) {
                    console.log('fail to get storage token')
                }
            )

        }
    }

    function authWithFirebase(token, okCallback, failCallback) {
        firebase.auth().signInWithCustomToken(token)
            .then((user) => {
                okCallback()
            })
            .catch((error) => {
                console.log(error)
                failCallback(error)
            })
    }

    return (
        <main>

                <MyDialog type={dialogType} handleClose={handleMyDialogClose}
    message={dialogMessage}></MyDialog>


      <Container maxWidth="lg">
        <Typography className={classes.home} align="start">
          <Link href={courseLink} style={{ textDecoration: "none", color: "black" }}>
            {courseName}
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
              {chapterName}/{videoDescription}
            </Typography>
          </Grid>
        </Grid>
        <div className={classes.video}>

            {
                videoUrl != ''?
                (
                    <ReactPlayer
                    width='95%'
                    height='95%'
                    controls
                    // url='https://www.youtube.com/watch?v=ysz5S6PUM-U'
                    // url='https://firebasestorage.googleapis.com/v0/b/online-academy-7bd60.appspot.com/o/course%2F5fd4ec944ec3a2471437e2c2%2Fchapter%2F5fd6528de655e020bc479f46%2Ftimlaibautroi.mp4?alt=media&token=3fc628e8-a939-4a21-944b-503e0de586e3'
                    url={videoUrl}
                    onReady={() => console.log('onReady callback')}
                    onStart={() => console.log('onStart callback')}
                    onPause={() => console.log('onPause callback')}
                    onEnded={() => console.log('onEnded callback')}
                    onError={() => console.log('onError callback')}
                  />
                ): ''
            }

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