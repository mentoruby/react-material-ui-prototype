import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import LeaveUtil from '../util/LeaveUtil';
import EventUtil from '../util/EventUtil';

import 'react-big-calendar/lib/css/react-big-calendar.css';

const useStyles = theme => ({
  root: {
    height: '100%',
    padding: theme.spacing(2),
  },
  calendarContainer: {
    position: 'relative',
    height: '500px'
  },
  leaveTypeArea: {
    marginTop: theme.spacing(5),
    display: 'flex',
    justifyContent: 'center',
  },
  leaveTypeEach: {
    textAlign: 'center',
    padding: theme.spacing(1),
    flexDirection: 'column',
    display: 'flex',
    alignItems: 'center',
  },
  avatar:{
    width: theme.spacing(4),
    height: theme.spacing(4),
  }
});

const currYear = new Date().getFullYear();
const currMonth = 3; //new Date().getMonth();

class LeaveCalendar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      events:[],
      leaveInfoList:{},
    }
    this.refreshCalendar = this.refreshCalendar.bind(this);
    this.renderLeaveInfo = this.renderLeaveInfo.bind(this);
    this.holdiayPropPropGetter = this.holdiayPropPropGetter.bind(this);
    this.localizer = momentLocalizer(moment);
  }

  componentDidMount() {
      this.refreshCalendar();
  }

  refreshCalendar() {
    this.setState({
      events:EventUtil.StaffEventList,
      leaveInfoList:LeaveUtil.MyLeaveInfoList,
    });
  }

  //holdiayPropPropGetter = date => { // so no need bind function call in constructor
  holdiayPropPropGetter(date) {
    var isHoliday = false;
    this.state.events.forEach(function(event) {
      if(event.leaveType==='FH' && event.start <= date && event.end > date) {
        isHoliday = true;
      }
    });
    if(isHoliday) {
      return {style: {backgroundColor : '#f2a7a7'}}
    } else {
      return {}
    }
  }

  renderLeaveInfo(key) {
    const { classes } = this.props;
    return (
      <div className={classes.leaveTypeEach}>
        <Avatar className={classes.avatar} style={{ backgroundColor:LeaveUtil.LeaveSettings[key].leaveColor }} >{key}</Avatar>
        <Typography variant="caption">{LeaveUtil.LeaveSettings[key].leaveName}</Typography>
        <Typography variant="caption">{this.state.leaveInfoList[key]? this.state.leaveInfoList[key].fraction:""}</Typography>
      </div>
    )
  }

  render() {
    const { classes } = this.props;

    return (
      <Card className={classes.root}>
        <CardContent>
          <div className={classes.calendarContainer}>
            <Calendar
              localizer={this.localizer}
              events={this.state.events}
              defaultDate={new Date(currYear, currMonth, 15)}
              views={['month']}
              popup
              eventPropGetter={
                event => {
                  return {style: {backgroundColor : event.bgColor}};
                }
              }
              dayPropGetter={this.holdiayPropPropGetter}
            />
          </div>
          <div className={classes.leaveTypeArea}>
            {Object.keys(LeaveUtil.LeaveSettings).map(key => { return this.renderLeaveInfo(key); })}
          </div>
        </CardContent>
      </Card>
    )
  }
}

export default withStyles(useStyles)(LeaveCalendar);