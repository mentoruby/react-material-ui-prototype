import React from 'react';
import clsx from 'clsx';
import TopSideBar from './TopSideBar';
import { makeStyles } from '@material-ui/core/styles';
import { useTheme } from '@material-ui/core/styles';
import { useMediaQuery } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  content: {
    height: '100%'
  },
  shiftContent: {
    paddingLeft: 240
  },
}));

const Dashboard = props => {
  const classes = useStyles();
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('lg'), {
    defaultMatches: true
  });
  return (
    <div>
      <TopSideBar />
      <div className={clsx(classes.content, isDesktop && classes.shiftContent)}>
        'This is Admin Page'
      </div>
    </div>
  )
}

export default Dashboard;
