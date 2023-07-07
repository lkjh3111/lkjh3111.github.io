import { memo } from "react";

import Box from "../../Common/Box";
import RecentActivityRow from "../RecentActivity/RecentActivityRow";

const RecentTransactions = memo(({ item }) => {
  const data = item;
  return (
    <Box>
      <div className="box-title box-vertical-padding box-horizontal-padding no-select">
        <div className="flex flex-center flex-space-between">
          <div>
            <p>Transactions</p>
          </div>
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

export default RecentTransactions;
