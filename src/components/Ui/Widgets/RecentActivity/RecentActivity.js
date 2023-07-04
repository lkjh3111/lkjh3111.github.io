import { memo, useState, useEffect } from "react";

import Box from "../../Common/Box";
import RecentActivityRow from "./RecentActivityRow";
import AuthService from "../../../../services/AuthService";
import UserService from "../../../../services/UserService";

const RecentActivity = memo(() => {
  const [data, setData] = useState([]);
  const userId = AuthService.getCurrentUser().id;

  useEffect(() => {
    UserService.getUserWallet(userId).then((response) => {
      setData(response.data.result.transactions);
    });
  }, []);

  return (
    <Box>
      <div className="box-title box-vertical-padding box-horizontal-padding no-select">
        <div className="flex flex-center flex-space-between">
          <div>
            <p>Recent Transactions</p>
          </div>
          <ul>
            <li>
              <button type="button">Yesterday</button>
            </li>
            <li>
              <button type="button" className="active">
                Today
              </button>
            </li>
          </ul>
        </div>
      </div>
      <div className="box-content box-content-height-nobutton">
        {data &&
          data.map((item) => (
            <RecentActivityRow key={item.id.toString()} item={item} />
          ))}
      </div>
    </Box>
  );
});

export default RecentActivity;
