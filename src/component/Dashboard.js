import React from 'react';
import LeaveCalendar from './LeaveCalendar';
import Home from './Home';

const mainComponent = <LeaveCalendar />

const Dashboard = props => {
  return (
    <Home childComponent={mainComponent} />
  )
}

export default Dashboard;
