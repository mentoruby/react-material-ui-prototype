import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import LeaveUtil from '../util/LeaveUtil';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { Doughnut } from 'react-chartjs-2';

const useStyles = theme => ({
  root: {
    height: '100%',
  },
  leaveInfo: {
    padding: theme.spacing(1),
  },
  avatar:{
    width: theme.spacing(6),
    height: theme.spacing(6),
  },
});

class LeaveSummary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      leaveInfoList: {},
    }
    this.refreshMyLeave = this.refreshMyLeave.bind(this);
    this.renderLeaveSummary = this.renderLeaveSummary.bind(this);
    this.renderLeaveInfoEach = this.renderLeaveInfoEach.bind(this);
    this.renderLeaveUseMode = this.renderLeaveUseMode.bind(this);
    this.doughnutData = this.doughnutData.bind(this);
    this.doughnutOptions = this.doughnutOptions.bind(this);
  }

  componentDidMount() {
    this.refreshMyLeave();
  }

  refreshMyLeave() {
    this.setState({
      leaveInfoList:LeaveUtil.MyLeaveInfoList,
    });
  }

  renderLeaveUseMode(leaveInfo, useMode) {
    if(leaveInfo) {
      if(leaveInfo[useMode] >= 0) {
        return LeaveUtil.LeaveUseMode[useMode].name + ": " + leaveInfo[useMode];
      } else
      {
        return <div>&nbsp;</div>;
      }
    } else
    {
      return <div>&nbsp;</div>;
    }
  }

  doughnutData(leaveInfo) {
    return {
      datasets: [
        {
          data: [leaveInfo.remain>0?leaveInfo.remain:0, leaveInfo.used],
          backgroundColor: [
            LeaveUtil.LeaveUseMode.remain.color,
            LeaveUtil.LeaveUseMode.used.color
          ],
        }
      ],
      labels: [LeaveUtil.LeaveUseMode.remain.name, LeaveUtil.LeaveUseMode.used.name]
    }
  }

  doughnutOptions() {
    return {
      legend: {
        display: false
      },
      responsive: true,
      maintainAspectRatio: false,
      animation: false,
      cutoutPercentage: 70, // percentage of the chart that is cut out of the middle
    }
  }

  renderLeaveInfoEach(leaveInfo,leaveType) {
    let result = [];
    if(leaveInfo) {
      if(leaveInfo.used>=0) {
        result.push(<Typography key={'LeaveSummary-LeaveInfo-'+leaveType+'-used'} variant="h6">{this.renderLeaveUseMode(leaveInfo,'used')}</Typography>)
      }
      if(leaveInfo.remain>=0) {
        result.push(<Typography key={'LeaveSummary-LeaveInfo-'+leaveType+'-remain'} variant="h6">{this.renderLeaveUseMode(leaveInfo,'remain')}</Typography>)
      }
      if(leaveInfo.total>=0) {
        result.push(<Typography key={'LeaveSummary-LeaveInfo-'+leaveType+'-total'} variant="h6">{this.renderLeaveUseMode(leaveInfo,'total')}</Typography>)
      }
    }
    return result
  }

  renderLeaveDoughnutEach(leaveInfo) {
    if(leaveInfo) {
      let data = this.doughnutData(leaveInfo);
      let options = this.doughnutOptions();
      return (
        <Doughnut data={data} width={120} height={120} options={options}/>
      )
    } else {
      return null;
    }
  }

  renderLeaveSummary(key) {
    if(key === 'FH') {
      return (null)
    } else {
      return (
        <Grid item lg={3} sm={6} xl={3} xs={12} key={'LeaveSummary-Grid-'+key}>
          <Card>
            <CardContent>
              <Grid container justify="space-between">
                <Grid item>
                  <Typography color="textPrimary" gutterBottom variant="body2">{LeaveUtil.LeaveSettings[key].leaveName}</Typography>
                  {this.renderLeaveInfoEach(this.state.leaveInfoList[key],key)}
                </Grid>
                <Grid item>
                  {this.renderLeaveDoughnutEach(this.state.leaveInfoList[key],key)}
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      )
    }
  }

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <Grid container spacing={4}>
          {Object.keys(LeaveUtil.LeaveSettings).map(key => { return this.renderLeaveSummary(key); })}
        </Grid>
      </div>
    )
  }
}

export default withStyles(useStyles)(LeaveSummary);