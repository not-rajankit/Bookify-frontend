import React from "react";
import { Row, Col, Container } from "reactstrap";
import img from "../assets/images/about.jpg";
import "../styles/about.css";

const About = () => {
  return (
    <Container>
      <Row>
        <Col lg="6">
          <div className="img-box">
            <img src={img} />
          </div>
        </Col>
        <Col lg="6">
          <div className="cont p-2">
            <h2 className="mb-3">Welcome to the Library Management System!</h2>
            <p className="about">
              This library management system is designed to provide an easy and
              efficient way for users to find and borrow books, and for
              librarians to manage the library's inventory and users. Our goal
              is to create a user-friendly system that meets the needs of both
              library users and librarians, while also leveraging the latest
              technologies to provide a seamless experience.
            </p>
            <h3 className="my-3">Technology</h3>
            <p className="about">
              This library management system is built using the MERN stack,
              which includes MongoDB, Express, React, and Node.js. I also
              leverage other tools and libraries, such as Redux and JSON Web
              Tokens, to create a fast and efficient system that is easy to use
              and maintain. This system is designed to be scalable and flexible,
              so it can be customized to meet the unique needs of any library.
            </p>
          </div>
        </Col>
      </Row>

      <Row>
        <Col lg="4"></Col>
        <Col lg="8"></Col>
      </Row>
    </Container>
  );
};

export default About;
