import { useOutletContext } from "react-router-dom";

export const Price = () => {
  const { coinId } = useOutletContext();
  return <h1>{coinId}</h1>;
};
