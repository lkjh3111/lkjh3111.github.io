import axios from "axios";
import { authHeader } from "./AuthHeader";
import { host } from "../url";

class OrderService {
  createMarketOrder(
    id,
    symbol,
    asset,
    currentPrice,
    volume,
    side,
    position,
    market
  ) {
    return axios
      .post(
        host + "/orders/" + id + "/market",
        {
          currentPrice,
          asset,
          volume,
          symbol,
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
    asset,
    limitPrice,
    currentPrice,
    volume,
    side,
    position,
    market
  ) {
    return axios
      .post(
        host + "/orders/" + id + "/limit",
        {
          limitPrice,
          currentPrice,
          asset,
          volume,
          symbol,
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
