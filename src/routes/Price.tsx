import { useOutletContext } from "react-router-dom";
import { fetchCoinTickers } from "../api";
import { useQuery } from "@tanstack/react-query";
import styled from "styled-components";

const PriceBox = styled.div`
  background-color: rgba(0, 0, 0, 0.5);
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding: 25px 30px;
  border-radius: 8px;
`;

const PriceTitle = styled.div`
  font-size: 28px;
`;

interface IPriceProps {
  coinId: string;
}

interface IPriceData {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  circulating_supply: number;
  total_supply: number;
  max_supply: number;
  beta_value: number;
  first_data_at: string;
  last_updated: string;
  quotes: {
    USD: {
      ath_date: string;
      ath_price: number;
      market_cap: number;
      market_cap_change_24h: number;
      percent_change_1h: number;
      percent_change_1y: number;
      percent_change_6h: number;
      percent_change_7d: number;
      percent_change_12h: number;
      percent_change_15m: number;
      percent_change_24h: number;
      percent_change_30d: number;
      percent_change_30m: number;
      percent_from_price_ath: number;
      price: number;
      volume_24h: number;
      volume_24h_change_24h: number;
    };
  };
}

export const Price = () => {
  const { coinId } = useOutletContext<IPriceProps>();
  const { isLoading, data } = useQuery<IPriceData>(
    ["price", coinId],
    () => fetchCoinTickers(coinId!),
    {
      refetchInterval: 1000,
    }
  );

  console.log(data);

  return (
    <div>
      {isLoading ? (
        "Loading..."
      ) : (
        <PriceBox>
          <PriceTitle>PRICE</PriceTitle>
          <PriceTitle>{data?.quotes.USD.price}$</PriceTitle>
        </PriceBox>
      )}
    </div>
  );
};
