import React from 'react';
import { Card, CardHeader, CardContent, Typography } from '@material-ui/core';
import { Doughnut } from 'react-chartjs-2';   // For Donut chart/piechart


import 'chart.js/auto';
import { Chart } from 'react-chartjs-2';



//useStyles is a hook 
import useStyles from './styles';
import useTransactions from '../../useTransactions';


// structure the props to take in title and based on that we can do different things
const Details = ({title}) => {

  const { total, chartData } = useTransactions(title);
  //(using)calling the hook
  const classes = useStyles();

  return (
    <Card className={ title === 'Income' ? classes.income :  classes.expense }>
        {/* <CardHeader title="Income" /> */}
        <CardHeader title={title} />
        
        <CardContent>
          <Typography variant="h5">${total}</Typography>
            {/* <Doughnut data="DATA" /> */}
            <Doughnut data={chartData} />
        </CardContent>
    </Card>
  );
};

export default Details;