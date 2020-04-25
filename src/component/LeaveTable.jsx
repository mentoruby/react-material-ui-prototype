import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Typography from '@material-ui/core/Typography';
import IconButton from "@material-ui/core/IconButton";
import Edit from "@material-ui/icons/Edit";
import Close from "@material-ui/icons/Close";
import { MuiPickersUtilsProvider, KeyboardDatePicker } from "@material-ui/pickers";
import LeaveUtil from "../util/LeaveUtil";
import DateFnsUtils from "@date-io/date-fns";
import moment from "moment";

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
  selectLeaveType: {
    minWidth: 160,
  },
  selectLeaveStatus: {
    minWidth: 100,
  },
  paperResult: {
    width: '100%',
    marginBottom: theme.spacing(2),
  },
  tableResult: {
    minWidth: 750,
  },
  visuallyHidden: {
    border: 0,
    clip: 'rect(0 0 0 0)',
    height: 1,
    margin: -1,
    overflow: 'hidden',
    padding: 0,
    position: 'absolute',
    top: 20,
    width: 1,
  },
  tableIconButton: {
    width: "20px",
    height: "20px",
    padding: "0px 20px"
  },
  tableActionButton: {
    width: "20px",
    height: "20px",
    padding: "0px"
  }
});

const headCells = [
  { id: 'action', numeric: false, disablePadding: false, label: 'Action' },
  { id: 'date', numeric: false, disablePadding: false, label: 'Date' },
  { id: 'leaveType', numeric: false, disablePadding: false, label: 'Leave Type' },
  { id: 'status', numeric: false, disablePadding: false, label: 'Status' }
];

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

