import React, { useEffect, useState } from 'react'
import './style.css'

import { useParams } from 'react-router'

import { List, ListItem, ListSubheader, ListItemText, Divider, Button, TextField } from '@material-ui/core'
import ListItemLink from './ListItemLink/ListItemLink'
import HotCourse from '../Homepage/HotCourse/HotCourse'

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
    image: require("../../assets/images/course/angular.png").default,
    description: "A basic course for building a web application with Angular - a powerful Javascript framework.",
    rate: 4.3,
    registered_count: 589,
    price: 19.99,
    discount: 0,
    date_updated: "12/12/2020",
    lecturer: {
      __lecturer_id: "lecturer_01",
      name: "Jojo",
      propic: require("../../assets/images/profile/avatar.jpg").default,
      dob: "12/12/1990",
      bio: "Im just a little man in this giant world.",
    },
    sections: [
      {
        __section_id: "course_01-section_01",
        name: "01",
      },
      {
        __section_id: "course_01-section_02",
        name: "02",
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

  return (
    <div className="container">
      <div className="course-detail-container">
        <img src={result.image} alt={result.__course_id} />
        <div className="course-detail">
          <div className="course-information-container">
            <h1>{result.course_name}</h1>
            <p>{result.description}</p>
            <p>Rate: {result.rate}/5</p>
            <p>Registered: {result.registered_count}</p>
            <h1 className="course-price">Price: ${result.price}</h1>
          </div>
          <div className="button-container">
            <Button className="purchase-button">Purchase</Button>
            <Button className="wishlist-button">Wishlist</Button>
          </div>
        </div>
      </div>
      <Divider />
      <div className="course-content">
        <p>This is the introduce to the Angular course.</p>
        <p>This is detail description about the Angular course.</p>
        <p>This is the summary of the course information.</p> 
      </div>
      <Divider />
      <div className="lecturer-information-container">
        <img src={result.lecturer.propic} alt={result.lecturer.__lecturer_id} onClick={console.log("Image clicked!")} />
        <div>
          <h1><a href="/teachers">{result.lecturer.name}</a></h1>
          <p>{result.lecturer.dob}</p>
          <p>{result.lecturer.bio}</p>
        </div>
      </div>
      <Divider />
      <div className="chapter-container">
        <h3>Videos</h3>
        <List subheader={<li />}>
          <li>
            {result.sections.map((item, index) => {
              return (
                <ul>
                  <ListSubheader>Section {item.name}</ListSubheader>
                  {result.videos.map((video, i) => {
                    if (video.__section_id === item.__section_id) {
                      return (
                        <ListItemLink href={video.link}>
                          <ListItemText
                            primary={`Chapter ${i + 1} - ${video.name}`} />
                        </ListItemLink>
                      )
                    }
                  })}
                </ul>
              )
            })}
          </li>
        </List>
      </div>
      <Divider />
      <div className="related-courses-container">
        <h3>Related Courses</h3>
        <HotCourse />
      </div>
      <Divider />
      <div className="feedback-container">
        <div className="comment-container">
          <List>
            {[0, 1, 2, 3, 4].map((item, index) => {
              return (<ListItem>
                <ListItemText>comment{index}</ListItemText>
              </ListItem>)
            })}
          </List>
        </div>
        <div className="form-container">
          <TextField
            id="outlined-multiline-static"
            label="Feedback"
            multiline
            rows={4}
            variant="outlined"
            style={{ width: "100%" }}
          />
          <Button className="submit-button">Submit</Button>
        </div>
      </div>
    </div>
  )
}

export default CourseDetail