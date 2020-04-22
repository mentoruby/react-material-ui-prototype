const LeaveSettings = {
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

export default {LeaveSettings, CreateLeaveInfo};