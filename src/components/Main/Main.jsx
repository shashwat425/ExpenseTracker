import React, { useState, useEffect, useContext } from 'react';

import { useSpeechContext } from '@speechly/react-client';

// import from materia-ui
import { Card, CardHeader, CardContent, Typography, Grid, Divider } from '@material-ui/core';
import { ExpenseTrackerContext } from '../../context/context';

import useStyles from './styles';
import Form from './Form/Form';
import List from './List/List';
import InfoCard from '../InfoCard';

const Main = () => {
    

    //using as a hook
    const classes = useStyles();
    const { balance } = useContext(ExpenseTrackerContext);

  return (
    <Card className={classes.root}>
      <CardHeader title="Expense Tracker" subheader="Powered by Speechly" />
      
      <CardContent>
            <Typography align="center" variant="h5">Total Balance ${balance}  </Typography>
            
            <Typography variant="subtitle1" style={{ lineHeight: '1.5em', marginTop: '20px' }}>       {/* inline css  */}
                {/* <InfoCard /> */}
                
                Try saying : Add income for $100 in Category Salary for Monday....
                {/* demo sentence */}
            </Typography>
            

        {/* Divider --> A horizontal rule or an hr, that divides the content on the top
        from the content at the bottom */}
            <Divider className={classes.divider} />

            <Form />
      </CardContent>
      
      <CardContent className={classes.cartContent}>

        {/* grid of type container with spacing = 2 */}
            <Grid container spacing={2}>

                {/* grid of type item and will take 12 spaces on extra small devices */}
                <Grid item xs={12}>

                    {/* A list Component 
                    Importing : --> import List from './List/List';  */}
                    <List />
                
                </Grid>
            
            </Grid>
      </CardContent>

    </Card>
  );
}

export default Main