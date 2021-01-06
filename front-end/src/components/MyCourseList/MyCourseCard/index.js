import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import Link from '@material-ui/core/Link'
import Button from '@material-ui/core/Button';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Hidden from '@material-ui/core/Hidden';
import styled from 'styled-components';

const TitleStyled = styled.div`
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 1; /* number of lines to show */
    -webkit-box-orient: vertical;
`;

const DescriptionStyled = styled.div`
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

export default function MyCourseCard(props) {
  const classes = useStyles();
  const { course } = props;
  const preventDefault = (event) => event.preventDefault();

  return (
    <Grid item xs={12}>
      {/* <CardActionArea component="a" href="#"> */}
      <Card className={classes.card}>
        <div className={classes.cardDetails}>
          <CardContent>
            <Typography component="h2" variant="h5">
              <Link href="#" onClick={preventDefault} style={{ textDecoration: 'none' }} className={classes.title}>
                <TitleStyled>
                  {course.title}
                </TitleStyled>
              </Link>
            </Typography>
            <Grid container direction="row" style={{ marginTop: 10 }}>
              <Grid item container>
                <Typography variant="subtitle2" color="textSecondary" style={{ flexGrow: 1 }}>
                  {course.leturer}
                </Typography>
                <Typography variant="subtitle2">
                  <Link href="#" onClick={preventDefault} style={{ textDecoration: 'none' }} className={classes.category}>
                    {course.category}
                  </Link>
                </Typography>
              </Grid>
              <Grid item>
                <Typography variant="subtitle2" color="textSecondary">
                  Last accessed - {course.last_updated}
                </Typography>
              </Grid>
            </Grid>
            <Typography variant="subtitle1" style={{ marginTop: 10 }}>
              <DescriptionStyled>
                {course.description}
              </DescriptionStyled>
            </Typography>
            <Button variant="outlined" className={classes.resumeButton} style={{ marginTop: 10 }}>
              Resume course
              </Button>
          </CardContent>
        </div>
        <Hidden xsDown>
          <CardMedia className={classes.cardMedia} image={course.thumbnail} />
        </Hidden>
      </Card>
      {/* </CardActionArea> */}
    </Grid>
  );
}

MyCourseCard.propTypes = {
  course: PropTypes.object,
};