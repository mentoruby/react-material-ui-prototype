import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import LeaveSummary from './LeaveSummary';
import LeaveTable from '../component/LeaveTable';

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
        <LeaveSummary />
        <LeaveTable />
      </div>
    )
  }
}

export default withStyles(useStyles)(MyLeave);