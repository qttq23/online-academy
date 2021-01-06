import React, { Component } from 'react';
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

class CourseDetail extends Component {
  render() {
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
                  2020 Complete Python Bootcamp From Zero to Hero in Python
                </Typography>

                <Typography
                  variant="subtitle1"
                  style={{
                    color: 'white',
                    fontSize: 18,
                    marginTop: 10
                  }}>
                  Learn Python like a Professional Start from the basics and go all the way to creating your own applications and games
                </Typography>

                <Grid item style={{
                  display: 'flex',
                  alignItems: 'center',
                  marginTop: 5,
                  marginBottom: 5
                }}>
                  <Typography variant="subtitle2" style={{ color: 'gold', marginRight: 10 }}>4.6</Typography>
                  <Rating value={4.6} readOnly size="small" style={{ paddingTop: 2, paddingBottom: 2 }} />
                </Grid>

                <Typography variant="caption" style={{ fontSize: 14, color: 'white' }}>Created by NgoVanPhat</Typography>

                <Grid item style={{
                  display: 'flex',
                  alignItems: 'center',
                  color: 'white',
                  marginTop: 5
                }}>
                  <UpdateIcon style={{ marginRight: 10 }} />
                  <Typography variant="caption" >Last updated 12/2020</Typography>
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
                src="https://img-a.udemycdn.com/course/240x135/567828_67d0.jpg?aznDaUQKDfaOYkAw3FsTnhTRLrHoZ3l5XY_8XDptUjMI8fVR2YB5V5AL52bhJBmjc1LHJI7E0JNCoJezgHi-YZcRge7SkFvvjbgwMpp6wNMlywaXiDg4f7ScwUJy"
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
                <ListItem>
                  <VideoTile videoTitle="Command Line Basics" videoTime="8:15" />
                </ListItem>
                <ListItem>
                  <VideoTile videoTitle="Course Introduction" videoTime="6:39" />
                </ListItem>
                <ListItem>
                  <VideoTile videoTitle="Course Curriculum Overview" videoTime="4:00" />
                </ListItem>
                <ListItem>
                  <VideoTile videoTitle="Why Python?" videoTime="5:18" />
                </ListItem>
                <ListItem>
                  <VideoTile videoTitle="Command Line Basics" videoTime="8:15" />
                </ListItem>
                <ListItem>
                  <VideoTile videoTitle="Course Introduction" videoTime="6:39" />
                </ListItem>
                <ListItem>
                  <VideoTile videoTitle="Course Curriculum Overview" videoTime="4:00" />
                </ListItem>
                <ListItem>
                  <VideoTile videoTitle="Why Python?" videoTime="5:18" />
                </ListItem>
                <ListItem>
                  <VideoTile videoTitle="Command Line Basics" videoTime="8:15" />
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
              Become a Python Programmer and learn one of employer's most requested skills of 2020!

              This is the most comprehensive, yet straight-forward, course for the Python programming language on Udemy! Whether you have never programmed before, already know basic syntax, or want to learn about the advanced features of Python, this course is for you! In this course we will teach you Python 3.

              With over 100 lectures and more than 21 hours of video this comprehensive course leaves no stone unturned! This course includes quizzes, tests, coding exercises and homework assignments as well as 3 major projects to create a Python project portfolio!

              Learn how to use Python for real-world tasks, such as working with PDF Files, sending emails, reading Excel files, Scraping websites for informations, working with image files, and much more!

              This course will teach you Python in a practical manner, with every lecture comes a full coding screencast and a corresponding code notebook! Learn in whatever manner is best for you!

              We will start by helping you get Python installed on your computer, regardless of your operating system, whether its Linux, MacOS, or Windows, we've got you covered.

              We cover a wide variety of topics, including:

              Command Line Basics

              Installing Python

              Running Python Code

              Strings

              Lists

              Dictionaries

              Tuples

              Sets

              Number Data Types

              Print Formatting

              Functions

              Scope

              args/kwargs

              Built-in Functions

              Debugging and Error Handling

              Modules

              External Modules

              Object Oriented Programming

              Inheritance

              Polymorphism

              File I/O

              Advanced Methods

              Unit Tests

              and much more!

              You will get lifetime access to over 100 lectures plus corresponding Notebooks for the lectures!

              This course comes with a 30 day money back guarantee! If you are not satisfied in any way, you'll get your money back. Plus you will keep access to the Notebooks as a thank you for trying out the course!

              So what are you waiting for? Learn Python in a way that will advance your career and increase your knowledge, all in a fun and practical way!
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
              <Typography variant="h6" color="primary" style={{ fontWeight: 'bold' }}>Jose Portilla</Typography>
              <Typography variant="subtitle1" style={{ color: 'grey' }}>Head of Data Science, Pierian Data Inc.</Typography>
              <Grid container style={{
                display: 'flex',
                alignItems: 'center',
                flexDirection: 'row'
              }}>
                <Avatar alt="Remy Sharp" src="https://img-b.udemycdn.com/user/75x75/9685726_67e7_4.jpg?secure=QU9dg6WVqEO3vJRsT2JMsA%3D%3D%2C1608943704" style={{ width: 120, height: 120, marginRight: 10 }} />
                <Grid item style={{
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
                </Grid>
              </Grid>
              <Typography variant="p" variantMapping="p" style={{ marginTop: 20 }}>
                Jose Marcial Portilla has a BS and MS in Mechanical Engineering from Santa Clara University and years of experience as a professional instructor and trainer for Data Science and programming. He has publications and patents in various fields such as microfluidics, materials science, and data science technologies. Over the course of his career he has developed a skill set in analyzing data and he hopes to use his experience in teaching and data science to help other people learn the power of programming the ability to analyze data, as well as present the data in clear and beautiful visualizations. Currently he works as the Head of Data Science for Pierian Data Inc. and provides in-person data science and python programming training courses to employees working at top companies, including General Electric, Cigna, The New York Times, Credit Suisse, McKinsey and many more. Feel free to contact him on LinkedIn for more information on in-person training sessions or group training sessions in Las Vegas, NV.
              </Typography>
            </Grid>

            {/*------------------Rating---------------------*/}
            <Typography
              variant="h5"
              style={{
                fontWeight: 'bold',
                marginTop: 20
              }}
            >Student feedback</Typography>

            <Grid container style={{ marginTop: 20 }}>
              <Grid xs={2} style={{
                display: 'flex',
                alignItems: 'center',
                flexDirection: 'column'
              }}>
                <Typography variant="h2" style={{ color: 'orange', fontWeight: 'bold' }}>4.6</Typography>
                <Rating value={4.6} precision={0.1} readOnly />
                <Typography variant="subtitle2" style={{ color: 'orange', fontWeight: 'bold' }}>Course Rating</Typography>
              </Grid>
              <Grid xs={9} style={{
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
            <Grid container style={{ marginTop: 20 }}>
              <List>
                <ListItem>
                  <CommentTile userName="Debora Durek"
                    avatarUrl="https://img-b.udemycdn.com/user/50x50/64820798_6947.jpg?secure=0yyB6eqg2Z3_6L-daI2qew%3D%3D%2C1608958969"
                    last_updated="a month ago"
                    comment="This course is fantastic! I learned so much so far, and I knew nothing about any programming languages. Thanks Jose!!"
                    rating={5}
                  />
                </ListItem>
                <ListItem>
                  <CommentTile userName="Debora Durek"
                    avatarUrl="https://img-b.udemycdn.com/user/50x50/64820798_6947.jpg?secure=0yyB6eqg2Z3_6L-daI2qew%3D%3D%2C1608958969"
                    last_updated="a month ago"
                    comment="This course is fantastic! I learned so much so far, and I knew nothing about any programming languages. Thanks Jose!!"
                    rating={5}
                  />
                </ListItem>
                <ListItem>
                  <CommentTile userName="Debora Durek"
                    avatarUrl="https://img-b.udemycdn.com/user/50x50/64820798_6947.jpg?secure=0yyB6eqg2Z3_6L-daI2qew%3D%3D%2C1608958969"
                    last_updated="a month ago"
                    comment="This course is fantastic! I learned so much so far, and I knew nothing about any programming languages. Thanks Jose!!"
                    rating={5}
                  />
                </ListItem>
                <ListItem>
                  <CommentTile userName="Debora Durek"
                    avatarUrl="https://img-b.udemycdn.com/user/50x50/64820798_6947.jpg?secure=0yyB6eqg2Z3_6L-daI2qew%3D%3D%2C1608958969"
                    last_updated="a month ago"
                    comment="This course is fantastic! I learned so much so far, and I knew nothing about any programming languages. Thanks Jose!!"
                    rating={5}
                  />
                </ListItem>
                <ListItem>
                  <CommentTile userName="Debora Durek"
                    avatarUrl="https://img-b.udemycdn.com/user/50x50/64820798_6947.jpg?secure=0yyB6eqg2Z3_6L-daI2qew%3D%3D%2C1608958969"
                    last_updated="a month ago"
                    comment="This course is fantastic! I learned so much so far, and I knew nothing about any programming languages. Thanks Jose!!"
                    rating={5}
                  />
                </ListItem>
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
              <CourseCard />
              <CourseCard />
              <CourseCard />
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
                  <Typography variant="h4" style={{ fontWeight: 'bold' }}>$12.99</Typography>
                  <Typography variant="p" style={{ color: 'grey', marginLeft: 10, textDecoration: 'line-through' }}>$122.99</Typography>
                  <Typography variant="p" style={{ marginLeft: 10 }}>91% off</Typography>
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
      </Grid>
    );
  }
}

export default CourseDetail;