import axios from "axios";
import { authHeader } from "./AuthHeader";
import { host } from "../url";

class AdminService {
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

  getTransacions(pageNumber, pageSize, from, to, keyword) {
    return axios
      .get(host + "/admin/transactions", {
        headers: authHeader(),
        params: {
          page: pageNumber,
          size: pageSize,
          from: from,
          to: to,
          search: keyword,
        },
      })
      .then((response) => {
        return response.data.result;
      });
  }

  editTransaction(id, timestamp, amount, status) {
    let config = {
      headers: authHeader(),
      params: {
        isApproved: status,
        amount: amount,
        timestamp: timestamp,
      },
    };
    return axios
      .patch(host + "/admin/transactions/" + id, null, config)
      .then((response) => {
        return response.data.result;
      });
  }
}

export default new AdminService();
