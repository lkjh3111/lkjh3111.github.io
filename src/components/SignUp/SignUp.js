import React, { useContext, useState, useRef, useEffect } from "react";
import Modal from "../Ui/Modal";
import TheButton from "../Ui/TheButton";
import classes from "./SignUp.module.css";
// import CartContext from "../store/cartcontext";

const SignUp = (props) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const modalRef = useRef();

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        props.onSignUp();
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSignUp = (e) => {
    e.preventDefault();
    // Perform login logic here with username and password
    // Reset the form fields
    setUsername("");
    setPassword("");
    setConfirmPassword("");
  };
  return (
    <Modal onSignUp={props.onSignUp}>
      {/* <div>
        <div>
          <p>Login</p>
        </div>
        <div>
          <TheButton>Login</TheButton>
        </div>
      </div> */}
      <div className={classes.signup_modal_content} ref={modalRef}>
        <div>
          <h2>Sign Up</h2>
        </div>
        <div>
          <form onSubmit={handleSignUp}>
            <div className='mb-3'>
              <label className={classes.input__label}>Email</label>
              <input
                type='text'
                placeholder='Enter Email'
                value={username}
                onChange={handleUsernameChange}
              />
            </div>
            <div className='mb-3'>
              <label className={classes.input__label}>Password</label>
              <input
                type='password'
                placeholder='Enter Password'
                value={password}
                onChange={handlePasswordChange}
              />
            </div>
            <div className='mb-3'>
              <label className={classes.input__label}>Confirm Password</label>
              <input
                type='password'
                placeholder='Re-enter Password'
                value={confirmPassword}
                onChange={handlePasswordChange}
              />
            </div>
            <div className={classes.button_modal_div}>
              <TheButton type='submit'>Sign Up</TheButton>
            </div>
          </form>
        </div>
        {/* <button className='close-button' onClick={props.onLogin}>
          Close
        </button> */}
      </div>
    </Modal>
  );
};

// ENDS

export default SignUp;
