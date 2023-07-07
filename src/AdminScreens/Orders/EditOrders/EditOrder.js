import React, { useState, useRef, useEffect } from "react";
import Modal from "../../../components/Ui/Modal";
import TheButton from "../../../components/Ui/TheButton";
import classes from "./EditOrder.module.css";
import AdminService from "../../../services/AdminService";
import { toast } from "react-toastify";

const EditOrder = ({ onEditOrder, item, trigger }) => {
  const [state, setState] = useState({
    timestamp: "",
    price: "",
    volume: "",
    status: true,
  });

  const modalRef = useRef();

  const successNotification = () =>
    toast.success("Order updated successfully.");
  const failNotification = (e) => toast.error(e);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onEditOrder();
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  const handleChange = (e) => {
    let stateUpdated = {
      ...state,
      [e.target.name]: e.target.value,
    };
    setState(stateUpdated);
  };

  const handleTimeStampChange = (e) => {
    let stateUpdated = {
      ...state,
      [e.target.name]: new Date(e.target.value).toISOString().slice(0, 10),
    };
    setState(stateUpdated);
  };

  const handleAmountChange = (e) => {
    if (!e.target.value || e.target.value.match(/^\d{1,}(\.\d{0,8})?$/)) {
      setState({
        ...state,
        [e.target.name]: e.target.value,
      });
    }
  };

  const handleEditOrder = (e) => {
    e.preventDefault();
    const newTimestamp = state.timestamp
      ? state.timestamp + new Date(item.timestamp).toISOString().slice(10, 22)
      : state.timestamp;
    AdminService.editOrder(
      item.id,
      newTimestamp,
      state.price,
      state.volume,
      state.status
    ).then(
      (response) => {
        successNotification();
        trigger();
      },
      (error) => {
        const message =
          (error.response &&
            error.response.data &&
            error.response.data.result) ||
          error.result ||
          error.toString();
        failNotification(message);
      }
    );
  };

  return (
    <Modal onEditOrder={onEditOrder}>
      <div className={classes.edit_order_modal_content} ref={modalRef}>
        <div>
          <h2>Edit Order Details</h2>
        </div>
        <div>
          <form onSubmit={handleEditOrder}>
            <div className={classes.edit_order_label}>
              <label>Timestamp</label>
            </div>
            <input
              type="date"
              name="timestamp"
              value={state.timestamp}
              onChange={handleTimeStampChange}
              autoComplete="on"
            />
            <div className={classes.edit_order_label}>
              <label>Price</label>
            </div>
            <input
              type="text"
              name="price"
              placeholder={item.price.toString() + " " + item.asset}
              value={state.price.replace(/^0+(?!\.|$)/, "")}
              onChange={handleAmountChange}
              autoComplete="on"
            />
            <div className={classes.edit_order_label}>
              <label>Volume</label>
            </div>
            <input
              type="text"
              name="volume"
              placeholder={item.volume.toString() + " " + item.symbol}
              value={state.volume.replace(/^0+(?!\.|$)/, "")}
              onChange={handleAmountChange}
              autoComplete="on"
            />
          </form>
          <form className="form" noValidate>
            <div className="form-elements">
              <div className="form-line">
                <div className="full-width">
                  <div className={classes.edit_order_label}>
                    <label>Status</label>
                  </div>
                  <select
                    name="status"
                    id="status"
                    onChange={handleChange}
                    value={state.status}
                    disabled={item.status === "ACTIVE" ? false : true}
                  >
                    <option value={true}>Approve</option>
                    <option value={false}>Deny</option>
                  </select>
                </div>
              </div>
            </div>
          </form>
          <div className={classes.button_modal_div}>
            <TheButton
              type="submit"
              onClick={handleEditOrder}
              className={classes.edit_order_button}
            >
              Edit
            </TheButton>
          </div>
        </div>
      </div>
    </Modal>
  );
};

// ENDS

export default EditOrder;
