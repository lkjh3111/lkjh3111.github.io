import axios from "axios";
import { authHeader } from "./AuthHeader";
import { host } from "../url";

class UserService {
  getUserWallet(id) {
    let config = {
      headers: authHeader(),
    };
    return axios.get(host + "/users/" + id + "/wallet", config);
  }

  getUserTransactions(id) {
    let config = {
      headers: authHeader(),
    };
    return axios
      .get(host + "/users/" + id + "/transactions", config)
      .then((response) => {
        return response.data.result;
      });
  }

  deposit(id, amount, currency) {
    return axios
      .post(host + "/users/" + id + "/wallet/deposit", null, {
        headers: authHeader(),
        params: { amount: amount, currency: currency },
      })
      .then((response) => {
        return response.data;
      });
  }

  withdraw(id, amount, currency) {
    return axios
      .post(host + "/users/" + id + "/wallet/withdraw", null, {
        headers: authHeader(),
        params: { amount: amount, currency: currency },
      })
      .then((response) => {
        return response.data;
      });
  }
}

export default new UserService();
