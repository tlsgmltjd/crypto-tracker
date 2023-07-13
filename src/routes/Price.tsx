import { useOutletContext } from "react-router-dom";
import { fetchCoinTickers } from "../api";
import { useQuery } from "@tanstack/react-query";
import styled from "styled-components";
import { IParams, IPriceData } from "../types";

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

export const Price = () => {
  const { coinId } = useOutletContext<IParams>();
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
