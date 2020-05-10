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
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import Search from "@material-ui/icons/Search";
import Edit from "@material-ui/icons/Edit";
import Done from "@material-ui/icons/Done";
import Close from "@material-ui/icons/Close";
import StaffList from '../util/StaffList';

const useStyles = theme => ({
  root: {
    height: '100%',
    padding: theme.spacing(2),
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
  },
  displayNone: {
    margin: theme.spacing(1),
    [theme.breakpoints.down('lg')]: {display: 'none'},
  }
});

const headCells = [
  { id: 'action', numeric: false, disablePadding: false, label: 'Action' },
  { id: 'staffName', numeric: false, disablePadding: false, label: 'Name' },
  { id: 'status', numeric: false, disablePadding: false, label: 'Status' },
  { id: 'birthday', numeric: false, disablePadding: false, label: 'Birthday (dd/mm)' },
  { id: 'annualLeave', numeric: false, disablePadding: false, label: 'AL' },
  { id: 'annualLeaveLeft', numeric: false, disablePadding: false, label: 'AL Left' },
  { id: 'compLeave', numeric: false, disablePadding: false, label: 'CL' },
  { id: 'compLeaveLeft', numeric: false, disablePadding: false, label: 'CL Left' },
  { id: 'sickLeaveUsed', numeric: false, disablePadding: false, label: 'SL' }
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

class Setting extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchResults:[],
      order:'asc',
      orderBy:'staffName',
      page:0,
      rowsPerPage:10,
    }
  }

  componentDidMount() {
    this.refreshSetting();
  }

  refreshSetting = () => {
    this.setState({
      searchResults:this.renderSearchResult(),
      order:'asc',
      orderBy:'staffName',
      page:0,
      rowsPerPage:10,
    });
  }
  
  getNumOfEmptyRows = () => {
    return this.state.rowsPerPage - Math.min(this.state.rowsPerPage, this.state.searchResults.length - this.state.page * this.state.rowsPerPage);
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

  renderSearchResult = () => {
    let result = [];
    StaffList.StaffList.forEach((element) => {
      let staffName = element.firstName+' '+element.lastName;
      let status = element.status;
      let birthday = element.birthDay+'/'+element.birthMonth;
      let annualLeave = element.annualLeave;
      let annualLeaveLeft = element.annualLeaveLeft;
      let compLeave = element.compLeave;
      let compLeaveLeft = element.compLeaveLeft;
      let sickLeaveUsed = element.sickLeaveUsed;
      result.push({ staffName, status, birthday, annualLeave, annualLeaveLeft, compLeave, compLeaveLeft, sickLeaveUsed })
    });
    return result;
  }

  renderActionButtons = (row,actionKeyPrefix) => {
  }

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <div className={classes.root}>
          <Paper className={classes.paperResult}>
            <TableContainer>
              <Table className={classes.tableResult} aria-labelledby="tableTitle" size='small' aria-label="enhanced table">
                <EnhancedTableHead classes={classes} order={this.state.order} orderBy={this.state.orderBy} onRequestSort={this.handleRequestSort} />
                <TableBody>
                  {stableSort(this.state.searchResults, getComparator(this.state.order, this.state.orderBy))
                    .slice(this.state.page * this.state.rowsPerPage, this.state.page * this.state.rowsPerPage + this.state.rowsPerPage)
                    .map((row, index) => {
                      const labelId = `StaffList-enhanced-table-action-${index}`;
                      const rowkey = `StaffList-enhanced-table-row-${index}`;
                      const actionKeyPrefix = `StaffList-enhanced-table-action-${index}-`;
                      return (
                        <TableRow hover key={rowkey}>
                          <TableCell component="th" id={labelId} scope="row">
                            {this.renderActionButtons(row,actionKeyPrefix)}
                          </TableCell>
                          <TableCell align="left">{row.staffName}</TableCell>
                          <TableCell align="left">{row.status}</TableCell>
                          <TableCell align="left">{row.birthday}</TableCell>
                          <TableCell align="left">{row.annualLeave}</TableCell>
                          <TableCell align="left">{row.annualLeaveLeft}</TableCell>
                          <TableCell align="left">{row.compLeave}</TableCell>
                          <TableCell align="left">{row.compLeaveLeft}</TableCell>
                          <TableCell align="left">{row.sickLeaveUsed}</TableCell>
                        </TableRow>
                      );
                    })}
                  {this.getNumOfEmptyRows() > 0 && (
                    <TableRow style={{ height:33 * this.getNumOfEmptyRows() }}>
                      <TableCell colSpan={5} />
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

export default withStyles(useStyles)(Setting);