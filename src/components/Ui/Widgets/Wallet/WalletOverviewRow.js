import { memo } from "react";
import PropTypes from "prop-types";

const WalletOverviewRow = memo(({ item, currencyChange }) => {
  const handleAmount = (value) => {
    const numberAmount = Number(value);
    const rounded = Math.round(numberAmount * 1e4) / 1e4;
    return rounded;
  };

  return (
    <div
      className="activity-row flex flex-center flex-space-between no-select"
      onClick={() => currencyChange(item.currency)}
    >
      <div className="left activity-row-div-30">
        <strong>{item.currency}</strong>
      </div>
      <div className="right activity-row-div-30">
        {handleAmount(item.balance)}
      </div>
    </div>
  );
});

WalletOverviewRow.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  item: PropTypes.object.isRequired,
};

export default WalletOverviewRow;
