import { memo, useState } from "react";

import Box from "../../Common/Box";
import AuthService from "../../../../services/AuthService";
import UserService from "../../../../services/UserService";
import { toast } from "react-toastify";

const BankProcess = memo(({ currencyOnChange }) => {
  const [tab, setTab] = useState(0);
  const [depositAmount, setDepositAmount] = useState("");
  const [depositCurrency, setDepositCurrency] = useState("");
  const [withdrawAmount, setWithdrawAmount] = useState("");
  const [withdrawCurrency, setWithdrawCurrency] = useState("");
  const id = AuthService.getCurrentUser().id;

  const [errors, setErrors] = useState({
    depositAmount: false,
    withdrawAmount: false,
  });

  const handleDepositAmountChange = (e) => {
    if (!e.target.value || e.target.value.match(/^\d{1,}(\.\d{0,8})?$/)) {
      setDepositAmount(e.target.value);
    }
  };

  const handleDepositCurrencyChange = (e) => {
    setDepositCurrency(e.target.value);
    currencyOnChange(e.target.value);
  };

  const handleWithdrawAmountChange = (e) => {
    if (!e.target.value || e.target.value.match(/^\d{1,}(\.\d{0,8})?$/)) {
      setWithdrawAmount(e.target.value);
    }
  };

  const handleWithdrawCurrencyChange = (e) => {
    setWithdrawCurrency(e.target.value);
    currencyOnChange(e.target.value);
  };

  const depositNotification = () => toast.success("Deposit request sent.");
  const withdrawNotification = () => toast.success("Withdrawal request sent.");
  const errorNotification = (e) => toast.error(e);

  const validateDepositForm = () => {
    let errors = {};
    if (parseFloat(depositAmount) <= 0 || !depositAmount) {
      errors.depositAmount = "Amount Required";
    }

    if (Object.keys(errors).length > 0) {
      setErrors(errors);
      return false;
    } else {
      setErrors({});
      return true;
    }
  };

  const validateWithdrawForm = () => {
    let errors = {};
    if (parseFloat(withdrawAmount) <= 0 || !withdrawAmount) {
      errors.withdrawAmount = "Amount Required";
    }

    if (Object.keys(errors).length > 0) {
      setErrors(errors);
      return false;
    } else {
      setErrors({});
      return true;
    }
  };

  const handleDeposit = (e) => {
    e.preventDefault();
    if (validateDepositForm()) {
      UserService.deposit(id, parseFloat(depositAmount), depositCurrency).then(
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
    }
  };

  const handleWithdraw = (e) => {
    e.preventDefault();
    if (validateWithdrawForm()) {
      UserService.withdraw(
        id,
        parseFloat(withdrawAmount),
        withdrawCurrency
      ).then(
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
    }
  };

  return (
    <Box>
      <div className="box-title box-vertical-padding box-horizontal-padding no-select">
        <div className="flex flex-center flex-space-between">
          <div>
            <p>Deposit/Widthrawal</p>
          </div>
          <ul>
            <li>
              <button
                type="button"
                className={tab === 0 ? "active" : "passive"}
                onClick={() => setTab(0)}
              >
                Deposit
              </button>
            </li>
            <li>
              <button
                type="button"
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
        <div className="box-content box-horizontal-padding box-vertical-padding small-height">
          <form className="form" noValidate>
            <div className="form-elements">
              <div className="form-line">
                <div className="full-width">
                  <div className="forgot-label">
                    <label htmlFor="depositAmount">Deposit Amount:</label>
                    <span className="text-danger">
                      <small>{errors.depositAmount}</small>
                    </span>
                  </div>
                  <input
                    type="text"
                    name="depositAmount"
                    id="depositAmount"
                    placeholder="0"
                    value={depositAmount.replace(/^0+(?!\.|$)/, "")}
                    onChange={handleDepositAmountChange}
                    className={
                      errors.depositAmount
                        ? "is-invalid form-control"
                        : "form-control"
                    }
                  />
                </div>
              </div>
            </div>
          </form>
          <form className="form" noValidate>
            <div className="form-elements">
              <div className="form-line">
                <div className="full-width">
                  <label htmlFor="currency">Currency</label>
                  <select
                    name="currency"
                    id="currency"
                    onChange={handleDepositCurrencyChange}
                    value={depositCurrency}
                  >
                    <option value="USD">USD</option>

                    <option value="PHP">PHP</option>
                  </select>
                </div>
              </div>
            </div>
          </form>

          <button
            type="button"
            className="button button-purple button-medium button-block"
            onClick={handleDeposit}
          >
            Deposit
          </button>
        </div>
      )}

      {tab === 1 && (
        <div className="box-content box-horizontal-padding box-vertical-padding small-height">
          <form className="form" noValidate>
            <div className="form-elements">
              <div className="form-line">
                <div className="full-width">
                  <div className="forgot-label">
                    <label htmlFor="withdrawAmount">Withdraw Amount:</label>
                    <span className="text-danger">
                      <small>{errors.withdrawAmount}</small>
                    </span>
                  </div>
                  <input
                    type="text"
                    name="withdrawAmount"
                    id="withdrawAmount"
                    placeholder="0"
                    value={withdrawAmount.replace(/^0+(?!\.|$)/, "")}
                    onChange={handleWithdrawAmountChange}
                    className={
                      errors.withdrawAmount
                        ? "is-invalid form-control"
                        : "form-control"
                    }
                  />
                </div>
              </div>
            </div>
          </form>

          <form className="form" noValidate>
            <div className="form-elements">
              <div className="form-line">
                <div className="full-width">
                  <label htmlFor="currency">Currency</label>
                  <select
                    name="currency"
                    id="currency"
                    onChange={handleWithdrawCurrencyChange}
                    value={withdrawCurrency}
                  >
                    <option value="USD">USD</option>
                    <option value="PHP">PHP</option>
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
            type="button"
            className="button button-purple button-medium button-block"
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
