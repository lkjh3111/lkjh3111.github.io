import { memo } from "react";
import PropTypes from "prop-types";

import Amount from "./Amount";
import Status from "./Status";

const OrderRow = memo(({ item }) => {
  const handleAmount = (value) => {
    const numberAmount = Number(value);
    const rounded = Math.round(numberAmount * 1e8) / 1e8;
    return rounded;
  };

  const timestamp =
    new Date(item.timestamp).toDateString() +
    " " +
    new Date(item.timestamp).toLocaleTimeString();

  return (
    <tr>
      <td className="responsive-hide">{item.id}</td>
      <td className="left responsive-hide">{timestamp}</td>
      <td className="center">
        <strong>{item.symbol + "/" + item.asset}</strong>
      </td>
      <td className="center">
        {handleAmount(item.price)} {item.asset}
      </td>
      <td className="center">
        {handleAmount(item.volume)} {item.symbol}
      </td>
      <td className="center">
        <Amount type={item.side} />
      </td>
      <td className="left">{item.type}</td>
      <td className="center">
        <Status status={item.status} />
      </td>
    </tr>
  );
});

OrderRow.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  item: PropTypes.object.isRequired,
};

export default OrderRow;
