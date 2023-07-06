import { memo } from "react";
import PropTypes from "prop-types";

const Status = memo(({ status }) => {
  if (status === "ACTIVE") {
    return <span className="status green">ACTIVE</span>;
  }

  if (status === "CANCELLED") {
    return <span className="status red">CANCELLED</span>;
  }

  return <span className="status gray">FILLED</span>;
});

Status.propTypes = {
  status: PropTypes.string.isRequired,
};

export default Status;
