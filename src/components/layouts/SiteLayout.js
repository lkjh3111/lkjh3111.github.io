import { memo } from "react";
import PropTypes from "prop-types";

import Sidebar from "../Ui/Sidebar/Sidebar";

const SiteLayout = memo(({ children }) => (
  <div className='flex'>
    <div className='sidebar full-height responsive-hide'>
      <Sidebar />
    </div>
    <div className='content full-height flex-1'>{children}</div>
  </div>
));

SiteLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default SiteLayout;
