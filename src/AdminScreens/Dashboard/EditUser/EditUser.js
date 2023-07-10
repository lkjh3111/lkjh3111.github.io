import React, { useState, useRef, useEffect } from "react";
import Modal from "../../../components/Ui/Modal";
import TheButton from "../../../components/Ui/TheButton";
import classes from "./EditUser.module.css";
import AdminService from "../../../services/AdminService";
import { toast } from "react-toastify";

const EditUser = (props) => {
  const [state, setState] = useState({
    firstName: props.item.firstName,
    lastName: props.item.lastName,
    username: props.item.username,
    email: props.item.email,
    balance: props.balance.toString(),
  });

  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    balance: "",
  });

  const modalRef = useRef();

  const successNotification = () => toast.success("User updated successfully.");
  const failNotification = (e) => toast.error(e);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        props.onEditUser();
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
    setState({
      firstName: "",
      lastName: "",
      username: "",
      email: "",
      balance: "",
    });
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

    if (parseFloat(state.balance) <= 0 || !state.balance) {
      errors.withdrawAmount = "Amount Required";
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

  const handleEditUser = (e) => {
    e.preventDefault();
    if (validateForm()) {
      AdminService.editUser(
        props.item.id,
        state.firstName,
        state.lastName,
        state.username,
        state.email,
        state.balance
      ).then(
        (response) => {
          handleClear();
          successNotification();
          props.trigger();
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
    <Modal onEditUser={props.onEditUser}>
      <div className={classes.edit_user_modal_content} ref={modalRef}>
        <div>
          <h2>Edit User Details</h2>
        </div>
        <div>
          <form onSubmit={handleEditUser}>
            <div className={classes.edit_user_label}>
              <label>First Name</label>
              <span className="text-danger">
                <small>{errors.firstName}</small>
              </span>
            </div>
            <input
              type="text"
              name="firstName"
              placeholder={props.item.firstName}
              value={state.firstName}
              onChange={handleChange}
              autoComplete="on"
              className={
                errors.firstName ? "is-invalid form-control" : "form-control"
              }
            />
            <div className={classes.edit_user_label}>
              <label>Last Name</label>
              <span className="text-danger">
                <small>{errors.lastName}</small>
              </span>
            </div>
            <input
              type="text"
              name="lastName"
              placeholder={props.item.lastName}
              value={state.lastName}
              onChange={handleChange}
              autoComplete="on"
              className={
                errors.lastName ? "is-invalid form-control" : "form-control"
              }
            />
            <div className={classes.edit_user_label}>
              <label>Username</label>
              <span className="text-danger">
                <small>{errors.username}</small>
              </span>
            </div>
            <input
              type="text"
              name="username"
              placeholder={props.item.username}
              value={state.username}
              onChange={handleChange}
              autoComplete="on"
              className={
                errors.username ? "is-invalid form-control" : "form-control"
              }
            />
            <div className={classes.edit_user_label}>
              <label>Email</label>
              <span className="text-danger">
                <small>{errors.email}</small>
              </span>
            </div>
            <input
              type="text"
              name="email"
              placeholder={props.item.email}
              value={state.email}
              onChange={handleChange}
              autoComplete="on"
              className={
                errors.email ? "is-invalid form-control" : "form-control"
              }
            />
            <div className={classes.edit_user_label}>
              <label>Balance</label>
              <span className="text-danger">
                <small>{errors.balance}</small>
              </span>
            </div>
            <input
              type="text"
              name="balance"
              placeholder={props.balance.toString().replace(/^0+(?!\.|$)/, "")}
              value={state.balance}
              onChange={handleChange}
              autoComplete="on"
              className={
                errors.email ? "is-invalid form-control" : "form-control"
              }
            />
            <div className={classes.button_modal_div}>
              <TheButton
                type="submit"
                onClick={handleEditUser}
                className={classes.edit_user_button}
              >
                Edit
              </TheButton>
            </div>
          </form>
        </div>
      </div>
    </Modal>
  );
};

// ENDS

export default EditUser;
