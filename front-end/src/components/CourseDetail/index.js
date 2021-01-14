import React, { Component, useEffect, useState } from 'react';
import {
  Grid,
  Typography,
  List,
  Button,
  Paper,
  ListItem,
  Avatar,
  LinearProgress,
  RadioGroup,
  FormControlLabel,
  Radio,
  FormControl
} from '@material-ui/core';
import { Rating, Pagination } from '@material-ui/lab';
import Image from 'material-ui-image';

import UpdateIcon from '@material-ui/icons/Update';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import ShareIcon from '@material-ui/icons/Share';
import StarIcon from '@material-ui/icons/Star';
import CommentIcon from '@material-ui/icons/Comment';
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';
import PlayCircleFilledIcon from '@material-ui/icons/PlayCircleFilled';

import VideoTile from './VideoTile';
import CommentTile from './CommentTile';
import CourseCard from "../Home/CourseCard/CoursesCard";

import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import myRequest from "../../helpers/myRequest";
import myConfig from '../../helpers/myConfig';
import myModel from '../../helpers/myModel';
import store from '../../redux/store'
import {
  BrowserRouter,
  Switch,
  Route,
  Link,
  Redirect,
  useRouteMatch,
  useParams
} from 'react-router-dom';
import renderHTML from 'react-render-html';
import firebase from '../../helpers/myFirebase.js'

let videoDescription = '',
  videoFile = {};
let targetChapterId = '';

