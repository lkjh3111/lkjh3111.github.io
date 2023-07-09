import { memo, useState, useEffect } from "react";
import ReactApexChart from "react-apexcharts";
import ForexService from "../../../../services/ForexService";

import Box from "../../Common/Box";

const CandleStick = memo(({ item }) => {
  const [state, setState] = useState(null);
  const [candleStickFilter, setCandleStickFilter] = useState({
    multiplier: 1,
    timeSpan: "day",
  });
  const [timeFrame, setTimeFrame] = useState("");
  const [data, setData] = useState([]);

  const handleTimeFrame = (e) => {
    const value = e.target.value;
    setTimeFrame(value);
    let filter;
    switch (value) {
      case "1d":
        filter = {
          multiplier: 1,
          timeSpan: "day",
        };
        break;
      case "4h":
        filter = {
          multiplier: 4,
          timeSpan: "hour",
        };
        break;
      case "1h":
        filter = {
          multiplier: 1,
          timeSpan: "hour",
        };
        break;
      case "30m":
        filter = {
          multiplier: 30,
          timeSpan: "minute",
        };
        break;
      case "15m":
        filter = {
          multiplier: 15,
          timeSpan: "minute",
        };
        break;
      case "5m":
        filter = {
          multiplier: 5,
          timeSpan: "minute",
        };
        break;
      case "1m":
        filter = {
          multiplier: 1,
          timeSpan: "minute",
        };
        break;
      default:
        filter = {
          multiplier: 1,
          timeSpan: "day",
        };
    }
    setCandleStickFilter(filter);
  };

  const handleFilter = (e) => {
    e.preventDefault();
    ForexService.getPairHistory(
      item.baseCurrency,
      item.quoteCurrency,
      candleStickFilter.multiplier,
      candleStickFilter.timeSpan
    ).then(
      (response) => {
        setData(response.results);
      },
      (error) => {
        console.log("Request is limited to 5 request per minute.");
      }
    );
  };

  useEffect(() => {
    ForexService.getPairHistory(
      item.baseCurrency,
      item.quoteCurrency,
      candleStickFilter.multiplier,
      candleStickFilter.timeSpan
    ).then(
      (response) => {
        setData(response.results);
      },
      (error) => {
        console.log("Request is limited to 5 request per minute.");
      }
    );
  }, [item]);

  useEffect(() => {
    let candlestickData = data.map((candle) => {
      return {
        x: new Date(candle.timestamp),
        y: candle.ohlc,
      };
    });

    const newState = {
      series: [
        {
          data: candlestickData,
        },
      ],
      options: {
        chart: {
          type: "candlestick",
          height: 470,
        },
        xaxis: {
          type: "datetime",
        },
        yaxis: {
          tooltip: {
            enabled: true,
          },
        },
      },
    };

    setState(newState);
  }, [data, item]);

  return (
    <Box>
      <div className="candlestick-title candlestick-vertical-padding box-horizontal-padding no-select">
        Market History
      </div>
      <div className="flex flex-end">
        <div>
          {/* <label htmlFor="filter">Filter</label> */}
          <select
            name="filter"
            id="filter"
            onChange={handleTimeFrame}
            value={timeFrame}
            className="candlestick-filter-dropdown"
          >
            <option value="1d">1 Day</option>
            <option value="4h">4 Hours</option>
            <option value="1h">1 Hour</option>
            <option value="30m">30 Minutes</option>
            <option value="15m">15 Minutes</option>
            <option value="5m">5 Minutes</option>
            <option value="1m">1 Minute</option>
          </select>
        </div>
        <div>
          <button
            type="button"
            className="candlestick-filter-button candlestick-filter-button-white candlestick-filter-button-small"
            onClick={handleFilter}
          >
            Filter
          </button>
        </div>
      </div>
      <div className="box-content candlestick-content-height">
        {state && data.length > 0 && (
          <ReactApexChart
            options={state.options}
            series={state.series}
            type="candlestick"
            height={470}
          />
        )}
      </div>
    </Box>
  );
});

export default CandleStick;
