import { memo, useState, useEffect } from "react";
import PropTypes from "prop-types";

import Icon from "./Icon";
import Amount from "./Amount";
import Status from "./Status";
import EditTransaction from "../../../../AdminScreens/Transactions/EditTransaction/EditTransaction";

const AdminTransactionRow = memo(({ item, trigger }) => {
  const [menuOpened, setMenuOpened] = useState(false);
  const [hideMenu, setHideMenu] = useState(false);
  const [editTransactionIsShown, setEditTransactionIsShown] = useState(false);

  useEffect(() => {
    if (item.status !== "PENDING") {
      setHideMenu(true);
    }
  }, [item.status]);

  const handleMenuOpen = () => {
    setMenuOpened(!menuOpened);
  };

  const onShowEditTransactionHandler = () => {
    setEditTransactionIsShown(true);
  };

  const onCloseEditTransactionHandler = () => {
    setEditTransactionIsShown(false);
  };

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
      <td className="left responsive-hide">{timestamp}</td>
      <td className="left">{item.from}</td>
      <td className="center">
        <Amount type={item.type} amount={item.amount} asset={item.asset} />
      </td>
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
                  <button type="button" onClick={onShowEditTransactionHandler}>
                    <i className="material-icons">edit</i>
                    Edit
                  </button>
                  {editTransactionIsShown && (
                    <EditTransaction
                      onEditTransaction={onCloseEditTransactionHandler}
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

AdminTransactionRow.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  item: PropTypes.object.isRequired,
};

export default AdminTransactionRow;
