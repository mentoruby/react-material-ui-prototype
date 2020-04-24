const LeaveSettings = {
  AL:{
    leaveName:'Annual Leave',
    leaveColor:'#3f51b5'
  },
  SL:{
    leaveName:'Sick Leave',
    leaveColor:'#27b0a0'
  },
  CL:{
    leaveName:'Compensation Leave',
    leaveColor:'#f49b21'
  },
  BL:{
    leaveName:'Birthday Leave',
    leaveColor:'#4a974e'
  },
  FH:{
    leaveName:'Holiday',
    leaveColor:'#e44a44'
  }
};

const LeaveUseMode = {
  USED:{
    name:'Used',
    color:'#E53935' // red
  },
  REMAIN:{
    name:'Remaining',
    color:'#3F51B5' // purple
  },
  TOTAL:{
    name:'Total',
    color:'#1b5e20' // green
  }
};

const LeaveAttribute = {
  //planned:'Planned',
  used:'Used',
  remain:'Remaining',
  total:'Total'
}

const CreateLeaveInfo = (prop) => {
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

const MyLeaveInfoList = {
  AL:CreateLeaveInfo({
    //planned:8,
    used:6,
    remain:10,
    total:16
  }),
  SL:CreateLeaveInfo({
    //planned:-1,
    used:5,
    remain:-1,
    total:-1
  }),
  CL:CreateLeaveInfo({
    //planned:3,
    used:1,
    remain:9,
    total:10
  }),
  BL:CreateLeaveInfo({
    //planned:1,
    used:0,
    remain:1,
    total:1
  }),
}

export default {LeaveSettings, LeaveUseMode, LeaveAttribute, CreateLeaveInfo, MyLeaveInfoList};