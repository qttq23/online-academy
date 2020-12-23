import "./style.css";
import React from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import ReactStars from "react-rating-stars-component";
import { Col, Row } from "react-bootstrap";

const CourseCard = (props) => {
  const ratingChanged = (newRating) => {
    console.log(newRating);
  };

  return (
    <div>
      <Card style={{ marginBottom: "25px", marginRight: "15px" }}>
        <Card.Img
          variant="top"
          src="https://img-a.udemycdn.com/course/240x135/1217894_e8cc_4.jpg?HAOW0-oEz-gClIbyNOIrnrZP8okkolW4EE4A2qNcUxL4PuqK4s_yihPscArFHZ5iZK_iPKtvtSPAs1KK0JU1wyxJKgG16leGtEpWKYnx_cPBHkBQAkJhs5IffuKh-MFU"
        />
        <Card.Body>
          <Card.Title style={{ marginBottom: "5px" }} className="title">
            {props.coursename}
          </Card.Title>
          <div className="author" style={{ marginBottom: 0 }}>
            {props.author}
          </div>
          <div style={{ marginBottom: "0" }}>
            <Row>
              <Col xs={1}>
                <p
                  className="text-in-col"
                  style={{ fontWeight: "bold", color: "#ffd700" }}
                >
                  5
                </p>
              </Col>
              <Col style={{ padding: "0" }}>
                <ReactStars
                  value={5}
                  count={5}
                  size={24}
                  isHalf={true}
                  emptyIcon={<i className="far fa-star"></i>}
                  halfIcon={<i className="fa fa-star-half-alt"></i>}
                  fullIcon={<i className="fa fa-star"></i>}
                  activeColor="#ffd700"
                />
              </Col>
              <Col xs={4} style={{ padding: "0", marginRight: "30px" }}>
                <p className="text-in-col author">(200,000)</p>
              </Col>
            </Row>
          </div>
          <Card.Text className="price">199$</Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
};

export default CourseCard;
