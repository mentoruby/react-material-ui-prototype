import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import LeaveUtil from '../util/LeaveUtil';

const useStyles = theme => ({
  root: {
    display: 'flex',
  },
  leaveTypeEach: {
    textAlign: 'center',
    padding: theme.spacing(1),
    flexDirection: 'column',
    display: 'flex',
    alignItems: 'center',
  },
});

class LeaveUsedSummary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      leaveInfoList:{},
    }
  }

  componentDidMount() {
      this.refreshUsedLeaves();
  }

  refreshUsedLeaves() {
    this.setState({
      leaveInfoList:LeaveUtil.MyLeaveInfoList,
    });
  }
  
  render() {
    const {classes} = this.props;

    return (
      <div className={classes.root}>
        {Object.keys(LeaveUtil.LeaveSettings).map(key => {
          if(key !== 'FH' || (key === 'FH' && this.props.includeHoliday)) {
            return (
              <div className={classes.leaveTypeEach} key={'LeaveUsedSummary-LeaveInfo-'+key}>
                <Avatar className={classes.avatar} style={{ backgroundColor:LeaveUtil.LeaveSettings[key].leaveColor }}>{key}</Avatar>
                <Typography variant="caption">{LeaveUtil.LeaveSettings[key].leaveName}</Typography>
                <Typography variant="caption">{this.state.leaveInfoList[key]? this.state.leaveInfoList[key].fraction:""}</Typography>
              </div>
            );
          } else {
            return null;
          }
        })}
      </div>
    )
  }
}

export default withStyles(useStyles)(LeaveUsedSummary);