import React, { useState, useContext } from "react";
import { GlobalContext } from "../context/GlobalState";

const AddTransaction = () => {
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState(0);

  const { addTransaction, error } = useContext(GlobalContext);

  const onSubmit = (e) => {
    e.preventDefault();

    const newTransaction = {
      description,
      amount: +amount,
    };

    addTransaction(newTransaction);

    if (!error) {
      setDescription("");
      setAmount(0);
    }
  };

  return (
    <>
      <h3>הוסף עסקה חדשה</h3>
      <form onSubmit={onSubmit}>
        <div className="form-control">
          <label htmlFor="text">תיאור</label>
          <input
            type="text"
            placeholder="תאר/י את העסקה ..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className="form-control">
          <label htmlFor="amount">סכום</label>
          <input
            type="number"
            placeholder="הזן הוצאה / הכנסה"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>

        {error && error.map((error, i) => <i key={i}>{error}</i>)}

        <button className="btn">הוסף עסקה</button>
      </form>
    </>
  );
};

export default AddTransaction;
