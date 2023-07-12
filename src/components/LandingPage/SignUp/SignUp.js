import React, { useState, useRef, useEffect } from "react";
import Modal from "../../Ui/Modal";
import TheButton from "../../Ui/TheButton";
import classes from "./SignUp.module.css";
import AuthService from "../../../services/AuthService";
import { toast } from "react-toastify";

const SignUp = (props) => {
  const [state, setState] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const modalRef = useRef();

  const successNotification = () =>
    toast.success("Successfully registered. Login to proceed.");
  const failNotification = (e) => toast.error(e);

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

  const handleKeyDown = (e) => {
    e.stopPropagation();
  };

  const handleClear = () => {
    setState({
      firstName: "",
      lastName: "",
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    });
  };

  const togglePassword = (e) => {
    if (showPassword) {
      setShowPassword(false);
    } else {
      setShowPassword(true);
    }
  };

  const toggleConfirmPassword = (e) => {
    if (showConfirmPassword) {
      setShowConfirmPassword(false);
    } else {
      setShowConfirmPassword(true);
    }
  };

  const validateForm = () => {
    let errors = {};
    if (!state.firstName.trim()) {
      errors.firstName = "First name is required";
    }

    if (!state.lastName.trim()) {
      errors.lastName = "Last name is required";
    }

    if (!state.username.trim()) {
      errors.username = "Username is required";
    }

    if (!state.email.trim()) {
      errors.email = "Email is required";
    } else {
      if (!validEmailRegex.test(state.email)) {
        errors.email = "Email is invalid";
      }
    }

    if (!state.password.trim()) {
      errors.password = "Password is required";
    } else if (state.password.length < 5) {
      errors.password = "Password is too short";
    }

    if (!state.confirmPassword.trim()) {
      errors.confirmPassword = "Password is required";
    } else if (state.confirmPassword.length < 5) {
      errors.confirmPassword = "Password is too short";
    } else if (state.password !== state.confirmPassword) {
      errors.confirmPassword = "Password don't match";
    }

    if (Object.keys(errors).length > 0) {
      setErrors(errors);
      return false;
    } else {
      setErrors({});
      return true;
    }
  };

  const validEmailRegex = RegExp(
    /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
  );

  const handleSignUp = (e) => {
    e.preventDefault();
    if (validateForm()) {
      AuthService.signUp(
        state.firstName,
        state.lastName,
        state.username,
        state.email,
        state.password
      ).then(
        (response) => {
          handleClear();
          successNotification();
        },
        (error) => {
          const message =
            (error.response &&
              error.response.data &&
              error.response.data.result) ||
            error.result ||
            error.toString();
          failNotification(message);
        }
      );
    }
  };

  return (
    <Modal onSignUp={props.onSignUp}>
      <div className={classes.signup_modal_content} ref={modalRef}>
        <div>
          <h2>Sign Up</h2>
        </div>
        <div>
          <form onSubmit={handleSignUp}>
            <div className={classes.signup_input}>
              <div className={classes.signup_content}>
                <div className={classes.signup_label}>
                  <label>First Name</label>
                  <span className="text-danger">
                    <small>{errors.firstName}</small>
                  </span>
                </div>
                <input
                  type="text"
                  name="firstName"
                  placeholder="Enter First Name"
                  value={state.firstName}
                  onChange={handleChange}
                  onKeyDown={handleKeyDown}
                  autoComplete="off"
                  className={
                    errors.firstName
                      ? "is-invalid form-control"
                      : "form-control"
                  }
                />
              </div>
              <div className={classes.signup_content}>
                <div className={classes.signup_label}>
                  <label>Last Name</label>
                  <span className="text-danger">
                    <small>{errors.lastName}</small>
                  </span>
                </div>
                <input
                  type="text"
                  name="lastName"
                  placeholder="Enter Last Name"
                  value={state.lastName}
                  onChange={handleChange}
                  onKeyDown={handleKeyDown}
                  autoComplete="off"
                  className={
                    errors.lastName ? "is-invalid form-control" : "form-control"
                  }
                />
              </div>
              <div className={classes.signup_content}>
                <div className={classes.signup_label}>
                  <label>Username</label>
                  <span className="text-danger">
                    <small>{errors.username}</small>
                  </span>
                </div>
                <input
                  type="text"
                  name="username"
                  placeholder="Enter Username"
                  value={state.username}
                  onChange={handleChange}
                  autoComplete="on"
                  className={
                    errors.username ? "is-invalid form-control" : "form-control"
                  }
                />
              </div>
              <div className={classes.signup_content}>
                <div className={classes.signup_label}>
                  <label>Email</label>
                  <span className="text-danger">
                    <small>{errors.email}</small>
                  </span>
                </div>
                <input
                  type="text"
                  name="email"
                  placeholder="Enter Email"
                  value={state.email}
                  onChange={handleChange}
                  autoComplete="on"
                  className={
                    errors.email ? "is-invalid form-control" : "form-control"
                  }
                />
              </div>
              <div className={classes.signup_content}>
                <div className={classes.signup_label}>
                  <label>Password</label>
                  <span className="text-danger">
                    <small>{errors.password}</small>
                  </span>
                </div>
                <div className="password">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="Enter Password"
                    value={state.password}
                    onChange={handleChange}
                    autoComplete="on"
                    className={
                      errors.password
                        ? "is-invalid form-control"
                        : "form-control"
                    }
                  />
                  <i
                    className={showPassword ? "bi bi-eye-slash" : "bi bi-eye"}
                    id="togglePassword"
                    onClick={togglePassword}
                  ></i>
                </div>
              </div>
              <div className={classes.signup_content}>
                <div className={classes.signup_label}>
                  <label>Confirm Password</label>
                  <span className="text-danger">
                    <small>{errors.confirmPassword}</small>
                  </span>
                </div>
                <div className="password">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    name="confirmPassword"
                    placeholder="Enter Password"
                    value={state.confirmPassword}
                    onChange={handleChange}
                    autoComplete="on"
                    className={
                      errors.confirmPassword
                        ? "is-invalid form-control"
                        : "form-control"
                    }
                  />
                  <i
                    className={
                      showConfirmPassword ? "bi bi-eye-slash" : "bi bi-eye"
                    }
                    id="toggleConfirmPassword"
                    onClick={toggleConfirmPassword}
                  ></i>
                </div>
              </div>
            </div>
            <div className={classes.button_modal_div}>
              <TheButton type="submit" onClick={handleSignUp}>
                Sign Up
              </TheButton>
            </div>
          </form>
        </div>
      </div>
    </Modal>
  );
};

// ENDS

export default SignUp;
