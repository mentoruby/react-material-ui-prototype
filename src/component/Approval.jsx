import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import ApprovalTable from '../component/ApprovalTable';

const useStyles = theme => ({
  root: {
    height: '100%',
    padding: theme.spacing(2),
  },
});

class Approval extends Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <ApprovalTable/>
      </div>
    )
  }
}

export default withStyles(useStyles)(Approval);