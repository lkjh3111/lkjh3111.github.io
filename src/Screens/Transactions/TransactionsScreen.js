import { useState, useEffect } from "react";

import SiteLayout from "../../components/layouts/SiteLayout";
import TopBar from "../../components/Ui/Tables/TopBar/TopBar";
import TransactionRow from "../../components/Ui/Tables/Transactions/TransactionRow";
import UserService from "../../services/UserService";
import Pagination from "../../components/Ui/Tables/Pagination/Pagination";
import AuthService from "../../services/AuthService";

const TransactionsScreen = () => {
  const [data, setData] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [totalItems, setTotalItems] = useState(0);
  const userId = AuthService.getCurrentUser().id;

  const [fetchData, setFetchData] = useState(true);
  const triggerDataFetch = () => setFetchData((t) => !t);

  useEffect(() => {
    const newFrom = from ? new Date(from).toISOString().slice(0, 22) : from;
    const newTo = to ? new Date(to).toISOString().slice(0, 22) : to;
    UserService.getUserTransactions(
      userId,
      pageNumber,
      pageSize,
      newFrom,
      newTo,
      keyword
    ).then((response) => {
      setData(response.data);
      setTotalItems(response.totalItems);
    });
  }, [pageNumber, pageSize, fetchData, from, to]);

  const handleSearchValue = (e) => {
    const { value } = e.target;
    setKeyword(value);
  };

  const handleFromChange = (e) => {
    const { value } = e.target;
    setFrom(value);
  };

  const handleToChange = (e) => {
    const { value } = e.target;
    setTo(value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const newFrom = from ? new Date(from).toISOString().slice(0, 22) : from;
    const newTo = to ? new Date(to).toISOString().slice(0, 22) : to;
    UserService.getUserTransactions(
      userId,
      pageNumber,
      pageSize,
      newFrom,
      newTo,
      keyword
    ).then((response) => {
      setData(response.data);
      setTotalItems(response.totalItems);
    });
  };

  return (
    <SiteLayout>
      <h3 className="title">Transactions</h3>
      <TopBar
        searchValue={keyword}
        searchOnChange={handleSearchValue}
        searchSubmit={handleSearchSubmit}
        fromValue={from}
        fromOnChange={handleFromChange}
        toValue={to}
        toOnChange={handleToChange}
      />

      <table className="data-table">
        <thead>
          <tr>
            <th className="left">&nbsp;</th>
            <th className="left responsive-hide">ID</th>
            <th className="left">Timestamp</th>
            <th className="center">Amount</th>
            <th className="center">Status</th>
          </tr>
        </thead>
        {data && data.length > 0 && (
          <tbody>
            {data.map((item) => (
              <TransactionRow
                key={item.id.toString()}
                item={item}
                trigger={triggerDataFetch}
              />
            ))}
          </tbody>
        )}
      </table>
      <Pagination
        className="pagination-bar"
        currentPage={pageNumber}
        totalCount={totalItems}
        pageSize={pageSize}
        onPageChange={(page) => setPageNumber(page)}
      />
    </SiteLayout>
  );
};

export default TransactionsScreen;
