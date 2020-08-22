import React, { useContext } from "react";
import { GlobalContext } from "../context/GlobalState";
import { numberWithCommas } from "../utils/format";

const Balance = () => {
  const { transactions } = useContext(GlobalContext);
  const amounts = transactions.map((transaction) => transaction.amount);
  const total = amounts
    .reduce((total, amount) => (total += amount), 0)
    .toFixed(2);
  return (
    <>
      <h4>המאזן שלך</h4>
      <h1>${numberWithCommas(total)}</h1>
    </>
  );
};

export default Balance;
