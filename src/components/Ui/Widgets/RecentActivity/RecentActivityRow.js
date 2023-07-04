import { memo } from "react";
import PropTypes from "prop-types";

import ProcessType from "./ProcessType";
import StatusName from "./StatusName";

const RecentActivityRow = memo(({ item }) => {
  const timestamp =
    new Date(item.timestamp).toDateString() +
    " " +
    new Date(item.timestamp).toLocaleTimeString();
  return (
    <div className="activity-row flex flex-center flex-space-between no-select">
      <ProcessType type={item.type} />
      <div className="right activity-row-div-30">{timestamp}</div>
      <div className="left activity-row-div-20">
        <strong>
          {item.amount} {item.asset}
        </strong>
      </div>
      <div className="cemter activity-row-div-20 nowrap">
        <StatusName status={item.status} />
      </div>
    </div>
  );
});

RecentActivityRow.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  item: PropTypes.object.isRequired,
};

export default RecentActivityRow;
