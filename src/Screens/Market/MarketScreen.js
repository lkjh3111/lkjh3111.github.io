import { useState, useEffect } from "react";

import SiteLayout from "../../components/layouts/SiteLayout";

import Market from "../../components/Ui/Widgets/Market/Market";
import BuySell from "../../components/Ui/Widgets/BuySell/BuySell";
import ExoticBuySell from "../../components/Ui/Widgets/BuySell/ExoticBuySell";
import BuyOrders from "../../components/Ui/Widgets/BuyOrders/BuyOrders";
import SellOrders from "../../components/Ui/Widgets/SellOrders/SellOrders";
import TradeHistory from "../../components/Ui/Widgets/TradeHistory/TradeHistory";
import CoinVertical from "../../components/Ui/Widgets/Coin/CoinVertical";
import CoinHorizontal from "../../components/Ui/Widgets/Coin/CoinHorizontal";
import CandleStick from "../../components/Ui/Widgets/CandleStick/CandleStick";
import ForexService from "../../services/ForexService";

const MarketScreen = () => {
  const [data, setData] = useState([]);
  const [currentData, setCurrentData] = useState(null);
  const [keyword, setKeyword] = useState("");
  // const [coinInfo, setCoinInfo] = useState(null);

  useEffect(() => {
    // const data = [
    //   {
    //     ohlc: [0.7481, 0.75377, 0.7468, 0.7519362],
    //     open: 0.7481,
    //     high: 0.75377,
    //     low: 0.7468,
    //     lastPrice: 0.7519362,
    //     percentChange: 0.0051,
    //     volume: 38804,
    //     weightedVolume: 0.75,
    //     timestamp: 1688774399999,
    //     numberOfTransactions: 38804,
    //     baseCurrency: "CAD",
    //     quoteCurrency: "USD",
    //   },
    //   {
    //     ohlc: [0.2427879, 0.2465832, 0.24154, 0.2460275],
    //     open: 0.2427879,
    //     high: 0.2465832,
    //     low: 0.24154,
    //     lastPrice: 0.2460275,
    //     percentChange: 0.0133,
    //     volume: 104867,
    //     weightedVolume: 0.2438,
    //     timestamp: 1688774399999,
    //     numberOfTransactions: 104867,
    //     baseCurrency: "PLN",
    //     quoteCurrency: "USD",
    //   },
    //   {
    //     ohlc: [0.05232287, 0.053147, 0.04935639, 0.04935639],
    //     open: 0.05232287,
    //     high: 0.053147,
    //     low: 0.04935639,
    //     lastPrice: 0.04935639,
    //     percentChange: -0.0566,
    //     volume: 186895,
    //     weightedVolume: 0.0526,
    //     timestamp: 1688774399999,
    //     numberOfTransactions: 186895,
    //     baseCurrency: "ZAR",
    //     quoteCurrency: "USD",
    //   },
    //   {
    //     ohlc: [0.61609, 0.62194, 0.6122, 0.6203],
    //     open: 0.61609,
    //     high: 0.62194,
    //     low: 0.6122,
    //     lastPrice: 0.6203,
    //     percentChange: 0.0068,
    //     volume: 141226,
    //     weightedVolume: 0.6183,
    //     timestamp: 1688774399999,
    //     numberOfTransactions: 141226,
    //     baseCurrency: "NZD",
    //     quoteCurrency: "USD",
    //   },
    // ];

    // const coinData = {
    //   id: 1,
    //   name: "Bitcoin",
    //   symbol: "BTC",
    //   change: "-%3.28",
    //   currency: "USD",
    //   exchange: "BTC/USDT",
    //   weight: "104k",
    //   financialRate: "-0.0252%/hr",
    //   icon: "https://icons-for-free.com/iconfiles/png/512/btc+coin+crypto+icon-1320162856490699468.png",
    //   amount: 18783.33,
    //   description: `Bitcoin is a cryptocurrency invented in 2008 by an unknown person or group using the name Satoshi Nakamoto. Released as an open source software in 2009.`,
    // };

    // setCoinInfo(coinData);

    ForexService.getForexPairs().then((response) => {
      setData(response.results);
      setCurrentData(response.results[0]);
    });
    // setData(data);
  }, []);

  const handleSearchValue = (e) => {
    const { value } = e.target;
    setKeyword(value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (keyword) {
      const filtered = data.filter(
        (pair) => pair.baseCurrency.toLowerCase() === keyword.toLowerCase()
      );
      setCurrentData(filtered[0]);
    } else {
      setCurrentData(data[0]);
    }
  };

  const handleCurrencyChange = (e) => {
    setCurrentData(data[e]);
  };

  return (
    <SiteLayout>
      <div>
        <h3 className="title">Market</h3>
        <div className="flex flex-destroy">
          <div className="content-30 box-right-padding">
            <Market data={data} currencyChange={handleCurrencyChange} />

            {/* {coinInfo && <CoinVertical item={coinInfo} />} */}
          </div>
          <div className="content-70 flex-1">
            {currentData && (
              <CoinHorizontal
                item={currentData}
                searchValue={keyword}
                searchOnChange={handleSearchValue}
                searchSubmit={handleSearchSubmit}
              />
            )}

            <div className="flex flex-destroy">
              <div className="content-70 flex-1 box-right-padding">
                {currentData && <CandleStick item={currentData} />}
              </div>
              <div className="content-30">
                {currentData && <BuySell item={currentData} />}
                {currentData && <ExoticBuySell item={currentData} />}
              </div>
            </div>

            {/* <div className="flex flex-destroy flex-space-between">
              <div className="flex-1 box-right-padding">
                <TradeHistory />
              </div>
              <div className="flex-1 box-right-padding">
                <BuyOrders />
              </div>
              <div className="flex-1">
                <SellOrders />
              </div>
            </div> */}
          </div>
        </div>
      </div>
    </SiteLayout>
  );
};

export default MarketScreen;
