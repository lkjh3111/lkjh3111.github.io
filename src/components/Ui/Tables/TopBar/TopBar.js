import { memo } from "react";
import PropTypes from "prop-types";

const TopBar = memo(
  ({
    searchSubmit,
    searchOnChange,
    searchValue,
    fromValue,
    fromOnChange,
    toValue,
    toOnChange,
  }) => (
    <div className="top-buttons flex flex-destroy flex-center flex-space-between">
      <div>
        <div className="top-search no-select nowrap">
          <form onSubmit={searchSubmit} noValidate>
            <input
              type="text"
              id="search"
              name="search"
              autoComplete="off"
              placeholder="Search"
              onChange={searchOnChange}
              value={searchValue}
            />
            <button type="submit" className="pointer">
              <i className="material-icons">search</i>
            </button>
          </form>
        </div>
      </div>
      <div className="flex flex-center flex-destroy">
        <div className="flex flex-center">
          <div className="top-bar-label ">
            <label>From</label>
          </div>
          <div className="top-bar-input">
            <input
              type="date"
              name="from"
              value={fromValue}
              onChange={fromOnChange}
              autoComplete="on"
            />
          </div>
          <div className="top-bar-label ">
            <label>To</label>
          </div>
          <div className="top-bar-input">
            <input
              type="date"
              name="to"
              value={toValue}
              onChange={toOnChange}
              autoComplete="on"
            />
          </div>
        </div>
        <button type="button" className="button button-purple button-large">
          <i className="material-icons button-icon-left">download</i>
          Download CSV
        </button>
      </div>
    </div>
  )
);

TopBar.propTypes = {
  searchValue: PropTypes.string.isRequired,
  searchSubmit: PropTypes.func.isRequired,
  searchOnChange: PropTypes.func.isRequired,
};

export default TopBar;
