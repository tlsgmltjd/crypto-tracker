import React from "react";
import { Helmet } from "react-helmet";
import {
  Link,
  Outlet,
  useLocation,
  useMatch,
  useNavigate,
  useParams,
} from "react-router-dom";
import styled from "styled-components";
import { useQuery } from "@tanstack/react-query";
import { fetchCoinInfo, fetchCoinTickers } from "../api";

const Container = styled.div`
  padding: 0 20px;
  max-width: 480px;
  margin: 0 auto;
`;

const Header = styled.header`
  margin: 20px 0 20px 0;
  height: 10vh;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
`;

const Title = styled.h1`
  color: ${(props) => props.theme.accentColor};
  font-size: 35px;
`;

const Loader = styled.span`
  text-align: center;
  display: block;
`;

const MainContainer = styled.main``;

const CoinInfoBox = styled.div`
  background-color: rgba(0, 0, 0, 0.5);
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding: 15px 30px;
  border-radius: 8px;
`;

const CoinInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const CoinInfoTitle = styled.div`
  font-weight: 100;
  font-size: 0.8em;
`;

const CoinInfoValue = styled.div`
  margin-top: 2px;
  font-size: 1.5em;
`;

const Decription = styled.p`
  padding: 15px;
  line-height: 23px;
`;

const TabBox = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr;
  gap: 10px;
  margin: 25px 0;
`;

const TabBtn = styled.button<{ isActive: boolean }>`
  background-color: rgba(0, 0, 0, 0.5);
  border: none;
  border-radius: 8px;
  padding: 10px;

  color: ${(props) =>
    props.isActive ? props.theme.accentColor : props.theme.textColor};
`;

const BackBtn = styled.button`
  background: rgba(0, 0, 0, 0.5);
  border: 0;
  border-radius: 8px;
  padding: 8px 12px;
  color: ${(props) => props.theme.accentColor};
  position: absolute;
  left: 0;
  cursor: pointer;

  &:hover {
    color: ${(props) => props.theme.textColor};
    transition: all 0.2s ease-in;
  }
`;

type Params = {
  coinId: string;
};

interface RouterState {
  state: {
    name: string;
  };
}

interface IInfoData {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
  logo: string;
  description: string;
  message: string;
  open_source: boolean;
  started_at: string;
  development_status: string;
  hardware_wallet: boolean;
  proof_type: string;
  org_structure: string;
  hash_algorithm: string;
  first_data_at: string;
  last_data_at: string;
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

export const Coin: React.FC = () => {
  const { coinId } = useParams<Params>();

  // page끼리 데이터를 주고 받아야하는 경우
  // <Link to="/123" state={{ name: "Hello" }}> <- state를 전송
  // const location = useLocation() <- 전송한 state를 받아옴
  const { state } = useLocation() as RouterState;

  // useMatch()의 인자로 url을 넘기면 해당 url과 일치할 경우 url의 정보를 반환하고, 일치하지 않을 경우 null을 반환한다.
  const priceMatch = useMatch("/:coinId/price");
  const chartMatch = useMatch("/:coinId/chart");

  const navigate = useNavigate();

  const { isLoading: infoLoading, data: infoData } = useQuery<IInfoData>(
    ["info", coinId],
    () => fetchCoinInfo(coinId!)
    // ! : 확장 할당 어션셜로 값이 무조건 할당되어있다고 컴파일러에게 전달해 값이 없어도 변수를 사용할 수 있게 한다.
  );
  const { isLoading: tickersLoading, data: tickersData } = useQuery<IPriceData>(
    ["tickers", coinId],
    () => fetchCoinTickers(coinId!),
    {
      refetchInterval: 5000,
    }
  );

  const loading = infoLoading || tickersLoading;

  const onBackClick = () => {
    navigate("/");
  };

  return (
    <Container>
      <Helmet>
        <title>
          {state ? state.name : loading ? "Loading..." : infoData?.name}
        </title>
      </Helmet>
      <Header>
        <BackBtn onClick={onBackClick}>⬅</BackBtn>
        <Title>
          {state ? state.name : loading ? "Loading..." : infoData?.name}
        </Title>
      </Header>
      {loading ? (
        <Loader>Loading...</Loader>
      ) : (
        <>
          <MainContainer>
            <CoinInfoBox>
              <CoinInfo>
                <CoinInfoTitle>RANK</CoinInfoTitle>
                <CoinInfoValue>{infoData?.rank}</CoinInfoValue>
              </CoinInfo>
              <CoinInfo>
                <CoinInfoTitle>SYMBOL</CoinInfoTitle>
                <CoinInfoValue>{infoData?.symbol}</CoinInfoValue>
              </CoinInfo>
              <CoinInfo>
                <CoinInfoTitle>Price</CoinInfoTitle>
                <CoinInfoValue>
                  {tickersData?.quotes.USD.price.toFixed(2) + "$"}
                </CoinInfoValue>
              </CoinInfo>
            </CoinInfoBox>
            <Decription>{infoData?.description}</Decription>
            <CoinInfoBox>
              <CoinInfo>
                <CoinInfoTitle>TOTAL SUPPLY</CoinInfoTitle>
                <CoinInfoValue>{tickersData?.total_supply}</CoinInfoValue>
              </CoinInfo>
              <CoinInfo>
                <CoinInfoTitle>MAX SUPPLY</CoinInfoTitle>
                <CoinInfoValue>{tickersData?.max_supply}</CoinInfoValue>
              </CoinInfo>
            </CoinInfoBox>

            <TabBox>
              <TabBtn isActive={chartMatch !== null}>
                <Link to={`/${coinId}/chart`}>Chart</Link>
              </TabBtn>
              <TabBtn isActive={priceMatch !== null}>
                <Link to={`/${coinId}/price`}>Price</Link>
              </TabBtn>
            </TabBox>
            <Outlet context={{ coinId }} />
          </MainContainer>
        </>
      )}
    </Container>
  );
};
