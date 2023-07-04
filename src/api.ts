import axios from "axios";

export async function fetchCoins() {
  const respones = await axios("https://api.coinpaprika.com/v1/coins");
  return respones.data;
}
