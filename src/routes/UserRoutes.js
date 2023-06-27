import DashboardScreen from "../Screens/Dashboard/DashboardScreen";
import MarketScreen from "../Screens/Market/MarketScreen";
import WalletScreen from "../Screens/Wallet/WalletScreen";
import TransactionsScreen from "../Screens/Transactions/TransactionsScreen";
import CapitalScreen from "../Screens/Capital/CapitalScreen";
import ProfileScreen from "../Screens/Members/ProfileScreen";

const UserRoutes = [
  {
    path: "/dashboard",
    title: "Dashboard",
    icon: "dashboard",
    component: DashboardScreen,
    layout: "/user",
  },
  {
    path: "/trading",
    title: "Trade",
    icon: "paid",
    component: MarketScreen,
    layout: "/user",
  },
  {
    path: "/wallet",
    title: "My Wallet",
    icon: "account_balance_wallet",
    component: WalletScreen,
    layout: "/user",
  },
  {
    path: "/transactions",
    title: "Transactions",
    icon: "sync",
    component: TransactionsScreen,
    layout: "/user",
  },
  {
    path: "/capital",
    title: "Capital",
    icon: "equalizer",
    component: CapitalScreen,
    layout: "/user",
  },
  {
    path: "/profile",
    title: "Profile",
    icon: "account_circle",
    component: ProfileScreen,
    layout: "/user",
  },
];

export default UserRoutes;
