import React, { useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Pagination from '@material-ui/lab/Pagination';
import MyCourseCard from '../MyCourseList/MyCourseCard';

import myRequest from "../../helpers/myRequest";
import myConfig from '../../helpers/myConfig';
import store from '../../redux/store'

const useStyles = makeStyles((theme) => ({
    heroContent: {
        paddingTop: theme.spacing(4),
    },
    cardGrid: {
        paddingTop: theme.spacing(1),
        paddingBottom: theme.spacing(4),
    }
}));

const myCoursesList = [{
        title: 'The Complete 2020 Flutter Development Bootcamp with Dart',
        last_updated: 'Nov 12, 2020',
        leturer: 'Andrew Garfield',
        category: 'Mobile Development',
        description: 'Welcome to the Complete Flutter App Development Bootcamp with Dart - created in collaboration with the Google Flutter team.',
        thumbnail: 'https://source.unsplash.com/random',
    },
    {
        title: 'The Complete 2020 Flutter Development Bootcamp with Dart',
        last_updated: 'Nov 12, 2020',
        leturer: 'Andrew Garfield',
        category: 'Mobile Development',
        description: 'Welcome to the Complete Flutter App Development Bootcamp with Dart - created in collaboration with the Google Flutter team.',
        thumbnail: 'https://source.unsplash.com/random',
    },
];

export default function MyTeachList() {
    const classes = useStyles();

    let account = store.getState().account

    useEffect(() => {

        if (!account) return;

        myRequest({
                method: 'get',
                url: `${myConfig.apiServerAddress}/api/courses`,
                params: {
                    filter: `{"where": {"teacherId": "${account.id}"}, "include": ["teacher", "category"]  }`
                }
            },
            function ok(response) {

                store.dispatch({
                    type: 'set_teachList',
                    payload: {
                        data: response.data
                    }
                });

            },
            function fail(error) {
                console.log('teachList: error: ')
                console.log(error.message)
            }
        )

    }, [account])

    let teachList = store.getState().teachList

    return (
        <main>
      <div className={classes.heroContent}>
        <Container maxWidth="md">
          <Typography variant="h6" align="left" color="textSecondary">
            My teaching courses
          </Typography>
        </Container>
      </div>
      <Container className={classes.cardGrid} maxWidth="md">
        <Grid container spacing={2}>
          {teachList.map((course) => (
            <MyCourseCard key={course.title} course={course} isShowEditButton={true}/>
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
          <Pagination count={10} shape="rounded" size="large" />
        </Grid>
      </Grid>
    </main>
    );
}