import { memo } from "react";
import PropTypes from "prop-types";

const StatusName = memo(({ status }) => {
  if (status === "COMPLETED") {
    return <span className="green">Completed</span>;
  }

  if (status === "FAILED") {
    return <span className="red">Failed</span>;
  }

  return <span className="gray">Pending</span>;
});

StatusName.propTypes = {
  status: PropTypes.string.isRequired,
};

export default StatusName;
