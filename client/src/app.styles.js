import { makeStyles } from '@material-ui/core';

export default makeStyles(theme => ({
  '@global': {
    body: {
      backgroundColor: theme.palette.common.white
    },
    ul: {
      margin: 0,
      padding: 0
    },
    li: {
      listStyle: 'none'
    }
  }
}));
