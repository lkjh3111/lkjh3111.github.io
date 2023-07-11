import { memo, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AuthService from "../../../services/AuthService";
import UserService from "../../../services/UserService";

const HeaderRight = memo(({ image }) => {
  // const location = useLocation();
  // const [preview, setPreview] = useState(null);
  const user = AuthService.getCurrentUser();
  const name = user.firstName + " " + user.lastName;
  const [hide, setHide] = useState(false);

  // useEffect(() => {
  //   UserService.getImage(user.id).then((response) => {
  //     setPreview("data:image/jpeg;base64," + response.image);
  //   });
  // }, [preview]);

  useEffect(() => {
    if (user.roles.find((e) => e === "ADMIN")) {
      setHide(true);
    }
  }, []);

  const handleLogout = (e) => {
    AuthService.logout();
  };
  return (
    <div className="header-right no-select">
      <div className="flex flex-center">
        {/* <ul className='header-icons nowrap'>
          <li>
            <Link to='/search'>
              <i className='material-icons'>search</i>
            </Link>
          </li>
          <li>
            <Link to='/profile/notifications'>
              <span className='notification-badge'>23</span>
              <i className='material-icons'>notifications</i>
            </Link>
          </li>
        </ul> */}
        <ul className="header-user nowrap">
          <li>
            <Link to={hide ? "" : "/profile"}>
              <div className="header-name">
                <span>{name}</span>
                <span>@{user.username}</span>
              </div>
            </Link>
          </li>
          {!hide && (
            <li>
              <Link to="/profile">
                {/* <div
                  className="profile-picture cover"
                  // style={{
                  //   backgroundImage: `url('https://pbs.twimg.com/profile_images/1265581417364369408/b7CxjEfi_400x400.jpg')`,
                  // }}
                /> */}
                <img
                  className="profile-picture cover"
                  src={image}
                  alt="User avatar"
                />
              </Link>
            </li>
          )}
          <li>
            <Link className="signout" onClick={handleLogout}>
              <i className="material-icons">logout</i>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
});

export default HeaderRight;
