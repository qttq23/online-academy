import React, { useEffect, useState } from "react"
import { useParams } from "react-router"
import renderHTML from 'react-render-html'

import {
  List,
  ListItem,
  ListSubheader,
  ListItemText,
  Collapse,
  TextField,
  Button,
  Card,
  Divider,
  Grid,
  Typography,
  Paper,
  Avatar,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions
} from "@material-ui/core"
import { Rating } from "@material-ui/lab"

import { ExpandLess, ExpandMore, Update, Add, Queue, FavoriteBorder } from "@material-ui/icons"

import ListItemLink from "./ListItemLink/ListItemLink"
import CourseCard from "../Home/CourseCard/CoursesCard"

import firebase from "../../helpers/myFirebase"
import myRequest from "../../helpers/myRequest"
import myConfig from "../../helpers/myConfig"
import myModel from "../../helpers/myModel"
import store from "../../redux/store"

const CourseDetail = (props) => {

  let { id } = useParams()
  let storage = firebase.storage().ref("")

  const [chapterDialog, setOpenChapterDialog] = useState(false)
  const handleChapterClick = () => {
    setOpenChapterDialog(!chapterDialog)
  }
  const [chapterName, setChapterName] = useState("")
  const handleNewChapterNameChange = (event) => {
    setChapterName(event.target.value)
  }
  const handleAddChapterConfirmed = () => {
    setOpenChapterDialog(false)
    console.log("handleAddChapterConfirmed checked")

    let courseId = store.getState().detailedCourse.id
    let oldChapters = store.getState().chapters
    let newOrder = store.getState().chapters.length

    const newChapter = {
      courseId,
      order: newOrder,
      name: chapterName
    }
    console.log(newChapter)

    myModel.createChapter(
      localStorage.getItem("accessTOken"),
      newChapter,
      function Ok(res) {
        let newChapter = res.data
        newChapter.videos = []
        store.dispatch({
          type: "set_chapters",
          payload: {
            data: [...oldChapters, newChapter]
          }
        })
      },
      function Fail(err) {
        console.log(err)
      }
    )
  }

  const [videoDialog, setOpenVideoDialog] = useState({
    state: false,
    targetId: ""
  })
  const handleVideoClick = (chapterId) => {
    setOpenVideoDialog({
      state: !videoDialog.state,
      targetId: chapterId || ""
    })
  }
  const [videoDescription, setVideoDescription] = useState("")
  const handleVideoDescriptionChange = (event) => {
    setVideoDescription(event.target.value)
  }
  const [videoFile, setVideoFile] = useState(null)
  const handleVideoFileChange = (event) => {
    setVideoFile(event.target.files[0])
  }
  const handleAddVideoConfirmed = () => {
    setOpenVideoDialog({ ...videoDialog, state: false })

    let targetChapter = chapters.some((chapter) => chapter.id === videoDialog.targetId)[0]
    let oldVideos = targetChapter.videos
    let newOrder = targetChapter.videos.length

    let videoName = newOrder + "." + videoFile.name.substring(videoFile.name.lastIndexOf(".") + 1)
    let videoPath = `course/${course.id}/chapter/${targetChapter.order}/${videoName}`

    const newVideo = {
      chapterId: targetChapter.id,
      videoUrl: videoPath,
      description: videoDescription,
      order: newOrder
    }
    console.log(newVideo)

    const createVideo = () => {
      myModel.createVideo(
        localStorage.getItem("accessTOken"),
        newVideo,
        function Ok(res) {
          let newVideo = res.data
          let accessTOken = localStorage.getItem("accessTOken")
          myModel.getStorageTOken(
            accessTOken,
            function Ok(res) {
              let tOken = res.data.readTOken
              console.log("storage tOken: ", tOken)
              authWithFirebase(
                tOken,
                function Ok() {
                  console.log("uploading video..")
                  uploadVideo(
                    videoPath,
                    videoFile,
                    function Ok(downloadUrl) {
                      targetChapter.videos = [...targetChapter.videos, newVideo]
                      store.dispatch({
                        type: "set_chapters",
                        payload: {
                          data: [...chapters]
                        }
                      })
                    },
                    function Fail(err) {
                      console.log("failed to upload video")
                      console.log(err)
                    }
                  )
                },
                function Fail(err) {
                  console.log("failed to auth with firebase")
                  console.log(err)
                }
              )
            },
            function Fail(err) {
              console.log("failed to get storage tOken")
              console.log(err)
            }
          )
        },
        function Fail(err) {
          console.log("failed to add video")
          console.log(err)
        }
      )
    }
    const authWithFirebase = (tOken, OkCallback, failCallback) => {
      firebase.auth().signInWithCustomTOken(tOken)
        .then((user) => {
          OkCallback()
        })
        .catch((err) => {
          failCallback(err)
        })
    }

    const uploadVideo = (videoPath, videoFile, OkCallback, failCallback) => {
      let uploadTask = storage.child(
        videoPath
      ).put(videoFile)

      uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
        function (snapshot) {
          let progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          switch (snapshot.state) {
            case firebase.storage.TaskState.PAUSED:
              console.log("upload is paused")
              break
            case firebase.storage.TaskState.RUNNING:
              console.log("upload is running")
              break
            default:
              console.log("upload is in unknown state")
              break;
          }
        },
        function (err) {
          window.alert(err)
          switch (err.code) {
            case "storage/unauthorized":
              console.log("user doesn't have permission to access this")
              break;
            case "storage/canceled":
              console.log("user canceled the upload progress")
              break;
            default:
              console.log("unknow error")
              break;
          }
        },
        function () {
          console.log("upload done")
          OkCallback(videoPath)
        }
      )
    }
    createVideo()
  }

  useEffect(() => {
    myRequest({
      method: "get",
      url: `${myConfig.apiServerAddress}/api/custom/Courses/ById/${id}`,
      params: {}
    },
      function Ok(res) {
        store.dispatch({
          type: "set_detailedCourse",
          payload: {
            data: res.data
          }
        })
      },
    )

    myRequest({
      method: "get",
      url: `${myConfig.apiServerAddress}/api/feedbacks`,
      params: {
        filter: `{"where": {"courseId": "${id}"}, "include": "account"}`
      }
    },
      function Ok(res) {
        store.dispatch({
          type: "set_feedbacks",
          payload: {
            data: res.data
          }
        })
      }
    )

    myRequest({
      method: "get",
      url: `${myConfig.apiServerAddress}/api/custom/Courses/${id}/related`,
      params: {
        numLimit: 10
      }
    },
      function Ok(res) {
        store.dispatch({
          type: "set_relatedCourses",
          payload: {
            data: res.data
          }
        })
      }
    )

    myRequest({
      method: "get",
      url: `${myConfig.apiServerAddress}/api/chapters`,
      params: {
        filter: `{"where": {"courseId": "${id}"}, "include": "videos"}`
      }
    },
      function Ok(res) {
        store.dispatch({
          type: "set_chapters",
          payload: {
            data: res.data
          }
        })
      }
    )
  }, [id])

  let course = store.getState().detailedCourse
  let feedbacks = store.getState().feedbacks
  let relatedCourses = store.getState().relatedCourses
  let chapters = store.getState().chapters
  let numOfChapters = 0
  let numOfVideos = 0

  let ratePoint = 0
  let timesRate = 0
  let price = 0
  let priceAfterSaleOff = 0
  let category = "Loading..."
  let imageUrl = myConfig.defaultImageUrl
  let courseId = ""
  let updatedTime = "0/0/0"
  if (course) {
    category = `${course.category.topic} - ${course.category.name}`
    if (course.feedback) {
      ratePoint = course.feedback.avgRatePoint
      timesRate = course.feedback.timesRate
    }

    numOfChapters = chapters.length
    chapters.map((chapter) => {
      numOfVideos += chapter.videos.length
    })

    price = course.price
    priceAfterSaleOff = price
    if (course.saleOffPercent && course.saleOffPercent !== 0) {
      priceAfterSaleOff = course.saleOffPercent * price
    }

    imageUrl = course.imageUrl
    courseId = course.id
    updatedTime = course.updatedAt
  }

  const [isOpened, setOpen] = useState(() => {
    let state = {}
    chapters.map((item) => {
      state[item.name] = false
    })
    return state
  })

  const handleClick = (name) => {
    setOpen({ ...isOpened, [name]: !isOpened[name] })
  }

  return (
    <Grid container>
      <Grid
        container
        style={{
          backgroundColor: "#1e1e1c",
          padding: "50px 10px",
        }}
      >
        <Grid xs={0} md={1} lg={2} xl={3} />
        <Grid xs={8} md={6} lg={5} xl={4}>
          <List style={{

          }}>
            <Typography
              variant="h4"
              style={{
                fontWeight: "bold",
                margin: "5px 0",
                color: "#ffffff"
              }}
            >
              {course ? course.name : "Loading..."}
            </Typography>
            <Typography
              variant="subtitle1"
              style={{
                fontSize: 20,
                margin: "5px 0",
                color: "#ffffff"
              }}
            >
              {course ? course.shortDescription : "Loading..."}
            </Typography>
            <Grid
              item
              style={{
                display: "flex",
                margin: "5px 0",
                alignItems: "center",
                color: "#e91e63"
              }}
            >
              <Typography
                variant="subtitle2"
                style={{
                  fontSize: 18
                }}
              >
                {ratePoint}
              </Typography>
              <Rating
                value={ratePoint}
                readOnly
                size="medium"
                style={{
                  padding: "2px 5px",
                  color: "#e91e63"
                }}
              />
              <Typography variant="subtitle2" style={{
                fontSize: 18
              }}>
                ({timesRate})
              </Typography>
            </Grid>
            <Typography
              variant="caption"
              style={{
                fontSize: 18,
                margin: "5px 0",
                color: "#ffffff"
              }}
            >
              Created by {course ? course.teacher.name : "Loading..."}
            </Typography>
            <Grid
              item
              style={{
                display: "flex",
                color: "#ffffff",
                margin: "5px 0",
                alignItems: "center",
              }}
            >
              <Update style={{
                marginRight: 10
              }} />
              <Typography
                variant="caption"
                style={{
                  fontSize: 12,
                  whiteSpace: "nowrap"
                }}
              >
                Last updated: {updatedTime}
              </Typography>
            </Grid>
          </List>
        </Grid>
        <Grid xs={4} md={5} lg={5} xl={5} />
      </Grid>
      <Grid container
        style={{
          padding: "0 10px",
        }}
      >
        <Grid xs={0} md={1} lg={2} xl={3} />
        <Grid xs={8} md={6} lg={5} xl={4}
          item
          style={{
            display: "flex",
            margin: "5px 0",
            flexDirection: "column"
          }}
        >
          <Typography
            variant="h5"
            style={{
              marginTop: "15px",
              marginBottom: "5px",
              fontWeight: "bold"
            }}
          >
            Course content
          </Typography>
          <Paper
            style={{
              margin: "5px 0",
              color: "#ffffff"
            }}
          >
            <List
              subheader={
                <ListSubheader compoenent="p" style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}>
                  <Typography
                    variant="caption"
                    style={{
                      color: "grey",
                      fontSize: 14
                    }}
                  >
                    {numOfChapters} chapters • {numOfVideos} videos
                  </Typography>
                  <Button variant="outlined" style={{
                    margin: "5px 0"
                  }}
                    onClick={handleChapterClick}
                  ><Add /></Button>
                </ListSubheader>
              }
            >
              {chapters.map((chapter, index) => {
                return (
                  <>
                    <ListItem
                      button
                      style={{
                        color: "#333333",
                        backgroundColor: "#eeeeee"
                      }}
                    >
                      {isOpened[chapter.name] ? <ExpandLess /> : <ExpandMore />}
                      <ListItemText primary={chapter.name} style={{ color: "#333333" }} onClick={() => handleClick(chapter.name)} />
                      <Button variant="outlined" onClick={handleVideoClick}><Add /></Button>
                    </ListItem>
                    <Collapse
                      in={isOpened[chapter.name]}
                      timeout="auto"
                      unmountOnExit
                    >
                      <List
                        disablePadding
                      >
                        {chapter.videos.map((video, index) => {
                          return (
                            <>
                              <ListItemLink href={`/videos/${video.id}`}>
                                <ListItemText
                                  primary={video.description}
                                  style={{ color: "#333333" }}
                                />
                              </ListItemLink>
                              {index !== chapter.videos.length ? <Divider /> : null}
                            </>
                          )
                        })}
                      </List>
                    </Collapse>
                    {index !== chapters.length ? <Divider /> : null}
                  </>
                )
              })}
            </List>
          </Paper>
          <Typography
            variant="h5"
            style={{
              marginTop: "15px",
              marginBottom: "5px",
              fontWeight: "bold"
            }}
          >
            Description
          </Typography>
          <Typography
            variant="p"
            style={{ margin: "5px 0" }}
          >
            {course ? renderHTML(course.longDescription) : "Loading..."}
          </Typography>
          <Typography
            variant="h5"
            style={{
              marginTop: "15px",
              marginBottom: "5px",
              fontWeight: "bold"
            }}
          >
            Instructor
          </Typography>
          <Grid
            container
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center"
            }}
          >
            <Avatar
              alt={course ? course.teacher.name : "no-information"}
              src="https://img-b.udemycdn.com/user/75x75/9685726_67e7_4.jpg?secure=QU9dg6WVqEO3vJRsT2JMsA%3D%3D%2C1608943704"
              style={{
                width: 150,
                height: 150
              }}
            />
            <Grid
              item
              style={{
                display: "flex",
                margin: "0 15px",
                flexDirection: "column"
              }}
            >
              <Typography
                variant="h4"
              >
                {course ? course.teacher.name : "Loading..."}
              </Typography>
              <Typography
                variant="caption"
              >
                {course ? course.teacher.description : "Loading..."}
              </Typography>
              <Grid
                item
                style={{
                  display: "flex",
                  margin: "5px 0",
                  alignItems: "center",
                  color: "#e91e63"
                }}
              >
                <Typography
                  variant="subtitle2"
                  style={{
                    fontSize: 14
                  }}
                >
                  {ratePoint}
                </Typography>
                <Rating
                  value={ratePoint}
                  readOnly
                  size="small"
                  style={{
                    padding: "2px 5px",
                    color: "#e91e63"
                  }}
                />
                <Typography variant="subtitle2" style={{
                  fontSize: 18
                }}>
                  ({timesRate})
              </Typography>
              </Grid>
            </Grid>
          </Grid>
          <Typography
            variant="h5"
            style={{
              fontWeight: "bold",
              marginTop: "20px"
            }}
          >
            Feedbacks
          </Typography>
          <Grid item>
            <List>
              {feedbacks.map((item, index) => {
                return (
                  <>
                    <ListItem>
                      <Grid container style={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center"
                      }}>
                        <Grid xs={2}>
                          <Avatar alt={item.account.name} src={item.account.imageUrl} />
                        </Grid>
                        <Grid item xs={10} style={{
                          display: "flex",
                          margin: "0 15px",
                          flexDirection: "column"
                        }}>
                          <Grid style={{
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "center"
                          }}>
                            <Typography variant="subtitle1" style={{ fontWeight: "bold" }}>{item.account.name}</Typography>
                            <Rating value={item.ratePoint} readOnly size="small" style={{
                              color: "#e91e63"
                            }} />
                          </Grid>
                          <Typography variant="p">{item.content}</Typography>
                          <Typography variant="caption" style={{ fontSize: 13 }}>{item.createAt}</Typography>
                        </Grid>
                      </Grid>
                    </ListItem>
                    {index !== feedbacks.lenght ? <Divider /> : null}
                  </>
                )
              })}
            </List>
          </Grid>
        </Grid>
        <Grid xs={4} md={4} lg={3} xl={3}
          container
          style={{
          }}
        >
          <Card
            style={{
              position: "sticky",
              top: 10,
              height: "fit-content",
              padding: "10px",
              marginLeft: "10px",
              marginTop: "-60%",
              width: "100%",
              maxWidth: "400px"
            }}
          >
            <Grid style={{ height: "fit-content" }}>
              <img src={imageUrl} alt={course ? course.name : "no-information"} style={{
                width: "100%"
              }} />
            </Grid>
            <Divider style={{
              margin: "5px 0"
            }} />
            <Grid
              style={{
                display: "flex",
                flexDirection: "column",
                margin: 0,
              }}
            >
              <Grid container style={{
                display: "flex",
                justifyContent: "space-between"
              }}>
                <Typography variant="h4" style={{
                  fontWeight: "bold"
                }}>
                  ${priceAfterSaleOff}
                </Typography>
                {
                  price === priceAfterSaleOff ? null : (
                    <Grid item style={{
                      display: "flex",
                      alignItems: "center"
                    }}>
                      <Typography variant="p" style={{
                        color: "gray",
                        textDecoration: "line-through"
                      }}>
                        ${price}
                      </Typography>
                      <Typography variant="p" style={{ marginLeft: "10px", color: "red" }} >
                        {course ? course.saleOffPercent * 100 : null}% off
                      </Typography>
                    </Grid>
                  )
                }
              </Grid>
              <Button variant="contained" color="primary" style={{ width: "100%", marginBottom: "5px", backgroundColor: "#e91e63" }}>
                <Queue style={{
                  margin: "0 5px"
                }} />
                PURCHASE
              </Button>
              <Button variant="outlined" color="secondary" style={{ width: "100%" }}>
                <FavoriteBorder style={{
                  margin: "0 5px"
                }} />
                WISHLIST
              </Button>
            </Grid>
          </Card>
        </Grid>
        <Grid xs={0} md={1} lg={2} xl={2} />
      </Grid>
      <Grid container
        style={{
          marginTop: "20px",
          padding: "0 10px",
        }}
      >
        <Grid xs={0} md={1} lg={2} xl={3} />
        <Grid item>
          <Typography
            variant="h5"
            style={{
              fontWeight: "bold"
            }}
          >
            Related Courses
          </Typography>
          <Grid container style={{
            display: "flex",
            justifyContent: "space-between"
          }}>
            {
              relatedCourses.map((item) => {
                return (
                  <CourseCard course={item} style={{
                    margin: "5px"
                  }}/>
                )
              })
            }
          </Grid>
          <Grid xs={0} md={1} lg={2} xl={3} />
        </Grid>
      </Grid>
      <Dialog
        open={chapterDialog}
        onClose={handleChapterClick}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Add new chapter</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="newChapterName"
            label="Enter chapter's name"
            type="text"
            fullWidth
            value={chapterName}
            onChange={handleNewChapterNameChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleChapterClick} color="primary">
            Cancel
          </Button>
          <Button onClick={handleAddChapterConfirmed} color="primary">
            Add
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={videoDialog.state} onClose={handleVideoClick}
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
            onChange={handleVideoDescriptionChange}
          />
          <TextField
            autoFocus
            margin="dense"
            id="videoFile"
            label="Select file"
            type="file"
            fullWidth
            onChange={handleVideoFileChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleVideoClick} color="primary">
            Cancel
          </Button>
          <Button onClick={handleAddVideoConfirmed} color="primary">
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </Grid>
  )
}

export default CourseDetail