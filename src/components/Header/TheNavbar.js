import React from "react";
import NavSignUpButton from "./NavSignUpButton";
import NavLoginButton from "./NavLoginButton";
import { Navbar, Nav } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-scroll";
import classes from "./TheNavbar.module.css";
import Logo from "../../assets/Logo/test.svg";
import { useState } from "react";
import Login from "../Login/Login";
import SignUp from "../SignUp/SignUp";

const TheNavbar = (props) => {
  const [navbar, setNavbar] = useState(false);
  const [loginIsShown, setLoginIsShown] = useState(false);
  const [signUpIsShown, setSignUpIsShown] = useState(false);
  //END

  //Managing the state of the cart component using useState
  const onShowLoginHandler = () => {
    setLoginIsShown(true);
  };

  const onCloseLoginHandler = () => {
    setLoginIsShown(false);
  };

  const onShowSignUpHandler = () => {
    setSignUpIsShown(true);
  };

  const onCloseSignUpHandler = () => {
    setSignUpIsShown(false);
  };

  const changeBackground = () => {
    if (window.scrollY >= 80) {
      setNavbar(true);
    } else {
      setNavbar(false);
    }
  };
  window.addEventListener("scroll", changeBackground);

  //Layout and structure of the navbar to be passed to THENAV component
  return (
    <>
      <Navbar
        expand='xl'
        // className={`${classes.navbar} fixed-top`}
        className={
          navbar
            ? `${classes.navbar_active} fixed-top`
            : `${classes.navbar} fixed-top`
        }
        // className={`${classes.navbar_active} fixed-top`}
      >
        <Navbar.Brand className={classes.navbar_brand}>
          <Link
            to='home'
            spy={true}
            smooth={true}
            offset={-50}
            duration={500}
            style={{ textDecoration: "none" }}
          >
            {/* <div> */}
            <img src={Logo} alt='My logo'></img>
            {/* </div> */}
            <span
              className={
                navbar ? classes.navbar__text__active : classes.navbar__text
              }
            >
              158 Forex Trading
            </span>
          </Link>
        </Navbar.Brand>

        <Navbar.Toggle
          aria-controls='basic-navbar-nav'
          className={classes.toggle}
        />
        <Navbar.Collapse id='basic-navbar-nav'>
          <Nav className={`${classes.nav__linkgroup} ms-auto`}>
            {/* <Nav.Link
              className={`${classes.nav__link} ${classes.firstnav__link} me-4`}
            >
              <Link
                activeClass={classes.active}
                to='hero'
                spy={true}
                smooth={true}
                offset={-50}
                duration={500}
              >
                Home
              </Link>
            </Nav.Link> */}
            {/* <Nav.Link className={`${classes.nav__link} me-4`}>
              <Link
                activeClass={classes.active}
                to='why'
                spy={true}
                smooth={true}
                offset={-50}
                duration={500}
              >
                Why choose us
              </Link>
            </Nav.Link>
            <Nav.Link className={`${classes.nav__link} me-4`}>
              <Link
                activeClass={classes.active}
                to='dishes'
                spy={true}
                smooth={true}
                offset={-50}
                duration={500}
              >
                Our dishes
              </Link>
            </Nav.Link>
            <Nav.Link className={`${classes.nav__link} me-4`}>
              <Link
                activeClass={classes.active}
                to='about'
                spy={true}
                smooth={true}
                offset={-50}
                duration={500}
              >
                About us
              </Link>
            </Nav.Link>
            <Nav.Link className={`${classes.nav__link} me-4`}>
              <Link
                activeClass={classes.active}
                to='testimonials'
                spy={true}
                smooth={true}
                offset={-50}
                duration={500}
              >
                Testimonials
              </Link>
            </Nav.Link> */}
            <Nav.Link href='#buttons' className={`${classes.nav__link}`}>
              {/* <NavLoginButton onClick={props.onShowLogin} /> */}
              <NavLoginButton onClick={onShowLoginHandler} />
              {loginIsShown && <Login onLogin={onCloseLoginHandler} />}
            </Nav.Link>
            <Nav.Link href='#buttons' className={`${classes.nav__link}`}>
              <NavSignUpButton onClick={onShowSignUpHandler} />
              {signUpIsShown && <SignUp onSignUp={onCloseSignUpHandler} />}
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </>
  );
  //ENDS
};

export default TheNavbar;
