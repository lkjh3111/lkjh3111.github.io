import { memo } from "react";
import PropTypes from "prop-types";

const Amount = memo(({ type }) => {
  if (type === "BUY") {
    return <strong className="green">{type}</strong>;
  }

  return <strong className="red">{type}</strong>;
});

Amount.propTypes = {
  type: PropTypes.string.isRequired,
};

export default Amount;
