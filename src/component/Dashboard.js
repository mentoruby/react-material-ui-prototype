import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import { useTheme } from '@material-ui/core/styles';
import { useMediaQuery } from '@material-ui/core';
import TopSideBar from './TopSideBar';
import LeaveCalendar from './LeaveCalendar';

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
        <LeaveCalendar />
      </div>
    </div>
  )
}

export default Dashboard;
