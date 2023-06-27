import { memo } from "react";
import PropTypes from "prop-types";

const StatusName = memo(({ status }) => {
  if (status === "COMPLETED") {
    return <span className='green'>Finished</span>;
  }

  if (status === "FAILED") {
    return <span className='red'>Unsuccessful</span>;
  }

  return <span className='gray'>Waiting</span>;
});

StatusName.propTypes = {
  status: PropTypes.string.isRequired,
};

export default StatusName;
