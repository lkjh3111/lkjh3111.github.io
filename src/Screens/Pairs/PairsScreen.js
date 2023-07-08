import { useState, useEffect, useMemo } from "react";

import SiteLayout from "../../components/layouts/SiteLayout";
import TopBarSearch from "../../components/Ui/Tables/TopBar/TopBarSearch";
import PairsRow from "../../components/Ui/Tables/Pairs/PairsRow";
import ForexService from "../../services/ForexService";
import Pagination from "../../components/Ui/Tables/Pagination/Pagination";

const PairsScreen = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [pageNumber, setPageNumber] = useState(1);
  let pageSize = 10;

  useEffect(() => {
    ForexService.getForexPairs().then((response) => {
      setData(response.results);
      setFilteredData(response.results);
    });
  }, []);

  const currentTableData = useMemo(() => {
    const firstPageIndex = (pageNumber - 1) * pageSize;
    const lastPageIndex = firstPageIndex + pageSize;
    return filteredData.slice(firstPageIndex, lastPageIndex);
  }, [pageNumber, filteredData]);

  const handleSearchValue = (e) => {
    const { value } = e.target;
    setKeyword(value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    console.log(keyword);
    if (keyword) {
      const filtered = data.filter(
        (pair) => pair.baseCurrency.toLowerCase() === keyword.toLowerCase()
      );
      setFilteredData(filtered);
      console.log(filteredData);
    } else {
      setFilteredData(data);
      console.log(filteredData);
    }
  };

  return (
    <SiteLayout>
      <h3 className="title">Pairs</h3>
      <TopBarSearch
        searchValue={keyword}
        searchOnChange={handleSearchValue}
        searchSubmit={handleSearchSubmit}
      />

      <table className="data-table">
        <thead>
          <tr>
            <th className="left">&nbsp;</th>
            <th className="left">Currency Pair</th>
            <th className="center">Current Price</th>
            <th className="center">Change(%)</th>
            <th className="center">Open</th>
            <th className="center">High</th>
            <th className="center">Low</th>
            <th className="center">Volume</th>
            {/* <th className="right">&nbsp;</th> */}
          </tr>
        </thead>
        {currentTableData && currentTableData.length > 0 && (
          <tbody>
            {currentTableData.map((item, index) => (
              <PairsRow
                key={item.baseCurrency.toString()}
                item={item}
                index={pageSize * (pageNumber - 1) + index + 1}
              />
            ))}
          </tbody>
        )}
      </table>
      <Pagination
        className="pagination-bar"
        currentPage={pageNumber}
        totalCount={filteredData.length}
        pageSize={pageSize}
        onPageChange={(page) => setPageNumber(page)}
      />
    </SiteLayout>
  );
};

export default PairsScreen;
