import { memo, useState } from "react";

import Box from "../../Common/Box";

import Slider from "rc-slider";
import "rc-slider/assets/index.css";

const BuySell = memo(() => {
  const [primaryTab, setPrimaryTab] = useState(0);
  const [secondaryTab, setSecondaryTab] = useState(0);
  const [value, setValue] = useState(0.0);

  const handlePrimaryTab = (tabNum) => {
    setPrimaryTab(tabNum);

    setSecondaryTab(0);
  };

  const handleSecondaryTab = (tabNum) => {
    setSecondaryTab(tabNum);
  };

  const sliderProps = {
    min: 0.0,
    max: 1.0,
    step: 0.25,
    marks: { 0.0: 0, 0.25: "25%", 0.5: "50%", 0.75: "75%", 1.0: "MAX" },
  };

  return (
    <Box>
      <div className="box-title box-vertical-padding box-horizontal-padding no-select">
        <div className="flex flex-center flex-space-between">
          <p>Buy and Sell</p>
        </div>
      </div>
      <div className="box-horizontal-padding box-content-height-nobutton">
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
                    <input type="text" id="m" name="m" placeholder="0" />
                    <strong>BTC</strong>
                  </div>
                </div>
                <div className="buy-sell-percentage flex flex-center flex-space-between no-select">
                  <Slider
                    value={value}
                    onChange={(val) => setValue(val)}
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
                <div className="box-button box-vertical-padding">
                  <button
                    type="button"
                    className="button button-green button-medium button-block"
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
                    <input type="text" id="f" name="f" placeholder="0" />
                    <strong>USD</strong>
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
                    <input type="text" id="m" name="m" placeholder="0" />
                    <strong>BTC</strong>
                  </div>
                </div>
                <div className="buy-sell-percentage flex flex-center flex-space-between no-select">
                  <Slider
                    value={value}
                    onChange={(val) => setValue(val)}
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
                <div className="box-button box-vertical-padding">
                  <button
                    type="button"
                    className="button button-green button-medium button-block"
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
                    <input type="text" id="m" name="m" placeholder="0" />
                    <strong>BTC</strong>
                  </div>
                </div>
                <div className="buy-sell-percentage flex flex-center flex-space-between no-select">
                  <Slider
                    value={value}
                    onChange={(val) => setValue(val)}
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
                <div className="box-button box-vertical-padding">
                  <button
                    type="button"
                    className="button button-red button-medium button-block"
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
                    <input type="text" id="f" name="f" placeholder="0" />
                    <strong>USD</strong>
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
                    <input type="text" id="m" name="m" placeholder="0" />
                    <strong>BTC</strong>
                  </div>
                </div>
                <div className="buy-sell-percentage flex flex-center flex-space-between no-select">
                  <Slider
                    value={value}
                    onChange={(val) => setValue(val)}
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
                <div className="box-button box-vertical-padding">
                  <button
                    type="button"
                    className="button button-red button-medium button-block"
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

export default BuySell;
