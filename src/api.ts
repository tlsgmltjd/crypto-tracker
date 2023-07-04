import axios from "axios";

const BASE_URL = `https://api.coinpaprika.com/v1`;

export async function fetchCoins() {
  const respones = await axios(`${BASE_URL}/coins`);
  return respones.data;
}

export async function fetchCoinInfo(coinId: string) {
  const respones = await axios(`${BASE_URL}/coins/${coinId}`);
  return respones.data;
}

export async function fetchCoinTickers(coinId: string) {
  const respones = await axios(`${BASE_URL}/tickers/${coinId}`);
  return respones.data;
}
