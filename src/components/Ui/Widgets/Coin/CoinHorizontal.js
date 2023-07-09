import { memo, useState, useEffect } from "react";
import PropTypes from "prop-types";

import Box from "../../Common/Box";

const CoinHorizontal = memo(
  ({ item, searchValue, searchOnChange, searchSubmit }) => {
    const [color, setColor] = useState("");

    useEffect(() => {
      if (item.percentChange > 0) {
        setColor("green");
      } else {
        setColor("red");
      }
    }, []);

    const roundToEightDigits = (value) => {
      const numberAmount = Number(value);
      const rounded = Math.round(numberAmount * 1e8) / 1e8;
      return rounded;
    };

    const roundToTwoDigits = (value) => {
      const numberAmount = Number(value);
      const rounded = Math.round(numberAmount * 1e2) / 1e2;
      return rounded;
    };

    return (
      <Box>
        <div className="box-content box-vertical-padding box-horizontal-padding">
          <div className="widget-coin-horizontal flex flex-center flex-space-around nowrap">
            {/* <div>
            <div
              className='icon cover'
              style={{ backgroundImage: `url('${item.icon}')` }}
            />
          </div> */}
            <div>
              <label>Pair</label>
              <strong>
                {item.baseCurrency}/{item.quoteCurrency}
              </strong>
            </div>
            <div className="divider" />
            <div>
              <label className="gray">Price</label>
              <strong>
                {roundToEightDigits(item.lastPrice).toString()}{" "}
                {item.quoteCurrency}
                <em className={color}>
                  {roundToTwoDigits(item.percentChange * 100)}%
                </em>
              </strong>
            </div>
            <div className="divider responsive-hide2" />
            <div className="responsive-hide2">
              <label className="gray">Opening Price</label>
              <strong>{roundToEightDigits(item.open).toString()}</strong>
            </div>
            <div className="divider responsive-hide2" />
            <div className="responsive-hide2">
              <label className="gray">Volume</label>
              <strong>{item.volume}</strong>
            </div>
            <div className="divider responsive-hide" />
            <div className="no-select responsive-hide">
              <form onSubmit={searchSubmit} noValidate>
                <input
                  type="text"
                  name="keyword"
                  id="keyword"
                  placeholder="Search"
                  autoComplete="off"
                  onChange={searchOnChange}
                  value={searchValue}
                />
                <button
                  type="button"
                  className="pointer"
                  onClick={searchSubmit}
                >
                  <i className="material-icons">search</i>
                </button>
              </form>
            </div>
          </div>
        </div>
      </Box>
    );
  }
);

CoinHorizontal.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  item: PropTypes.object.isRequired,
  searchValue: PropTypes.string.isRequired,
  searchSubmit: PropTypes.func.isRequired,
  searchOnChange: PropTypes.func.isRequired,
};

export default CoinHorizontal;