function EnhancedTableHead(props) {
  const { classes, order, orderBy, onRequestSort } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'default'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <span className={classes.visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </span>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  classes: PropTypes.object.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  onRequestSort: PropTypes.func.isRequired,
};

class LeaveTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchDateFm:new Date(),
      searchDateTo:new Date(),
      searchLeaveType:'',
      searchLeaveStatus:'',
      searchResults:[],
      order:'asc',
      orderBy:'date',
      page:0,
      rowsPerPage:5,
    };
  }

  componentDidMount() {
    this.refreshLeaveCriteria();
  }

  refreshLeaveCriteria = () => {
    this.setState({
      searchDateFm:new Date(new Date().getFullYear(), 0, 1),
      searchDateTo:new Date(),
      searchLeaveType:'',
      searchLeaveStatus:'',
      searchResults:this.renderSearchResult(),
      order:'asc',
      orderBy:'date',
      page:0,
      rowsPerPage:5,
    });
  }
  getNumOfEmptyRows = () => {
    return this.state.rowsPerPage - Math.min(this.state.rowsPerPage, this.state.searchResults.length - this.state.page * this.state.rowsPerPage);
  }

  handleChangeSearchDateFm = (inputDate) => {
    this.setState({searchDateFm: inputDate});
  }

  handleChangeSearchDateTo = (inputDate) => {
    this.setState({searchDateTo: inputDate});
  }

  handleChangeSearchLeaveType = (event) => {
    this.setState({searchLeaveType: event.target.value});
  }

  handleChangeSearchLeaveStatus = (event) => {
    this.setState({searchLeaveStatus: event.target.value});
  }

  handleRequestSort = (event, property) => {
    const isAsc = this.state.orderBy === property && this.state.order === 'asc';
    this.setState({order:(isAsc ? 'desc' : 'asc')});
    this.setState({orderBy:property});
  };

  handleChangePage = (event, newPage) => {
    this.setState({page:newPage});
  };

  handleChangeRowsPerPage = (event) => {
    this.setState({rowsPerPage:parseInt(event.target.value, 10)});
    this.setState({page:0});
  };

  renderLeaveTypeMenuItem = () => {
    let result = [];
    for(let key in LeaveUtil.LeaveSettings) {
      if(key!=='FH') {
        result.push(<MenuItem value={key}><Typography variant="body2">{LeaveUtil.LeaveSettings[key].leaveName}</Typography></MenuItem>);
      }
    }
    return result
  }

  renderLeaveStatusMenuItem = () => {
    let result = [];
    for(let key in LeaveUtil.LeaveStatuses) {
      result.push(<MenuItem value={key}><Typography variant="body2">{LeaveUtil.LeaveStatuses[key]}</Typography></MenuItem>);
    }
    return result
  }

  renderSearchResult = () => {
    let result = [];
    LeaveUtil.MyLeaveDateList.forEach((element) => {
      let date = moment(element.date).format("YYYY-MM-DD");
      let leaveType = LeaveUtil.LeaveSettings[element.leaveType].leaveName;
      let status = element.status;
      result.push({ date, leaveType, status })
    });
    return result;
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
              id="searchDateFm"
              label="Date From"
              value={this.state.searchDateFm}
              onChange={this.handleChangeSearchDateFm}
              KeyboardButtonProps={{'aria-label': 'change date'}}
            />
            <KeyboardDatePicker
              disableToolbar
              className={classes.datePickerInput}
              variant="inline"
              format="yyyy-MM-dd"
              id="searchDateTo"
              label="Date To"
              value={this.state.searchDateTo}
              onChange={this.handleChangeSearchDateTo}
              KeyboardButtonProps={{'aria-label': 'change date'}}
            />
            <Grid item className={classes.searchItem}>
              <InputLabel shrink filled>Leave Type</InputLabel>
              <Select filled selectMenu id="searchLeaveType" displayEmpty className={classes.selectLeaveType} onChange={this.handleChangeSearchLeaveType}>
                <MenuItem value=""><Typography variant="body2">&nbsp;</Typography></MenuItem>
                {this.renderLeaveTypeMenuItem()}
              </Select>
            </Grid>
            <Grid item className={classes.searchItem}>
              <InputLabel shrink filled>Leave Status</InputLabel>
              <Select filled selectMenu id="searchLeaveStatus" displayEmpty className={classes.selectLeaveStatus} onChange={this.handleChangeSearchLeaveStatus}>
                <MenuItem value=""><Typography variant="body2">&nbsp;</Typography></MenuItem>
                {this.renderLeaveStatusMenuItem()}
              </Select>
            </Grid>
            <Grid item className={classes.searchItem}>
              <Button type="submit" variant="contained" color="primary">Search</Button>
            </Grid>
          </Grid>
        </MuiPickersUtilsProvider>
        <div className={classes.root}>
          <Paper className={classes.paperResult}>
            <TableContainer>
              <Table className={classes.tableResult} aria-labelledby="tableTitle" size='small' aria-label="enhanced table">
                <EnhancedTableHead classes={classes} order={this.state.order} orderBy={this.state.orderBy} onRequestSort={this.handleRequestSort} />
                <TableBody>
                  {stableSort(this.state.searchResults, getComparator(this.state.order, this.state.orderBy))
                    .slice(this.state.page * this.state.rowsPerPage, this.state.page * this.state.rowsPerPage + this.state.rowsPerPage)
                    .map((row, index) => {
                      const labelId = `enhanced-table-action-${index}`;
                      return (
                        <TableRow hover>
                          <TableCell component="th" id={labelId} scope="row">
                            <IconButton color="primary" className={classes.tableIconButton}><Edit className={classes.tableActionButton} /></IconButton>
                            <IconButton color="secondary" className={classes.tableIconButton}><Close className={classes.tableActionButton} /></IconButton>
                          </TableCell>
                          <TableCell align="left">{row.date}</TableCell>
                          <TableCell align="left">{row.leaveType}</TableCell>
                          <TableCell align="left">{row.status}</TableCell>
                        </TableRow>
                      );
                    })}
                  {this.getNumOfEmptyRows() > 0 && (
                    <TableRow style={{ height:33 * this.getNumOfEmptyRows() }}>
                      <TableCell colSpan={4} />
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={this.state.searchResults.length}
              rowsPerPage={this.state.rowsPerPage}
              page={this.state.page}
              onChangePage={this.handleChangePage}
              onChangeRowsPerPage={this.handleChangeRowsPerPage}
            />
          </Paper>
        </div>
      </div>
    )
  }
}

export default withStyles(useStyles)(LeaveTable);