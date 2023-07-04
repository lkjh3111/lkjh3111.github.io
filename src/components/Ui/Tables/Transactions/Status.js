import { memo } from "react";
import PropTypes from "prop-types";

const Status = memo(({ status }) => {
  if (status === "COMPLETED") {
    return <span className="status green">FINISHED</span>;
  }

  if (status === "FAILED") {
    return <span className="status red">CANCELLED</span>;
  }

  return <span className="status gray">WAITING</span>;
});

Status.propTypes = {
  status: PropTypes.number.isRequired,
};

export default Status;
