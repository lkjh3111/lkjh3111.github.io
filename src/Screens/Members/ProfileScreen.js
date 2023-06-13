import SiteLayout from "../../components/layouts/SiteLayout";
import Header from "../../components/Ui/Header/Header";

import Limits from "../../components/Ui/Widgets/Limits/Limits";
import Profile from "../../components/Ui/Widgets/Profile/Profile";
import MyAssets from "../../components/Ui/Widgets/MyAssets/MyAssets";
import RecentActivity from "../../components/Ui/Widgets/RecentActivity/RecentActivity";

const ProfileScreen = () => (
  <SiteLayout>
    <Header icon='sort' title='Profil' />
    <div className='flex flex-destroy'>
      <div className='content-30 box-right-padding'>
        <Profile />
      </div>
      <div className='content-70 flex-1'>
        <MyAssets />
      </div>
    </div>

    <div className='flex flex-space-between flex-destroy'>
      <div className='flex-1 box-right-padding'>
        <RecentActivity />
      </div>
      <div className='flex-1'>
        <Limits />
      </div>
    </div>
  </SiteLayout>
);

export default ProfileScreen;
