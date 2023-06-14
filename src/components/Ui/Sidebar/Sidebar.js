import { memo } from "react";
import { Link } from "react-router-dom";
import Logo from "../../../assets/Logo/logo.svg";
import SidebarButton from "./SidebarButton";

const Sidebar = memo(() => (
  <nav className='navbar-inner no-select'>
    <div className='logo'>
      <Link to='/dashboard' className='text'>
        <img src={Logo} alt='158 Forex Trading' draggable='false' />
        <span>158 Forex Trading</span>
      </Link>
    </div>
    <ul>
      <li>
        <SidebarButton url='/dashboard' icon='dashboard' title='Dashboard' />
      </li>
      <li>
        <SidebarButton url='/trading' icon='paid' title='Trade' />
      </li>
      <li>
        <SidebarButton
          url='/wallet'
          icon='account_balance_wallet'
          title='My Wallet'
        />
      </li>
      <li>
        <SidebarButton url='/transactions' icon='sync' title='Transactions' />
      </li>
      {/* <li>
        <SidebarButton
          url='/exchange'
          icon='account_balance'
          title='Exchange'
        />
      </li> */}
      <li>
        <SidebarButton url='/capital' icon='equalizer' title='Capital' />
      </li>
      <li>
        <SidebarButton url='/profile' icon='account_circle' title='Profile' />
      </li>
      {/* <li>
        <SidebarButton url='/settings' icon='settings' title='Settings' />
      </li> */}
    </ul>
  </nav>
));

export default Sidebar;
