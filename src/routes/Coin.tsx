import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { styled } from "styled-components";

const Container = styled.div`
  padding: 0 20px;

  max-width: 480px;
  margin: 0 auto;
`;

const Header = styled.header`
  height: 10vh;
  display: flex;
  justify-content: center;
  align-items: center;
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
  const [loading, setLoading] = useState(true);

  // page끼리 데이터를 주고 받아야하는 경우
  // <Link to="/123" state={{ name: "Hello" }}> <- state를 전송
  // const location = useLocation() <- 전송한 state를 받아옴
  const { state } = useLocation() as RouterState;

  const [info, setInfo] = useState<IInfoData>();
  const [price, setPrice] = useState<IPriceData>();

  async function getData() {
    const coinInfo = await axios(
      `https://api.coinpaprika.com/v1/coins/${coinId}`
    );
    const coinPrice = await axios(
      `https://api.coinpaprika.com/v1/tickers/${coinId}`
    );

    setInfo(coinInfo.data);
    setPrice(coinPrice.data);

    console.log(coinInfo.data);

    setLoading(false);
  }

  useEffect(() => {
    getData();
  }, [coinId]);

  return (
    <Container>
      <Header>
        <Title>{state ? state.name : "Loading..."}</Title>
      </Header>
      {loading ? (
        <Loader>Loading...</Loader>
      ) : (
        <>
          <MainContainer>
            <CoinInfoBox>
              <CoinInfo>
                <CoinInfoTitle>RANK</CoinInfoTitle>
                <CoinInfoValue>{info?.rank}</CoinInfoValue>
              </CoinInfo>
              <CoinInfo>
                <CoinInfoTitle>SYMBOL</CoinInfoTitle>
                <CoinInfoValue>{info?.symbol}</CoinInfoValue>
              </CoinInfo>
              <CoinInfo>
                <CoinInfoTitle>OPEN SOURCE</CoinInfoTitle>
                <CoinInfoValue>
                  {info?.open_source ? "YES" : "NO"}
                </CoinInfoValue>
              </CoinInfo>
            </CoinInfoBox>
            <Decription>{info?.description}</Decription>
            <CoinInfoBox>
              <CoinInfo>
                <CoinInfoTitle>TOTAL SUPPLY</CoinInfoTitle>
                <CoinInfoValue>{price?.total_supply}</CoinInfoValue>
              </CoinInfo>
              <CoinInfo>
                <CoinInfoTitle>MAX SUPPLY</CoinInfoTitle>
                <CoinInfoValue>{price?.max_supply}</CoinInfoValue>
              </CoinInfo>
            </CoinInfoBox>
          </MainContainer>
        </>
      )}
    </Container>
  );
};
