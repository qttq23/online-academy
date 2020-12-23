import React from 'react';
import Carousel from 'react-multi-carousel';
import "react-multi-carousel/lib/styles.css";
import CourseCard from '../CourseCard/CourseCard';

const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 8
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 4
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1
    }
  };
  

const CourseCarousel = () => {
    return (

        <Carousel
        responsive={responsive}
        itemClass="carousel-item-padding-10-px">
            <CourseCard author="duc1" coursename="test"></CourseCard>
            <CourseCard author="duc2" coursename="test"></CourseCard>
            <CourseCard author="duc3" coursename="test"></CourseCard>
            <CourseCard author="duc4" coursename="test"></CourseCard>
            <CourseCard author="duc5" coursename="test"></CourseCard>
            <CourseCard author="duc6" coursename="test"></CourseCard>
            <CourseCard author="duc7" coursename="test"></CourseCard>
        </Carousel>
    );
}

export default CourseCarousel;