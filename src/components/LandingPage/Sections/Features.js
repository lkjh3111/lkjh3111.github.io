import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import classes from "./Features.module.css";
import feature1 from "../../../assets/image/feature1.jpeg";
import feature2 from "../../../assets/image/feature2.jpeg";
import feature3 from "../../../assets/image/feature3.jpg";

const Features = () => {
  return (
    <section id="mobile-app">
      <Container>
        <Row
          className={`${classes.row} mx-auto`}
          data-aos="fade-up"
          data-aos-easing="ease-out"
          data-aos-duration="700"
        >
          <Col xs={12}>
            <div className={classes.header_div}>
              <h2>Features</h2>
            </div>
          </Col>
        </Row>

        <Row className={`${classes.row_content} mx-auto`}>
          <Col
            lg={6}
            data-aos="fade-right"
            data-aos-easing="ease-out"
            data-aos-duration="700"
          >
            <div className={classes.text_div}>
              <h3>Analysis & Alerts</h3>
              <p className={classes.text_content}>
                Get the most out of fundamental and technical analysis with our
                News Feed and Economic Calendars. More than 100 most widely-used
                technical indicators and widgets. Always stay up-to-date on what
                is happening in financial markets with our customizable price
                alerts.
              </p>
            </div>
          </Col>
          <Col
            lg={6}
            data-aos="fade-left"
            data-aos-easing="ease-out"
            data-aos-duration="700"
          >
            <div className={classes.image_div}>
              <img className={classes.image} src={feature1} alt="about"></img>
            </div>
          </Col>
        </Row>

        <Row className={`${classes.row_content} mx-auto`}>
          <Col
            lg={{ span: 6, order: 1 }}
            data-aos="fade-right"
            data-aos-easing="ease-out"
            data-aos-duration="700"
            xs={{ span: 12, order: 2 }}
          >
            <div className={classes.image_div}>
              <img className={classes.image} src={feature2} alt="about"></img>
            </div>
          </Col>
          <Col
            // lg={6}
            lg={{ span: 6, order: 2 }}
            data-aos="fade-left"
            data-aos-easing="ease-out"
            data-aos-duration="700"
            xs={{ span: 12, order: 1 }}
          >
            <div className={classes.text_div}>
              <h3>Risk Management</h3>
              <p className={classes.text_content_right}>
                With features such as Stop Loss/Take Profit, Negative Balance
                Protection and Trailing Stop, you can manage your losses and
                profits at the levels you set.
              </p>
            </div>
          </Col>
        </Row>

        <Row className={`${classes.row_content} mx-auto`}>
          <Col
            lg={6}
            data-aos="fade-right"
            data-aos-easing="ease-out"
            data-aos-duration="700"
          >
            <div className={classes.text_div}>
              <h3>Trading Community</h3>
              <p className={classes.text_content}>
                Join the massive 158 Forex Trading community, discuss trading
                ideas and opportunities, or simply follow other traders with
                features like Trader Sentiment and Community Live Trades.
              </p>
            </div>
          </Col>
          <Col
            lg={6}
            data-aos="fade-left"
            data-aos-easing="ease-out"
            data-aos-duration="700"
          >
            <div className={classes.image_div}>
              <img className={classes.image} src={feature3} alt="about"></img>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
  //END
};

export default Features;
