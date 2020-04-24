import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import DateFnsUtils from "@date-io/date-fns";
import { MuiPickersUtilsProvider, KeyboardDatePicker } from "@material-ui/pickers";
import LeaveUtil from '../util/LeaveUtil';
import { Card } from '@material-ui/core';

const useStyles = theme => ({
  root: {
    marginTop: theme.spacing(2),
  },
  searchItem: {
    margin: theme.spacing(1),
  },
  datePickerInput: {
    width: 150,
    margin: theme.spacing(1),
  },
  selectEmpty: {
    minWidth: 180,
  },
});

class MyLeaveTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dateFm: new Date(new Date().getFullYear(), 0, 1),
      dateTo: new Date(),
      leaveType: "",
    }
    this.refreshLeaveCriteria = this.refreshLeaveCriteria.bind(this);
    this.handleChangeDateFm = this.handleChangeDateFm.bind(this);
  }

  componentDidMount() {
    this.refreshLeaveCriteria();
  }

  refreshLeaveCriteria() {
    this.setState({
      dateFm: new Date(new Date().getFullYear(), 0, 1),
      dateTo: new Date(),
    });
  }

  handleChangeDateFm(inputDate) {
    this.setState({dateFm: inputDate});
  }

  handleChangeDateTo(inputDate) {
    this.setState({dateTo: inputDate});
  }

  handleChangeLeaveType = (event) => {
    this.setState({leaveType: event.target.value});
  }

  renderLeaveTypeMenuItem = () => {
    let result = [];
    for(let key in LeaveUtil.LeaveSettings) {
      if(key!=='FH') {
      result.push(<MenuItem value={key}>{LeaveUtil.LeaveSettings[key].leaveName}</MenuItem>);
      }
    }
    return result
  }

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <Grid container justify="center">
            <KeyboardDatePicker
              disableToolbar
              className={classes.datePickerInput}
              variant="inline"
              format="yyyy-MM-dd"
              id="dateFm"
              label="Date From"
              value={this.state.dateFm}
              onChange={this.handleChangeDateFm}
              KeyboardButtonProps={{'aria-label': 'change date'}}
            />
            <KeyboardDatePicker
              disableToolbar
              className={classes.datePickerInput}
              variant="inline"
              format="yyyy-MM-dd"
              id="dateTo"
              label="Date To"
              value={this.state.dateTo}
              onChange={this.handleChangeDateTo}
              KeyboardButtonProps={{'aria-label': 'change date'}}
            />
            <Grid item className={classes.searchItem}>
              <InputLabel shrink filled>Leave Type</InputLabel>
              <Select filled selectMenu id="leaveType" displayEmpty className={classes.selectEmpty} onChange={this.handleChangeLeaveType}>
                <MenuItem value="">&nbsp;</MenuItem>
                {this.renderLeaveTypeMenuItem()}
              </Select>
            </Grid>
            <Grid item className={classes.searchItem}>
              <Button type="submit" variant="contained" color="primary">Search</Button>
            </Grid>
          </Grid>
        </MuiPickersUtilsProvider>
        <div className={classes.root}>
          <Card>
            <CardContent>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }
}

export default withStyles(useStyles)(MyLeaveTable);