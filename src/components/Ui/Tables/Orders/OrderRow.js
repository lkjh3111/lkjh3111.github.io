import { memo, useState, useEffect } from "react";
import PropTypes from "prop-types";

// import Icon from "./Icon";
import Amount from "./Amount";
import Status from "./Status";
import EditOrder from "../../../../AdminScreens/Orders/EditOrders/EditOrder";

const OrderRow = memo(({ item, trigger }) => {
  const [menuOpened, setMenuOpened] = useState(false);
  const [hideMenu, setHideMenu] = useState(false);
  const [editOrderIsShown, setEditOrderIsShown] = useState(false);

  useEffect(() => {
    if (item.status !== "ACTIVE") {
      setHideMenu(true);
    }
  }, [item.status]);

  const handleAmount = (value) => {
    const numberAmount = Number(value);
    const rounded = Math.round(numberAmount * 1e8) / 1e8;
    return rounded;
  };

  const handleMenuOpen = () => {
    setMenuOpened(!menuOpened);
  };

  const onShowEditOrderHandler = () => {
    setEditOrderIsShown(true);
  };

  const onCloseEditOrderHandler = () => {
    setEditOrderIsShown(false);
  };

  const timestamp =
    new Date(item.timestamp).toDateString() +
    " " +
    new Date(item.timestamp).toLocaleTimeString();

  return (
    <tr>
      {/* <td>
        <Icon type={item.type} />
      </td> */}
      <td className="responsive-hide">{item.id}</td>
      <td className="left responsive-hide">{timestamp}</td>
      <td className="left">{item.from}</td>
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
        <Amount type={item.side} amount={item.volume} asset={item.symbol} />
      </td>
      <td className="left">{item.type}</td>
      <td className="center">
        <Status status={item.status} />
      </td>
      {!hideMenu && (
        <td className="right">
          <button
            type="button"
            className="pointer"
            onClick={() => handleMenuOpen()}
          >
            <i className="material-icons">more_vert</i>
          </button>

          {menuOpened && (
            <div className="box-dropdown">
              <ul>
                <li>
                  <button type="button" onClick={onShowEditOrderHandler}>
                    <i className="material-icons">edit</i>
                    Edit
                  </button>
                  {editOrderIsShown && (
                    <EditOrder
                      onEditOrder={onCloseEditOrderHandler}
                      item={item}
                      trigger={trigger}
                    />
                  )}
                </li>
              </ul>
            </div>
          )}
        </td>
      )}
    </tr>
  );
});

OrderRow.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  item: PropTypes.object.isRequired,
};

export default OrderRow;
