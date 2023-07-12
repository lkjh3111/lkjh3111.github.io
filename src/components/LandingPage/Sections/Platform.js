import React from "react";
import { Row, Container, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import classes from "./Platform.module.css";
import platform from "../../../assets/image/app.png";

const Platform = () => {
  return (
    <>
      <section id="about">
        <Container>
          <Row className={`${classes.row} mx-auto`}>
            <Col
              lg={6}
              data-aos="fade-right"
              data-aos-easing="ease-out"
              data-aos-duration="700"
            >
              <div className={classes.text_div}>
                <h2 className={classes.text_header}>
                  Enjoy the ultimate platform
                </h2>
                <p className={classes.text_content}>
                  A multichart layout, technical analysis, historical quotes and
                  beyond. Everything you're looking for in a platform — on the
                  device of your choice.
                </p>
              </div>
            </Col>
            <Col lg={6}>
              <div
                className={classes.image_div}
                data-aos="fade-left"
                data-aos-easing="ease-out"
                data-aos-duration="700"
              >
                <img
                  className={classes.image}
                  src={platform}
                  alt="platform"
                ></img>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
  //END
};

export default Platform;
