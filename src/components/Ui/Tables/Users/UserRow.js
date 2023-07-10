import { memo, useState, useEffect } from "react";
import PropTypes from "prop-types";
import AdminService from "../../../../services/AdminService";
import EditUser from "../../../../AdminScreens/Dashboard/EditUser/EditUser";
import { toast } from "react-toastify";

const UserRow = memo(({ item, index, trigger }) => {
  const [menuOpened, setMenuOpened] = useState(false);
  const [hideMenu, setHideMenu] = useState(false);
  const [editUserIsShown, setEditUserIsShown] = useState(false);

  useEffect(() => {
    if (item.roles.find((e) => e === "ADMIN")) {
      setHideMenu(true);
    }
  }, []);

  const handleMenuOpen = () => {
    setMenuOpened(!menuOpened);
  };

  const getWallet = () => {
    const wallet = item.wallets.find((data) => data.currency === "USD");
    const balance = wallet ? wallet.balance : 0;
    return balance;
  };

  const roundToFourDigits = (e) => {
    const numberAmount = Number(e);
    const rounded = Math.round(numberAmount * 1e4) / 1e4;
    return rounded.toString();
  };

  const onShowEditUserHandler = () => {
    setEditUserIsShown(true);
  };

  const onCloseEditUserHandler = () => {
    setEditUserIsShown(false);
  };

  const successNotification = (e) => toast.success(e);

  const failNotification = (e) => toast.error(e);

  const handleDelete = (e) => {
    AdminService.deleteUser(item.id).then(
      (response) => {
        successNotification(response);
        trigger();
      },
      (error) => {
        const message =
          (error.response &&
            error.response.data &&
            error.response.data.result) ||
          error.result ||
          error.toString();
        failNotification(message);
      }
    );
  };

  return (
    <tr>
      <td className="left responsive-hide">
        {/* <div className="rank accent no-select">{index}</div> */}
        {item.id}
      </td>
      <td className="left">
        {item.firstName} {item.lastName}
      </td>
      <td className="center">{item.username}</td>
      <td className="center">{item.email}</td>
      <td className="center responsive-hide2">{item.roles.toString()}</td>
      <td className="center">
        {!hideMenu ? roundToFourDigits(getWallet()) + " USD" : ""}
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
                  <button type="button" onClick={handleDelete}>
                    <i className="material-icons">delete</i>
                    Delete
                  </button>
                </li>
                <li>
                  <button type="button" onClick={onShowEditUserHandler}>
                    <i className="material-icons">edit</i>
                    Edit
                  </button>
                  {editUserIsShown && (
                    <EditUser
                      onEditUser={onCloseEditUserHandler}
                      item={item}
                      balance={getWallet()}
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

UserRow.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  item: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,
};

export default UserRow;
