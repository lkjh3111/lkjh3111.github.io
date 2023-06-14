import { Routes, Route } from "react-router-dom";
import LandingPage from "../components/LandingPage/LandingPage";

import MarketScreen from "../Screens/Market/MarketScreen";
import CapitalScreen from "../Screens/Capital/CapitalScreen";
import DashboardScreen from "../Screens/Dashboard/DashboardScreen";
import TransactionsScreen from "../Screens/Transactions/TransactionsScreen";

import NotFoundScreen from "../Screens/NotFound/NotFoundScreen";

// import SigninScreen from '../Screens/Members/SigninScreen';
// import SignupScreen from '../Screens/Members/SignupScreen';
import ForgotScreen from "../Screens/Members/ForgotScreen";
import ProfileScreen from "../Screens/Members/ProfileScreen";

const Navigation = () => (
  <Routes>
    <Route path='/' element={<LandingPage />} />
    <Route path='/trading' element={<MarketScreen />} />
    <Route path='/profile' element={<ProfileScreen />} />
    <Route path='/capital' element={<CapitalScreen />} />
    <Route path='/dashboard' element={<DashboardScreen />} />
    <Route path='/transactions' element={<TransactionsScreen />} />
    <Route path='/forgot-password' element={<ForgotScreen />} />
    {/* <Route path='/members/signup' element={<SignupScreen />} /> */}
    <Route path='*' element={<NotFoundScreen />} status={404} />
  </Routes>
);

export default Navigation;
