import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Coins } from "./Coins";
import { Coin } from "./Coin";

export const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Coins />} />
        <Route path="/:coinId/*" element={<Coin />} />
      </Routes>
    </BrowserRouter>
  );
};
