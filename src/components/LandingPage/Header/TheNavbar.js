import React from "react";
import { Navbar, Nav } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-scroll";
import classes from "./TheNavbar.module.css";
import Logo from "../../../assets/Logo/logo.svg";
import { useState } from "react";
import Login from "../Login/Login";
import SignUp from "../SignUp/SignUp";
import FormCheckbox from "../../Ui/Forms/FormCheckbox";

const TheNavbar = () => {
  const [navbar, setNavbar] = useState(false);
  const [loginIsShown, setLoginIsShown] = useState(false);
  const [signUpIsShown, setSignUpIsShown] = useState(false);
  const [isToggled, setToggled] = useState(false);
  const [loginButton, setLoginButton] = useState(false);

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
      setLoginButton(true);
    } else {
      setNavbar(false);
      setLoginButton(false);
    }
  };
  window.addEventListener("scroll", changeBackground);

  const handleToggle = () => {
    setToggled(!isToggled);
    if (!isToggled) {
      setNavbar(true);
      setLoginButton(true);
    }
  };

  return (
    <>
      <Navbar
        expand="xl"
        className={
          navbar
            ? `${classes.navbar_active} fixed-top`
            : `${classes.navbar} fixed-top`
        }
      >
        <Navbar.Brand className={classes.navbar_brand}>
          <Link
            to="home"
            spy={true}
            smooth={true}
            offset={-50}
            duration={500}
            style={{ textDecoration: "none" }}
          >
            <img src={Logo} alt="My logo"></img>
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
          aria-controls="basic-navbar-nav"
          className={classes.toggle}
          onClick={handleToggle}
        />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className={`${classes.nav__linkgroup} ms-auto`}>
            <Nav.Link className={`${classes.nav__link}`}>
              <div
                onClick={onShowLoginHandler}
                className={
                  loginButton
                    ? classes.login__button
                    : classes.login__button_active
                }
              >
                Login
              </div>
              {loginIsShown && <Login onLogin={onCloseLoginHandler} />}
            </Nav.Link>
            <Nav.Link className={`${classes.nav__link}`}>
              <div
                onClick={onShowSignUpHandler}
                className={classes.sign__up__button}
              >
                Sign Up
              </div>
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
