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

  uploadImage(id, file) {
    let formData = new FormData();
    formData.append("file", file);
    let headers = authHeader();
    headers["content-type"] = "multipart/form-data";
    const config = {
      headers: headers,
    };
    return axios
      .post(host + "/users/" + id + "/image", formData, config)
      .then((response) => {
        return response.data.result;
      });
  }

  getImage(id) {
    let config = {
      headers: authHeader(),
    };
    return axios
      .get(host + "/users/" + id + "/image", config)
      .then((response) => {
        return response.data.result;
      });
  }

  forgotPassword(email) {
    return axios
      .post(host + "/users/password/forgot", null, {
        headers: authHeader(),
        params: { email: email },
      })
      .then((response) => {
        return response.data.result;
      });
  }

  resetPassword(token, newPassword) {
    return axios
      .post(host + "/users/password/reset", null, {
        headers: authHeader(),
        params: { token: token, newPassword: newPassword },
      })
      .then((response) => {
        return response.data.result;
      });
  }

  getUserWallet(id, currency) {
    let config = {
      headers: authHeader(),
      params: {
        currency: currency,
      },
    };
    return axios
      .get(host + "/users/" + id + "/wallet", config)
      .then((response) => {
        return response.data.result;
      });
  }

  getUserWallets(id) {
    let config = {
      headers: authHeader(),
    };
    return axios
      .get(host + "/users/" + id + "/wallets", config)
      .then((response) => {
        return response.data.result;
      });
  }

  getUserTransactions(id, pageNumber, pageSize, from, to, keyword) {
    let config = {
      headers: authHeader(),
      params: {
        page: pageNumber,
        size: pageSize,
        from: from,
        to: to,
        search: keyword,
      },
    };
    return axios
      .get(host + "/users/" + id + "/transactions", config)
      .then((response) => {
        return response.data.result;
      });
  }

  getUserOrders(id, pageNumber, pageSize, from, to, keyword) {
    let config = {
      headers: authHeader(),
      params: {
        page: pageNumber,
        size: pageSize,
        from: from,
        to: to,
        search: keyword,
      },
    };
    return axios
      .get(host + "/users/" + id + "/orders", config)
      .then((response) => {
        return response.data.result;
      });
  }

  deposit(id, amount, currency) {
    return axios
      .post(host + "/users/" + id + "/wallets/deposit", null, {
        headers: authHeader(),
        params: { amount: amount, currency: currency },
      })
      .then((response) => {
        return response.data;
      });
  }

  withdraw(id, amount, currency) {
    return axios
      .post(host + "/users/" + id + "/wallets/withdraw", null, {
        headers: authHeader(),
        params: { amount: amount, currency: currency },
      })
      .then((response) => {
        return response.data;
      });
  }
}

export default new UserService();
