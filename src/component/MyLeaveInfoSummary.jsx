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

class MyLeaveInfoSummary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      leaveInfoList: {},
    }
    this.refreshMyLeave = this.refreshMyLeave.bind(this);
    this.renderLeaveInfoSummary = this.renderLeaveInfoSummary.bind(this);
    this.renderLeaveInfoEach = this.renderLeaveInfoEach.bind(this);
    this.renderLeaveInfoAttr = this.renderLeaveInfoAttr.bind(this);
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

  renderLeaveInfoAttr(leaveInfo, leaveAttr) {
    if(leaveInfo) {
      if(leaveInfo[leaveAttr] >= 0) {
        return LeaveUtil.LeaveAttribute[leaveAttr] + ": " + leaveInfo[leaveAttr];
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
            LeaveUtil.LeaveUseMode.REMAIN.color,
            LeaveUtil.LeaveUseMode.USED.color
          ],
        }
      ],
      labels: [LeaveUtil.LeaveUseMode.REMAIN.name, LeaveUtil.LeaveUseMode.USED.name]
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

  renderLeaveInfoEach(leaveInfo) {
    let result = [];
    if(leaveInfo) {
      if(leaveInfo.planned>=0) {
        result.push(<Typography variant="h6">{this.renderLeaveInfoAttr(leaveInfo,'planned')}</Typography>)
      }
      if(leaveInfo.used>=0) {
        result.push(<Typography variant="h6">{this.renderLeaveInfoAttr(leaveInfo,'used')}</Typography>)
      }
      if(leaveInfo.remain>=0) {
        result.push(<Typography variant="h6">{this.renderLeaveInfoAttr(leaveInfo,'remain')}</Typography>)
      }
      if(leaveInfo.total>=0) {
        result.push(<Typography variant="h6">{this.renderLeaveInfoAttr(leaveInfo,'total')}</Typography>)
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

  renderLeaveInfoSummary(key) {
    if(key === 'FH') {
      return (null)
    } else {
      return (
        <Grid item lg={3} sm={6} xl={3} xs={12}>
          <Card>
            <CardContent>
              <Grid container justify="space-between">
                <Grid item>
                  <Typography color="textPrimary" gutterBottom variant="body2">{LeaveUtil.LeaveSettings[key].leaveName}</Typography>
                  {this.renderLeaveInfoEach(this.state.leaveInfoList[key])}
                </Grid>
                <Grid item>
                  {/* <Avatar className={classes.avatar} style={{ backgroundColor:LeaveUtil.LeaveSettings[key].leaveColor }} >{key}</Avatar> */}
                  {this.renderLeaveDoughnutEach(this.state.leaveInfoList[key])}
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
          {Object.keys(LeaveUtil.LeaveSettings).map(key => { return this.renderLeaveInfoSummary(key); })}
        </Grid>
      </div>
    )
  }
}

export default withStyles(useStyles)(MyLeaveInfoSummary);