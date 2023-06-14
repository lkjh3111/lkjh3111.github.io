import SiteLayout from "../../components/layouts/SiteLayout";
import Header from "../../components/Ui/Header/Header";

import Box from "../../components/Ui/Common/Box";
import BankProcess from "../../components/Ui/Widgets/BankProcess/BankProcess";
import RecentActivity from "../../components/Ui/Widgets/RecentActivity/RecentActivity";

const DashboardScreen = () => (
  <SiteLayout>
    <Header icon='menu' title='Deposit/Withdrawal' />
    <div className='flex flex-destroy flex-space-between'>
      <div className='flex-1 box-right-padding'>
        <BankProcess />
      </div>
      <div className='flex-1'>
        <Box>
          <div className='box-title box-vertical-padding box-horizontal-padding no-select'>
            <div className='flex flex-center flex-space-between'>
              <p>Important</p>
            </div>
          </div>
          <div className='box-content box-text box-horizontal-padding box-content-height-nobutton'>
            <p>
              &bull; Crypto Exchange to the recipient / beneficiary part in EFT
              transfers needs to be written.
            </p>
            <p>
              &bull; All individual, current, US Dollar opened in your name
              Transfer/EFT transaction from your accounts to the listed accounts
              you can do. Made from accounts belonging to different people
              Submissions will not be accepted.
            </p>
            <p>
              &bull; Transfers made using ATM (with/without card), accepted as
              it is not possible to confirm the sender information. will not be.
            </p>
            <p>
              &bull; After the amount you send is checked, the system will be
              automatically credited to your account by You do not need to give
              notice.
            </p>
            <p>
              &bull; Description for completing your authentication You do not
              need to enter a fixed deposit code.
            </p>
          </div>
        </Box>
      </div>
    </div>
    <div className='flex flex-destroy flex-space-between'>
      <div className='flex-1 box-right-padding'>
        <RecentActivity />
      </div>
      <div className='flex-1'>
        <Box>
          <div className='box-title box-vertical-padding box-horizontal-padding no-select'>
            <div className='flex flex-center flex-space-between'>
              <p>Important</p>
            </div>
          </div>
          <div className='box-content box-text box-horizontal-padding box-content-height-nobutton'>
            <p>
              &bull; All banks opened in your name (personal, demand, USD) You
              can withdraw to your accounts. Transfer to a different person your
              transaction will not be executed.
            </p>
            <p>&bull; Minimum withdrawal amount is 10 USD.</p>
            <p>
              &bull; A transaction fee of 3 USD is charged during the withdrawal
              process.
            </p>
            <p>
              &bull; This amount is available when you place a withdrawal order
              It will be deducted from your balance.
            </p>
            <p>
              &bull; You can cancel orders that have not yet been fulfilled. In
              this case, the order amount will be added to your reusable
              balance. transferred.
            </p>
            <p>
              &bull; Withdrawals given outside the working hours of banks orders
              are processed with the start of the working hours of the banks is
              taken.
            </p>
          </div>
        </Box>
      </div>
    </div>
  </SiteLayout>
);

export default DashboardScreen;
