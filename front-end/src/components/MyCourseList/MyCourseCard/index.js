import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
// import Link from '@material-ui/core/Link'
import Button from '@material-ui/core/Button';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Hidden from '@material-ui/core/Hidden';
import styled from 'styled-components';

import store from '../../../redux/store.js'
import myRequest from "../../../helpers/myRequest";
import myConfig from '../../../helpers/myConfig';
import {
    Link,
} from 'react-router-dom';
import Chip from '@material-ui/core/Chip';
import moment from 'moment-timezone';

const TitleStyled = styled.div `
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 1; /* number of lines to show */
    -webkit-box-orient: vertical;
`;

const DescriptionStyled = styled.div `
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2; /* number of lines to show */
    -webkit-box-orient: vertical;
`;

const useStyles = makeStyles({
    title: {
        fontFamily: "Arial",
        fontWeight: 500,
        color: '#0088cc'
    },
    category: {
        color: '#005580',
        fontWeight: 600,
    },
    resumeButton: {
        borderColor: "#005580",
        color: '#005580'
    },
    card: {
        display: 'flex',
    },
    cardDetails: {
        flex: 1,
    },
    cardMedia: {
        width: 160,
    },
});

export default function MyCourseCard({ item, course, isShowFavoriteButton, isShowEditButton }) {
    const classes = useStyles();
    // const { course } = props;
    const preventDefault = (event) => event.preventDefault();

    function handleRemoveClicked(itemId, event) {

        myRequest({
                method: 'delete',
                url: `${myConfig.apiServerAddress}/api/watchLists/${itemId}`,
                headers: {
                    'x-access-token': localStorage.getItem('accessToken')
                }
            },
            function ok(response) {

                let newWatchList = []
                let watchList = store.getState().watchList
                watchList.forEach(function(item) {
                    if (item.id != itemId) {
                        newWatchList.push(item)
                    }
                })

                store.dispatch({
                    type: 'set_watchList',
                    payload: {
                        data: newWatchList
                    }
                });

            },
            function fail(error) {
                console.log('mycoursecard: delete fail')
            }
        )

    }

    return (
        <Grid item xs={12}>
      {/* <CardActionArea component="a" href="#"> */}
      <Card className={classes.card}>
        <div className={classes.cardDetails}>
          <CardContent>
            <Typography component="h2" variant="h5">
              <Link to="#" onClick={preventDefault} style={{ textDecoration: 'none' }} className={classes.title}>
                <TitleStyled>
                  {course.name}
                </TitleStyled>

                {
                  course.isCompleted ? 
                  (
                    <Chip
                  size="small"
                    label='completed'
                    color='primary'
                  />

                  ): ''
                }
                

              </Link>
            </Typography>
            <Grid container direction="row" style={{ marginTop: 10 }}>
              <Grid item container>
                <Typography variant="subtitle2" color="textSecondary" style={{ flexGrow: 1 }}>
                  {course.teacher.name}
                </Typography>
                <Typography variant="subtitle2">
                  <Link to="#" onClick={preventDefault} style={{ textDecoration: 'none' }} className={classes.category}>
                    {course.category.name}
                  </Link>
                </Typography>
              </Grid>
              <Grid item>
                <Typography variant="subtitle2" color="textSecondary">
                  Last updated: 
                  {
                    moment.tz(course.updatedAt, 'Africa/Abidjan')
                    .clone()
                    .tz('Asia/Ho_Chi_Minh').format('YYYY-MM-DD HH:mm:ss')
                  }
                </Typography>
              </Grid>
            </Grid>
            <Typography variant="subtitle1" style={{ marginTop: 10 }}>
              <DescriptionStyled>
                {course.shortDescription}
              </DescriptionStyled>
            </Typography>

            <Link to={`/courses/${course.id}`}>
            <Button variant="outlined" className={classes.resumeButton} style={{ marginTop: 10 }}>
              View course
              </Button>
            </Link>
                          {
                isShowFavoriteButton ?
                (<Button variant="contained" color="secondary" className={classes.removeButton} 
                  style={{ marginTop: 10, marginLeft: 10 }}
                  onClick={handleRemoveClicked.bind(null, item.id)}>
              Remove
            </Button>)
                : ''
              }

              {
                isShowEditButton?
                (
                  <Link to={`/courses/${course.id}/edit`}>
                  <Button variant="contained" color="secondary" className={classes.removeButton} 
                        style={{ marginTop: 10, marginLeft: 10 }}
                        >
                    Edit
                  </Button>
                  </Link>
                 ):''
              }

          </CardContent>
        </div>
        <Hidden xsDown>
          <CardMedia className={classes.cardMedia} image={course.imageUrl} />
        </Hidden>
      </Card>
      {/* </CardActionArea> */}
    </Grid>
    );
}

MyCourseCard.propTypes = {
    course: PropTypes.object,
};