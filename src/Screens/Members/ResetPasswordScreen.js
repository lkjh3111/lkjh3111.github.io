import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import MainLayout from "../../components/layouts/MainLayout";
import Box from "../../components/Ui/Common/Box";
import FormInput from "../../components/Ui/Forms/FormInput";
import FormButton from "../../components/Ui/Forms/FormButton";
import Logo from "../../assets/Logo/logo.svg";
import UserService from "../../services/UserService";
import { toast } from "react-toastify";

const ResetPasswordScreen = () => {
  const { resetToken } = useParams();
  const [formValues, setFormValues] = useState({
    newPassword: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({
    newPassword: "",
    confirmPassword: "",
  });

  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const navigate = useNavigate();

  const sleep = async (milliseconds) => {
    await new Promise((resolve) => {
      return setTimeout(resolve, milliseconds);
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

  const toggleNewPassword = (e) => {
    e.preventDefault();
    if (showNewPassword) {
      setShowNewPassword(false);
    } else {
      setShowNewPassword(true);
    }
  };

  const toggleConfirmPassword = (e) => {
    e.preventDefault();
    if (showConfirmPassword) {
      setShowConfirmPassword(false);
    } else {
      setShowConfirmPassword(true);
    }
  };

  const validateForm = () => {
    let errors = {};

    if (!formValues.newPassword.trim()) {
      errors.newPassword = "Password is required";
    } else if (formValues.newPassword.length < 5) {
      errors.newPassword = "Password is too short";
    }

    if (!formValues.confirmPassword.trim()) {
      errors.confirmPassword = "Password is required";
    } else if (formValues.confirmPassword.length < 5) {
      errors.confirmPassword = "Password is too short";
    } else if (formValues.newPassword !== formValues.confirmPassword) {
      errors.confirmPassword = "Confirm password doesn't match";
    }

    if (Object.keys(errors).length > 0) {
      setErrors(errors);
      return false;
    } else {
      setErrors({});
      return true;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      UserService.resetPassword(resetToken, formValues.newPassword).then(
        async (response) => {
          successNotification(response);
          await sleep(4000);
          navigate("/");
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
                <h1 className="form-title center">Reset Password</h1>
                <form className="form">
                  <div className="reset-pass-element">
                    <div className="form-line">
                      <div className="full-width">
                        <div className="forgot-label">
                          <label htmlFor="newPassword">New Password</label>
                          <span className="text-danger">
                            <small>{errors.newPassword}</small>
                          </span>
                        </div>
                        <div className="input-group">
                          <FormInput
                            type={showNewPassword ? "text" : "password"}
                            name="newPassword"
                            value={formValues.newPassword}
                            placeholder="Enter New Password"
                            onChange={handleChange}
                            error={errors.newPassword}
                          />
                          <div className="input-group-btn">
                            <button
                              className="btn btn-outline-primary btn-lg"
                              onClick={toggleNewPassword}
                            >
                              <i
                                className={
                                  showNewPassword
                                    ? "bi bi-eye-slash"
                                    : "bi bi-eye"
                                }
                              ></i>
                            </button>
                          </div>
                        </div>
                      </div>
                      <div className="full-width">
                        <div className="forgot-label">
                          <label htmlFor="confirmPassword">
                            Confirm Password
                          </label>
                          <span className="text-danger">
                            <small>{errors.confirmPassword}</small>
                          </span>
                        </div>
                        <div className="input-group">
                          <FormInput
                            type={showConfirmPassword ? "text" : "password"}
                            name="confirmPassword"
                            value={formValues.confirmPassword}
                            placeholder="Confirm Password"
                            onChange={handleChange}
                            error={errors.confirmPassword}
                          />
                          <div className="input-group-btn">
                            <button
                              className="btn btn-outline-primary btn-lg"
                              onClick={toggleConfirmPassword}
                            >
                              <i
                                className={
                                  showConfirmPassword
                                    ? "bi bi-eye-slash"
                                    : "bi bi-eye"
                                }
                              ></i>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* <div className="form-line">
                      <div className="full-width right">
                        <Link to="/">Login</Link>
                      </div>
                    </div> */}
                    <div className="form-line">
                      <div className="buttons">
                        <FormButton
                          type="submit"
                          text="Reset Password"
                          onClick={handleSubmit}
                        />
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

export default ResetPasswordScreen;
