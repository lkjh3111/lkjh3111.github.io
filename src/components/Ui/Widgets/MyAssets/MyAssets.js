import { memo, useState, useEffect } from "react";
import { Link } from "react-router-dom";

import Box from "../../Common/Box";
import MyAssetsRow from "./MyAssetsRow";
import AuthService from "../../../../services/AuthService";
import UserService from "../../../../services/UserService";

const MyOrders = memo(() => {
  const [data, setData] = useState([]);
  // const [menuOpened, setMenuOpened] = useState(false);
  const userId = AuthService.getCurrentUser().id;

  useEffect(() => {
    UserService.getUserOrders(userId, 1, 30).then((response) => {
      setData(response.data);
    });
  }, []);

  // const handleMenuOpen = () => {
  //   setMenuOpened(!menuOpened);
  // };

  return (
    <Box>
      <div className="box-title box-vertical-padding box-horizontal-padding no-select">
        <div className="flex flex-center flex-space-between">
          <p>Orders</p>
          <div>
            <Link
              to="/trading"
              type="button"
              className="button button-purple button-small"
            >
              Buy
            </Link>
            {/* <button
              type="button"
              className="box-icon pointer"
              onClick={() => handleMenuOpen()}
            >
              <i className="material-icons">more_vert</i>
            </button> */}

            {/* {menuOpened && (
              <div className="box-dropdown">
                <ul>
                  <li>
                    <button type="button">
                      <i className="material-icons">settings</i>
                      Button 1
                    </button>
                  </li>
                  <li>
                    <button type="button">
                      <i className="material-icons">favorite</i>
                      Button 2
                    </button>
                  </li>
                  <li>
                    <button type="button">
                      <i className="material-icons">info</i>
                      Button 3
                    </button>
                  </li>
                </ul>
              </div>
            )} */}
          </div>
        </div>
      </div>
      <div className="box-content box-content-height-nobutton">
        {data &&
          data.map((item) => (
            <MyAssetsRow key={item.id.toString()} item={item} />
          ))}
      </div>
    </Box>
  );
});

export default MyOrders;
