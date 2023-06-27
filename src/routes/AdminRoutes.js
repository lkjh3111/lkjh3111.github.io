import DashboardScreen from "../Screens/Dashboard/DashboardScreen";
import MarketScreen from "../Screens/Market/MarketScreen";
import WalletScreen from "../Screens/Wallet/WalletScreen";
import TransactionsScreen from "../Screens/Transactions/TransactionsScreen";
import CapitalScreen from "../Screens/Capital/CapitalScreen";
import ProfileScreen from "../Screens/Members/ProfileScreen";

const AdminRoutes = [
  {
    path: "/dashboard",
    title: "Dashboard",
    icon: "dashboard",
    component: DashboardScreen,
    layout: "/admin",
  },
  {
    path: "/trading",
    title: "Trade",
    icon: "paid",
    component: MarketScreen,
    layout: "/admin",
  },
  {
    path: "/wallet",
    title: "My Wallet",
    icon: "account_balance_wallet",
    component: WalletScreen,
    layout: "/admin",
  },
  {
    path: "/transactions",
    title: "Transactions",
    icon: "sync",
    component: TransactionsScreen,
    layout: "/admin",
  },
  {
    path: "/capital",
    title: "Capital",
    icon: "equalizer",
    component: CapitalScreen,
    layout: "/admin",
  },
  {
    path: "/profile",
    title: "Profile",
    icon: "account_circle",
    component: ProfileScreen,
    layout: "/admin",
  },
];

export default AdminRoutes;
