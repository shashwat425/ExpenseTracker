// import React from 'react';
import React, { useContext } from 'react';

// we have to rename List as MUIList because our component name is List
//MUI == Materail UI List
import { List as MUIList, ListItem, ListItemAvatar, Avatar, ListItemText, ListItemSecondaryAction, IconButton, Slide } from '@material-ui/core';
import { Delete, MoneyOff } from '@material-ui/icons';

import { ExpenseTrackerContext } from '../../../context/context';
import useStyles from './styles';
// call it as a hook

const List = () => {
  const classes = useStyles();
  // const globalState = useContext(ExpenseTrackerContext);
  // console.log(globalState);

  // const { deleteTransaction } = useContext(ExpenseTrackerContext);
  const { transactions, deleteTransaction } = useContext(ExpenseTrackerContext);

  // const transactions = [
  //   {id : 1, type: "Income", category: 'Salary', amount: 50, date: "Wed May 31" },
  //   {id : 2, type: "Expense", category: 'Pets', amount: 50, date: "Wed May 13" },
  //   {id : 3, type: "Income", category: 'Business', amount: 150, date: "Wed May 3" }
  // ];
  
  return (
    <MUIList dense={false} className={classes.list}>

    {transactions.map((transaction) => (
        
        // slide is our animation, sliding DOWN
      <Slide direction="down" in mountOnEnter unmountOnExit key={transaction.id}>
        
        <ListItem>  {/* component */}
          
          <ListItemAvatar>
            <Avatar className={transaction.type === 'Income' ? classes.avatarIncome : classes.avatarExpense}>
              <MoneyOff />   {/* MoneyOff ---> ICON, (it is a self closing component) */}
            </Avatar>
          </ListItemAvatar>
          
          <ListItemText primary={transaction.category} secondary={`$${transaction.amount} - ${transaction.date}`} />
          {/* secondary property = Is the actual cost,
          --> We will put it as a template string because we are going to show 2 things
          --> (1) Amount    (2)Date  */}

          <ListItemSecondaryAction>
            
            {/* Button to delete*/}
            <IconButton edge="end" aria-label="delete" onClick={() => deleteTransaction(transaction.id)}>
                {/* {() => deleteTransaction(transaction.id)} */}
              
              <Delete />  
              {/* delete icon */}
            
            </IconButton>
          </ListItemSecondaryAction>

        </ListItem>
      </Slide>
    ))}
  </MUIList>
  )
}

export default List