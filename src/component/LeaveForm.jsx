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
import TextField from '@material-ui/core/TextField';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import LeaveUtil from '../util/LeaveUtil';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from "@material-ui/pickers";
import DateFnsUtils from '@date-io/date-fns';
import FileUpload from './FileUpload';
import LeaveUsedSummary from './LeaveUsedSummary';
import History from './History';

const useStyles = theme => ({
  root: {
    width: '100%',
  },
  label: {
    fontSize: '12px',
  },
  gutterBottom: {
    marginBottom: theme.spacing(3),
  },
  datePickerInput: {
    minwidth: 150,
    marginRight: theme.spacing(0.5),
  },
  inputNumOfDays: {
    height:'50px',
    width:'130px',
  },
  submit: {
    margin: theme.spacing(1),
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
      reviewOn:null,
      files:[
        {
          name: 'File1.pdf',
          type: 'application/pdf',
          size: 100000,
        },
        {
          name: 'File2.jpg',
          type: 'application/x-jpg',
          size: 200000,
        }
      ]
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
        files:[
          {
            name: 'File1.pdf',
            type: 'application/pdf',
            size: 100000,
          },
          {
            name: 'File2.jpg',
            type: 'application/x-jpg',
            size: 200000,
          }
        ]
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
        result.push(<FormControlLabel key={'LeaveForm-leaveType-radio-key-'+key} value={key} control={<Radio />} label={LeaveUtil.LeaveSettings[key].leaveName}/>);
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
      <div className={classes.root}>
        <form onSubmit={this.onSubmit}>
          <Card>
            {this.renderCardHeader()}
            <Divider />
            <LeaveUsedSummary includeHoliday={false}/>
            <Divider />
            <CardContent>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <FormControl component="fieldset">
                  <FormLabel component="legend" required className={classes.label}>Leave Type</FormLabel>
                    <RadioGroup name="leaveType" value={this.state.leaveType} onChange={this.handleChangeLeaveType} row>
                      {this.renderLeaveTypeRadio()}
                    </RadioGroup>
                  </FormControl>
                </Grid>
              </Grid>
            </CardContent>
            <Divider />
            <CardContent>
              <Grid container justify="space-between">
                <Grid item>
                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <FormControl component="fieldset" className={classes.gutterBottom}>
                      <KeyboardDatePicker
                        id="leaveDateFrom"
                        label="Date From"
                        required
                        disableToolbar
                        className={classes.datePickerInput}
                        variant="inline"
                        format="yyyy-MM-dd"
                        value={this.state.leaveDateFrom}
                        onChange={this.handleChangeLeaveDateFrom}
                        //InputLabelProps={{style: {fontSize: 40}}}
                        KeyboardButtonProps={{'aria-label': 'change date'}}
                      />
                    </FormControl>
                    <FormControl component="fieldset" className={classes.gutterBottom}>
                      <KeyboardDatePicker
                        id="leaveDateTo"
                        label="Date To"
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
                  <FormControl component="fieldset">
                    <TextField
                      id="numOfDays"
                      label="Number of Days"
                      variant="outlined"
                      onChange={this.handleChangeNumOfDays}
                      value={this.state.numOfDays}
                      InputProps={{readOnly: true, className: classes.inputNumOfDays}}
                    />
                  </FormControl>
                </Grid>
              </Grid>
            </CardContent>
            <Divider />
            <CardContent>
              <FileUpload viewOnly={false} uploadedFiles={this.state.files}/>
            </CardContent>
            <Divider />
            <CardContent>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <FormControl component="fieldset" fullWidth>
                    <TextField
                      id="leaveRemark"
                      label="Remarks (if any)"
                      fullWidth
                      multiline
                      rows={4}
                      variant="outlined"
                      onChange={this.handleChangeLeaveRemark}
                      value={this.state.leaveRemark}
                    />
                  </FormControl>
                </Grid>
              </Grid>
            </CardContent>
            <CardActions>
              <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  className={classes.submit}>
                  Save
                </Button>
            </CardActions>
          </Card>
        </form>
      </div>
    )
  }
}

export default withStyles(useStyles)(LeaveForm);