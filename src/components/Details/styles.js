import { makeStyles } from '@material-ui/core/styles';

// we can export all the styles we want for that specific component
export default makeStyles(() => ({

  //we create "income" class, income is the object key and inside is all of the styles
  income: {
    borderBottom: '10px solid rgba(0, 255, 0, 0.5)',
    // this we be a greenish color
  },

  //expense class
  expense: {
    borderBottom: '10px solid rgba(255, 0, 0, 0.5)',
    // this we be a reddish color
  },
}));
