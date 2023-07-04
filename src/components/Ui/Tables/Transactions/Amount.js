import { memo } from "react";
import PropTypes from "prop-types";

const Amount = memo(({ type, amount, asset }) => {
  if (type === "DEPOSIT") {
    return <strong className="green">{amount + " " + asset}</strong>;
  }

  return <strong className="red">{amount + " " + asset}</strong>;
});

Amount.propTypes = {
  type: PropTypes.number.isRequired,
  amount: PropTypes.string.isRequired,
};

export default Amount;
