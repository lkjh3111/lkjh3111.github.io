import { useState, useEffect } from "react";
import SiteLayout from "../../components/layouts/SiteLayout";

import Wallet from "../../components/Ui/Widgets/Wallet/Wallet";
import RecentActivity from "../../components/Ui/Widgets/RecentActivity/RecentActivity";
import AuthService from "../../services/AuthService";
import UserService from "../../services/UserService";

const WalletScreen = () => {
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

  const balance = state.balance + " " + state.currency;
  return (
    <SiteLayout>
      <h3 className='title'>My Wallet</h3>
      <div className='flex flex-destroy flex-space-between'>
        <div className='content-30 box-right-padding'>
          <Wallet balance={balance} />
        </div>
        <div className='content-70 flex-1'>
          <RecentActivity />
        </div>
      </div>
    </SiteLayout>
  );
};

export default WalletScreen;
