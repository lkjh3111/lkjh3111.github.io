import React, { useState, useRef, useEffect } from "react";
import Modal from "../../Ui/Modal";
import TheButton from "../../Ui/TheButton";
import classes from "./Login.module.css";
import { Link, useNavigate } from "react-router-dom";
// import CartContext from "../store/cartcontext";

const Login = (props) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const modalRef = useRef();

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        props.onLogin();
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

  const handleLogin = (e) => {
    e.preventDefault();
    // Perform login logic here with username and password
    // Reset the form fields
    setUsername("");
    setPassword("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    navigate("/dashboard");
  };

  return (
    <Modal onLogin={props.onLogin}>
      {/* <div>
        <div>
          <p>Login</p>
        </div>
        <div>
          <TheButton>Login</TheButton>
        </div>
      </div> */}
      <div className={classes.login_modal_content} ref={modalRef}>
        <div>
          <h2>Login</h2>
        </div>
        <div>
          <form
            // onSubmit={handleLogin}
            onSubmit={handleSubmit}
          >
            <div className='mb-3'>
              <label className={classes.input__label}>Email</label>
              <input
                type='text'
                placeholder='Enter Email'
                value={username}
                onChange={handleUsernameChange}
              />
            </div>
            <div className='mb-2'>
              <label className={classes.input__label}>Password</label>
              <input
                type='password'
                placeholder='Enter Password'
                value={password}
                onChange={handlePasswordChange}
              />
            </div>
            <div>
              {/* <div> */}
              <label className={classes.remember__label}>
                <input
                  type='checkbox'
                  className={classes.checkbox}
                  id='customCheck1'
                />
                Remember me
              </label>
              {/* </div> */}
            </div>
            <div className={classes.button_modal_div}>
              <TheButton type='submit' onClick={handleSubmit}>
                Login
              </TheButton>
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

export default Login;
