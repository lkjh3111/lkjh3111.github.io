import { useState, useEffect } from "react";

import SiteLayout from "../../components/layouts/SiteLayout";
import TopBar from "../../components/Ui/Tables/TopBar/TopBar";
import TransactionRow from "../../components/Ui/Tables/Transactions/TransactionRow";
import AdminService from "../../services/AdminService";
import Pagination from "../../components/Ui/Tables/Pagination/Pagination";

const AdminTransactionsScreen = () => {
  const [data, setData] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [totalItems, setTotalItems] = useState(0);

  useEffect(() => {
    AdminService.getTransacions(pageNumber, pageSize, from, to).then(
      (response) => {
        console.log(response);
        setData(response.data);
        setTotalItems(response.totalItems);
      }
    );
  }, [pageNumber, pageSize]);

  const handleSearchValue = (e) => {
    const { value } = e.target;

    setKeyword(value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <SiteLayout>
      <h3 className="title">Transactions</h3>
      <TopBar
        searchValue={keyword}
        searchOnChange={handleSearchValue}
        searchSubmit={handleSearchSubmit}
      />

      <table className="data-table">
        <thead>
          <tr>
            <th className="left">&nbsp;</th>
            <th className="left responsive-hide">ID</th>
            <th className="left responsive-hide">Timestamp</th>
            <th className="left">From</th>
            {/* <th className="left">To</th> */}
            {/* <th className="left">Coin</th> */}
            <th className="center">Amount</th>
            <th className="center">Status</th>
            <th className="right">&nbsp;</th>
          </tr>
        </thead>
        {data && data.length > 0 && (
          <tbody>
            {data.map((item) => (
              <TransactionRow key={item.id.toString()} item={item} />
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

export default AdminTransactionsScreen;
