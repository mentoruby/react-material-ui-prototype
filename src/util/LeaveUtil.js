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
  used:{
    name:'Used',
    color:'#E53935' // red
  },
  remain:{
    name:'Remaining',
    color:'#3F51B5' // purple
  },
  total:{
    name:'Total',
    color:'#1b5e20' // green
  }
};

const LeaveStatuses = {
  Approved:'Approved',
  Pending:'Pending'
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

const MyLeaveInfoList = {
  AL:CreateLeaveInfo({
    used:6,
    remain:10,
    total:16
  }),
  SL:CreateLeaveInfo({
    used:5,
    remain:-1,
    total:-1
  }),
  CL:CreateLeaveInfo({
    used:1,
    remain:9,
    total:10
  }),
  BL:CreateLeaveInfo({
    used:0,
    remain:1,
    total:1
  }),
}

const currYear = new Date().getFullYear();

const MyLeaveDateList = [
  {
    id: 0,
    date: new Date(currYear, 0, 7),
    leaveType: 'AL',
    status: 'Approved',
    remarks: '',
    requestOn: new Date(currYear, 0, 5),
    approveBy: 'Super Boss',
    approveOn: new Date(currYear, 0, 8),
  },
  {
    id: 2,
    date: new Date(currYear, 1, 9),
    leaveType: 'CL',
    status: 'Approved',
    remarks: '',
    requestOn: new Date(currYear, 0, 5),
    approveBy: 'Super Boss',
    approveOn: new Date(currYear, 0, 8),
  },
  {
    id: 3,
    date: new Date(currYear, 1, 12),
    leaveType: 'AL',
    status: 'Approved',
    remarks: '',
    requestOn: new Date(currYear, 1, 10),
    approveBy: 'Super Boss',
    approveOn: new Date(currYear, 1, 10),
  },
  {
    id: 4,
    date: new Date(currYear, 2, 16),
    leaveType: 'SL',
    status: 'Approved',
    remarks: '',
    requestOn: new Date(currYear, 2, 1),
    approveBy: 'Super Boss',
    approveOn: new Date(currYear, 2, 2),
  },
  {
    id: 5,
    date: new Date(currYear, 2, 28),
    leaveType: 'BL',
    status: 'Approved',
    remarks: '',
    requestOn: new Date(currYear, 2, 10),
    approveBy: 'Super Boss',
    approveOn: new Date(currYear, 2, 28),
  },
  {
    id: 6,
    date: new Date(currYear, 3, 5),
    leaveType: 'CL',
    status: 'Pending',
    remarks: '',
    requestOn: new Date(currYear, 2, 10),
    approveBy: null,
    approveOn: null,
  },
  {
    id: 7,
    date: new Date(currYear, 3, 6),
    leaveType: 'AL',
    status: 'Pending',
    remarks: '',
    requestOn: new Date(currYear, 0, 5),
    approveBy: null,
    approveOn: null,
  },
];

export default {LeaveSettings, LeaveUseMode, LeaveStatuses, MyLeaveInfoList, MyLeaveDateList};