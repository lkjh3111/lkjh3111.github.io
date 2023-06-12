import React from "react";
import { Row, Col, Container } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import classes from "./Footer.module.css";
import Logo from "../../../assets/Logo/test.svg";
import { Link } from "react-scroll";
import insta from "../../../assets/Icon/instagram.png";
import twitter from "../../../assets/Icon/twitter.png";
import fb from "../../../assets/Icon/facebook.png";

const Footer = () => {
  //Structure & layout of the footer
  return (
    <div className={classes.footer_bg}>
      <Container>
        <Row className={classes.row}>
          <Col lg={6}>
            <div className={classes.info}>
              <div className={classes.navbar_brand}>
                <Link
                  to='hero'
                  // spy={true}
                  // smooth={true}
                  // offset={-50}
                  // duration={500}
                >
                  <img
                    // className={classes.navbar_brand}
                    src={Logo}
                    alt='logo'
                  ></img>
                  <span className={classes.navbar__text}>
                    158 Forex Trading
                  </span>
                </Link>
              </div>
              <div className={classes.content_div}>
                <h5>Risk Warning</h5>
                <p>
                  Trading in financial markets involves a high level of risk and
                  may not be suitable for all individuals. Before engaging in
                  any trading activities, it is important to carefully consider
                  your financial situation, investment objectives, and risk
                  tolerance.
                </p>
                <p>&copy;2023</p>
              </div>
            </div>
          </Col>

          <Col lg={3}>
            <div className={classes.about}>
              <h3>About</h3>
              <p>Terms & Conditions</p>
              <p>Affiliate Program</p>
              <p>Contact Us</p>
              <p>Our Blog</p>
              <p>Sitemap</p>
            </div>
          </Col>

          <Col lg={3}>
            <div className={classes.social}>
              <h3>Social</h3>
              <a
                href='https://www.instagram.com'
                target='_blank'
                rel='noreferrer'
              >
                <p>
                  <img
                    src={insta}
                    alt='instagram'
                    className={classes.social_icon}
                  ></img>
                </p>
              </a>
              <a
                href='https://mobile.twitter.com'
                target='_blank'
                rel='noreferrer'
              >
                <p>
                  <img
                    src={twitter}
                    alt='twitter'
                    className={classes.social_icon}
                  ></img>
                </p>
              </a>
              <a
                href='https://www.facebook.com'
                target='_blank'
                rel='noreferrer'
              >
                <p>
                  <img
                    src={fb}
                    alt='facebook'
                    className={classes.social_icon}
                  ></img>
                </p>
              </a>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
  //END
};

export default Footer;
