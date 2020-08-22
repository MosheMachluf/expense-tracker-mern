import React, { useContext } from "react";
import { GlobalContext } from "../context/GlobalState";
import { numberWithCommas } from "../utils/format";

const Transaction = ({ transaction: { _id, description, amount } }) => {
  const { deleteTransaction } = useContext(GlobalContext);

  const sign = amount < 0 ? "-" : "+";

  return (
    <li className={amount < 0 ? "minus" : "plus"}>
      {description}
      <span>
        {sign}${numberWithCommas(Math.abs(amount))}
      </span>
      <button className="delete-btn" onClick={() => deleteTransaction(_id)}>
        x
      </button>
    </li>
  );
};

export default Transaction;
