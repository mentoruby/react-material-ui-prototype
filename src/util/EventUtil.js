import LeaveUtil from '../util/LeaveUtil';

const CreateEvent = (prop) => {
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
      return LeaveUtil.LeaveSettings[this.leaveType].leaveColor;
    }
  }
}

const currYear = new Date().getFullYear();
const currMonth = 3; //new Date().getMonth();

const StaffEventList = [
  CreateEvent({
    id: 0,
    name: 'All Day Event All Day Event All Day Event All Day Event',
    start: new Date(currYear, currMonth-1, 0),
    end: new Date(currYear, currMonth, 1),
    leaveType: 'AL'
  }),
  CreateEvent({
    id: 1,
    name: 'Staff',
    start: new Date(currYear, currMonth, 7),
    end: new Date(currYear, currMonth, 8),
    leaveType: 'AL',
  }),
  CreateEvent({
    id: 2,
    name: 'Staff',
    start: new Date(currYear, currMonth, 7),
    end: new Date(currYear, currMonth, 8),
    leaveType: 'SL',
  }),
  CreateEvent({
    id: 3,
    name: 'Staff',
    start: new Date(currYear, currMonth, 7),
    end: new Date(currYear, currMonth, 8),
    leaveType: 'CL',
  }),
  CreateEvent({
    id: 4,
    name: 'Staff',
    start: new Date(currYear, currMonth, 16),
    end: new Date(currYear, currMonth, 17),
    leaveType: 'SL',
  }),
  CreateEvent({
    id: 5,
    name: 'Staff',
    start: new Date(currYear, currMonth, 22),
    end: new Date(currYear, currMonth, 23),
    leaveType: 'CL',
  }),
  CreateEvent({
    id: 7,
    name: 'Staff',
    start: new Date(currYear, currMonth, 22),
    end: new Date(currYear, currMonth, 23),
    leaveType: 'BL',
  }),
  CreateEvent({
    id: 99,
    name: 'Good Friday',
    start: new Date(currYear, currMonth, 10),
    end: new Date(currYear, currMonth, 11),
    leaveType: 'FH',
  }),
  CreateEvent({
    id: 100,
    name: 'The Day Following Good Friday',
    start: new Date(currYear, currMonth, 11),
    end: new Date(currYear, currMonth, 12),
    leaveType: 'FH',
  }),
  CreateEvent({
    id: 101,
    name: 'Easter Monday',
    start: new Date(currYear, currMonth, 13),
    end: new Date(currYear, currMonth, 14),
    leaveType: 'FH',
  }),
];

export default {CreateEvent, StaffEventList};