import { memo, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Sparklines, SparklinesLine, SparklinesBars } from "react-sparklines";
import PropTypes from "prop-types";

import Amount from "../../Tables/Orders/Amount";
import Status from "../../Tables/Orders/Status";

const MyAssetsRow = memo(({ item }) => {
  const [color, setColor] = useState("");

  useEffect(() => {
    if (item.status === 1) {
      setColor("green");
    } else {
      setColor("red");
    }
  }, []);

  const handleAmount = (value) => {
    const numberAmount = Number(value);
    const rounded = Math.round(numberAmount * 1e8) / 1e8;
    return rounded;
  };

  const timestamp =
    new Date(item.timestamp).toDateString() +
    " " +
    new Date(item.timestamp).toLocaleTimeString();

  return (
    <div className="assets-row flex flex-center flex-space-between">
      {/* <div>
        <div
          className='icon cover'
          style={{ backgroundImage: `url('${item.icon}')` }}
        />
      </div> */}
      <div className="standard-width">
        <strong>
          {item.symbol}/{item.asset}
        </strong>
        <span>{timestamp}</span>
      </div>
      {/* <div className='bar-chart responsive-hide2'>
        <Sparklines data={item.barChartData} width={40} height={40}>
          <SparklinesBars
            style={{ strokeWidth: 1, stroke: "#ffffff", fill: color }}
          />
        </Sparklines>
      </div> */}
      <div className="standard-width">
        {handleAmount(item.price)} {item.asset}
        {/* <span>
          <em className={color}>{item.change}</em>
          {item.changePeriod}
        </span> */}
      </div>
      <div className="standard-width">
        <Amount type={item.side} amount={item.volume} asset={item.symbol} />
      </div>
      <div className="standard-width">{item.type}</div>
      <div className="standard-width">
        <strong>
          <Status status={item.status} />
        </strong>
      </div>
      {/* <div className='line-chart responsive-hide'>
        <Sparklines data={item.lineChartData} width={150} height={50}>
          <SparklinesLine style={{ strokeWidth: 1 }} color={color} />
        </Sparklines>
      </div> */}
      {/* <div className='nowrap no-select'>
        <Link to='/'>
          <i className='material-icons'>visibility</i>
        </Link>
        <Link to='/'>
          <i className='material-icons'>receipt</i>
        </Link>
      </div> */}
    </div>
  );
});

MyAssetsRow.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  item: PropTypes.object.isRequired,
};

export default MyAssetsRow;
