import { useState, useEffect } from "react";
import SiteLayout from "../../components/layouts/SiteLayout";

import Wallet from "../../components/Ui/Widgets/Wallet/Wallet";
import RecentTransactions from "../../components/Ui/Widgets/Wallet/RecentTransactions";
import AuthService from "../../services/AuthService";
import UserService from "../../services/UserService";
import WalletOverview from "../../components/Ui/Widgets/Wallet/WalletOverview";

const WalletScreen = () => {
  const [state, setState] = useState({
    balance: 0,
    currency: "USDT",
  });

  const [transactions, setTransactions] = useState([]);
  const [currency, setCurrency] = useState("");

  const userId = AuthService.getCurrentUser().id;

  useEffect(() => {
    UserService.getUserWallet(userId, currency).then((response) => {
      setState({
        balance: response.balance,
        currency: response.currency,
      });
      setTransactions(response.transactions);
    });
  }, [currency]);

  const handleCurrencyChange = (e) => {
    setCurrency(e);
  };

  return (
    <SiteLayout>
      <h3 className="title">Wallet Overview</h3>
      <div className="flex flex-destroy">
        <div className="content-30 box-right-padding">
          <Wallet balance={state.balance} currency={state.currency} />
          <WalletOverview currencyChange={handleCurrencyChange} />
        </div>
        <div className="content-70 flex-1 box-right-padding">
          <RecentTransactions item={transactions} />
        </div>
      </div>
    </SiteLayout>
  );
};

export default WalletScreen;
