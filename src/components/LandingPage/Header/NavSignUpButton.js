import classes from "./NavSignUpButton.module.css";

const NavSignUpButton = (props) => {
  return (
    <div onClick={props.onClick} className={classes.sign__up__button}>
      Sign Up
    </div>
  );
};

export default NavSignUpButton;
