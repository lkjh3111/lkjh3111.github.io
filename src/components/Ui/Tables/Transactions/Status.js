import { memo } from "react";
import PropTypes from "prop-types";

const Status = memo(({ status }) => {
  if (status === "COMPLETED") {
    return <span className="status green">COMPLETED</span>;
  }

  if (status === "FAILED") {
    return <span className="status red">FAILED</span>;
  }

  return <span className="status gray">PENDING</span>;
});

Status.propTypes = {
  status: PropTypes.string.isRequired,
};

export default Status;
