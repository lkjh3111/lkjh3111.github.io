import { memo } from "react";
import PropTypes from "prop-types";

const FormInput = memo(
  ({ type, name, value, placeholder, onChange, error }) => (
    <input
      id={name}
      name={name}
      type={type}
      value={value}
      autoComplete="on"
      onChange={onChange}
      placeholder={placeholder}
      className={error ? "is-invalid form-control" : "form-control"}
    />
  )
);

FormInput.defaultProps = {
  value: "",
};

FormInput.propTypes = {
  type: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string.isRequired,
};

export default FormInput;
