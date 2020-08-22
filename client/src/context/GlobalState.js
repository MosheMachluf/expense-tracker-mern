import React, { createContext, useReducer } from "react";
import AppReducer from "./AppReducer";
import {
  GET_TRANSACTIONS,
  ADD_TRANSACTION,
  DELETE_TRANSACTION,
  TRANSACTIONS_ERROR,
} from "./ActionTypes";
import axios from "axios";

const initialState = {
  transactions: [],
  error: null,
  loading: true,
};

// createContext
export const GlobalContext = createContext(initialState);

// Provider component
export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);

  // Actions
  async function getTransactions() {
    try {
      const { data } = await axios.get("api/transactions");

      dispatch({ type: GET_TRANSACTIONS, payload: data.data });
    } catch (error) {
      dispatch({
        type: TRANSACTIONS_ERROR,
        payload: error.response.data.error,
      });
    }
  }

  async function addTransaction(payload) {
    try {
      const {
        data: { data },
      } = await axios.post("api/transactions", payload);
      dispatch({ type: ADD_TRANSACTION, payload: data });
    } catch (error) {
      dispatch({
        type: TRANSACTIONS_ERROR,
        payload: error.response.data.error,
      });
    }
  }

  async function deleteTransaction(id) {
    try {
      await axios.delete(`/api/transactions/${id}`);
      dispatch({ type: DELETE_TRANSACTION, payload: id });
    } catch (error) {
      dispatch({
        type: TRANSACTIONS_ERROR,
        payload: error.response.data.error,
      });
    }
  }

  return (
    <GlobalContext.Provider
      value={{
        transactions: state.transactions,
        error: state.error,
        loading: state.loading,
        getTransactions,
        addTransaction,
        deleteTransaction,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
