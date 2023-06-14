import { memo } from "react";
import PropTypes from "prop-types";

const ProcessType = memo(({ type }) => {
  if (type === 1) {
    return (
      <div className='nowrap'>
        <div className='icon green'>
          <i className='material-icons'>arrow_upward</i>
        </div>
        <strong>Deposit</strong>
      </div>
    );
  }

  return (
    <div className='nowrap'>
      <div className='icon red'>
        <i className='material-icons'>arrow_downward</i>
      </div>
      <strong>Withdrawal</strong>
    </div>
  );
});

ProcessType.propTypes = {
  type: PropTypes.number.isRequired,
};

export default ProcessType;
