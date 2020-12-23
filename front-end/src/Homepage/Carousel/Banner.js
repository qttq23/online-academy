import React from 'react';
import Carousel from 'react-bootstrap/Carousel'

const Banner = () => {
    return (
        <Carousel style={{marginTop: "10px"}}>
  <Carousel.Item>
    <img
      className="d-block w-100"
      style={{height: "400px"}}
      src="https://img-a.udemycdn.com/notices/home_banner/image_udlite/8a5d045c-2dd2-4a4d-bb0e-a487af8a5aa0.jpg?MLuRJsjVBUoB9RXLXv3GHdvABGMNsyOTompcJSxzoyJVdjwKwPm08Fb1YDRCgHg5AWmiSCAi8hnvJUqmtuPdKWdIq3JcXPx5K5crzYEpku_Ri9lmO_aYHMov_a80bY07Qs2BzbPLSasVjHw9vRZehzDaQPQ9r7qpmJqdlh0nZx09qlIw9plrOA"
      alt="First slide"
    />
  </Carousel.Item>
  <Carousel.Item>
    <img
      className="d-block w-100"
      style={{height: "400px"}}
      src="https://image.freepik.com/free-vector/back-school-concept-boy-learning-with-computer-home-vector_218660-266.jpg"
      alt="Third slide"
    />
  </Carousel.Item>
  <Carousel.Item>
    <img
      className="d-block w-100"
      style={{height: "400px"}}
      src="https://img.freepik.com/free-vector/e-learning-concept-banner-online-education-cute-school-boy-using-laptop-study-home-with-hand-drawn-elements-web-courses-tutorials-software-learning-flat-cartoon-illustration_255592-21.jpg?size=664&ext=jpg&ga=GA1.2.1293713313.1608706153"
      alt="Third slide"
    />
  </Carousel.Item>
</Carousel>
    )
}

export default Banner;