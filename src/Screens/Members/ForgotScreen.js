import { useState } from "react";
import { Link } from "react-router-dom";

import MainLayout from "../../components/layouts/MainLayout";
import Box from "../../components/Ui/Common/Box";
import FormInput from "../../components/Ui/Forms/FormInput";
import FormButton from "../../components/Ui/Forms/FormButton";
import Logo from "../../assets/Logo/logo.svg";
import UserService from "../../services/UserService";
import { toast } from "react-toastify";

const ForgotScreen = () => {
  const [formValues, setFormValues] = useState({
    email: "",
  });

  const [errors, setErrors] = useState({
    email: "",
  });

  const handleClear = () => {
    setFormValues({
      email: "",
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const successNotification = (e) => toast.success(e);
  const failNotification = (e) => toast.error(e);

  const validateForm = () => {
    let errors = {};

    if (!formValues.email.trim()) {
      errors.email = "Email is required";
    } else {
      if (!validEmailRegex.test(formValues.email)) {
        errors.email = "Email is invalid";
      }
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      UserService.forgotPassword(formValues.email).then(
        (response) => {
          successNotification(response);
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
    <MainLayout>
      <div className="flex flex-center full-height">
        <div className="login no-select">
          <Box>
            <div className="box-vertical-padding box-horizontal-padding">
              <div>
                <div className="logo-404">
                  <img src={Logo} alt="158 Forex Trading" draggable="false" />
                  <span>158 Forex Trading</span>
                </div>
                <h1 className="form-title center">Forgot Password</h1>
                <form className="form" onSubmit={handleSubmit} noValidate>
                  <div className="form-elements">
                    <div className="form-line">
                      <div className="full-width">
                        <div className="forgot-label">
                          <label htmlFor="email">Email Address</label>
                          <span className="text-danger">
                            <small>{errors.email}</small>
                          </span>
                        </div>
                        <FormInput
                          type="text"
                          name="email"
                          value={formValues.email}
                          placeholder="Enter Email Address"
                          onChange={handleChange}
                          error={errors.email}
                        />
                      </div>
                    </div>
                    <div className="form-line">
                      <div className="full-width right">
                        <Link to="/">Login</Link>
                      </div>
                    </div>
                    <div className="form-line">
                      <div className="buttons">
                        <FormButton
                          type="submit"
                          text="Send Reset Code"
                          onClick={handleSubmit}
                        />
                      </div>
                    </div>
                    <div className="form-line">
                      <div className="center">
                        <p>
                          <Link to="/">Register</Link> if you do not have an
                          account.
                        </p>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </Box>
        </div>
      </div>
    </MainLayout>
  );
};

export default ForgotScreen;
