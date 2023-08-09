//Reducer is a function that takes in the old state, and an action, returns a new state


//action will be add,delete transaction
const contextReducer = (state, action) => {
    let transactions;
  
    switch (action.type) {
      case 'DELETE_TRANSACTION':
        transactions = state.filter((t) => t.id !== action.payload);
        localStorage.setItem('transactions', JSON.stringify(transactions));

        localStorage.clear();
        return transactions;

      case 'ADD_TRANSACTION':
        transactions = [action.payload, ...state]; //ensures that new transactions pops up at top
        localStorage.setItem('transactions', JSON.stringify(transactions));
        // localStorage.clear();
        return transactions;

      default:
        return state;
    }
  };
  
  export default contextReducer;