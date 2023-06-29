import { memo } from "react";
import Box from "../../Common/Box";

const Wallet = memo((props) => {
  return (
    <Box>
      <div className="wallet">
        <div className="box-title box-vertical-padding box-horizontal-padding no-select">
          <div className="flex flex-center flex-space-between">
            <p>Current Balance</p>
          </div>
        </div>
        <div className="wallet-height">
          <div className="center">
            <div className="coin-price no-select">{props.balance}</div>
          </div>
        </div>
      </div>
    </Box>
  );
});

export default Wallet;
