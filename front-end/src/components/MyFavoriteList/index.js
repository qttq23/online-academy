import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Pagination from '@material-ui/lab/Pagination';
import MyFavoriteCard from './MyFavoriteCard';

const useStyles = makeStyles((theme) => ({
  heroContent: {
    paddingTop: theme.spacing(4),
  },
  cardGrid: {
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(4),
  }
}));

const myCoursesList = [
  {
    title: 'The Complete 2020 Flutter Development Bootcamp with Dart',
    points: 4.5,
    leturer: 'Andrew Garfield',
    category: 'Mobile Development',
    description:
      'Welcome to the Complete Flutter App Development Bootcamp with Dart - created in collaboration with the Google Flutter team.',
    thumbnail: 'https://source.unsplash.com/random',
  },
  {
    title: 'The Complete 2020 Flutter Development Bootcamp with Dart',
    points: 4.8,
    leturer: 'Andrew Garfield',
    category: 'Mobile Development',
    description:
      'Welcome to the Complete Flutter App Development Bootcamp with Dart - created in collaboration with the Google Flutter team.',
    thumbnail: 'https://source.unsplash.com/random',
  },
];

export default function MyCourseList() {
  const classes = useStyles();

  return (
    <main>
      <div className={classes.heroContent}>
        <Container maxWidth="md">
          <Typography variant="h6" align="left" color="textSecondary">
            My favorite courses
          </Typography>
        </Container>
      </div>
      <Container className={classes.cardGrid} maxWidth="md">
        <Grid container spacing={2}>
          {myCoursesList.map((course) => (
            <MyFavoriteCard key={course.title} course={course} />
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