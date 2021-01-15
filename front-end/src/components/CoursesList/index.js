import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Pagination from '@material-ui/lab/Pagination';
import CourseCard from '../Home/CourseCard/CoursesCard.js';

import store from '../../redux/store'
import myRequest from '../../helpers/myRequest'
import myConfig from '../../helpers/myConfig'

const useStyles = makeStyles((theme) => ({
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 4),
  },
  cardGrid: {
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(4),
  },
  descButton: {
    backgroundColor: '#005580',
    color: 'white',
  },
  ascButton: {
    borderColor: "#005580",
    color: '#005580'
  }
}));

const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

export default function CourseList(props) {
  const classes = useStyles();

  const [courses, setCourses] = useState([])
  const [label, setLabel] = useState('')

  const query = new URLSearchParams(props.location.search);
  let fields = query.get('fields')
  let keyword = query.get('keyword')
  let name = query.get('name')
  let option = query.get('option')
  console.log('courseslist: ' + fields + ', ' + keyword)

  useEffect(function () {

    getCoursesList()

  }, [fields, keyword])

  function getCoursesList(pageNumber = 1) {

    let myNumLimit = 8
    let myNumSkip = (pageNumber - 1) * myNumLimit
    myNumLimit *= pageNumber

    if (fields == 'topic') {
      setLabel(`topic: ${name}`)

      myRequest({
        method: 'get',
        url: `${myConfig.apiServerAddress}/api/custom/Courses/ByTopic`,
        params: {
          topic: keyword,
          numLimit: myNumLimit,
          numSkip: myNumSkip
        }
      },
        function ok(response) {
          setCourses([...response.data])

        },
      )
    } else if (fields == 'categoryId') {
      setLabel(`category: ${name}`)

      myRequest({
        method: 'get',
        url: `${myConfig.apiServerAddress}/api/custom/Courses/ByCategoryId`,
        params: {
          categoryId: keyword,
          numLimit: myNumLimit,
          numSkip: myNumSkip
        }
      },
        function ok(response) {
          setCourses([...response.data])

        },
      )
    } else if (fields == 'search') {
      setLabel(`keyword: ${keyword}`)
      myRequest({
        method: 'get',
        url: `${myConfig.apiServerAddress}/api/custom/Courses/search`,
        params: {
          keyword: keyword,
          // fields: 'name,category.name,category.topic',
          fields: option,
          numLimit: myNumLimit,
          numSkip: myNumSkip
        }
      },
        function ok(response) {
          setCourses([...response.data])

        },
      )
    }
  }

  function handlePageChanged(event, pageNumber) {
    console.log('courseslist: page: ', pageNumber)

    getCoursesList(pageNumber)
  }

  function handleSortPriceClicked(order) {

    courses.sort(function (a, b) {
      let finalPriceA = a.price * (1 - a.saleOffPercent)
      let finalPriceB = b.price * (1 - b.saleOffPercent)
      console.log('sort: ' + finalPriceA + ', ' + finalPriceB)
      return order * (finalPriceA - finalPriceB)
    });
    setCourses([...courses])
  }

  function handleSortPointClicked(order) {

    courses.sort(function (a, b) {
      let pointA = 0
      let pointB = 0
      try {
        pointA = a.feedback.avgRatePoint
      } catch (e) { }
      try {
        pointB = b.feedback.avgRatePoint
      } catch (e) { }

      return order * (pointA - pointB)
    });
    setCourses([...courses])
  }


  return (
    <main>
      <div className={classes.heroContent}>
        <Container maxWidth="sm">
          <Typography style={{ fontSize: 36 }} align="center" color="textPrimary">
            Course List
          </Typography>
          <Typography variant="h5" align="center" color="textSecondary" paragraph>
            Showing results for {label}
          </Typography>
          <Typography variant="h6" align="center" color="textSecondary">
            Sort by:
          </Typography>
          <div>
            <Grid container spacing={2} justify="center">
              <Grid item>
                <Button variant="contained" className={classes.descButton}
                  onClick={handleSortPointClicked.bind(null, -1)}>
                  Descending points
                </Button>
              </Grid>
              <Grid item>
                <Button variant="outlined" className={classes.ascButton}
                  onClick={handleSortPointClicked.bind(null, 1)}>
                  Ascending points
                </Button>
              </Grid>
              <Grid item>
                <Button variant="contained" className={classes.descButton}
                  onClick={handleSortPriceClicked.bind(null, -1)}>
                  Descending price
                </Button>
              </Grid>
              <Grid item>
                <Button variant="outlined" className={classes.ascButton}
                  onClick={handleSortPriceClicked.bind(null, 1)}>
                  Ascending price
                </Button>
              </Grid>
            </Grid>
          </div>
        </Container>
      </div>
      <Container className={classes.cardGrid} maxWidth="md">
        <Grid container spacing={2}>
          {courses.map((course) => (
            <Grid item key={course.id} xs={6} sm={4} md={3}>
              <CourseCard course={course}></CourseCard>
            </Grid>
          ))}
        </Grid>
      </Container>
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
    </main>
  );
}