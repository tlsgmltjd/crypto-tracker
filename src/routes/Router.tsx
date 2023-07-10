import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Coins } from "./Coins";
import { Coin } from "./Coin";
import { Price } from "./Price";
import { Chart } from "./Chart";

interface IRouterProps {
  toggleTheme: () => void;
  isDark: boolean;
}

export const Router = ({ toggleTheme, isDark }: IRouterProps) => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Coins toggleTheme={toggleTheme} />} />
        <Route path="/:coinId/*" element={<Coin />}>
          <Route path={`price`} element={<Price />} />
          <Route path={`chart`} element={<Chart isDark={isDark} />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
