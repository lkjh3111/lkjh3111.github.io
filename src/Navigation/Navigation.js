import { Routes, Route } from "react-router-dom";
import LandingPage from "../components/LandingPage/LandingPage";

import MarketScreen from "../Screens/Market/MarketScreen";
import PairsScreen from "../Screens/Pairs/PairsScreen";
import DashboardScreen from "../Screens/Dashboard/DashboardScreen";
import TransactionsScreen from "../Screens/Transactions/TransactionsScreen";
import OrdersScreen from "../Screens/Orders/OrdersScreen";
import ProfileScreen from "../Screens/Members/ProfileScreen";

import AdminDashboardScreen from "../AdminScreens/Dashboard/AdminDashboardScreen";
import AdminOrdersScreen from "../AdminScreens/Orders/AdminOrdersScreen";
import AdminTransactionsScreen from "../AdminScreens/Transactions/AdminTransactionsScreen";

import NotFoundScreen from "../Screens/NotFound/NotFoundScreen";
import { PrivateRoute } from "../routes/PrivateRoute";
import { AdminRoute } from "../routes/AdminRoute";
import AuthService from "../services/AuthService";
import AuthVerify from "../commons/AuthVerify";
import WalletScreen from "../Screens/Wallet/WalletScreen";

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
          path="/pairs"
          element={<PrivateRoute Component={PairsScreen} />}
        />
        <Route
          path="/dashboard"
          element={<PrivateRoute Component={DashboardScreen} />}
        />
        <Route
          path="/transactions"
          element={<PrivateRoute Component={TransactionsScreen} />}
        />
        <Route
          path="/orders"
          element={<PrivateRoute Component={OrdersScreen} />}
        />
        <Route
          path="/wallets"
          element={<PrivateRoute Component={WalletScreen} />}
        />
        <Route
          path="/admin/dashboard"
          element={<AdminRoute Component={AdminDashboardScreen} />}
        />
        <Route
          path="/admin/transactions"
          element={<AdminRoute Component={AdminTransactionsScreen} />}
        />
        <Route
          path="/admin/orders"
          element={<AdminRoute Component={AdminOrdersScreen} />}
        />
        <Route path="/forgot-password" element={<ForgotScreen />} />
        <Route path="/reset-password" element={<ResetPasswordScreen />} />

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
