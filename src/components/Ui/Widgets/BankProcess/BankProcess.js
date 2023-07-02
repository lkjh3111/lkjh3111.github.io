import { memo, useState } from "react";

import Box from "../../Common/Box";
import AuthService from "../../../../services/AuthService";
import UserService from "../../../../services/UserService";
import { toast } from "react-toastify";

const BankProcess = memo(() => {
  const [tab, setTab] = useState(0);
  const [depositAmount, setDepositAmount] = useState(0);
  const [depositCurrency, setDepositCurrency] = useState("");
  const [withdrawAmount, setWithdrawAmount] = useState(0);
  const [withdrawCurrency, setWithdrawCurrency] = useState("");
  const id = AuthService.getCurrentUser().id;

  const handleDepositAmountChange = (e) => {
    setDepositAmount(e.target.value);
  };

  const handleDepositCurrencyChange = (e) => {
    setDepositCurrency(e.target.value);
  };

  const handleWithdrawAmountChange = (e) => {
    setWithdrawAmount(e.target.value);
  };

  const handleWithdrawCurrencyChange = (e) => {
    setWithdrawCurrency(e.target.value);
  };

  const depositNotification = () => toast.success("Deposit request sent.");
  const withdrawNotification = () => toast.success("Withdrawal request sent.");
  const errorNotification = (e) => toast.error(e);

  const handleDeposit = (e) => {
    e.preventDefault();
    UserService.deposit(id, depositAmount, depositCurrency).then(
      (response) => {
        depositNotification();
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
  };

  const handleWithdraw = (e) => {
    e.preventDefault();
    UserService.withdraw(id, withdrawAmount, withdrawCurrency).then(
      (response) => {
        withdrawNotification();
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
  };

  return (
    <Box>
      <div className='box-title box-vertical-padding box-horizontal-padding no-select'>
        <div className='flex flex-center flex-space-between'>
          <div>
            <p>Deposit/Widthrawal</p>
          </div>
          <ul>
            <li>
              <button
                type='button'
                className={tab === 0 ? "active" : "passive"}
                onClick={() => setTab(0)}
              >
                Deposit
              </button>
            </li>
            <li>
              <button
                type='button'
                className={tab === 1 ? "active" : "passive"}
                onClick={() => setTab(1)}
              >
                Widthraw
              </button>
            </li>
          </ul>
        </div>
      </div>
      {tab === 0 && (
        <div className='box-content box-horizontal-padding box-vertical-padding small-height'>
          <form className='form' noValidate>
            <div className='form-elements'>
              <div className='form-line'>
                <div className='full-width'>
                  <label htmlFor='depositAmount'>Deposit Amount:</label>
                  <input
                    type='number'
                    name='depositAmount'
                    id='depositAmount'
                    placeholder='Enter amount'
                    onChange={handleDepositAmountChange}
                  />
                </div>
              </div>
            </div>
          </form>
          <form className='form' noValidate>
            <div className='form-elements'>
              <div className='form-line'>
                <div className='full-width'>
                  <label htmlFor='currency'>Currency</label>
                  <select
                    name='currency'
                    id='currency'
                    onChange={handleDepositCurrencyChange}
                    value={depositCurrency}
                  >
                    <option value='usd'>USD</option>

                    {/* <option value='php'>PHP</option> */}
                  </select>
                </div>
              </div>
            </div>
          </form>

          <button
            type='button'
            className='button button-purple button-medium button-block'
            onClick={handleDeposit}
          >
            Deposit
          </button>
        </div>
      )}

      {tab === 1 && (
        <div className='box-content box-horizontal-padding box-vertical-padding small-height'>
          <form className='form' noValidate>
            <div className='form-elements'>
              <div className='form-line'>
                <div className='full-width'>
                  <label htmlFor='withdrawAmount'>Withdraw Amount:</label>
                  <input
                    type='number'
                    name='withdrawAmount'
                    id='withdrawAmount'
                    placeholder='Enter amount'
                    onChange={handleWithdrawAmountChange}
                  />
                </div>
              </div>
            </div>
          </form>

          <form className='form' noValidate>
            <div className='form-elements'>
              <div className='form-line'>
                <div className='full-width'>
                  <label htmlFor='currency'>Currency</label>
                  <select
                    name='currency'
                    id='currency'
                    onChange={handleWithdrawCurrencyChange}
                    value={withdrawCurrency}
                  >
                    <option value='usd'>USD</option>
                  </select>
                </div>
              </div>
            </div>
          </form>

          {/* <div className='box-text box-horizontal-padding center'>
            <p>
              <strong>TR00 0000 0000 0000 0000 0000 00</strong>
            </p>
            <p>
              <span>Amount to be withdrawn : </span>
              <strong>2376.00 USD</strong>
            </p>
          </div> */}

          <button
            type='button'
            className='button button-purple button-medium button-block'
            onClick={handleWithdraw}
          >
            Withdraw
          </button>
        </div>
      )}
    </Box>
  );
});

export default BankProcess;
