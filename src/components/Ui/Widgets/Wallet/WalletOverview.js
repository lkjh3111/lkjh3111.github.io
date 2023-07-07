import { memo, useState, useEffect } from "react";

import Box from "../../Common/Box";
import WalletOverviewRow from "./WalletOverviewRow";
import AuthService from "../../../../services/AuthService";
import UserService from "../../../../services/UserService";

const WalletOverview = memo(({ currencyChange }) => {
  const [data, setData] = useState([]);
  const userId = AuthService.getCurrentUser().id;

  useEffect(() => {
    UserService.getUserWallets(userId).then((response) => {
      setData(response);
    });
  }, []);

  return (
    <Box>
      <div className="box-title box-vertical-padding box-horizontal-padding no-select">
        <div className="flex flex-center flex-space-between">
          <div>
            <p>My Assets</p>
          </div>
        </div>
      </div>
      <div className="box-content small-height">
        {data &&
          data.map((item) => (
            <WalletOverviewRow
              key={item.id.toString()}
              item={item}
              currencyChange={currencyChange}
            />
          ))}
      </div>
    </Box>
  );
});

export default WalletOverview;
