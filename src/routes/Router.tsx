import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Coins } from "./Coins";
import { Coin } from "./Coin";
import { Price } from "./Price";
import { Chart } from "./Chart";

interface IRouterProps {}

export const Router = ({}: IRouterProps) => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Coins />} />
        <Route path="/:coinId/*" element={<Coin />}>
          <Route path={`price`} element={<Price />} />
          <Route path={`chart`} element={<Chart />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
