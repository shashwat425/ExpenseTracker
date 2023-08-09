// import React from "react";
import React, { useEffect, useRef } from 'react';
import { Grid } from "@material-ui/core";


import { SpeechState, useSpeechContext } from "@speechly/react-client";
import { PushToTalkButton, PushToTalkButtonContainer } from '@speechly/react-ui';

import Main from "./components/Main/Main";
import Details from "./components/Details/Details";
import useStyles from './styles';

//This is a functional Component
const App = () => {
  const classes = useStyles();

  const { speechState } = useSpeechContext();

  //main is reference to main component
  const main = useRef(null)

  const executeScroll = () => main.current.scrollIntoView()  

  // useEffect(() => {
  //   if (speechState === SpeechState.Recording) {
  //     executeScroll();
  //   }
  // }, [speechState]);
  

  return (
    <div>
      {/* Grid of type container */}
      <Grid className={classes.grid} container spacing={0} alignItems="center" justifyContent="center" style={{ height: "100vh" }}>
        
        {/* Grid of type item 
        --> On extra small (xs) device, it will take full space, full width ie. 12
        --> On small (sm) devices and larger, it will take 4 (that means 3 of them will
          be able to fit on the screen)
        */}
          <Grid item xs={12} sm={4} >
          {/* <Grid item xs={12} sm={4} className={classes.mobile}> */}
             {/* (We are using props to change the title */}
             {/* Display these details components */}
            <Details title="Income" />
          </Grid>

          <Grid item xs={12} sm={3} >
          {/* <Grid ref={main} item xs={12} sm={3} className={classes.main}> */}
            <Main />
          </Grid>

          {/* <Grid item xs={12} sm={4} className={classes.desktop}>
          <Details title="Income" />
        </Grid> */}
          
          <Grid item xs={12} sm={4} >
          {/* <Grid item xs={12} sm={4} className={classes.last}> */}

            {/* (We are using props to change the title */}
          <Details title="Expense" />
          </Grid>

          <PushToTalkButtonContainer>
            <PushToTalkButton />
            {/* <ErrorPanel /> */}
        </PushToTalkButtonContainer>
        
      </Grid>
    </div>
  );
};

export default App;
