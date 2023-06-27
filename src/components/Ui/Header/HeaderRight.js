import { memo } from "react";
import { Link } from "react-router-dom";
import AuthService from "../../../services/AuthService";

const HeaderRight = memo(() => {
  // const location = useLocation();
  const user = AuthService.getCurrentUser();
  const name = user.firstName + " " + user.lastName;

  const handleLogout = (e) => {
    AuthService.logout();
  };
  return (
    <div className='header-right no-select'>
      <div className='flex flex-center'>
        {/* <ul className='header-menu nowrap'>
          <li>
            <Link
              to='/market'
              className={location.pathname.toLowerCase().includes('/market') ? 'active' : 'passive'}
            >
              Market
            </Link>
          </li>
          <li>
            <Link
              to='/data'
              className={location.pathname.toLowerCase().includes('/data') ? 'active' : 'passive'}
            >
              Veri
            </Link>
          </li>
          <li>
            <Link
              to='/docs'
              className={location.pathname.toLowerCase().includes('/docs') ? 'active' : 'passive'}
            >
              Doküman
            </Link>
          </li>
          <li>
            <Link
              to='/api'
              className={location.pathname.toLowerCase().includes('/api') ? 'active' : 'passive'}
            >
              API
            </Link>
          </li>
        </ul> */}
        <ul className='header-icons nowrap'>
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
        </ul>
        <ul className='header-user nowrap'>
          <li>
            <Link to='/profile'>
              <span>{name}</span>
              <span>@{user.username}</span>
            </Link>
          </li>
          <li>
            <Link to='/profile'>
              <div
                className='profile-picture cover'
                style={{
                  backgroundImage: `url('https://pbs.twimg.com/profile_images/1265581417364369408/b7CxjEfi_400x400.jpg')`,
                }}
              />
            </Link>
          </li>
          <li className='responsive-hide'>
            <Link className='signout' onClick={handleLogout}>
              <i className='material-icons'>power_settings_new</i>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
});

export default HeaderRight;
