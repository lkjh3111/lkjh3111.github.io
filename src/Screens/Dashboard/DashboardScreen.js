import { useState, useEffect } from "react";
import SiteLayout from "../../components/layouts/SiteLayout";

import BankProcess from "../../components/Ui/Widgets/BankProcess/BankProcess";
import RecentActivity from "../../components/Ui/Widgets/RecentActivity/RecentActivity";
import AuthService from "../../services/AuthService";
import UserService from "../../services/UserService";
import Wallet from "../../components/Ui/Widgets/Wallet/Wallet";
import { toast } from "react-toastify";

const DashboardScreen = () => {
  const [state, setState] = useState({
    balance: 0,
    currency: "USD",
  });

  const userId = AuthService.getCurrentUser().id;

  const errorNotification = (e) => toast.error(e);

  useEffect(() => {
    UserService.getUserWallet(userId, state.currency).then(
      (response) => {
        setState({
          balance: response.balance,
          currency: response.currency,
        });
      },
      (error) => {
        const message =
          (error.response &&
            error.response.data &&
            error.response.data.result) ||
          error.result ||
          error.toString();
        errorNotification(message);
      }
    );
  }, [state.currency]);

  const handleCurrency = (e) => {
    setState({
      balance: 0,
      currency: e,
    });
  };

  return (
    <SiteLayout>
      <h3 className="title">Dashboard</h3>
      <div className="flex flex-destroy flex-space-between">
        <div className="flex-1 box-right-padding">
          <RecentActivity />
        </div>
        <div className="flex-1">
          <Wallet balance={state.balance} currency={state.currency} />
          <BankProcess currencyOnChange={handleCurrency} />
        </div>
      </div>
    </SiteLayout>
  );
};

export default DashboardScreen;
