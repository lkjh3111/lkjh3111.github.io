import { memo } from "react";
import PropTypes from "prop-types";

const Icon = memo(({ type }) => {
  if (type === "DEPOSIT") {
    return (
      <div className="operation green">
        <i className="material-icons">arrow_upward</i>
      </div>
    );
  }

  return (
    <div className="operation red">
      <i className="material-icons">arrow_downward</i>
    </div>
  );
});

Icon.propTypes = {
  type: PropTypes.string.isRequired,
};

export default Icon;