function CourseDetail(props) {

  let { id } = useParams();
  console.log('coursedetail: ', id)

  var storage = firebase.storage().ref('');
  const [open, setOpen] = useState(false);
  const [newChapterName, setNewChapterName] = useState('')
  const handleAddChapterClicked = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  function handleNewChapterNameChanged(event) {
    setNewChapterName(event.target.value)
  }

  function handleAddChapterConfirmed() {
    // close dialog
    setOpen(false);


    let courseId = store.getState().detailedCourse.id

    let maxOrder = 0
    let oldChapters = store.getState().chapters
    oldChapters.forEach(function (chapter) {
      if (maxOrder < chapter.order) {
        maxOrder = chapter.order
      }
    })
    let newOrder = maxOrder + 1
    let newChapter = {
      courseId,
      order: newOrder,
      name: newChapterName
    }
    console.log(newChapter)

    myModel.createChapter(
      localStorage.getItem('accessToken'),
      newChapter,
      function ok(response) {

        let newChapter = response.data
        newChapter.videos = []
        store.dispatch({
          type: 'set_chapters',
          payload: {
            data: [...oldChapters, newChapter]
          }
        });
      },
      function fail(error) {
        console.log('fail to add chapter')
      }
    )
  }

  const [openVideoDialog, setOpenVideoDialog] = useState(false);

  function handleAddVideoClicked(chapterId, event) {

    targetChapterId = chapterId
    setOpenVideoDialog(true);
  };
  const handleAddVideoCloseClicked = () => {
    setOpenVideoDialog(false);
  };

  function handleVideoDescriptionChanged(event) {
    videoDescription = event.target.value
  }

  function handleVideoFileChanged(event) {
    videoFile = event.target.files[0]
  }

  function handleAddVideoConfirmed() {
    // close dialog
    setOpenVideoDialog(false);

    let targetChapter = chapters[0]
    chapters.forEach(function (chapter) {
      if (chapter.id == targetChapterId) {
        targetChapter = chapter
      }
    })

    let maxOrder = 0
    let oldVideos = targetChapter.videos
    oldVideos.forEach(function (video) {
      if (maxOrder < video.order) {
        maxOrder = video.order
      }
    })
    let newOrder = maxOrder + 1

    let videoName = "" + newOrder + "." + videoFile.name.substring(videoFile.name.lastIndexOf('.') + 1)
    let videoPath = `course/${course.id}/chapter/${targetChapter.order}/${videoName}`

    let newVideo = {
      chapterId: targetChapter.id,
      videoUrl: videoPath,
      description: videoDescription,
      order: newOrder
    }
    console.log(newVideo)

    function createVideo() {
      myModel.createVideo(
        localStorage.getItem('accessToken'),
        newVideo,
        function ok(response) {

          let newVideo = response.data

          // upload to storage
          let accessToken = localStorage.getItem('accessToken')
          myModel.getStorageToken(
            accessToken,
            function ok(response) {

              let token = response.data.readToken
              console.log('storage token: ', token)
              authWithFirebase(token,
                function ok() {

                  console.log('uploading video...: ')
                  uploadVideo(
                    videoPath,
                    videoFile,
                    function ok(downloadUrl) {

                      // add to store, re-render
                      targetChapter.videos = [...targetChapter.videos, newVideo]
                      store.dispatch({
                        type: 'set_chapters',
                        payload: {
                          data: [...chapters]
                        }
                      });

                    },
                    function fail() {
                      console.log('fail to upload video')

                    }
                  )
                },
                function fail(error) {

                  console.log('fail to authen with firebase')
                })
            },
            function fail(error) {
              console.log('fail to get storage token')
            }
          )




        },
        function fail(error) {
          console.log('fail to add video')
        }
      )
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

    function uploadVideo(videoPath, videoFile, okCallback, failCallback) {

      var uploadTask = storage.child(
        videoPath
      ).put(videoFile);

      uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
        function (snapshot) {
          var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log('Upload is ' + progress + '% done');
          switch (snapshot.state) {
            case firebase.storage.TaskState.PAUSED: // or 'paused'
              console.log('Upload is paused');
              break;
            case firebase.storage.TaskState.RUNNING: // or 'running'
              console.log('Upload is running');
              break;
          }
        },
        function (error) {

          window.alert(error)
          switch (error.code) {
            case 'storage/unauthorized':
              // User doesn't have permission to access the object
              break;

            case 'storage/canceled':
              // User canceled the upload
              break;

            case 'storage/unknown':
              // Unknown error occurred, inspect error.serverResponse
              break;
          }
        },
        function () {
          console.log('done uploading')
          // uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
          //     console.log('File available at: ' + downloadURL);
          //     okCallback(downloadURL)
          // });
          okCallback(videoPath)
        });


    }


    createVideo()

  }

  const [openFeedbackDialog, setOpenFeedbackDialog] = useState(false)
  const [feedbackAccName, setFeedbackAccName] = useState('thang2')
  let feedbackComment = ''
  let feedbackRate = 1

  function handleAddFeedbackClicked(event) {
    setOpenFeedbackDialog(true);

    let account = store.getState().account
    setFeedbackAccName(account.name)


  }

  function handleFeedbackCloseClicked(event) {
    setOpenFeedbackDialog(false);
  }

  function handleCommentChanged(event) {
    feedbackComment = event.target.value
  }

  function handleRateChanged(event) {
    feedbackRate = event.target.value
  }

  function handleAddFeedbackConfirmed(event) {

    let feedback = {
      comment: feedbackComment,
      rate: feedbackRate
    }
    console.log('feedback: ', feedback)

    function createFeedback() {
      myRequest({
        method: 'post',
        url: `${myConfig.apiServerAddress}/api/feedbacks`,
        data: {
          accountId: store.getState().account.id,
          courseId: course.id,
          type: 0,
          content: feedbackComment,
          ratePoint: feedbackRate,
        },
        headers: {
          'x-access-token': localStorage.getItem('accessToken')
        }

      },
        function ok(response) {
          let newFeedback = response.data
          newFeedback.account = store.getState().account
          store.dispatch({
            type: 'set_feedbacks',
            payload: {
              data: [...feedbacks, response.data]
            }
          });
          // close dialog
          setOpenFeedbackDialog(false);
        },
        function fail(error) {
          alert('fail to add feedback, re-login and try again')
          // close dialog
          setOpenFeedbackDialog(false);
        }
      )
    }
    createFeedback()
  }

  function handlePageChanged(event, pageNumber) {
    console.log('coursedetail: page: ', pageNumber)

    setNumFeedbackSkip(numFeedback * (pageNumber - 1))
  }

  function handleWishlistClicked(event) {

    // check if already in watchlist
    let accountId = store.getState().account.id
    myRequest({
      method: 'get',
      url: `${myConfig.apiServerAddress}/api/watchLists`,
      params: {
        filter: `{"where": {"and": [{"accountId": "${accountId}"}, {"courseId": "${course.id}"} ]}}`
      }
    },
      function ok(response) {

        let list = response.data
        if (list.length == 0) {

          console.log('adding to wishlist...')
          myRequest({
            method: 'post',
            url: `${myConfig.apiServerAddress}/api/watchLists`,
            data: {
              accountId: accountId,
              courseId: course.id
            },
            headers: {
              'x-access-token': localStorage.getItem('accessToken')
            }
          },
            function ok(response) {

              alert(`${course.name} added to wishlist`)

            },
            function fail(error) {
              console.log('coursedetail: fail get watchlist')
            }
          )
        } else {
          alert('already added to wishlist')
        }

      },
      function fail(error) {
        console.log('coursedetail: fail get watchlist')
      }
    )


  }

  function handleBuyClicked(event) {

    console.log('buying...')

    if (!localStorage.getItem('accessToken')) {
      alert('create an account to buy this course')
      return;
    }

    myRequest({
      method: 'post',
      url: `${myConfig.apiServerAddress}/api/accountCourses`,
      data: {
        accountId: account.id,
        courseId: course.id
      },
      headers: {
        'x-access-token': localStorage.getItem('accessToken')
      }
    },
      function ok(response) {

        alert(`${course.name} was bought successfully!`)

      },
      function fail(error) {
        console.log('coursedetail: fail to buy')
      }
    )


  }


  // get data
  useEffect(() => {

    myRequest({
      method: 'get',
      url: `${myConfig.apiServerAddress}/api/custom/Courses/ById/${id}`,
      params: {}
    },
      function ok(response) {
        store.dispatch({
          type: 'set_detailedCourse',
          payload: {
            data: response.data
          }
        });

      },
    )

    myRequest({
      method: 'get',
      url: `${myConfig.apiServerAddress}/api/feedbacks`,
      params: {
        filter: `{"where": {"courseId": "${id}"}, "include": "account"}`
      }
    },
      function ok(response) {
        store.dispatch({
          type: 'set_feedbacks',
          payload: {
            data: response.data
          }
        });

      },
    )

    myRequest({
      method: 'get',
      url: `${myConfig.apiServerAddress}/api/custom/Courses/${id}/related`,
      params: {
        numLimit: 10
      }
    },
      function ok(response) {
        store.dispatch({
          type: 'set_relatedCourses',
          payload: {
            data: response.data
          }
        });

      },
    )

    myRequest({
      method: 'get',
      url: `${myConfig.apiServerAddress}/api/chapters`,
      params: {
        filter: `{"where": { "courseId": "${id}"}, "include": "videos"}`
      }
    },
      function ok(response) {
        store.dispatch({
          type: 'set_chapters',
          payload: {
            data: response.data
          }
        });

      },
    )

  }, [id])


  // prepare
  const authorize_value = {
    GUEST: 1,
    TEACHER_OF_COURSE: 5,
    STUDENT_OF_COURSE: 10
  }
  const [authorize, setAuthorize] = useState(authorize_value.GUEST)
  const [numFeedbackSkip, setNumFeedbackSkip] = useState(0)
  const numFeedback = 4
  let account = store.getState().account
  let course = store.getState().detailedCourse
  let feedbacks = store.getState().feedbacks
  let relatedCourses = store.getState().relatedCourses
  let chapters = store.getState().chapters



  let ratePoint = 0
  let timesRate = 0
  let price = 0
  let priceAfterSaleOff = 0
  let category = 'loading...'
  let imageUrl = myConfig.defaultImageUrl
  let courseId = ''
  let updatedAt = '0/0/0'
  if (course) {

    category = `${course.category.topic}/${course.category.name}`

    if (course.feedback) {
      ratePoint = course.feedback.avgRatePoint
      timesRate = course.feedback.timesRate

    }


    price = course.price
    priceAfterSaleOff = price * (1 - course.saleOffPercent)
    // if (course.saleOffPercent && course.saleOffPercent != 0) {
    //     priceAfterSaleOff = course.saleOffPercent * price
    // }


    imageUrl = course.imageUrl
    courseId = course.id
    updatedAt = course.updatedAt





    if (account) {
      if (account.id == course.teacherId && authorize != authorize_value.TEACHER_OF_COURSE) {
        setAuthorize(authorize_value.TEACHER_OF_COURSE)
      } else {
        myRequest({
          method: 'get',
          url: `${myConfig.apiServerAddress}/api/accountCourses`,
          params: {
            filter: `{"where": {"and": [{ "courseId": "${course.id}"}, {"accountId": "${account.id}"}]} }`
          }
        },
          function ok(response) {

            let list = response.data
            if (list.length > 0 && authorize != authorize_value.STUDENT_OF_COURSE) {
              setAuthorize(authorize_value.STUDENT_OF_COURSE)
            }

          },
        )
      }

    }
  }




  // render
  return (
    <Grid container>

      <Grid container style={{ backgroundColor: '#1e1e1c' }}>
        <Grid container style={{ marginTop: 40, marginBottom: 40 }}>
          <Grid xs={1} />
          <Grid item xs={7}>
            <List >
              <Typography
                variant="h4"
                style={{
                  fontWeight: 'bold',
                  fontSize: 28,
                  color: 'white'
                }}>
                {/* 2020 Complete Python Bootcamp From Zero to Hero in Python */}
                {course ? course.name : 'loading...'}
              </Typography>

              <Typography
                variant="subtitle1"
                style={{
                  color: 'white',
                  fontSize: 18,
                  marginTop: 10
                }}>
                {/* Learn Python like a Professional Start from the basics and go all the way to creating your own applications and games */}
                {course ? course.shortDescription : 'loading...'}
              </Typography>

              <Grid item style={{
                display: 'flex',
                alignItems: 'center',
                marginTop: 5,
                marginBottom: 5
              }}>
                <Typography variant="subtitle2" style={{ color: 'gold', marginRight: 10 }}>
                  {ratePoint}
                </Typography>
                <Rating value={Math.round(ratePoint)} readOnly size="small" style={{ paddingTop: 2, paddingBottom: 2 }} />
              </Grid>

              <Typography variant="caption" style={{ fontSize: 14, color: 'white' }}>
                Created by {course ? course.teacher.name : 'loading...'}
              </Typography>

              <Grid item style={{
                display: 'flex',
                alignItems: 'center',
                color: 'white',
                marginTop: 5
              }}>
                <UpdateIcon style={{ marginRight: 10 }} />
                <Typography variant="caption" >Last updated {updatedAt}</Typography>
              </Grid>

              <Grid item container style={{ color: 'white', marginTop: 20, display: 'flex' }}>
                {
                  authorize == authorize_value.GUEST ?
                    (
                      <Button variant="outlined" color="inherit" endIcon={<FavoriteBorderIcon />}
                        style={{ marginRight: 10 }}
                        onClick={handleWishlistClicked}
                      >
                        Wishlist
                        </Button>
                    )
                    : ''
                }

                <Button variant="outlined" color="inherit" endIcon={<ShareIcon />}>
                  Share</Button>
              </Grid>

            </List>
          </Grid>
          <Grid xs={3} style={{ marginLeft: 23 }}>
            <Image
              imageStyle={{
                height: 200
              }}
              style={{
                padding: 0
              }}
              animationDuration
              src={imageUrl}
            />
          </Grid>
          <Grid xs={1} />
        </Grid>
      </Grid>
      <Grid container style={{ marginTop: 20 }}>
        <Grid xs={1} />
        <Grid item xs={7} style={{ display: 'flex', flexDirection: 'column' }}>
          <Typography
            variant="h5"
            style={{
              fontWeight: 'bold'
            }}
          >Course content</Typography>

          <Typography variant="caption" style={{ marginTop: 30, marginBottom: 5, color: 'grey' }}>
            23 videos
            </Typography>
          <Paper style={{ color: 'black' }} variant="outlined">
            <List>
              {
                chapters.map(function (chapter) {

                  return (
                    <ListItem>
                      {chapter.name}
                      <List>
                        {
                          chapter.videos.map(function (video) {

                            return (
                              <ListItem>
                                <VideoTile
                                  videoTitle={video.description}
                                  videoTime="new"
                                  videoId={video.id} />
                              </ListItem>
                            )

                          })
                        }
                      </List>

                      {
                        authorize == authorize_value.TEACHER_OF_COURSE ?
                          (
                            <Button variant="outlined" color="inherit"
                              onClick={handleAddVideoClicked.bind(null, chapter.id)}>Add video</Button>
                          )
                          : ''
                      }


                    </ListItem>
                  )
                })
              }
            </List>

            {
              authorize == authorize_value.TEACHER_OF_COURSE ?
                (
                  <Button variant="outlined" color="inherit" onClick={handleAddChapterClicked}>Add chapter</Button>
                )
                : ''
            }
          </Paper>
          {/*------------------Description---------------------*/}
          <Typography
            variant="h5"
            style={{
              fontWeight: 'bold'
            }}
          >Description</Typography>
          <Typography variant="p" style={{ marginTop: 20 }}>
            {course ? renderHTML(course.longDescription) : 'loading...'}
          </Typography>

          {/*------------------Lecturer---------------------*/}
          <Typography
            variant="h5"
            style={{
              fontWeight: 'bold',
              marginTop: 20
            }}
          >Instructor</Typography>

          <Grid container style={{
            marginTop: 15,
            display: 'flex',
            flexDirection: 'column'

          }}>
            <Typography variant="h6" color="primary" style={{ fontWeight: 'bold' }}>
              {course ? course.teacher.name : 'loading...'}
            </Typography>
            {/* <Typography variant="subtitle1" style={{ color: 'grey' }}>Head of Data Science, Pierian Data Inc.</Typography> */}
            <Grid container style={{
              display: 'flex',
              alignItems: 'center',
              flexDirection: 'row'
            }}>
              <Avatar alt="Remy Sharp" src="https://img-b.udemycdn.com/user/75x75/9685726_67e7_4.jpg?secure=QU9dg6WVqEO3vJRsT2JMsA%3D%3D%2C1608943704" style={{ width: 120, height: 120, marginRight: 10 }} />

            </Grid>
            <Typography variant="p" variantMapping="p" style={{ marginTop: 20 }}>
              {course ? course.teacher.description : 'loading...'}
            </Typography>
          </Grid>

          {/*------------------Rating---------------------*/}
          <Typography
            variant="h5"
            style={{
              fontWeight: 'bold',
              marginTop: 20
            }}
          >Ratings</Typography>

          <Grid container style={{ marginTop: 20 }}>
            <Grid xs={2} style={{
              display: 'flex',
              alignItems: 'center',
              flexDirection: 'column'
            }}>
              <Typography variant="h2" style={{ color: 'orange', fontWeight: 'bold' }}>
                {Math.round(ratePoint)}
              </Typography>
              <Rating value={ratePoint} precision={0.1} readOnly />
              <Typography variant="subtitle2" style={{ color: 'orange', fontWeight: 'bold' }}>
                ({timesRate})
                </Typography>
            </Grid>

          </Grid>

          {/*------------------Review---------------------*/}
          <Typography
            variant="h5"
            style={{
              fontWeight: 'bold',
              marginTop: 20
            }}
          >Reviews</Typography>

          {
            authorize == authorize_value.STUDENT_OF_COURSE ?
              (<Button variant="outlined" color="inherit"
                onClick={handleAddFeedbackClicked}>Add feedback</Button>)
              : (<h4>Register course to add feedback</h4>)
          }

          <Grid container style={{ marginTop: 20 }}>
            <List>
              {
                feedbacks.map(function (item, index) {

                  // use for pagination
                  if (index < numFeedbackSkip || index >= numFeedbackSkip + numFeedback) {
                    return ''
                  }

                  return (
                    <ListItem>
                      <CommentTile userName={item.account.name}
                        avatarUrl={item.account.imageUrl}
                        last_updated={item.createdAt}
                        comment={item.content}
                        rating={item.ratePoint}
                      />
                    </ListItem>
                  )
                })
              }

            </List>

            <Grid
              container
              spacing={0}
              direction="column"
              alignItems="center"
              justify="center"
              style={{ minHeight: '5vh' }}
            >
              <Grid item xs={12}>
                <Pagination count={10} shape="rounded" size="large"
                  onChange={handlePageChanged} />
              </Grid>
            </Grid>
          </Grid>
          {/*------------------More Courses---------------------*/}
          <Typography
            variant="h5"
            style={{
              fontWeight: 'bold',
              marginTop: 20
            }}
          >More Courses of Web Development</Typography>

          <Grid container style={{ marginTop: 20, marginBottom: 50, display: 'flex', justifyContent: 'space-between' }}>
            {/* <CourseCard /> */}
            {
              relatedCourses.map(function (item) {

                return (
                  <CourseCard course={item} />
                )
              })
            }
          </Grid>

        </Grid>


        {
          authorize == authorize_value.GUEST ?
            (
              <Grid item xs={3} style={{ marginLeft: 10, position: 'absolute', right: 100, bottom: 80 }}>
                <Paper >
                  <Grid container style={{ padding: 10 }}>
                    <Grid container style={{
                      paddingTop: 20,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'stretch'
                    }}>
                      <Typography variant="h4" style={{ fontWeight: 'bold' }}>
                        ${priceAfterSaleOff}
                      </Typography>

                      {
                        price == priceAfterSaleOff ? '' : (
                          <Typography variant="p"
                            style={{ color: 'grey', marginLeft: 10, textDecoration: 'line-through' }}>
                            ${price}
                          </Typography>
                        )
                      }
                      {
                        price == priceAfterSaleOff ? '' : (

                          <Typography variant="p" style={{ marginLeft: 10 }}>
                            {course ? course.saleOffPercent * 100 : ''}% off
                  </Typography>
                        )
                      }


                    </Grid>

                    <Button variant="contained" fullWidth color="secondary"
                      style={{ marginTop: 20, height: 50, fontWeight: 'bold' }}

                    >
                      Add to cart
                </Button>
                    <Button variant="outlined" fullWidth color="primary"
                      style={{ marginTop: 5, height: 50, fontWeight: 'bold' }}
                      onClick={handleBuyClicked}
                    >
                      Buy now
                </Button>
                  </Grid>
                </Paper>
              </Grid>
            )
            : ''
        }


        <Grid xs={1} />
      </Grid>

      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Add new chapter</DialogTitle>
        <DialogContent>

          <TextField
            autoFocus
            margin="dense"
            id="newChapterName"
            label="Enter chapter's name"
            type="text"
            fullWidth
            value={newChapterName}
            onChange={handleNewChapterNameChanged}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleAddChapterConfirmed} color="primary">
            Add
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={openVideoDialog} onClose={handleAddVideoCloseClicked}
        aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Add new video</DialogTitle>
        <DialogContent>

          <TextField
            autoFocus
            margin="dense"
            id="newVideoDescription"
            label="Enter video's description"
            type="text"
            fullWidth
            onChange={handleVideoDescriptionChanged}
          />
          <TextField
            autoFocus
            margin="dense"
            id="videoFile"
            label="select video file"
            type="file"
            fullWidth
            onChange={handleVideoFileChanged}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleAddVideoCloseClicked} color="primary">
            Cancel
          </Button>
          <Button onClick={handleAddVideoConfirmed} color="primary">
            Add
          </Button>
        </DialogActions>
      </Dialog>


      <Dialog open={openFeedbackDialog} onClose={handleFeedbackCloseClicked}
        aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Add new feedback</DialogTitle>
        <DialogContent>

          <TextField
            autoFocus
            margin="dense"
            id="accountName"
            label="your name"
            type="text"
            fullWidth
            value={feedbackAccName}
            onChange={() => { }}
          />
          <TextField
            autoFocus
            margin="dense"
            id="newComment"
            label="Enter comment"
            type="text"
            fullWidth
            onChange={handleCommentChanged}
          />


          <RadioGroup aria-label="gender" name="gender1" onChange={handleRateChanged}>
            <FormControlLabel value="1" control={<Radio />} label="1" />
            <FormControlLabel value="2" control={<Radio />} label="2" />
            <FormControlLabel value="3" control={<Radio />} label="3" />
            <FormControlLabel value="4" control={<Radio />} label="4" />
            <FormControlLabel value="5" control={<Radio />} label="5" />
          </RadioGroup>


        </DialogContent>
        <DialogActions>
          <Button onClick={handleFeedbackCloseClicked} color="primary">
            Cancel
          </Button>
          <Button onClick={handleAddFeedbackConfirmed} color="primary">
            Add
          </Button>
        </DialogActions>
      </Dialog>


    </Grid >
  );
}

export default CourseDetail