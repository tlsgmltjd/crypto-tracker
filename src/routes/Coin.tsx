import { useParams } from "react-router-dom";

type Params = {
  coinId: string;
};

export const Coin = () => {
  const { coinId } = useParams<Params>();
  return <div>Coin : {coinId}</div>;
};
