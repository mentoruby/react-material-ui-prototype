import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import LeaveSummary from './LeaveSummary';
import LeaveTable from '../component/LeaveTable';

const useStyles = theme => ({
  root: {
    height: '100%',
    padding: theme.spacing(2),
  },
  addLeave: {
    paddingBottom: theme.spacing(1),
  }
});

class MyLeave extends Component {
  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <Box pb={2}>
          <Button variant="contained" color="primary">Add Leave</Button>
        </Box>
        <LeaveSummary />
        <LeaveTable />
      </div>
    )
  }
}

export default withStyles(useStyles)(MyLeave);