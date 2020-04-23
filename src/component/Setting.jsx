import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';

const useStyles = theme => ({
  root: {
    height: '100%',
    padding: theme.spacing(2),
  },
});

class Setting extends Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>this is Setting page</div>
    )
  }
}

export default withStyles(useStyles)(Setting);