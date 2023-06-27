import { memo } from "react";
import PropTypes from "prop-types";
import classes from "./HeaderLeft.module.css";

const HeaderLeft = memo(({ icon, onClick }) => (
  <div className='header-left nowrap no-select'>
    {icon && (
      <button type='button' onClick={onClick} className={classes.pointer}>
        <i className='material-icons'>{icon}</i>
      </button>
    )}
    {/* <h1>{title}</h1> */}
  </div>
));

HeaderLeft.defaultProps = {
  icon: null,
};

HeaderLeft.propTypes = {
  icon: PropTypes.string,
  // title: PropTypes.string.isRequired,
};

export default HeaderLeft;
