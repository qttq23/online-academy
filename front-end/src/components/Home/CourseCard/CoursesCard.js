import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Rating from '@material-ui/lab/Rating'
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { Grid } from '@material-ui/core'
import styled from 'styled-components';

const TitleStyled = styled.div`
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2; /* number of lines to show */
    -webkit-box-orient: vertical;
`;

const useStyles = makeStyles({
    root: {
        maxWidth: 245,
        minHeight: 300
    },
    category: {
        color: '#005580',
        fontWeight: 600,
        fontSize: 14,
    },
    title: {
        color: 'black',
        fontWeight: 600,
        fontSize: 18,
    },
    author: {
        fontSize: 15,
        marginTop: 5
    },
    rating: {
        color: '#e6ac00',
        fontWeight: 700,
        fontSize: 15,
    },
    ratingCount: {
        fontSize: 15,
    },
    price: {
        color: 'black',
        fontSize: 20,
    }
});

export default function CourseCard() {
    const classes = useStyles();

    return (
        <Card className={classes.root}>
            <CardActionArea>
                <CardMedia
                    square
                    component="img"
                    alt="Contemplative Reptile"
                    height="150"
                    image="https://images.pexels.com/photos/67636/rose-blue-flower-rose-blooms-67636.jpeg"
                />
                <CardContent>
                    <Typography className={classes.category}>
                        Mobile Development
                    </Typography>
                    <Typography className={classes.title}>
                        <TitleStyled>
                            The Complete 2020 Flutter Development Bootcamp with Dart
                        </TitleStyled>
                    </Typography>
                    <Typography className={classes.author} color="textSecondary">
                        Andrew Garfield
                    </Typography>
                    <Grid item container spacing={0}>
                        <Grid item>
                            <Typography className={classes.rating}>5</Typography>
                        </Grid>
                        <Grid item>
                            <Rating value={5} size="small" readOnly style={{ marginTop: 1 }} />
                        </Grid>
                        <Grid item>
                            <Typography className={classes.ratingCount} color="textSecondary">(500,000)</Typography>
                        </Grid>
                    </Grid>
                    <Grid container style={{ marginTop: 5 }}>
                        <Grid item>
                            <Typography className={classes.price}>
                                $15.99
                            </Typography>
                        </Grid>
                        <Grid item style={{ marginTop: 3, marginLeft: 10, textDecoration: 'line-through' }}>
                            <Typography>
                                $100.99
                            </Typography>
                        </Grid>
                    </Grid>
                </CardContent>
            </CardActionArea>
        </Card>
    );
}