import { memo, useState } from "react";
import PropTypes from "prop-types";

import Icon from "./Icon";
import Amount from "./Amount";
import Status from "./Status";

const TransactionRow = memo(({ item }) => {
  const [menuOpened, setMenuOpened] = useState(false);
  const [editUserIsShown, setEditUserIsShown] = useState(false);

  const handleMenuOpen = () => {
    setMenuOpened(!menuOpened);
  };

  const onShowEditUserHandler = () => {
    setEditUserIsShown(true);
  };

  const onCloseEditUserHandler = () => {
    setEditUserIsShown(false);
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
      {/* <td className='nowrap'>
      <div className='icon cover' style={{ backgroundImage: `url('${item.toPicture}')` }} />
      {item.to}
    </td> */}
      {/* <td className='nowrap'>
      <div className='icon cover' style={{ backgroundImage: `url('${item.icon}')` }} />
      <strong>{item.coin}</strong>
    </td> */}
      <td className="center">
        <Amount type={item.type} amount={item.amount} asset={item.asset} />
      </td>
      <td className="center">
        <Status status={item.status} />
      </td>
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
                <button type="button" onClick={onShowEditUserHandler}>
                  <i className="material-icons">edit</i>
                  Edit
                </button>
                {/* {editUserIsShown && (
                  <EditUser
                    onEditUser={onCloseEditUserHandler}
                    item={item}
                    trigger={trigger}
                  />
                )} */}
              </li>
            </ul>
          </div>
        )}
      </td>
    </tr>
  );
});

TransactionRow.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  item: PropTypes.object.isRequired,
};

export default TransactionRow;
