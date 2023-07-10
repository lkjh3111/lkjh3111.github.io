import { useState, useEffect } from "react";

import SiteLayout from "../../components/layouts/SiteLayout";

import Limits from "../../components/Ui/Widgets/Limits/Limits";
import Profile from "../../components/Ui/Widgets/Profile/Profile";
import MyOrders from "../../components/Ui/Widgets/MyAssets/MyAssets";
import RecentActivity from "../../components/Ui/Widgets/RecentActivity/RecentActivity";
import Wallet from "../../components/Ui/Widgets/Wallet/Wallet";
import WalletOverview from "../../components/Ui/Widgets/Wallet/WalletOverview";
import AuthService from "../../services/AuthService";
import UserService from "../../services/UserService";

const ProfileScreen = () => {
  const [state, setState] = useState({
    balance: 0,
    currency: "USD",
  });

  const [currency, setCurrency] = useState("");

  const userId = AuthService.getCurrentUser().id;

  useEffect(() => {
    UserService.getUserWallet(userId, currency).then((response) => {
      setState({
        balance: response.balance,
        currency: response.currency,
      });
    });
  }, [currency]);

  const handleCurrencyChange = (e) => {
    setCurrency(e);
  };

  return (
    <SiteLayout>
      <h3 className="title">Profile</h3>
      <div className="flex flex-destroy">
        <div className="content-30 box-right-padding">
          <Profile />
        </div>
        <div className="content-70 flex-1">
          <MyOrders />
        </div>
      </div>

      <div className="flex flex-space-between flex-destroy">
        <div className="flex-1 box-right-padding">
          <RecentActivity />
        </div>
        <div className="flex-1">
          {/* <Limits /> */}
          <Wallet balance={state.balance} currency={state.currency} />
          <WalletOverview currencyChange={handleCurrencyChange} />
        </div>
      </div>
    </SiteLayout>
  );
};

export default ProfileScreen;
