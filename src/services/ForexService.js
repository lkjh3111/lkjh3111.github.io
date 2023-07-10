import axios from "axios";
import { authHeader } from "./AuthHeader";
import { host, currencyHost } from "../url";

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

  getPairHistory(baseCurrency, quoteCurrency, multiplier, timeSpan) {
    let todayDate = new Date();
    const to = todayDate.toISOString().slice(0, 10);
    todayDate.setDate(todayDate.getDate() - 60);
    const from = todayDate.toISOString().slice(0, 10);
    return axios
      .get(host + "/forex/" + baseCurrency + "/" + quoteCurrency, {
        headers: authHeader(),
        params: {
          multiplier: multiplier,
          timeSpan: timeSpan,
          from: from,
          to: to,
        },
      })
      .then((response) => {
        return response.data.result;
      });
  }

  convertCurrency(baseCurrency, quoteCurrency) {
    return axios
      .get(
        currencyHost +
          "/" +
          baseCurrency.toLowerCase() +
          "/" +
          quoteCurrency.toLowerCase() +
          ".json"
      )
      .then((response) => {
        return response.data;
      });
  }

  getCurrencyList() {
    return axios.get(currencyHost + ".json").then((response) => {
      return response.data;
    });
  }
}

export default new ForexService();
