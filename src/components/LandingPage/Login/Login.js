import React, { useState, useRef, useEffect } from "react";
import Modal from "../../Ui/Modal";
import TheButton from "../../Ui/TheButton";
import classes from "./Login.module.css";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import AuthService from "../../../services/AuthService";

const Login = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState("");
  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const modalRef = useRef();

  const failNotification = () =>
    toast.error("Email or password doesn't match!");

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
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const validateForm = () => {
    let errors = {};
    if (!email.trim()) {
      errors.email = "Email is required";
    } else {
      if (!validEmailRegex.test(email)) {
        errors.email = "Email is invalid";
      }
    }

    if (!password.trim()) {
      errors.password = "Password is required";
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

  const handleLogin = (e) => {
    e.preventDefault();
    if (validateForm()) {
      AuthService.login(email, password).then(
        (response) => {
          let roles = response.result.roles;
          if (roles.find((e) => e === "ADMIN")) {
            navigate("/admin/dashboard");
          } else {
            navigate("/dashboard");
          }
          window.location.reload();
        },
        (error) => {
          const message =
            (error.response &&
              error.response.data &&
              error.response.data.result) ||
            error.result ||
            error.toString();
          setLoading(false);
          failNotification();
        }
      );
    }
  };

  return (
    <Modal onLogin={props.onLogin}>
      <div className={classes.login_modal_content} ref={modalRef}>
        <div>
          <h2>Login</h2>
        </div>
        <div>
          <form onSubmit={handleLogin}>
            <div className="mb-3">
              <div className={classes.login_label}>
                <label>Email</label>
                <span className="text-danger">
                  <small>{errors.email}</small>
                </span>
              </div>
              <input
                type="text"
                placeholder="Enter Email"
                value={email}
                onChange={handleUsernameChange}
                autoComplete="on"
                className={
                  errors.email ? "is-invalid form-control" : "form-control"
                }
              />
            </div>
            <div className="mb-2">
              <div className={classes.login_label}>
                <label>Password</label>
                <span className="text-danger">
                  <small>{errors.password}</small>
                </span>
              </div>
              <input
                type="password"
                placeholder="Enter Password"
                value={password}
                onChange={handlePasswordChange}
                autoComplete="on"
                className={
                  errors.password ? "is-invalid form-control" : "form-control"
                }
              />
            </div>
            <div className={classes.checkbox_label}>
              <input
                type="checkbox"
                className={classes.checkbox}
                // id="customCheck1"
              />
              <label>Remember me</label>
            </div>
            <div className={classes.button_modal_div}>
              <TheButton type="submit" disabled={loading} onClick={handleLogin}>
                Login
              </TheButton>
            </div>
          </form>
        </div>
      </div>
    </Modal>
  );
};

// ENDS

export default Login;
