import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import MyLeaveInfoSummary from '../component/MyLeaveInfoSummary';
import MyLeaveTable from '../component/MyLeaveTable';

const useStyles = theme => ({
  root: {
    height: '100%',
    padding: theme.spacing(2),
  },
});

class MyLeave extends Component {
  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <MyLeaveInfoSummary />
        <MyLeaveTable />
      </div>
    )
  }
}

export default withStyles(useStyles)(MyLeave);