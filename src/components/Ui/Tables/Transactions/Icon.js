import { memo } from "react";
import PropTypes from "prop-types";

const Icon = memo(({ type }) => {
  if (type === "DEPOSIT") {
    return (
      <div className="flex flex-v-center">
        <div className="operation green">
          <i className="material-icons">arrow_upward</i>
        </div>
        <div className="activity-left-padding">
          <strong>Deposit</strong>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-v-center">
      <div className="operation red">
        <i className="material-icons">arrow_downward</i>
      </div>
      <div className="activity-left-padding">
        <strong>Withdrawal</strong>
      </div>
    </div>
  );
});

Icon.propTypes = {
  type: PropTypes.string.isRequired,
};

export default Icon;
