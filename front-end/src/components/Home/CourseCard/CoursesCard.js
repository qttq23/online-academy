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

import myConfig from '../../../helpers/myConfig';
import {
    Link,
} from 'react-router-dom';

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

export default function CourseCard({course}) {
    const classes = useStyles();

    let ratePoint = 0
    let timesRate = 0
    let price = 0
    let priceAfterSaleOff = 0
    let category = 'loading...'
    let imageUrl = myConfig.defaultImageUrl
    let id = ''
    if(course){

        category = `${course.category.topic}/${course.category.name}`

        if (course.feedback) {
            ratePoint = course.feedback.avgRatePoint
            timesRate = course.feedback.timesRate

        }

        price = course.price
        priceAfterSaleOff = price
        if(course.saleOffPercent && course.saleOffPercent != 0){
            priceAfterSaleOff = course.saleOffPercent * price
        }

        imageUrl = course.imageUrl
        id = course.id
    }

    return (
        <Link to={`/courses/${id}`} style={{ textDecoration: 'none' }}>
            <Card className={classes.root}>
            <CardActionArea>
                <CardMedia
                    square
                    component="img"
                    alt="Contemplative Reptile"
                    height="150"
                    image={imageUrl}
                />
                <CardContent>
                    <Typography className={classes.category}>
                        {category}
                    </Typography>
                    <Typography className={classes.title}>
                        <TitleStyled>
                            {/* The Complete 2020 Flutter Development Bootcamp with Dart */}
                            {course ? course.name : 'loading...'}
                        </TitleStyled>
                    </Typography>
                    <Typography className={classes.author} color="textSecondary">
                        {/* Andrew Garfield */}
                        {course ? course.teacher.name : 'loading...'}
                    </Typography>
                    <Grid item container spacing={0}>
                        <Grid item>
                            <Typography className={classes.rating}>
                                {/* 5 */}
                                {ratePoint}
                            </Typography>
                        </Grid>
                        <Grid item>
                            <Rating value={ratePoint} size="small" readOnly style={{ marginTop: 1 }} />
                        </Grid>
                        <Grid item>
                            <Typography className={classes.ratingCount} color="textSecondary">
                                ({timesRate})
                                </Typography>
                        </Grid>
                    </Grid>
                    <Grid container style={{ marginTop: 5 }}>
                        <Grid item>
                            <Typography className={classes.price}>
                                ${priceAfterSaleOff}
                            </Typography>
                        </Grid>
                        {
                            price == priceAfterSaleOff ? '':
                                <Grid item style={{ marginTop: 3, marginLeft: 10, textDecoration: 'line-through' }}>
                                    <Typography>
                                        ${price}
                                    </Typography>
                                </Grid>
                        }
                        
                    </Grid>
                </CardContent>
            </CardActionArea>
        </Card>
        </Link>
    );
}