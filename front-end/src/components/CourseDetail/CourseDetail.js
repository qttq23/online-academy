import React, { useState } from 'react'
import './style.css'

import { useParams } from 'react-router'

import { List, ListItem, ListSubheader, ListItemText, Button, TextField, Collapse, Card, CardActions, Divider } from '@material-ui/core'
import { Grid, Typography, Paper, Avatar, } from '@material-ui/core'
import { ExpandLess, ExpandMore, Update } from '@material-ui/icons'
import ListItemLink from './ListItemLink/ListItemLink'
import HotCourse from '../Home/HotCourse/HotCourse'
import { Rating } from '@material-ui/lab'

const CourseDetail = (props) => {
  const data = [{
    __course_id: "course_01",
    course_name: "Angular v4 Basic Programming",
    label: [
      "angular",
      "ssr",
      "server",
      "web",
      "nodejs",
      "js",
      "javascript"
    ],
    keywords: [
      "best seller",
      "hot"
    ],
    image: require("../../assets/images/courses/angular.png").default,
    brief: "Just a brief",
    description: "A basic course for building a web application with Angular - a powerful Javascript framework.",
    rate: 4.3,
    registered_count: 589,
    price: 19.99,
    discount: 0,
    date_updated: "12/12/2020",
    lecturer: {
      __lecturer_id: "lecturer_01",
      name: "Jojo",
      propic: require("../../assets/images/profile/profile.png").default,
      dob: "12/12/1990",
      bio: "Im just a little man in this giant world.",
    },
    sections: [
      {
        __section_id: "course_01-section_01",
        name: "01 - Getting Started",
      },
      {
        __section_id: "course_01-section_02",
        name: "02 - Installation",
      }
    ],
    videos: [
      {
        __video_id: "course_01-01",
        __section_id: "course_01-section_01",
        name: "Getting Started",
        date_uploaded: "12/12/2020",
        brief: "",
        link: ""
      },
      {
        __video_id: "course_01-02",
        __section_id: "course_01-section_01",
        name: "Installation",
        date_uploaded: "12/12/2020",
        brief: "",
        link: ""
      },
      {
        __video_id: "course_01-03",
        __section_id: "course_01-section_01",
        name: "Setup and configuration",
        date_uploaded: "12/12/2020",
        brief: "",
        link: ""
      },
      {
        __video_id: "course_01-04",
        __section_id: "course_01-section_02",
        name: "Getting Started",
        date_uploaded: "12/12/2020",
        brief: "",
        link: ""
      },
      {
        __video_id: "course_01-05",
        __section_id: "course_01-section_02",
        name: "Installation",
        date_uploaded: "12/12/2020",
        brief: "",
        link: ""
      },
      {
        __video_id: "course_01-06",
        __section_id: "course_01-section_02",
        name: "Setup and configuration",
        date_uploaded: "12/12/2020",
        brief: "",
        link: ""
      }
    ]
  }]

  const { id } = useParams()
  console.log(id)
  const result = data[id]

  const [isOpened, setOpen] = useState(() => {
    let state = {}
    result.sections.map((item) => {
      state[item.name] = false
    })
    return state
  })


  const handleClick = (name) => {
    console.log(isOpened)
    setOpen({ ...isOpened, [name]: !isOpened[name] })
    console.log(isOpened)
  }

  return (
    <Grid container>
      <Grid
        container
        style={{
          backgroundColor: "#1e1e1c",
          padding: "50px 0",
        }}
      >
        <Grid xs={2} />
        <Grid xs={5}>
          <List style={{

          }}>
            <Typography
              variant="h3"
              style={{
                fontWeight: "bold",
                margin: "5px 0",
                color: "#ffffff"
              }}
            >
              {result.course_name}
            </Typography>
            <Typography
              variant="subtitle1"
              style={{
                fontSize: 28,
                margin: "5px 0",
                color: "#ffffff"
              }}
            >
              {result.brief}
            </Typography>
            <Grid
              item
              style={{
                display: "flex",
                margin: "5px 0",
                alignItems: "center",
                color: "gold"
              }}
            >
              <Typography
                variant="subtitle2"
                style={{
                  fontSize: 18
                }}
              >
                {result.rate}
              </Typography>
              <Rating
                value={result.rate}
                readOnly
                size="medium"
                style={{
                  padding: "2px 0"
                }}
              />
            </Grid>
            <Typography
              variant="caption"
              style={{
                fontSize: 18,
                margin: "5px 0",
                color: "#ffffff"
              }}
            >
              Created by {result.lecturer.name}
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
                  fontSize: 18,
                  whiteSpace: "nowrap"
                }}
              >
                Last updated: {result.last_updated}
              </Typography>
            </Grid>
          </List>
        </Grid>
        <Grid xs={5} />
      </Grid>
      <Grid container
        style={{

        }}
      >
        <Grid xs={2} />
        <Grid
          item
          xs={5}
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
                <ListSubheader compoenent="p">
                  <Typography
                    variant="caption"
                    style={{
                      color: "grey"
                    }}
                  >
                    {result.sections.length} sections • {result.videos.length} lessons
                  </Typography>
                </ListSubheader>
              }
            >
              {result.sections.map((section, index) => {
                return (
                  <>
                    <ListItem
                      button
                      onClick={() => handleClick(section.name)}
                      style={{
                        color: "#333333",
                        backgroundColor: "#eeeeee"
                      }}
                    >
                      {isOpened[section.name] ? <ExpandLess /> : <ExpandMore />}
                      <ListItemText primary={section.name} style={{ color: "#333333" }} />
                    </ListItem>
                    <Collapse
                      in={isOpened[section.name]}
                      timeout="auto"
                      unmountOnExit
                    >
                      <List
                        disablePadding
                      >
                        {result.videos.map((video, index) => {
                          if (video.__section_id === section.__section_id)
                            return (
                              <>
                                <ListItemLink href={video.link}>
                                  <ListItemText
                                    primary={video.name}
                                    style={{ color: "#333333" }}
                                  />
                                </ListItemLink>
                                {index !== result.videos.length ? <Divider /> : null}
                              </>
                            )
                        })}
                      </List>
                    </Collapse>
                    {index !== result.sections.length ? <Divider /> : null}
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
            {result.description}
          </Typography>
          <Typography
            variant="h5"
            style={{
              marginTop: "15px",
              marginBottom: "5px",
              fontWeight: "bold"
            }}
          >
            Lecturer
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
              alt={result.lecturer.name}
              src={result.lecturer.propic}
              style={{
                width: 250,
                height: 250
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
                {result.lecturer.name}
              </Typography>
              <Typography
                variant="subtitle1"
              >
                {result.lecturer.dob}
              </Typography>
              <Typography
                variant="caption"
              >
                {result.lecturer.bio}
              </Typography>
            </Grid>
          </Grid>
          <Typography
            variant="h5"
            style={{
              fontWeight: "bold"
            }}
          >
            Feedbacks
          </Typography>
          <Grid
            container
          >
            <Grid xs={8}>
              <List>
                {[0, 1, 2, 3, 4].map((item, index) => {
                  return (<ListItem>
                    <ListItemText>comment{index}</ListItemText>
                  </ListItem>)
                })}
              </List>
            </Grid>
            <Grid xs={4}>
              <TextField
                id="outlined-multiline-static"
                label="Feedback"
                multiline
                rows={4}
                variant="outlined"
                style={{ width: "100%" }}
              />
              <Button className="submit-button">Submit</Button>
            </Grid>
          </Grid>
          <HotCourse />
        </Grid>
        <Grid
          container
          xs={3}
          style={{
          }}
        >
          <Card
            style={{
              position: "sticky",
              top: 20,
              height: "fit-content",
              padding: "5px",
              margin: "20px",
              marginTop: "-50%",
              width: "100%"
            }}
          >
            <div>
              <img src={result.image} alt={result.name} style={{
                width: "100%"
              }} />
            </div>
            <CardActions
              style={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Button variant="contained" color="primary">PURCHASE</Button>
              <Button variant="outlined" color="secondary">WISHLIST</Button>
            </CardActions>
          </Card>
        </Grid>
        <Grid xs={2} />
      </Grid>
    </Grid>
  )
}

export default CourseDetail