import React, { useState } from "react";
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

type Params = {
  coinId: string;
};

interface RouterState {
  state: {
    name: string;
  };
}

export const Coin = () => {
  const { coinId } = useParams<Params>();
  const [loading, setLoading] = useState(true);

  // page끼리 데이터를 주고 받아야하는 경우
  // <Link to="/123" state={{ name: "Hello" }}> <- state를 전송
  // const location = useLocation() <- 전송한 state를 받아옴
  const { state } = useLocation() as RouterState;

  return (
    <Container>
      <Header>
        <Title>{state ? state.name : "Loading..."}</Title>
      </Header>
      {loading ? <Loader>Loading...</Loader> : null}
    </Container>
  );
};
