import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import LeaveForm from '../component/LeaveForm';

const useStyles = theme => ({
  root: {
    height: '100%',
    padding: theme.spacing(2),
  },
});

class AddLeave extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <LeaveForm useMode={'new'}/>
      </div>
    )
  }
}

export default withStyles(useStyles)(AddLeave);