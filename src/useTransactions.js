import { useContext } from 'react';
import { ExpenseTrackerContext } from './context/context';

import { incomeCategories, expenseCategories, resetCategories } from './constants/categories';


//custom hook
// based on title it will tell if it is income/expense categories
const useTransactions = (title) => {
  resetCategories();
  const { transactions } = useContext(ExpenseTrackerContext);
  const rightTransactions = transactions.filter((t) => t.type === title);

  //reduce accepts a callback function
  const total = rightTransactions.reduce((acc, currVal) => acc += currVal.amount, 0);
  const categories = title === 'Income' ? incomeCategories : expenseCategories;

  console.log({rightTransactions, total, categories});

  rightTransactions.forEach((t) => {  
    const category = categories.find((c) => c.type === t.category);

    if (category) category.amount += t.amount;
  });

  //remove category with amount less than or eqaul to 0
  const filteredCategories = categories.filter((sc) => sc.amount > 0);

  const chartData = {

    //datasets is an array
    datasets: [{
      data: filteredCategories.map((c) => c.amount),
      backgroundColor: filteredCategories.map((c) => c.color),
    }],
    labels: filteredCategories.map((c) => c.type),
  };

//   return { filteredCategories, total, chartData };
  return { total, chartData };
};

export default useTransactions;