import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';

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

const leaveSettings = {
  'AL':{
    leaveName:'Annual Leave',
    leaveColor:'#3f51b5'
  },
  'SL':{
    leaveName:'Sick Leave',
    leaveColor:'#27b0a0'
  },
  'CL':{
    leaveName:'Compensation Leave',
    leaveColor:'#f49b21'
  },
  'BL':{
    leaveName:'Birthday Leave',
    leaveColor:'#4a974e'
  },
  'FH':{
    leaveName:'Holiday',
    leaveColor:'#e44a44'
  },
};

const createLeaveInfo = (prop) => {
  return {
    ...prop,
    get fraction() {
      var str = '';
      if(this.used>=0) {
        str += this.used;
      }
      if(this.total>0) {
        str += '/' + this.total;
      }
      return str;
    }
  }
}

const createEvent = (prop) => {
  return {
    ...prop,
    get title() {
      if(this.leaveType === 'FH') {
        return this.name;
      } else {
        return this.name + ' ' + this.id + ' [' + this.leaveType+']';
      }
    },
    get bgColor() {
      return leaveSettings[this.leaveType].leaveColor;
    }
  }
}

const eventList = [
  createEvent({
    id: 0,
    name: 'All Day Event All Day Event All Day Event All Day Event',
    start: new Date(currYear, currMonth-1, 0),
    end: new Date(currYear, currMonth, 1),
    leaveType: 'AL'
  }),
  createEvent({
    id: 1,
    name: 'Staff',
    start: new Date(currYear, currMonth, 7),
    end: new Date(currYear, currMonth, 8),
    leaveType: 'AL',
  }),
  createEvent({
    id: 2,
    name: 'Staff',
    start: new Date(currYear, currMonth, 7),
    end: new Date(currYear, currMonth, 8),
    leaveType: 'SL',
  }),
  createEvent({
    id: 3,
    name: 'Staff',
    start: new Date(currYear, currMonth, 7),
    end: new Date(currYear, currMonth, 8),
    leaveType: 'CL',
  }),
  createEvent({
    id: 4,
    name: 'Staff',
    start: new Date(currYear, currMonth, 16),
    end: new Date(currYear, currMonth, 17),
    leaveType: 'SL',
  }),
  createEvent({
    id: 5,
    name: 'Staff',
    start: new Date(currYear, currMonth, 22),
    end: new Date(currYear, currMonth, 23),
    leaveType: 'CL',
  }),
  createEvent({
    id: 7,
    name: 'Staff',
    start: new Date(currYear, currMonth, 22),
    end: new Date(currYear, currMonth, 23),
    leaveType: 'BL',
  }),
  createEvent({
    id: 99,
    name: 'Good Friday',
    start: new Date(currYear, currMonth, 10),
    end: new Date(currYear, currMonth, 11),
    leaveType: 'FH',
  }),
  createEvent({
    id: 100,
    name: 'The Day Following Good Friday',
    start: new Date(currYear, currMonth, 11),
    end: new Date(currYear, currMonth, 12),
    leaveType: 'FH',
  }),
  createEvent({
    id: 101,
    name: 'Easter Monday',
    start: new Date(currYear, currMonth, 13),
    end: new Date(currYear, currMonth, 14),
    leaveType: 'FH',
  }),
];

const holdiayPropPropGetter = date => {
  var isHoliday = false;
  eventList.forEach(function(event) {
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

class LeaveCalendar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      events:[],
      leaveInfoList:{},
    }
    this.refreshCalendar = this.refreshCalendar.bind(this);
    this.localizer = momentLocalizer(moment);
  }

  componentDidMount() {
      this.refreshCalendar();
  }

  refreshCalendar() {
    this.setState({
      events:eventList,
      leaveInfoList:{
        'AL':createLeaveInfo({
          used:6,
          total:16
        }),
        'SL':createLeaveInfo({
          used:5,
          total:-1
        }),
        'CL':createLeaveInfo({
          used:-1,
          total:-1
        }),
        'BL':createLeaveInfo({
          used:0,
          total:1
        }),
      },
    });
  }

  renderLeaveInfo(key) {
    const { classes } = this.props;
    return (
      <div className={classes.leaveTypeEach}>
        <Avatar className={classes.avatar} style={{ backgroundColor:leaveSettings[key].leaveColor }} >{key}</Avatar>
        <Typography variant="caption">{leaveSettings[key].leaveName}</Typography>
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
              dayPropGetter={holdiayPropPropGetter}
            />
          </div>
          <div className={classes.leaveTypeArea}>
            {Object.keys(leaveSettings).map(key => { return this.renderLeaveInfo(key); })}
          </div>
        </CardContent>
      </Card>
    )
  }
}

export default withStyles(useStyles)(LeaveCalendar);