import React, { useState, useRef, useEffect } from "react";
import Modal from "../../Ui/Modal";
import TheButton from "../../Ui/TheButton";
import classes from "./SignUp.module.css";
import { useNavigate } from "react-router-dom";
import AuthService from "../../../services/AuthService";
import validator from "validator";

const SignUp = (props) => {
  const [state, setState] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
    // errors: {
    //   firstNameBoolean: false,
    // },
  });
  const navigate = useNavigate();

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

  const handleChange = (e) => {
    let stateUpdated = {
      ...state,
      [e.target.name]: e.target.value,
    };
    setState(stateUpdated);
  };

  const handleClear = () => {
    this.setState({
      firstName: "",
      lastName: "",
      userame: "",
      email: "",
      password: "",
    });
  };

  const handleValidation = (e) => {
    let errors = {};
    let formIsValid = true;

    if (!state.firstName) {
      formIsValid = false;
      errors["firstName"] = "Cannot be empty";
      errors["firstNameBoolean"] = true;
    }

    if (!state.lastName) {
      formIsValid = false;
      errors["lastName"] = "Cannot be empty";
      errors["lastNameBoolean"] = true;
    }

    if (!state.username) {
      formIsValid = false;
      errors["username"] = "Cannot be empty";
      errors["usernameBoolean"] = true;
    }

    if (state.email) {
      formIsValid = false;
      errors["email"] = "Cannot be empty";
      errors["emailBoolean"] = true;
    } else {
      if (!validator.isEmail(state.email)) {
        formIsValid = false;
        errors["email"] = "Invalid Contact Number";
        errors["emailBoolean"] = true;
      }
    }

    if (!state.password) {
      formIsValid = false;
      errors["password"] = "Cannot be empty";
      errors["passwordBoolean"] = true;
    }

    this.setState({ errors: errors });
    return formIsValid;
  };

  const handleSignUp = (e) => {
    e.preventDefault();
    console.log(state);
    // if (handleValidation()) {
    AuthService.signUp(
      state.firstName,
      state.lastName,
      state.username,
      state.email,
      state.password
    ).then(
      (response) => {
        navigate("/");
        window.location.reload();
      },
      (error) => {
        const message =
          (error.response &&
            error.response.data &&
            error.response.data.result) ||
          error.result ||
          error.toString();
        console.log(message);
      }
    );
    // }
  };
  return (
    <Modal onSignUp={props.onSignUp}>
      <div className={classes.signup_modal_content} ref={modalRef}>
        <div>
          <h2>Sign Up</h2>
        </div>
        <div>
          <form onSubmit={handleSignUp}>
            <div className='mb-3'>
              <label className={classes.input__label}>First Name</label>
              <input
                type='text'
                name='firstName'
                placeholder='Enter First Name'
                // error={state.errors["firstNameBoolean"]}
                // helpertext={state.errors["firstName"]}
                value={state.firstName}
                onChange={handleChange}
                autoComplete='on'
              />
            </div>
            <div className='mb-3'>
              <label className={classes.input__label}>Last Name</label>
              <input
                type='text'
                name='lastName'
                placeholder='Enter Last Name'
                // error={state.errors["lastNameBoolean"]}
                // helpertext={state.errors["lastName"]}
                value={state.lastName}
                onChange={handleChange}
                autoComplete='on'
              />
            </div>
            <div className='mb-3'>
              <label className={classes.input__label}>Username</label>
              <input
                type='text'
                name='username'
                placeholder='Enter Username'
                // error={state.errors["usernameBoolean"]}
                // helpertext={state.errors["username"]}
                value={state.username}
                onChange={handleChange}
                autoComplete='on'
              />
            </div>
            <div className='mb-3'>
              <label className={classes.input__label}>Email</label>
              <input
                type='text'
                name='email'
                placeholder='Enter Email'
                // error={state.errors["emailBoolean"]}
                // helpertext={state.errors["emailName"]}
                value={state.email}
                onChange={handleChange}
                autoComplete='on'
              />
            </div>
            <div className='mb-3'>
              <label className={classes.input__label}>Password</label>
              <input
                type='password'
                name='password'
                placeholder='Enter Password'
                // error={state.errors["passwordBoolean"]}
                // helpertext={state.errors["passwordName"]}
                value={state.password}
                onChange={handleChange}
                autoComplete='on'
              />
            </div>
            {/* <div className='mb-3'>
              <label className={classes.input__label}>Confirm Password</label>
              <input
                type='password'
                placeholder='Re-enter Password'
                value={confirmPassword}
                onChange={handlePasswordChange}
              />
            </div> */}
            <div className={classes.button_modal_div}>
              <TheButton type='submit' onClick={handleSignUp}>
                Sign Up
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

export default SignUp;
