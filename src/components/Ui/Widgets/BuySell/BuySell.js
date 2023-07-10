import { memo, useState, useEffect } from "react";
import PropTypes from "prop-types";
import Box from "../../Common/Box";

import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import OrderService from "../../../../services/OrderService";
import AuthService from "../../../../services/AuthService";
import UserService from "../../../../services/UserService";
import { toast } from "react-toastify";

const BuySell = memo(({ item }) => {
  const [primaryTab, setPrimaryTab] = useState(0);
  const [secondaryTab, setSecondaryTab] = useState(0);
  const [value, setValue] = useState(0.0);
  const userId = AuthService.getCurrentUser().id;
  const [orderType, setOrdertype] = useState("");
  const [limitPrice, setLimitPrice] = useState(item.lastPrice.toString());
  const [volume, setVolume] = useState("");
  const [wallet, setWallet] = useState({
    balance: 0,
    currency: "",
  });

  const [order, setOrder] = useState({
    symbol: item.baseCurrency,
    asset: item.quoteCurrency,
    limitPrice: item.lastPrice.toString(),
    currentPrice: item.lastPrice,
    volume: "",
    side: "BUY",
    position: "LONG",
    market: "FOREX",
  });

  const [errors, setErrors] = useState({
    limitPrice: false,
    volume: false,
  });

  const successNotification = () => toast.success("Order request sent.");
  const failNotification = (e) => toast.error(e);

  const handleLimitPriceChange = (e) => {
    if (!e.target.value || e.target.value.match(/^\d{1,}(\.\d{0,8})?$/)) {
      setLimitPrice(e.target.value);
    }
  };

  const handleVolumeChange = (e) => {
    if (!e.target.value || e.target.value.match(/^\d{1,}(\.\d{0,8})?$/)) {
      setVolume(e.target.value);
    }
  };

  const handleClear = () => {
    setOrder({
      ...order,
      limitPrice: item.lastPrice.toString(),
      volume: "0",
    });
    setVolume("0");
  };

  useEffect(() => {
    const currency = primaryTab === 0 ? item.quoteCurrency : item.baseCurrency;
    UserService.getUserWallet(userId, currency).then(
      (response) => {
        if (response) {
          setWallet({
            balance: response.balance,
            currency: response.currency,
          });
        } else {
          setWallet({
            balance: 0,
            currency: "",
          });
        }
      },
      (error) => {
        setWallet({
          balance: 0,
          currency: "",
        });
      }
    );

    setValue(0.0);
    setOrder({
      ...order,
      volume: "0",
    });
    setVolume("0");
  }, [primaryTab, item]);

  useEffect(() => {
    setOrder({
      ...order,
      symbol: item.baseCurrency,
      asset: item.quoteCurrency,
      currentPrice: item.lastPrice,
    });
    setLimitPrice(item.lastPrice.toString());
  }, [item]);

  useEffect(() => {
    setOrder({
      ...order,
      side: primaryTab === 0 ? "BUY" : "SELL",
    });
    setOrdertype(secondaryTab === 0 ? "MARKET" : "LIMIT");
  }, [primaryTab, secondaryTab]);

  const handlePrimaryTab = (tabNum) => {
    setPrimaryTab(tabNum);
    setSecondaryTab(0);
  };

  const handleSecondaryTab = (tabNum) => {
    setSecondaryTab(tabNum);
  };

  const handleSliderValue = (e) => {
    setValue(e);
    const volume =
      primaryTab === 0
        ? String(parseFloat(e) * (wallet.balance / item.lastPrice))
        : String(parseFloat(e) * wallet.balance);
    setOrder({
      ...order,
      volume: volume,
    });
    setVolume(volume);
  };

  const sliderProps = {
    min: 0.0,
    max: 1.0,
    step: 0.25,
    marks: { 0.0: 0, 0.25: "25%", 0.5: "50%", 0.75: "75%", 1.0: "MAX" },
  };

  const validateForm = () => {
    let errors = {};
    if (orderType === "LIMIT") {
      if (parseFloat(limitPrice) <= 0 || !limitPrice) {
        errors.limitPrice = true;
      }
    }

    if (parseFloat(volume) <= 0 || !volume) {
      errors.volume = true;
    }

    if (Object.keys(errors).length > 0) {
      setErrors(errors);
      return false;
    } else {
      setErrors({});
      return true;
    }
  };

  const handleOrder = (e) => {
    e.preventDefault();
    if (validateForm()) {
      if (orderType === "LIMIT") {
        OrderService.createLimitOrder(
          userId,
          item.baseCurrency,
          item.quoteCurrency,
          parseFloat(limitPrice),
          order.currentPrice,
          parseFloat(volume),
          order.side,
          order.position,
          order.market
        ).then(
          (response) => {
            handleClear();
            successNotification();
          },
          (error) => {
            const message =
              (error.response &&
                error.response.data &&
                error.response.data.result) ||
              error.result ||
              error.toString();
            failNotification(message);
          }
        );
      } else {
        OrderService.createMarketOrder(
          userId,
          item.baseCurrency,
          item.quoteCurrency,
          order.currentPrice,
          parseFloat(volume),
          order.side,
          order.position,
          order.market
        ).then(
          (response) => {
            handleClear();
            successNotification();
          },
          (error) => {
            const message =
              (error.response &&
                error.response.data &&
                error.response.data.result) ||
              error.result ||
              error.toString();
            failNotification(message);
          }
        );
      }
    }
  };

  return (
    <Box>
      <div className="buy-sell-title buy-sell-top-padding box-horizontal-padding no-select">
        <div className="flex flex-center flex-space-between">
          <p>Buy and Sell</p>
        </div>
      </div>
      <div className="box-horizontal-padding buy-sell-height">
        <div className="tabs no-select">
          <button
            type="button"
            className={primaryTab === 0 ? "active-buy" : "passive"}
            onClick={() => handlePrimaryTab(0)}
          >
            Buy
          </button>
          <button
            type="button"
            className={primaryTab === 1 ? "active-sell" : "passive"}
            onClick={() => handlePrimaryTab(1)}
          >
            Sell
          </button>
        </div>

        {primaryTab === 0 && (
          <>
            <div className="secondary-tabs flex flex-center flex-space-around no-select">
              <button
                type="button"
                className={secondaryTab === 0 ? "active" : "passive"}
                onClick={() => handleSecondaryTab(0)}
              >
                Market
              </button>
              <button
                type="button"
                className={secondaryTab === 1 ? "active" : "passive"}
                onClick={() => handleSecondaryTab(1)}
              >
                Limit
              </button>
            </div>

            {secondaryTab === 0 && (
              <>
                <div className="buy-sell-line flex flex-center flex-space-between no-select">
                  <div>
                    <strong>Amount</strong>
                    <i
                      className="material-icons"
                      title="Lorem ipsum dolor sit amet consecteteur adispicing elit."
                    >
                      info
                    </i>
                  </div>
                  <div className="right">
                    <input
                      type="text"
                      id="volume"
                      name="volume"
                      value={volume.replace(/^0+(?!\.|$)/, "")}
                      placeholder="0"
                      onChange={handleVolumeChange}
                      className={
                        errors.volume
                          ? "buy-sell-line-input-error"
                          : "buy-sell-line-input"
                      }
                    />
                    <strong>{item.baseCurrency}</strong>
                  </div>
                </div>
                <div className="buy-sell-percentage flex flex-center flex-space-between no-select">
                  <Slider
                    value={value}
                    onChange={handleSliderValue}
                    {...sliderProps}
                    trackStyle={{ backgroundColor: "#00b638", height: 4 }}
                    railStyle={{ backgroundColor: "#9bffb9", height: 4 }}
                    handleStyle={{
                      borderColor: "#00b638",
                      height: 5,
                      width: 5,
                      marginTop: -1,
                      backgroundColor: "#00b638",
                    }}
                    dotStyle={{
                      borderColor: "#00b638",
                    }}
                    activeDotStyle={{
                      backgroundColor: "#00b638",
                      borderColor: "#00b638",
                    }}
                  />
                </div>
                <div className="box-button buy-sell-button-top-padding">
                  <button
                    type="button"
                    className="button button-green buy-sell-button-small button-block"
                    onClick={handleOrder}
                  >
                    Buy
                  </button>
                </div>
              </>
            )}

            {secondaryTab === 1 && (
              <>
                <div className="buy-sell-line flex flex-center flex-space-between no-select">
                  <div>
                    <strong>Limit Price</strong>
                    <i
                      className="material-icons"
                      title="Lorem ipsum dolor sit amet consecteteur adispicing elit."
                    >
                      info
                    </i>
                  </div>
                  <div className="right">
                    <input
                      type="text"
                      id="limitPrice"
                      name="limitPrice"
                      value={limitPrice.toString().replace(/^0+(?!\.|$)/, "")}
                      placeholder="0"
                      onChange={handleLimitPriceChange}
                      className={
                        errors.limitPrice
                          ? "buy-sell-line-input-error"
                          : "buy-sell-line-input"
                      }
                    />
                    <strong>{item.quoteCurrency}</strong>
                  </div>
                </div>
                <div className="buy-sell-line flex flex-center flex-space-between no-select">
                  <div>
                    <strong>Amount</strong>
                    <i
                      className="material-icons"
                      title="Lorem ipsum dolor sit amet consecteteur adispicing elit."
                    >
                      info
                    </i>
                  </div>
                  <div className="right">
                    <input
                      type="text"
                      id="volume"
                      name="volume"
                      value={volume.replace(/^0+(?!\.|$)/, "")}
                      placeholder="0"
                      onChange={handleVolumeChange}
                      className={
                        errors.volume
                          ? "buy-sell-line-input-error"
                          : "buy-sell-line-input"
                      }
                    />
                    <strong>{item.baseCurrency}</strong>
                  </div>
                </div>
                <div className="buy-sell-percentage flex flex-center flex-space-between no-select">
                  <Slider
                    value={value}
                    onChange={handleSliderValue}
                    {...sliderProps}
                    trackStyle={{ backgroundColor: "#00b638", height: 4 }}
                    railStyle={{ backgroundColor: "#9bffb9", height: 4 }}
                    handleStyle={{
                      borderColor: "#00b638",
                      height: 5,
                      width: 5,
                      marginTop: -1,
                      backgroundColor: "#00b638",
                    }}
                    dotStyle={{
                      borderColor: "#00b638",
                    }}
                    activeDotStyle={{
                      backgroundColor: "#00b638",
                      borderColor: "#00b638",
                    }}
                  />
                </div>
                <div className="box-button buy-sell-button-top-padding">
                  <button
                    type="button"
                    className="button button-green buy-sell-button-small button-block"
                    onClick={handleOrder}
                  >
                    Buy
                  </button>
                </div>
              </>
            )}

            {secondaryTab === 2 && <p>test</p>}
          </>
        )}

        {primaryTab === 1 && (
          <>
            <div className="secondary-tabs flex flex-center flex-space-around no-select">
              <button
                type="button"
                className={secondaryTab === 0 ? "active" : "passive"}
                onClick={() => handleSecondaryTab(0)}
              >
                Market
              </button>
              <button
                type="button"
                className={secondaryTab === 1 ? "active" : "passive"}
                onClick={() => handleSecondaryTab(1)}
              >
                Limit
              </button>
            </div>

            {secondaryTab === 0 && (
              <>
                <div className="buy-sell-line flex flex-center flex-space-between no-select">
                  <div>
                    <strong>Amount</strong>
                    <i
                      className="material-icons"
                      title="Lorem ipsum dolor sit amet consecteteur adispicing elit."
                    >
                      info
                    </i>
                  </div>
                  <div className="right">
                    <input
                      type="text"
                      id="volume"
                      name="volume"
                      value={volume.replace(/^0+(?!\.|$)/, "")}
                      placeholder="0"
                      onChange={handleVolumeChange}
                      className={
                        errors.volume
                          ? "buy-sell-line-input-error"
                          : "buy-sell-line-input"
                      }
                    />
                    <strong>{item.baseCurrency}</strong>
                  </div>
                </div>
                <div className="buy-sell-percentage flex flex-center flex-space-between no-select">
                  <Slider
                    value={value}
                    onChange={handleSliderValue}
                    {...sliderProps}
                    trackStyle={{ backgroundColor: "#da0000", height: 4 }}
                    railStyle={{ backgroundColor: "#ff9494", height: 4 }}
                    handleStyle={{
                      borderColor: "#da0000",
                      height: 5,
                      width: 5,
                      marginTop: -1,
                      backgroundColor: "#da0000",
                    }}
                    dotStyle={{
                      borderColor: "#da0000",
                    }}
                    activeDotStyle={{
                      backgroundColor: "#da0000",
                      borderColor: "#da0000",
                    }}
                  />
                </div>
                <div className="box-button buy-sell-button-top-padding">
                  <button
                    type="button"
                    className="button button-red buy-sell-button-small button-block"
                    onClick={handleOrder}
                  >
                    Sell
                  </button>
                </div>
              </>
            )}

            {secondaryTab === 1 && (
              <>
                <div className="buy-sell-line flex flex-center flex-space-between no-select">
                  <div>
                    <strong>Limit Price</strong>
                    <i
                      className="material-icons"
                      title="Lorem ipsum dolor sit amet consecteteur adispicing elit."
                    >
                      info
                    </i>
                  </div>
                  <div className="right">
                    <input
                      type="text"
                      id="limitPrice"
                      name="limitPrice"
                      value={limitPrice.toString().replace(/^0+(?!\.|$)/, "")}
                      placeholder="0"
                      onChange={handleLimitPriceChange}
                      className={
                        errors.limitPrice
                          ? "buy-sell-line-input-error"
                          : "buy-sell-line-input"
                      }
                    />
                    <strong>{item.quoteCurrency}</strong>
                  </div>
                </div>
                <div className="buy-sell-line flex flex-center flex-space-between no-select">
                  <div>
                    <strong>Amount</strong>
                    <i
                      className="material-icons"
                      title="Lorem ipsum dolor sit amet consecteteur adispicing elit."
                    >
                      info
                    </i>
                  </div>
                  <div className="right">
                    <input
                      type="text"
                      id="volume"
                      name="volume"
                      value={volume.replace(/^0+(?!\.|$)/, "")}
                      placeholder="0"
                      onChange={handleVolumeChange}
                      className={
                        errors.volume
                          ? "buy-sell-line-input-error"
                          : "buy-sell-line-input"
                      }
                    />
                    <strong>{item.baseCurrency}</strong>
                  </div>
                </div>
                <div className="buy-sell-percentage flex flex-center flex-space-between no-select">
                  <Slider
                    value={value}
                    onChange={handleSliderValue}
                    {...sliderProps}
                    trackStyle={{ backgroundColor: "#da0000", height: 4 }}
                    railStyle={{ backgroundColor: "#ff9494", height: 4 }}
                    handleStyle={{
                      borderColor: "#da0000",
                      height: 5,
                      width: 5,
                      marginTop: -1,
                      backgroundColor: "#da0000",
                    }}
                    dotStyle={{
                      borderColor: "#da0000",
                    }}
                    activeDotStyle={{
                      backgroundColor: "#da0000",
                      borderColor: "#da0000",
                    }}
                  />
                </div>
                <div className="box-button buy-sell-button-top-padding">
                  <button
                    type="button"
                    className="button button-red buy-sell-button-small button-block"
                    onClick={handleOrder}
                  >
                    Sell
                  </button>
                </div>
              </>
            )}

            {secondaryTab === 2 && <p>test</p>}
          </>
        )}
      </div>
    </Box>
  );
});

BuySell.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  item: PropTypes.object.isRequired,
};

export default BuySell;
