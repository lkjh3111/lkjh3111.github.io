import React, { useState, useRef, useEffect } from "react";
import Modal from "../../Ui/Modal";
import TheButton from "../../Ui/TheButton";
import classes from "./Login.module.css";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.min.css";
import AuthService from "../../../services/AuthService";

const Login = (props) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState("");
  const [error, setError] = useState("");
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
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    AuthService.login(username, password).then(
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
        setError(message);
        failNotification();
      }
    );
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
              <label className={classes.input__label}>Email</label>
              <input
                type="text"
                placeholder="Enter Email"
                value={username}
                onChange={handleUsernameChange}
                autoComplete="on"
              />
            </div>
            <div className="mb-2">
              <label className={classes.input__label}>Password</label>
              <input
                type="password"
                placeholder="Enter Password"
                value={password}
                onChange={handlePasswordChange}
                autoComplete="on"
              />
            </div>
            <div>
              <label className={classes.remember__label}>
                <input
                  type="checkbox"
                  className={classes.checkbox}
                  id="customCheck1"
                />
                Remember me
              </label>
            </div>
            <div className={classes.button_modal_div}>
              <TheButton type="submit" disabled={loading} onClick={handleLogin}>
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
