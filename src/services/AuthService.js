import axios from "axios";
import { host } from "../url";

class AuthService {
  signUp(firstName, lastName, username, email, password) {
    return axios.post(host + "/auth/signup", {
      firstName,
      lastName,
      username,
      email,
      password,
    });
  }

  login(usernameOrEmail, password) {
    return axios
      .post(host + "/auth/signin", {
        usernameOrEmail,
        password,
      })
      .then((response) => {
        if (response.data.result.accessToken) {
          localStorage.setItem("user", JSON.stringify(response.data.result));
        }
        return response.data;
      });
  }

  logout() {
    localStorage.removeItem("user");
    window.location.href = "/";
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem("user"));
  }
}

export default new AuthService();
