import React from 'react';
import Grid from "@material-ui/core/Grid";
import CourseCard from "../CourseCard/CoursesCard";
import {Hidden} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";


const HotCourse = (props) => {
    return(
        <Grid container direction="column" spacing={3}>
            <Grid item container spacing={2} direction="row">
                <Grid item xs={1} sm={2} md={1}></Grid>
                <Grid item xs={5} sm={4} md={2}>
                    <CourseCard></CourseCard>
                </Grid>
                <Grid item xs={5} sm={4} md={2}>
                    <CourseCard></CourseCard>
                </Grid>
                <Hidden only={['md', 'lg']}>
                    <Grid item xs={1} sm={2} md={0}></Grid>
                    <Grid item xs={1} sm={2} md={0}></Grid>
                </Hidden>
                <Grid item xs={5} sm={4} md={2}>
                    <CourseCard></CourseCard>
                </Grid>
                <Grid item xs={5} sm={4} md={2}>
                    <CourseCard></CourseCard>
                </Grid>
                <Hidden only={['md', 'lg']}>
                    <Grid item xs={1} sm={2} md={0}></Grid>
                    <Grid item xs={1} sm={2} md={0}></Grid>
                </Hidden>
                <Grid item xs={5} sm={4} md={2}>
                    <CourseCard></CourseCard>
                </Grid>
                <Hidden only={['md', 'lg']}>
                    <Grid item xs={5} sm={4}>
                        <CourseCard></CourseCard>
                    </Grid>
                </Hidden>
                <Grid item xs={1}></Grid>
            </Grid>

            <Grid item container spacing={2} direction="row">
                <Grid item xs={1} sm={2} md={1}></Grid>
                <Grid item xs={5} sm={4} md={2}>
                    <CourseCard></CourseCard>
                </Grid>
                <Grid item xs={5} sm={4} md={2}>
                    <CourseCard></CourseCard>
                </Grid>
                <Hidden only={['md', 'lg']}>
                    <Grid item xs={1} sm={2} md={0}></Grid>
                    <Grid item xs={1} sm={2} md={0}></Grid>
                </Hidden>
                <Grid item xs={5} sm={4} md={2}>
                    <CourseCard></CourseCard>
                </Grid>
                <Grid item xs={5} sm={4} md={2}>
                    <CourseCard></CourseCard>
                </Grid>
                <Hidden only={['md', 'lg']}>
                    <Grid item xs={1} sm={2} md={0}></Grid>
                    <Grid item xs={1} sm={2} md={0}></Grid>
                </Hidden>
                <Hidden only={['sm', 'xs']}>
                    <Grid item xs={5} md={2}>
                        <CourseCard></CourseCard>
                    </Grid>
                </Hidden>
                <Grid item xs={1}></Grid>
            </Grid>
        </Grid>
    )
}

export default HotCourse