// We will implement all the logic for react  context api

import React, { useReducer, createContext, Component } from "react";

import contextReducer from "./contextReducer";
import { Star } from "@material-ui/icons";

const initialState = JSON.parse(localStorage.getItem("transactions")) || [
  // {
  //   amount: 500,
  //   category: "Salary",
  //   type: "Income",
  //   date: "2020-11-16",
  //   id: "44c68123-5b86-4cc8-b915-bb9e16cebe6a",
  // },
  // {
  //   amount: 225,
  //   category: "Investments",
  //   type: "Income",
  //   date: "2020-11-16",
  //   id: "33b295b8-a8cb-49f0-8f0d-bb268686de1a",
  // },
  // {
  //   amount: 50,
  //   category: "Salary",
  //   type: "Income",
  //   date: "2020-11-13",
  //   id: "270304a8-b11d-4e16-9341-33df641ede64",
  // },
  // {
  //   amount: 123,
  //   category: "Car",
  //   type: "Expense",
  //   date: "2020-11-16",
  //   id: "0f72e66e-e144-4a72-bbc1-c3c92018635e",
  // },
  // {
  //   amount: 50,
  //   category: "Pets",
  //   type: "Expense",
  //   date: "2020-11-13",
  //   id: "c5647dde-d857-463d-8b4e-1c866cc5f83e",
  // },
  // {
  //   amount: 500,
  //   category: "Travel",
  //   type: "Expense",
  //   date: "2020-11-13",
  //   id: "365a4ebd-9892-4471-ad55-36077e4121a9",
  // },
  // {
  //   amount: 50,
  //   category: "Investments",
  //   type: "Income",
  //   date: "2020-11-23",
  //   id: "80cf7e33-fc3e-4f9f-a2aa-ecf140711460",
  // },
  // {
  //   amount: 500,
  //   category: "Savings",
  //   type: "Income",
  //   date: "2020-11-23",
  //   id: "ef090181-21d1-4568-85c4-5646232085b2",
  // },
  // {
  //   amount: 5,
  //   category: "Savings",
  //   type: "Income",
  //   date: "2020-11-23",
  //   id: "037a35a3-40ec-4212-abe0-cc485a98aeee",
  // },
];

export const ExpenseTrackerContext = createContext(initialState);

//FUNCTIONAL COMPONENT
// props  - children
// everything wrapped in this component will have full access to context
export const Provider = ({ children }) => {
  // useReducer --> is a builtin resct hook as it Starts with use
  // ans it is a more complex version of useState (alternative to useState)
  // Not so often used
  // It is gebnerally preferable to use when u have a complex state logic that
  // involves multiple subvalues
  const [transactions, dispatch] = useReducer(contextReducer, initialState);

  //Action Creators
  const deleteTransaction = (id) => {
    dispatch({ type: "DELETE_TRANSACTION", payload: id });
  };

  const addTransaction = (transaction) => {
    dispatch({ type: "ADD_TRANSACTION", payload: transaction });
  };

  // console.log(transactions);

    const balance = transactions.reduce((acc, currVal) => (currVal.type === 'Expense' ? acc - currVal.amount : acc + currVal.amount), 0);

  return (
    // context is similar to redux
    // We can wrap our ap[lication with our provider and all of our Components will have
    // access to this value property whatever is inside of it
    <ExpenseTrackerContext.Provider
      value={{
        transactions,
          balance,
        deleteTransaction,
        addTransaction,
      }}
    >
      {children}
    </ExpenseTrackerContext.Provider>
  );
};
