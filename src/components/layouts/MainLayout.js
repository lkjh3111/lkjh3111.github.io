import { memo } from "react";
import PropTypes from "prop-types";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";

const MainLayout = memo(({ children }) => (
  <div>
    <ToastContainer
      autoClose={4000}
      hideProgressBar={true}
      closeOnClick
      theme="colored"
    />
    {children}
  </div>
));

MainLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default MainLayout;
