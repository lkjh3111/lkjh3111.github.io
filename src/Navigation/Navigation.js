import { Routes, Route } from "react-router-dom";
import LandingPage from "../components/LandingPage/LandingPage";

import MarketScreen from "../Screens/Market/MarketScreen";
import CapitalScreen from "../Screens/Capital/CapitalScreen";
import DashboardScreen from "../Screens/Dashboard/DashboardScreen";
import TransactionsScreen from "../Screens/Transactions/TransactionsScreen";
import ProfileScreen from "../Screens/Members/ProfileScreen";

import NotFoundScreen from "../Screens/NotFound/NotFoundScreen";
import { PrivateRoute } from "../routes/PrivateRoute";
import AuthService from "../services/AuthService";
import AuthVerify from "../commons/AuthVerify";
// import WalletScreen from "../Screens/Wallet/WalletScreen";

// import SigninScreen from '../Screens/Members/SigninScreen';
// import SignupScreen from '../Screens/Members/SignupScreen';
import ForgotScreen from "../Screens/Members/ForgotScreen";
import ResetPasswordScreen from "../Screens/Members/ResetPasswordScreen";
// import ProfileScreen from "../Screens/Members/ProfileScreen";
// import SiteLayout from "../components/layouts/SiteLayout";

const Navigation = () => {
  const logOut = () => {
    AuthService.logout();
    this.setState({
      showModeratorBoard: false,
      showAdminBoard: false,
      currentUser: undefined,
    });
  };
  return (
    <div>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route
          path="/trading"
          element={<PrivateRoute Component={MarketScreen} />}
        />
        <Route
          path="/profile"
          element={<PrivateRoute Component={ProfileScreen} />}
        />
        <Route
          path="/capital"
          element={<PrivateRoute Component={CapitalScreen} />}
        />
        <Route
          path="/dashboard"
          element={<PrivateRoute Component={DashboardScreen} />}
        />
        <Route
          path="/transactions"
          element={<PrivateRoute Component={TransactionsScreen} />}
        />
        <Route path="/forgot-password" element={<ForgotScreen />} />
        <Route path="/reset-password" element={<ResetPasswordScreen />} />
        {/* <Route path='/wallet' element={<PrivateRoute Component={WalletScreen} />} /> */}
        {/* <Route path='/forgot-password' element={<ForgotScreen />} /> */}
        {/* <SiteLayout /> */}
        {/* <Route path='/members/signup' element={<SignupScreen />} /> */}
        <Route path="*" element={<NotFoundScreen />} status={404} />
      </Routes>
      <AuthVerify logOut={logOut} />
    </div>
  );
};

export default Navigation;
