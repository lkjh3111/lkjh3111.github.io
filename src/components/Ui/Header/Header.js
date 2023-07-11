import PropTypes from "prop-types";

import HeaderLeft from "./HeaderLeft";
import HeaderRight from "./HeaderRight";

const Header = (props) => {
  return (
    <header className="flex flex-center flex-space-between">
      <HeaderLeft
        icon={props.icon}
        onClick={props.onClick}
        // title={props.title}
      />
      <HeaderRight image={props.image} />
    </header>
  );
};

export default Header;

Header.defaultProps = {
  icon: null,
};

Header.propTypes = {
  icon: PropTypes.string,
  // title: PropTypes.string.isRequired,
};

// export default Header;
