import { useState, useEffect } from "react";
import SiteLayout from "../../components/layouts/SiteLayout";

import BankProcess from "../../components/Ui/Widgets/BankProcess/BankProcess";
import RecentActivity from "../../components/Ui/Widgets/RecentActivity/RecentActivity";
import AuthService from "../../services/AuthService";
import UserService from "../../services/UserService";
import Wallet from "../../components/Ui/Widgets/Wallet/Wallet";

const DashboardScreen = () => {
  const [state, setState] = useState({
    balance: 0,
    currency: "USDT",
  });

  const userId = AuthService.getCurrentUser().id;

  useEffect(() => {
    UserService.getUserWallet(userId).then((response) => {
      setState({
        balance: response.data.result.balance,
        currency: response.data.result.currency,
      });
    });
  }, []);

  return (
    <SiteLayout>
      <h3 className="title">Dashboard</h3>
      <div className="flex flex-destroy flex-space-between">
        <div className="flex-1 box-right-padding">
          <RecentActivity />
        </div>
        <div className="flex-1">
          <Wallet balance={state.balance} currency={state.currency} />
          <BankProcess />
        </div>
      </div>
    </SiteLayout>
  );
};

export default DashboardScreen;
