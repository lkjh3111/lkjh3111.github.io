import { Link } from "react-router-dom";
import Logo from "../../../assets/Logo/logo.svg";
import SidebarButton from "./SidebarButton";

const Sidebar = (props) => {
  return (
    <nav className='navbar-inner no-select'>
      <div className='logo'>
        <Link to='/dashboard' className='text'>
          <img src={Logo} alt='158 Forex Trading' draggable='false' />
          <span>158 Forex Trading</span>
        </Link>
      </div>
      <ul>
        {props.userData.map((item, index) => {
          return (
            <li key={index}>
              <SidebarButton
                url={item.path}
                icon={item.icon}
                title={item.title}
              />
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default Sidebar;
