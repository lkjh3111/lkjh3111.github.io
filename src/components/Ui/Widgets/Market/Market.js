import { memo, useState, useEffect } from "react";

import { Link } from "react-router-dom";

import Box from "../../Common/Box";
import MarketRow from "./MarketRow";

const Market = memo(({ data, currencyChange }) => {
  return (
    <Box>
      <div className="box-title box-vertical-padding box-horizontal-padding no-select">
        Markets
      </div>
      <div className="box-content box-content-height-tall">
        {data &&
          data.map((item, index) => (
            <MarketRow
              key={item.baseCurrency}
              item={item}
              currencyChange={currencyChange}
              index={index}
            />
          ))}
      </div>
      <div className="box-button box-vertical-padding box-horizontal-padding">
        <Link
          to="/pairs"
          className="button button-purple button-medium button-block"
        >
          More
          <i className="material-icons button-icon-right">chevron_right</i>
        </Link>
      </div>
    </Box>
  );
});

export default Market;
