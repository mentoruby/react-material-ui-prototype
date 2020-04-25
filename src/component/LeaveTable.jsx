import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Toolbar from '@material-ui/core/Toolbar';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import DeleteIcon from '@material-ui/icons/Delete';
import FilterListIcon from '@material-ui/icons/FilterList';
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
  selectEmpty: {
    minWidth: 180,
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
});

const order = 'asc';
const orderBy = 'date';
const page = 0;
const rowsPerPage = 2;

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
      searchDateFm: new Date(),
      searchDateTo: new Date(),
      searchLeaveType: "",
      searchResults:[],
      emptyRows:0,
    };
  }

  componentDidMount() {
    this.refreshLeaveCriteria();
  }

  refreshLeaveCriteria = () => {
    this.setState({
      searchDateFm: new Date(new Date().getFullYear(), 0, 1),
      searchDateTo: new Date(),
      searchLeaveType: "",
      searchResults:this.renderSearchResult(),
      emptyRows: rowsPerPage - Math.min(rowsPerPage, this.state.searchResults.length - page * rowsPerPage),
    });
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

  handleRequestSort = (event, property) => {
    const isAsc = this.state.resultOrderBy === property && this.state.resultOrder === 'asc';
    this.setState({resultOrder:(isAsc ? 'desc' : 'asc')});
    this.setState({resultOrderBy:property});
  };

  handleChangePage = (event, newPage) => {
    // setPage(newPage);
  };

  handleChangeRowsPerPage = (event) => {
    // setRowsPerPage(parseInt(event.target.value, 10));
    // setPage(0);
  };

  renderLeaveTypeMenuItem = () => {
    let result = [];
    for(let key in LeaveUtil.LeaveSettings) {
      if(key!=='FH') {
      result.push(<MenuItem value={key}>{LeaveUtil.LeaveSettings[key].leaveName}</MenuItem>);
      }
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
              <Select filled selectMenu id="searchLeaveType" displayEmpty className={classes.selectEmpty} onChange={this.handleChangeSearchLeaveType}>
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
          <Paper className={classes.paperResult}>
            <TableContainer>
              <Table className={classes.tableResult} aria-labelledby="tableTitle" size='medium' aria-label="enhanced table">
                <EnhancedTableHead classes={classes} order={order} orderBy={orderBy} onRequestSort={this.handleRequestSort} />
                <TableBody>
                  {stableSort(this.state.searchResults, getComparator(order, orderBy))
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row, index) => {
                      const labelId = `enhanced-table-action-${index}`;
                      return (
                        <TableRow hover>
                          <TableCell component="th" id={labelId} scope="row">Action</TableCell>
                          <TableCell align="left">{row.date}</TableCell>
                          <TableCell align="left">{row.leaveType}</TableCell>
                          <TableCell align="left">{row.status}</TableCell>
                        </TableRow>
                      );
                    })}
                  {this.emptyRows > 0 && (
                    <TableRow style={{ height:53 * this.emptyRows }}>
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
              rowsPerPage={rowsPerPage}
              page={page}
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