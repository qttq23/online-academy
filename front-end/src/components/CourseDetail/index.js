import React, { Component, useEffect } from 'react';
import { Grid, Typography, List, Button, Paper, ListItem, Avatar, LinearProgress } from '@material-ui/core';
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


import myRequest from "../../helpers/myRequest";
import myConfig from '../../helpers/myConfig';
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

function CourseDetail(props) {

  let { id } = useParams();
  console.log('coursedetail: ', id)

  // get data
  useEffect(() => {

    myRequest(
      {
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

    myRequest(
      {
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

    myRequest(
      {
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

  }, [id])


  // prepare
  let course = store.getState().detailedCourse
  let feedbacks = store.getState().feedbacks
  let relatedCourses = store.getState().relatedCourses

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
    priceAfterSaleOff = price
    if (course.saleOffPercent && course.saleOffPercent != 0) {
      priceAfterSaleOff = course.saleOffPercent * price
    }

    imageUrl = course.imageUrl
    courseId = course.id
    updatedAt = course.updatedAt
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
                <Rating value={ratePoint} readOnly size="small" style={{ paddingTop: 2, paddingBottom: 2 }} />
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
                <Button variant="outlined" color="inherit" endIcon={<FavoriteBorderIcon />} style={{ marginRight: 10 }}>Wishlist</Button>
                <Button variant="outlined" color="inherit" endIcon={<ShareIcon />}>Share</Button>
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

          <Typography variant="caption" style={{ marginTop: 30, marginBottom: 5, color: 'grey' }}>23 videos</Typography>
          <Paper style={{ color: 'white' }} variant="outlined">
            <List>
              <ListItem>
                <VideoTile videoTitle="Course Introduction" videoTime="6:39" />
              </ListItem>
              <ListItem>
                <VideoTile videoTitle="Course Curriculum Overview" videoTime="4:00" />
              </ListItem>
              <ListItem>
                <VideoTile videoTitle="Why Python?" videoTime="5:18" />
              </ListItem>

            </List>
          </Paper>
          {/*------------------Description---------------------*/}
          <Typography
            variant="h5"
            style={{
              fontWeight: 'bold'
            }}
          >Description</Typography>
          <Typography variant="p" style={{ marginTop: 20 }}>
            {course ? course.longDescription : 'loading...'}
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
              {/* <Grid item style={{
                display: 'flex',
                flexDirection: 'column'
              }}>
                <Grid item style={{
                  display: 'flex',
                  flexDirection: 'row',
                  marginBottom: 10
                }}>
                  <StarIcon style={{ width: 20, height: 20, marginRight: 10, color: 'orange' }} />
                  <Typography variant="subtitle2">4.6 Instructor Rating</Typography>
                </Grid>
                <Grid item style={{
                  display: 'flex',
                  flexDirection: 'row',
                  marginBottom: 10
                }}>
                  <CommentIcon style={{ width: 20, height: 20, marginRight: 10, color: 'orange' }} />
                  <Typography variant="subtitle2">685,399 Reviews</Typography>
                </Grid>
                <Grid item style={{
                  display: 'flex',
                  flexDirection: 'row',
                  marginBottom: 10
                }}>
                  <SupervisorAccountIcon style={{ width: 20, height: 20, marginRight: 10, color: 'orange' }} />
                  <Typography variant="subtitle2">2,096,592 Students</Typography>
                </Grid>
                <Grid item style={{
                  display: 'flex',
                  flexDirection: 'row'
                }}>
                  <PlayCircleFilledIcon style={{ width: 20, height: 20, marginRight: 10, color: 'orange' }} />
                  <Typography variant="subtitle2">31 Courses</Typography>
                </Grid>
              </Grid> */}
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
                {ratePoint}
              </Typography>
              <Rating value={ratePoint} precision={0.1} readOnly />
              <Typography variant="subtitle2" style={{ color: 'orange', fontWeight: 'bold' }}>
                ({timesRate})
                </Typography>
            </Grid>
            {/* <Grid xs={9} style={{
              marginLeft: 20,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between'
            }}>
              <Grid item style={{
                display: 'flex',
                alignItems: 'center'
              }}>
                <LinearProgress variant="buffer" value={54} style={{ height: 10, width: 450, marginRight: 10 }} />
                <Rating value={5} readOnly size="small" />
                <Typography color="primary" variant="caption" style={{ fontSize: 14, marginLeft: 10 }}>54%</Typography>
              </Grid>
              <Grid item style={{
                display: 'flex',
                alignItems: 'center'
              }}>
                <LinearProgress variant="buffer" value={37} style={{ height: 10, width: 450, marginRight: 10 }} />
                <Rating value={4} readOnly size="small" />
                <Typography color="primary" variant="caption" style={{ fontSize: 14, marginLeft: 10 }}>37%</Typography>
              </Grid>
              <Grid item style={{
                display: 'flex',
                alignItems: 'center'
              }}>
                <LinearProgress variant="buffer" value={8} style={{ height: 10, width: 450, marginRight: 10 }} />
                <Rating value={3} readOnly size="small" />
                <Typography color="primary" variant="caption" style={{ fontSize: 14, marginLeft: 10 }}>8%</Typography>
              </Grid>
              <Grid item style={{
                display: 'flex',
                alignItems: 'center'
              }}>
                <LinearProgress variant="buffer" value={1} style={{ height: 10, width: 450, marginRight: 10 }} />
                <Rating value={2} readOnly size="small" />
                <Typography color="primary" variant="caption" style={{ fontSize: 14, marginLeft: 10 }}>1%</Typography>
              </Grid>
              <Grid item style={{
                display: 'flex',
                alignItems: 'center'
              }}>
                <LinearProgress variant="buffer" value={0.5} style={{ height: 10, width: 450, marginRight: 10 }} />
                <Rating value={1} readOnly size="small" />
                <Typography color="primary" variant="caption" style={{ fontSize: 14, marginLeft: 10 }}>{"<1%"}</Typography>
              </Grid>
            </Grid> */}
          </Grid>

          {/*------------------Review---------------------*/}
          <Typography
            variant="h5"
            style={{
              fontWeight: 'bold',
              marginTop: 20
            }}
          >Reviews</Typography>
          <Grid container style={{ marginTop: 20 }}>
            <List>
              {
                feedbacks.map(function (item) {

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
            <Grid container style={{ display: 'flex', alignContent: 'flex-end' }}>
              <Grid xs={6} />
              <Grid xs={6} >
                <Pagination count={10} page={1} />
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

              <Button variant="contained" fullWidth color="secondary" style={{ marginTop: 20, height: 50, fontWeight: 'bold' }}>
                Add to cart
                </Button>
              <Button variant="outlined" fullWidth color="primary" style={{ marginTop: 5, height: 50, fontWeight: 'bold' }}>
                Buy now
                </Button>
            </Grid>
          </Paper>
        </Grid>
        <Grid xs={1} />
      </Grid>
    </Grid >
  );
}

export default CourseDetail;