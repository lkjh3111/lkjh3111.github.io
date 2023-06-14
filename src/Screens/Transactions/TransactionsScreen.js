import { useState, useEffect } from "react";

import SiteLayout from "../../components/layouts/SiteLayout";
import Header from "../../components/Ui/Header/Header";
import TopBar from "../../components/Ui/Tables/TopBar/TopBar";
import TransactionRow from "../../components/Ui/Tables/Transactions/TransactionRow";

const TransactionsScreen = () => {
  const [data, setData] = useState([]);
  const [keyword, setKeyword] = useState("");

  useEffect(() => {
    const dataArray = [
      {
        id: 1,
        type: 2,
        transaction: "12415346563475",
        date: "2/5/2020 06:24:45",
        from: "Tarık",
        to: "Cenk",
        toPicture:
          "https://pbs.twimg.com/profile_images/1265581417364369408/b7CxjEfi_400x400.jpg",
        coin: "Bitcoin",
        icon: "https://icons-for-free.com/iconfiles/png/512/btc+coin+crypto+icon-1320162856490699468.png",
        amount: "5.553",
        status: 1,
      },
      {
        id: 2,
        type: 2,
        transaction: "12453465987451",
        date: "3/5/2020 18:35:12",
        from: "Tarık",
        to: "Cenk",
        toPicture:
          "https://pbs.twimg.com/profile_images/1265581417364369408/b7CxjEfi_400x400.jpg",
        coin: "Etherium",
        icon: "https://icons.iconarchive.com/icons/cjdowner/cryptocurrency-flat/1024/Ethereum-ETH-icon.png",
        amount: "3.000",
        status: 2,
      },
      {
        id: 3,
        type: 1,
        transaction: "24153459987415",
        date: "4/5/2020 13:42:01",
        from: "Cenk",
        to: "Tarık",
        toPicture: "",
        coin: "Tether",
        icon: "https://icons.iconarchive.com/icons/cjdowner/cryptocurrency-flat/1024/Tether-USDT-icon.png",
        amount: "158",
        status: 3,
      },
    ];

    setData(dataArray);
  }, []);

  const handleSearchValue = (e) => {
    const { value } = e.target;

    setKeyword(value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <SiteLayout>
      <Header icon='menu' title='Transactions' />
      <TopBar
        searchValue={keyword}
        searchOnChange={handleSearchValue}
        searchSubmit={handleSearchSubmit}
      />

      {data && data.length > 0 && (
        <table className='data-table'>
          <thead>
            <tr>
              <th className='left'>&nbsp;</th>
              <th className='left responsive-hide'>Process</th>
              <th className='left responsive-hide'>History</th>
              <th className='left'>From</th>
              <th className='left'>To</th>
              <th className='left'>Coin</th>
              <th className='center'>Amount</th>
              <th className='center'>Status</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <TransactionRow key={item.id.toString()} item={item} />
            ))}
          </tbody>
        </table>
      )}
    </SiteLayout>
  );
};

export default TransactionsScreen;
