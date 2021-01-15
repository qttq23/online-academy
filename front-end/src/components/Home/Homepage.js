import React, { useEffect, useState } from 'react';
import BannerExample from "./Carousel/Carousel";
import HotCourse from "./HotCourse/HotCourse";
import { makeStyles } from '@material-ui/core/styles'

import myRequest from "../../helpers/myRequest";
import myConfig from '../../helpers/myConfig';
import store from '../../redux/store'

import Avatar from '@material-ui/core/Avatar';
import Chip from '@material-ui/core/Chip';
import { NavLink } from "react-router-dom";

function Homepage(props) {

  // get data
  useEffect(() => {


            myRequest(
      {
        method: 'get',
        url: `${myConfig.apiServerAddress}/api/custom/Courses/mostRegistered`,
        params: {
          order: -1,
          numLimit: 3,
          time: myConfig.timeOneWeekInMiliseconds
        }
      },
      function ok(response) {
        console.log('homepage: data: ')
        store.dispatch({
          type: 'set_mostRegisteredCourses',
          payload: {
            data: response.data
          }
        });

      },
      function fail(error) {
        console.log('homepage: error: ')
        console.log(error.message)
      }
    )

    myRequest(
      {
        method: 'get',
        url: `${myConfig.apiServerAddress}/api/custom/Courses/mostViewed`,
        params: {
          order: -1,
          numLimit: 10,
          time: myConfig.timeFrom1970InMilliseconds
        }
      },
      function ok(response) {
        console.log('homepage: data: ')
        store.dispatch({
          type: 'set_mostViewedCourses',
          payload: {
            data: response.data
          }
        });

      },
      function fail(error) {
        console.log('homepage: error: ')
        console.log(error.message)
      }
    )


    myRequest(
      {
        method: 'get',
        url: `${myConfig.apiServerAddress}/api/custom/Courses/Newest`,
        params: {
          order: -1,
          numLimit: 10,
          time: myConfig.timeFrom1970InMilliseconds
        }
      },
      function ok(response) {
        console.log('homepage: data: ')
        store.dispatch({
          type: 'set_newestCourses',
          payload: {
            data: response.data
          }
        });

      },
      function fail(error) {
        console.log('homepage: error: ')
        console.log(error.message)
      }
    )




      myRequest(
      {
        method: 'get',
        url: `${myConfig.apiServerAddress}/api/custom/Categories/MostRegistered`,
        params: {
          order: -1,
          numLimit: 5,
          time: myConfig.timeOneWeekInMiliseconds
        }
      },
      function ok(response) {
        console.log('homepage: data: ')
        store.dispatch({
          type: 'set_mostRegisteredCategories',
          payload: {
            data: response.data
          }
        });

      },
      function fail(error) {
        console.log('homepage: error: ')
        console.log(error.message)
      }
    )

  }, [])

 
  // render
  return (
    <div>
      <BannerExample></BannerExample>

      <h2 style={{ marginLeft: "130px", marginTop: "50px", fontWeight: "Bold", fontSize: "30" }}>
      MOST REGISTERED COURSES
      </h2>
      <HotCourse courseList={store.getState().mostRegisteredCourses}></HotCourse>

      
      <h2 style={{ marginLeft: "130px", fontWeight: "Bold", fontSize: "30" }}>
      MOST VIEWED COURSES
      </h2>
      <HotCourse courseList={store.getState().mostViewedCourses}></HotCourse>
      
      <h2 style={{ marginLeft: "130px", marginTop: "50px", fontWeight: "Bold", fontSize: "30" }}>
      NEWEST COURSES
      </h2>
      <HotCourse courseList={store.getState().newestCourses}></HotCourse>

      <h2 style={{ marginLeft: "130px", marginTop: "50px", fontWeight: "Bold", fontSize: "30" }}>
      MOST REGISTERED CATEGORIES
      </h2>
      {
        store.getState().mostRegisteredCategories.map(function(cat){

          return (
            <NavLink to={`/courseList?fields=categoryId&keyword=${cat.id}&name=${cat.name}`}
            style={{ textDecoration: "none", color: "#e91e63" }}>
                <Chip style={{ marginLeft: "130px", marginTop: "5px", fontWeight: "Bold", fontSize: "30" }}
       avatar={<Avatar>M</Avatar>} label={`${cat.topic}/${cat.name}`} onClick={()=>{}} />
              </NavLink>

              
            )

        })
      }
    

      {/* <p>{JSON.stringify(store.getState().mostViewedCourses) }</p> */}

    </div>
  )
}

export default Homepage