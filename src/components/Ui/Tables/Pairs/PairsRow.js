import { memo, useState, useEffect } from "react";
import { Sparklines, SparklinesLine } from "react-sparklines";
import PropTypes from "prop-types";

const PairsRow = memo(({ item, index }) => {
  const [color, setColor] = useState("");
  // const [menuOpened, setMenuOpened] = useState(false);

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

  const roundToEightDigits = (value) => {
    const numberAmount = Number(value);
    const rounded = Math.round(numberAmount * 1e8) / 1e8;
    return rounded;
  };
  // const handleMenuOpen = () => {
  //   setMenuOpened(!menuOpened);
  // };

  return (
    <tr>
      <td>
        <div className="rank accent no-select">#{index}</div>
      </td>
      <td className="left">
        {/* <div
          className='icon cover'
          style={{ backgroundImage: `url('${item.icon}')` }}
        /> */}
        <strong>
          {item.baseCurrency}/{item.quoteCurrency}
        </strong>
      </td>
      <td className="center">{roundToFourDigits(item.lastPrice)}</td>
      <td className="center">
        <strong className={color}>
          {roundToTwoDigits(item.percentChange * 100)}%
        </strong>
      </td>
      <td className="center responsive-hide2">
        {roundToEightDigits(item.open)}
      </td>
      <td className="center responsive-hide2">
        {roundToEightDigits(item.high)}
      </td>
      <td className="center responsive-hide2">
        {roundToEightDigits(item.low)}
      </td>
      <td className="center responsive-hide2">{item.volume}</td>
      {/* <td className='responsive-hide'>
        <div className='line-chart'>
          <Sparklines data={item.lineChartData} width={150} height={50}>
            <SparklinesLine style={{ strokeWidth: 1 }} color={color} />
          </Sparklines>
        </div>
      </td> */}
      {/* <td className='right'>
        <button
          type='button'
          className='pointer'
          onClick={() => handleMenuOpen()}
        >
          <i className='material-icons'>more_vert</i>
        </button>

        {menuOpened && (
          <div className='box-dropdown'>
            <ul>
              <li>
                <button type='button'>
                  <i className='material-icons'>settings</i>
                  Button 1
                </button>
              </li>
              <li>
                <button type='button'>
                  <i className='material-icons'>favorite</i>
                  Button 2
                </button>
              </li>
              <li>
                <button type='button'>
                  <i className='material-icons'>info</i>
                  Button 3
                </button>
              </li>
            </ul>
          </div>
        )}
      </td> */}
    </tr>
  );
});

PairsRow.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  item: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,
};

export default PairsRow;
