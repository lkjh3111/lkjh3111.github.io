import React, { useState } from "react";
import classes from "./NavLoginButton.module.css";

const NavCartButton = (props) => {
  const [button, setButton] = useState(false);

  const changeButton = () => {
    if (window.scrollY >= 80) {
      setButton(true);
    } else {
      setButton(false);
    }
  };
  window.addEventListener("scroll", changeButton);

  return (
    <div
      onClick={props.onClick}
      className={button ? classes.login__button : classes.login__button_active}
    >
      Login
    </div>
  );
  //ENDS
};

export default NavCartButton;
