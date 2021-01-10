import React, { useEffect, useState } from 'react';
import BannerExample from "./Carousel/Carousel";
import HotCourse from "./HotCourse/HotCourse";
import { makeStyles } from '@material-ui/core/styles'

import myRequest from "../../helpers/myRequest";
import myConfig from '../../helpers/myConfig';
import store from '../../redux/store'

function Homepage(props) {

    // get data
    useEffect(() => {

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
            function ok(response){
                console.log('homepage: data: ')
                store.dispatch({
                    type: 'set_mostViewedCourses',
                    payload: {
                        data: response.data
                    }
                });

            },
            function fail(error){
                console.log('homepage: error: ')
                console.log(error.message)
            }
        )

    }, [])


    // render
    return (
        <div>
            <BannerExample></BannerExample>
            <h4 style={{ marginLeft: "130px", fontWeight: "Bold", fontSize: "30" }}>MOST VIEWED COURSE</h4>
            <HotCourse courseList={store.getState().mostViewedCourses}></HotCourse>
            <h4 style={{ marginLeft: "130px", marginTop: "50px", fontWeight: "Bold", fontSize: "30" }}>HOT COURSE</h4>
            <HotCourse></HotCourse>

            {/* <p>{JSON.stringify(store.getState().mostViewedCourses) }</p> */}

        </div>
    )
}

export default Homepage