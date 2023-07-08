import React from "react";
import classnames from "classnames";
import { usePagination, DOTS, DOTS2 } from "./usePagination";

const Pagination = (props) => {
  const {
    onPageChange,
    totalCount,
    siblingCount = 1,
    currentPage,
    pageSize,
    className,
  } = props;

  const paginationRange = usePagination({
    currentPage,
    totalCount,
    siblingCount,
    pageSize,
  });

  if (currentPage === 0 || paginationRange.length < 2) {
    return null;
  }

  const onNext = () => {
    onPageChange(currentPage + 1);
  };

  const onPrevious = () => {
    onPageChange(currentPage - 1);
  };

  let lastPage = paginationRange[paginationRange.length - 1];
  return (
    <div>
      <ul className={"pagination-container " + className}>
        <li
          className={classnames("pagination-item", {
            disabled: currentPage === 1,
          })}
          onClick={onPrevious}
          key={0}
        >
          <div className="arrow left" />
        </li>
        {paginationRange.map((pageNumber) => {
          if (pageNumber === DOTS) {
            return (
              <li className="pagination-item dots" key={lastPage + 2}>
                &#8230;
              </li>
            );
          }

          if (pageNumber === DOTS2) {
            return (
              <li className="pagination-item dots" key={lastPage + 3}>
                &#8230;
              </li>
            );
          }

          return (
            <li
              className={classnames("pagination-item", {
                selected: pageNumber === currentPage,
              })}
              onClick={() => onPageChange(pageNumber)}
              key={pageNumber}
            >
              {pageNumber}
            </li>
          );
        })}
        <li
          className={classnames("pagination-item", {
            disabled: currentPage === lastPage,
          })}
          key={lastPage + 1}
          onClick={onNext}
        >
          <div className="arrow right" />
        </li>
      </ul>
    </div>
  );
};

export default Pagination;
