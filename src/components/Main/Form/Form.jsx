// import React from 'react'
import React, { useState, useContext, useEffect } from 'react';
// import React, { useState, useContext } from "react";

import {
  TextField,
  Typography,
  Grid,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@material-ui/core";
import { v4 as uuidv4 } from "uuid";

import { useSpeechContext } from '@speechly/react-client';
import Snackbar from '../../Snackbar/Snackbar';
import formatDate from '../../../utils/formatDate';
import { ExpenseTrackerContext } from "../../../context/context";
import { incomeCategories, expenseCategories } from "../../../constants/categories";

import useStyles from "./styles";
import CustomizedSnackbar from '../../Snackbar/Snackbar';
// import transitions from '@material-ui/core/styles/transitions';

// new variable and set it to empty object
const initialState = {
  amount: "",
  category: "",
  type: "Income",
  date: formatDate(new Date()),
};

const Form = () => {
  const classes = useStyles();
  const { addTransaction } = useContext(ExpenseTrackerContext);
  const [formData, setFormData] = useState(initialState);
  const { segment } = useSpeechContext();
  const [open, setOpen] = React.useState(false);

  // console.log(formData);

  //function responsible for creating the actual transaction
  const createTransaction = () => {
    if (Number.isNaN(Number(formData.amount)) || !formData.date.includes('-')) return;

    // if (incomeCategories.map((iC) => iC.type).includes(formData.category)) {
    //   setFormData({ ...formData, type: 'Income' });
    // } else if (expenseCategories.map((iC) => iC.type).includes(formData.category)) {
    //   setFormData({ ...formData, type: 'Expense' });
    // }

    const transaction = {
      ...formData,
      amount: Number(formData.amount),
      id: uuidv4(),
    };

    setOpen(true);
    // addTransaction({ ...formData, amount: Number(formData.amount), id: uuidv4() });
    addTransaction(transaction);
    setFormData(initialState);
  };


  useEffect(() => {
    if (segment) {
      if (segment.intent.intent === 'add_expense') {
        setFormData({ ...formData, type: 'Expense' });
      } else if (segment.intent.intent === 'add_income') {
        setFormData({ ...formData, type: 'Income' });
      } else if (segment.isFinal && segment.intent.intent === 'create_transaction') {
        return createTransaction();
      } else if (segment.isFinal && segment.intent.intent === 'cancel_transaction') {
        return setFormData(initialState);
      }

      segment.entities.forEach((s) => {
        const category = `${s.value.charAt(0)}${s.value.slice(1).toLowerCase()}`;

        switch (s.type) {
          case 'amount':
            setFormData({ ...formData, amount: s.value });
            break;
          case 'category':
            // IC = INCOME CATEGORIES
            if (incomeCategories.map((iC) => iC.type).includes(category)) {
              setFormData({ ...formData, type: 'Income', category });
            } else if (expenseCategories.map((iC) => iC.type).includes(category)) {
              setFormData({ ...formData, type: 'Expense', category });
            }
            break;
          case 'date':
            setFormData({ ...formData, date: s.value });
            break;
          default:
            break;
        }
      });

      if (segment.isFinal && formData.amount && formData.category && formData.type && formData.date) {
        createTransaction();
      }

    }
    }, [segment]);



  const selectedCategories = formData.type === "Income" ? incomeCategories : expenseCategories;

  return (
    // GRID to create structure of our form
    <Grid container spacing={2}>
      <CustomizedSnackbar open={open} setOpen={setOpen} />

      <Grid item xs={12}>
        <Typography align="center" variant="subtitle2" gutterBottom>
          {/* gutterBottom --> Add some margin or padding at the bottom of Typography */}
          {/* Words we speak when we interact with speechly */}
          
          {/* {segment ? (
        <div className="segment">
          {segment.words.map((w) => w.value).join(" ")}
        </div>
      ) : null} */}

      {segment && segment.words.map((w) => w.value).join(" ")}

         {/* {isSpeaking ? <BigTranscript /> : 'Start adding transactions'}  */}
        
        </Typography>
      </Grid>

      <Grid item xs={6}>
        <FormControl fullWidth>
          <InputLabel>Type</InputLabel>
          {/* We need to select do we want type = income or expense */}

          {/* Select field is like a picker.
                It allows to select multiple options. */}
          <Select value={formData.type} onChange={(e) => setFormData({ ...formData, type: e.target.value })}>
            <MenuItem value="Income">Income</MenuItem>
            <MenuItem value="Expense">Expense</MenuItem>
          </Select>
        </FormControl>
      </Grid>

      {/* For our category */}
      <Grid item xs={6}>
        <FormControl fullWidth>
          <InputLabel>Category</InputLabel>
          {/* <Select value={formData.category} onChange={(e) => setFormData({ ...formData, category: e.target.value })}>
                    <MenuItem value="business"> Business</MenuItem>
                    <MenuItem value="salary"> Salary</MenuItem>
          </Select> */}
          <Select value={formData.category} onChange={(e) => setFormData({ ...formData, category: e.target.value })}>
            {selectedCategories.map((c) => ( 
                <MenuItem key={c.type} value={c.type}> {c.type} </MenuItem> ))}
          </Select>
        </FormControl>
      </Grid>

      <Grid item xs={6}>
        <TextField
          type="number"
          label="Amount"
          fullWidth
          value={formData.amount}
          onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
        />
      </Grid>

      <Grid item xs={6}>
        <TextField
          type="date"
          label="Date"
          fullWidth
          value={formData.date}
          onChange={(e) => setFormData({ ...formData, date: formatDate(e.target.value) })}
        />
      </Grid>

      <Button
        className={classes.button}
        variant="outlined"
        color="primary"
        fullWidth
        onClick={createTransaction}
      >
        Create
      </Button>
    </Grid>
  );
};

export default Form;
