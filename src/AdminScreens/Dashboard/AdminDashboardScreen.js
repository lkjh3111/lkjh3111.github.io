import { useState, useEffect } from "react";

import SiteLayout from "../../components/layouts/SiteLayout";
import TopBarUsers from "../../components/Ui/Tables/TopBar/TopBarUsers";
import UserRow from "../../components/Ui/Tables/Users/UserRow";
import AdminService from "../../services/AdminService";
import Pagination from "../../components/Ui/Tables/Pagination/Pagination";

const AdminDashboardScreen = () => {
  const [data, setData] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalItems, setTotalItems] = useState(0);
  const [keyword, setKeyword] = useState("");

  const [fetchData, setFetchData] = useState(true);
  const triggerDataFetch = () => setFetchData((t) => !t);

  useEffect(() => {
    AdminService.getUsers(pageNumber, pageSize, keyword).then((response) => {
      setData(response.data);
      setTotalItems(response.totalItems);
    });
  }, [pageNumber, pageSize, fetchData]);

  const handleSearchValue = (e) => {
    const { value } = e.target;
    setKeyword(value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    AdminService.getUsers(pageNumber, pageSize, keyword).then((response) => {
      setData(response.data);
      setTotalItems(response.totalItems);
    });
  };
  return (
    <SiteLayout>
      <h3 className="title">Users</h3>
      <TopBarUsers
        searchValue={keyword}
        searchOnChange={handleSearchValue}
        searchSubmit={handleSearchSubmit}
      />
      <div>
        <>
          <table className="data-table">
            <thead>
              <tr>
                <th className="left"></th>
                <th className="left">Name</th>
                <th className="center">Username</th>
                <th className="center">Email</th>
                <th className="center responsive-hide2">Roles</th>
                {/* <th className="rIght responsive-hide">Last 7 days</th> */}
                <th className="right">&nbsp;</th>
              </tr>
            </thead>
            {data && data.length > 0 && (
              <tbody>
                {data.map((item, index) => (
                  <UserRow
                    key={item.id.toString()}
                    item={item}
                    index={pageSize * (pageNumber - 1) + index + 1}
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
        </>
      </div>
    </SiteLayout>
  );
};

export default AdminDashboardScreen;
