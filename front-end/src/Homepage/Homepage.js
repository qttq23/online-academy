import React from 'react'
import Banner from './Carousel/Banner';
import Container from 'react-bootstrap/Container'
import Headline from './Headline/Headline';
import CourseCarousel from './CourseCarousel/CourseCarousel'

const Homepage = () => {
    return (
        <Container>
            <Banner></Banner>
            <Headline headlineName="Outstanding Courses"></Headline>
            <CourseCarousel></CourseCarousel>
            <Headline headlineName="Most View Courses"></Headline>
            <CourseCarousel></CourseCarousel>
            <Headline headlineName="Most Buying Courses"></Headline>
            <CourseCarousel></CourseCarousel>
        </Container>
    )
}

export default Homepage;