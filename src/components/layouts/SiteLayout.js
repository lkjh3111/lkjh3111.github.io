import { useState } from "react";
import PropTypes from "prop-types";

import Sidebar from "../Ui/Sidebar/Sidebar";
import Header from "../Ui/Header/Header";
import { SidebarUserData } from "../Ui/Sidebar/SidebarUserData";
import { SidebarAdminData } from "../Ui/Sidebar/SidebarAdminData";
import { ToastContainer } from "react-toastify";
import AuthService from "../../services/AuthService";
import "react-toastify/dist/ReactToastify.min.css";

const SiteLayout = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const user = AuthService.getCurrentUser();
  let roles = user.roles;
  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  let roleData;
  if (roles.find((e) => e === "ADMIN")) {
    roleData = SidebarAdminData;
  } else {
    roleData = SidebarUserData;
  }

  return (
    <div className="flex">
      <ToastContainer
        autoClose={2500}
        hideProgressBar={true}
        closeOnClick
        theme="colored"
      />
      <div
        className={isOpen ? "sidebar" : "sidebar full-height responsive-hide"}
      >
        <Sidebar userData={roleData} />
      </div>
      <div className="content full-height flex-1">
        <Header icon="menu" onClick={handleToggle} />
        {children}
      </div>
    </div>
  );
};

SiteLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default SiteLayout;
