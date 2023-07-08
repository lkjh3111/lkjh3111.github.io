import axios from "axios";
import { authHeader } from "./AuthHeader";
import { host } from "../url";

class ForexService {
  getForexPairs() {
    let todayDate = new Date();
    todayDate.setDate(todayDate.getDate() - 1);
    const newDate = todayDate.toISOString().slice(0, 10);
    return axios
      .get(host + "/forex/grouped/" + newDate, {
        headers: authHeader(),
      })
      .then((response) => {
        return response.data.result;
      });
  }
}

export default new ForexService();
