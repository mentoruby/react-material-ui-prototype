import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import Divider from '@material-ui/core/Divider';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';
import RadioGroup from '@material-ui/core/RadioGroup';
import Radio from '@material-ui/core/Radio';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import TextField from '@material-ui/core/TextField';
import LeaveUtil from '../util/LeaveUtil';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import moment from 'moment';

const useStyles = theme => ({
  root: {},
  formControlItem: {
    marginBottom: theme.spacing(1),
  },
  datePickerInput: {
    marginRight: theme.spacing(1),
  },
  inputNumOfDays: {
    height:'35px',
    width:'130px',
  },
  inputRemark: {
    width: '650px',
  },
});

class LeaveForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      leaveType:null,
      leaveDateFrom:new Date(),
      leaveDateTo:new Date(),
      numOfDays:1,
      leaveStatus:'Pending',
      uploadFilePath:null,
      leaveRemark:'',
      reviewBy:null,
      reviewOn:null
    };
  }

  componentDidMount() {
      this.refreshLeaveForm();
  }

  refreshLeaveForm = () => {
    if(this.props.useMode !== 'new') {
      this.setState({
        leaveType:'AL',
        leaveDateFrom:new Date(new Date().getFullYear(), 3, 6),
        leaveDateTo:new Date(new Date().getFullYear(), 3, 17),
        numOfDays:8,
        leaveStatus:'Approved',
        uploadFilePath:null,
        leaveRemark:'',
        reviewBy:'Big Boss',
        reviewOn:new Date(new Date().getFullYear(), 3, 3),
      });
    }
  }

  handleChangeLeaveType = (event) => {
    this.setState({leaveType: event.target.value});
  }

  handleChangeLeaveDateFrom = (inputDate) => {
    this.setState({leaveDateFrom: inputDate});
  }

  handleChangeLeaveDateTo = (inputDate) => {
    this.setState({leaveDateTo: inputDate});
  }

  handleChangeNumOfDays = (event) => {
    this.setState({numOfDays: event.target.value});
  }

  handleChangeLeaveRemark = (event) => {
    this.setState({leaveRemark: event.target.value});
  }

  renderCardHeader = () => {
    if(this.props.useMode === 'new') {
      return (<CardHeader title="Add Leave" subheader="You can create a leave request." titleTypographyProps={{variant:'subtitle1'}} subheaderTypographyProps={{variant:'subtitle2'}}/>);
    } else if(this.props.useMode === 'edit') {
      return (<CardHeader title="Edit Leave" subheader="You can edit this leave request." titleTypographyProps={{variant:'subtitle1'}} subheaderTypographyProps={{variant:'subtitle2'}}/>);
    } else {
      return (<CardHeader title="View Leave" subheader="You can view this leave request." titleTypographyProps={{variant:'subtitle1'}} subheaderTypographyProps={{variant:'subtitle2'}}/>);
    }
  }

  renderLeaveTypeRadio = () => {
    let result = [];
    for(let key in LeaveUtil.LeaveSettings) {
      if(key!=='FH') {
        result.push(<FormControlLabel key={'LeaveForm-leaveType-radio-key-'+key} value={key} control={<Radio />} label={LeaveUtil.LeaveSettings[key].leaveName} />);
      }
    }
    return result;
  }

  onSubmit = (event) => {
    History.push('/myleave');
  }

  render() {
    const { classes } = this.props;

    return (
      <form autoComplete="off" noValidate onSubmit={this.onSubmit}>
        <Card>
          {this.renderCardHeader()}
          <Divider />
          <CardContent>
            <Grid container direction="row" spacing={3}>
              <Grid item xs={12}>
                <FormControl component="fieldset">
                  <FormLabel component="legend" required>Leave Type</FormLabel>
                  <RadioGroup name="leaveType" value={this.state.leaveType} onChange={this.handleChangeLeaveType} row>
                    {this.renderLeaveTypeRadio()}
                  </RadioGroup>
                </FormControl>
              </Grid>
            </Grid>
            <Grid container direction="row" spacing={3}>
              <Grid item xs={12}>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <FormControl component="fieldset" className={classes.formControlItem}>
                    <FormLabel component="legend" required>Date From</FormLabel>
                    <KeyboardDatePicker
                      id="leaveDateFrom"
                      required
                      disableToolbar
                      className={classes.datePickerInput}
                      variant="inline"
                      format="yyyy-MM-dd"
                      value={this.state.leaveDateFrom}
                      onChange={this.handleChangeLeaveDateFrom}
                      KeyboardButtonProps={{'aria-label': 'change date'}}
                    />
                  </FormControl>
                  <FormControl component="fieldset" className={classes.formControlItem}>
                    <FormLabel component="legend" required>Date To</FormLabel>
                    <KeyboardDatePicker
                      id="leaveDateTo"
                      required
                      disableToolbar
                      className={classes.datePickerInput}
                      variant="inline"
                      format="yyyy-MM-dd"
                      value={this.state.leaveDateTo}
                      onChange={this.handleChangeLeaveDateTo}
                      KeyboardButtonProps={{'aria-label': 'change date'}}
                    />
                  </FormControl>
                </MuiPickersUtilsProvider>
                <FormControl component="fieldset" className={classes.formControlItem}>
                  <FormLabel component="legend" required>Number of Days</FormLabel>
                  <TextField
                    id="numOfDays"
                    name="numOfDays"
                    required
                    variant="outlined"
                    onChange={this.handleChangeNumOfDays}
                    value={this.state.numOfDays}
                    InputProps={{readOnly: true, className: classes.inputNumOfDays}}
                  />
                </FormControl>
              </Grid>
            </Grid>
            <Grid container direction="row" spacing={3}>
              <Grid item xs={12}>
                <FormControl component="fieldset" className={classes.formControlItem}>
                  <FormLabel component="legend">Remarks</FormLabel>
                  <TextareaAutosize
                    id="leaveRemark"
                    name="leaveRemark"
                    rowsMin={3}
                    className={classes.inputRemark}
                    onChange={this.handleChangeLeaveRemark}
                    value={this.state.leaveRemark}
                  />
                </FormControl>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </form>
    )
  }
}

export default withStyles(useStyles)(LeaveForm);