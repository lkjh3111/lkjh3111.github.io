import { memo, useState, useEffect } from "react";
import { Sparklines, SparklinesLine } from "react-sparklines";
import PropTypes from "prop-types";

const MarketRow = memo(({ item, currencyChange, index }) => {
  const [color, setColor] = useState("");

  useEffect(() => {
    if (item.percentChange > 0) {
      setColor("green");
    } else {
      setColor("red");
    }
  }, []);

  const roundToFourDigits = (value) => {
    const numberAmount = Number(value);
    const rounded = Math.round(numberAmount * 1e4) / 1e4;
    return rounded;
  };

  const roundToTwoDigits = (value) => {
    const numberAmount = Number(value);
    const rounded = Math.round(numberAmount * 1e2) / 1e2;
    return rounded;
  };

  const toDate = (value) => {
    const date = new Date(value);
    date.setDate(date.getDate() + 1);
    return date.toDateString();
  };

  return (
    <div
      className="market-row flex flex-center flex-space-between"
      onClick={() => currencyChange(index)}
    >
      {/* <div>
        <div className='icon cover' style={{ backgroundImage: `url('${item.icon}')` }} />
      </div> */}
      <div>
        <p>
          <strong>{item.baseCurrency}</strong>
          <span className="gray">{toDate(item.timestamp)}</span>
        </p>
      </div>
      {/* <div>
        <Sparklines data={item.lineChartData} width={50} height={50}>
          <SparklinesLine style={{ strokeWidth: 2, fill: 'none' }} color={color} />
        </Sparklines>
      </div> */}
      <div>
        <p className="right">
          <strong>
            {roundToFourDigits(item.lastPrice)} {item.quoteCurrency}
          </strong>
          <span className={color}>
            {roundToTwoDigits(item.percentChange * 100)}%
          </span>
        </p>
      </div>
    </div>
  );
});

MarketRow.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  item: PropTypes.object.isRequired,
  currencyChange: PropTypes.func.isRequired,
  index: PropTypes.number.isRequired,
};

export default MarketRow;
