import { memo } from "react";
import PropTypes from "prop-types";

import Icon from "./Icon";
import Amount from "./Amount";
import Status from "./Status";

const TransactionRow = memo(({ item }) => {
  const timestamp =
    new Date(item.timestamp).toDateString() +
    " " +
    new Date(item.timestamp).toLocaleTimeString();

  return (
    <tr>
      <td>
        <Icon type={item.type} />
      </td>
      <td className="responsive-hide">{item.id}</td>
      <td className="left">{timestamp}</td>
      <td className="center">
        <Amount type={item.type} amount={item.amount} asset={item.asset} />
      </td>
      <td className="center">
        <Status status={item.status} />
      </td>
    </tr>
  );
});

TransactionRow.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  item: PropTypes.object.isRequired,
};

export default TransactionRow;
