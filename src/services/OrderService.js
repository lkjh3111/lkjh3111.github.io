import axios from "axios";
import { authHeader } from "./AuthHeader";
import { host } from "../url";

class OrderService {
  createMarketOrder(id, symbol, currentPrice, volume, side, position, market) {
    return axios
      .post(
        host + "/orders/" + id + "/market",
        {
          symbol,
          currentPrice,
          volume,
          side,
          position,
          market,
        },
        { headers: authHeader() }
      )
      .then((response) => {
        return response.data;
      });
  }

  createLimitOrder(
    id,
    symbol,
    limitPrice,
    currentPrice,
    volume,
    side,
    position,
    market
  ) {
    return axios
      .post(
        host + "/orders/" + id + "/limi",
        {
          symbol,
          limitPrice,
          currentPrice,
          volume,
          side,
          position,
          market,
        },
        { headers: authHeader() }
      )
      .then((response) => {
        return response.data;
      });
  }
}

export default new OrderService();
