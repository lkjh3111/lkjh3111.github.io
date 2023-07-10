import { memo, useState, useEffect } from "react";

import Box from "../../Common/Box";
import WalletOverviewRow from "./WalletOverviewRow";
import AuthService from "../../../../services/AuthService";
import UserService from "../../../../services/UserService";
import ForexService from "../../../../services/ForexService";

const WalletOverview = memo(({ currencyChange }) => {
  const [data, setData] = useState([]);
  const userId = AuthService.getCurrentUser().id;
  const [currencyList, setCurrencyList] = useState({});

  useEffect(() => {
    console.log("test2");
    UserService.getUserWallets(userId).then((response) => {
      setData(response);
    });
  }, []);

  useEffect(() => {
    console.log("test");
    ForexService.getCurrencyList().then((response) => {
      setCurrencyList(response);
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
              currencyList={currencyList}
            />
          ))}
      </div>
    </Box>
  );
});

export default WalletOverview;
