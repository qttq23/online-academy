import React from 'react';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Pagination from '@material-ui/lab/Pagination';
import CourseCard from '../Home/TopCoursesContainer/CourseCard';

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

export default function CourseList() {
  const classes = useStyles();

  return (
    <main>
      <div className={classes.heroContent}>
        <Container maxWidth="sm">
          <Typography style={{ fontSize: 36 }} align="center" color="textPrimary">
            Courses (29 results)
          </Typography>
          <Typography variant="h5" align="center" color="textSecondary" paragraph>
            Showing results for all courses
          </Typography>
          <Typography variant="h6" align="center" color="textSecondary">
            Sort by:
          </Typography>
          <div>
            <Grid container spacing={2} justify="center">
              <Grid item>
                <Button variant="contained" className={classes.descButton}>
                  Descending points
                </Button>
              </Grid>
              <Grid item>
                <Button variant="outlined" className={classes.ascButton}>
                  Ascending price
                </Button>
              </Grid>
            </Grid>
          </div>
        </Container>
      </div>
      <Container className={classes.cardGrid} maxWidth="md">
        <Grid container spacing={2}>
          {cards.map((card) => (
            <Grid item key={card} xs={6} sm={4} md={3}>
              <CourseCard></CourseCard>
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
          <Pagination count={10} shape="rounded" size="large" />
        </Grid>
      </Grid>
    </main>
  );
}