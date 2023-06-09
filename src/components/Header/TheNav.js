import React from "react";
import TheNavbar from "./TheNavbar";

const TheNav = (props) => {
  //Rendering the Navbar
  return (
    <header>
      {/* <TheNavbar onShowLogin={props.onShowLogin} /> */}
      <TheNavbar />
    </header>
  );
  //END
};

export default TheNav;
