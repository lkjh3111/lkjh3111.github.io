import axios from "axios";
import { authHeader } from "./AuthHeader";
import { host } from "../url";

class UserService {
  getUsers(pageNumber, pageSize, search) {
    return axios
      .get(host + "/admin/users", {
        headers: authHeader(),
        params: {
          page: pageNumber,
          size: pageSize,
          search: search,
        },
      })
      .then((response) => {
        return response.data.result;
      });
  }

  deleteUser(id) {
    let config = {
      headers: authHeader(),
    };
    return axios.delete(host + "/users/" + id, config).then((response) => {
      return response.data.result;
    });
  }

  editUser(id, firstName, lastName, username, email) {
    let config = {
      headers: authHeader(),
    };
    return axios
      .patch(
        host + "/users/" + id,
        {
          firstName,
          lastName,
          username,
          email,
        },
        config
      )
      .then((response) => {
        return response.data.result;
      });
  }

  getUserWallet(id) {
    let config = {
      headers: authHeader(),
    };
    return axios.get(host + "/users/" + id + "/wallet", config);
  }

  getUserTransactions(id) {
    let config = {
      headers: authHeader(),
      params: {
        size: 50,
      },
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
