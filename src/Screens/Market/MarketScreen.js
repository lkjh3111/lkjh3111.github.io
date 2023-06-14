import { useState, useEffect } from "react";

import SiteLayout from "../../components/layouts/SiteLayout";
import Header from "../../components/Ui/Header/Header";

import Market from "../../components/Ui/Widgets/Market/Market";
import BuySell from "../../components/Ui/Widgets/BuySell/BuySell";
import BuyOrders from "../../components/Ui/Widgets/BuyOrders/BuyOrders";
import SellOrders from "../../components/Ui/Widgets/SellOrders/SellOrders";
import TradeHistory from "../../components/Ui/Widgets/TradeHistory/TradeHistory";
import CoinVertical from "../../components/Ui/Widgets/Coin/CoinVertical";
import CoinHorizontal from "../../components/Ui/Widgets/Coin/CoinHorizontal";
import CandleStick from "../../components/Ui/Widgets/CandleStick/CandleStick";

const MarketScreen = () => {
  const [keyword, setKeyword] = useState("");
  const [coinInfo, setCoinInfo] = useState(null);

  useEffect(() => {
    const coinData = {
      id: 1,
      name: "Bitcoin",
      symbol: "BTC",
      change: "-%3.28",
      currency: "USD",
      exchange: "BTC/USDT",
      weight: "104k",
      financialRate: "-0.0252%/hr",
      icon: "https://icons-for-free.com/iconfiles/png/512/btc+coin+crypto+icon-1320162856490699468.png",
      amount: "18.783,33",
      description: `Bitcoin is a cryptocurrency invented in 2008 by an unknown person or group using the name Satoshi Nakamoto. Released as an open source software in 2009.`,
    };

    setCoinInfo(coinData);
  }, []);

  const handleSearchValue = (e) => {
    const { value } = e.target;

    setKeyword(value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <SiteLayout>
      <div>
        <Header icon='menu' title='Market' />
        <div className='flex flex-destroy'>
          <div className='content-30 box-right-padding'>
            <Market />

            {coinInfo && <CoinVertical item={coinInfo} />}
          </div>
          <div className='content-70 flex-1'>
            {coinInfo && (
              <CoinHorizontal
                item={coinInfo}
                searchValue={keyword}
                searchOnChange={handleSearchValue}
                searchSubmit={handleSearchSubmit}
              />
            )}

            <div className='flex flex-destroy'>
              <div className='content-70 flex-1 box-right-padding'>
                <CandleStick />
              </div>
              <div className='content-30'>
                <BuySell />
              </div>
            </div>

            <div className='flex flex-destroy flex-space-between'>
              <div className='flex-1 box-right-padding'>
                <TradeHistory />
              </div>
              <div className='flex-1 box-right-padding'>
                <BuyOrders />
              </div>
              <div className='flex-1'>
                <SellOrders />
              </div>
            </div>
          </div>
        </div>
      </div>
    </SiteLayout>
  );
};

export default MarketScreen;
