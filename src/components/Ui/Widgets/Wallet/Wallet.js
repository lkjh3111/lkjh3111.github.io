import { memo } from "react";
import Box from "../../Common/Box";

const Wallet = memo((props) => {
  const handleAmount = (value) => {
    const numberAmount = Number(value);
    const rounded = Math.round(numberAmount * 1e2) / 1e2;
    return rounded;
  };

  return (
    <Box>
      <div className="wallet">
        <div className="box-title box-top-padding  box-horizontal-padding no-select">
          <div className="flex flex-center flex-space-between">
            <p>Current Balance</p>
          </div>
        </div>
        <div className="wallet-height">
          <div className="center">
            <div className="coin-price no-select">
              {handleAmount(props.balance)} {props.currency}
            </div>
          </div>
        </div>
      </div>
    </Box>
  );
});

export default Wallet;
