import React, { useState } from "react";
import TheButton from "../Ui/TheButton";
import TransparentButton from "../Ui/TransparentButton";
import classes from "./HomeSection.module.css";
import { Row, Col, Container } from "react-bootstrap";
import { Link } from "react-scroll";
import "bootstrap/dist/css/bootstrap.min.css";
import DevicesImage from "../../assets/image/devices.webp";
// import BackgroundImage from "../../assets/image/chart.png";

const HomeSection = () => {
  //Rendering the Hero section(Landing page) on the DOM
  // const [isClicked, setIsClicked] = useState(false);
  // const handleClick = () => {
  //   setIsClicked(!isClicked);
  // };

  // const underline = () => {
  //   let className = classes.number__properties__text;
  //   if (isClicked) {
  //     className = classes.number__properties__text__underline;
  //   }
  //   return className;
  // };

  return (
    <section id='home' className={classes.bg_image}>
      <Container className={classes.container}>
        <Row>
          <div
            className={classes.devices__image}
            src={DevicesImage}
            fluid='true'
            alt='Devices pic'
            data-aos='fade-left'
            data-aos-easing='ease-out'
            data-aos-duration='1500'
          >
            {/* <img
            className={classes.devices__image}
            src={DevicesImage}
            fluid='true'
            alt='Devices pic'
            data-aos='fade-left'
            data-aos-easing='ease-out'
            data-aos-duration='1500'
          ></img> */}
          </div>
          {/* <Row className={`${classes.row} mx-auto`}> */}
          {/* <div className={`ms-auto`}>
            <img
              // className={classes.devices__image}
              src={BackgroundImage}
              fluid='true'
              alt='Background pic'
            ></img>
          </div> */}
          {/* <Col
            lg={6}
            className='p-0'
            data-aos='fade-right'
            data-aos-easing='ease-out'
            data-aos-duration='1500'
          > */}
          <div>
            <div
              className={classes.text__div}
              data-aos='fade-right'
              data-aos-easing='ease-out'
              data-aos-duration='1500'
            >
              <h1>Trade Stocks, Forex and Crypto</h1>
            </div>
            <div
              className={classes.buttons}
              data-aos='fade-right'
              data-aos-easing='ease-out'
              data-aos-duration='1500'
            >
              <Link
                className={classes.trade_now_button}
                z
                // to='dishes'
                spy={true}
                smooth={true}
                offset={-50}
                duration={500}
              >
                <TheButton>Trade Now</TheButton>
              </Link>
              <Link
                className={classes.practice_button}
                // to='dishes'
                spy={true}
                smooth={true}
                offset={-50}
                duration={500}
              >
                <TransparentButton>Free Practice Account</TransparentButton>
              </Link>
            </div>
          </div>
        </Row>
        <Row className={classes.markets}>
          <div
            data-aos='fade-up'
            data-aos-easing='ease-out'
            data-aos-duration='500'
          >
            <div className={classes.markets__properties}>
              <div>
                <span className={classes.markets__properties__text}>Forex</span>
              </div>
              <div>
                <span className={classes.markets__properties__text}>
                  Stocks
                </span>
              </div>
              <div>
                <span className={classes.markets__properties__text}>
                  Crypto
                </span>
              </div>
              <div>
                <span className={classes.markets__properties__text}>
                  Commodities
                </span>
              </div>
              <div>
                <span className={classes.markets__properties__text}>
                  Indices
                </span>
              </div>
              <div>
                <span className={classes.markets__properties__text}>ETFs</span>
              </div>
            </div>
          </div>
        </Row>
      </Container>
    </section>
  );
  //END
};

export default HomeSection;
