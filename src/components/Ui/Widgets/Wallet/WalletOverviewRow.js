import { memo, useEffect, useState } from "react";
import PropTypes from "prop-types";
import ForexService from "../../../../services/ForexService";

const WalletOverviewRow = memo(({ item, currencyChange, currencyList }) => {
  const [convertedValue, setConvertedValue] = useState(0);
  const currencyName = currencyList[item.currency.toLowerCase()];

  useEffect(() => {
    console.log(currencyName);
    ForexService.convertCurrency(item.currency, "usd").then((response) => {
      setConvertedValue(response.usd);
    });
  }, []);

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
      <div className="left activity-left">
        <strong>{item.currency}</strong> {currencyName}
      </div>
      <div className="center activity-right-padding">
        <strong>{handleAmount(item.balance)}</strong>
        <em> ≈ {handleAmount(item.balance * convertedValue)} USD</em>
      </div>
    </div>
  );
});

WalletOverviewRow.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  item: PropTypes.object.isRequired,
};

export default WalletOverviewRow;
