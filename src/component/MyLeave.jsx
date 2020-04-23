import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import LeaveUtil from '../util/LeaveUtil';

const useStyles = theme => ({
  root: {
    height: '100%',
    padding: theme.spacing(2),
  },
  avatar:{
    width: theme.spacing(4),
    height: theme.spacing(4),
  }
});

class MyLeave extends Component {
  constructor(props) {
    super(props);
    this.state = {
      leaveInfoList:{
        'AL':LeaveUtil.CreateLeaveInfo({
          used:6,
          total:16
        }),
        'SL':LeaveUtil.CreateLeaveInfo({
          used:5,
          total:-1
        }),
        'CL':LeaveUtil.CreateLeaveInfo({
          used:-1,
          total:-1
        }),
        'BL':LeaveUtil.CreateLeaveInfo({
          used:0,
          total:1
        }),
      },
    }
  }

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>this is MyLeave page
      
      </div>
    )
  }
}

export default withStyles(useStyles)(MyLeave);