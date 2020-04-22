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

export default {CreateEvent};