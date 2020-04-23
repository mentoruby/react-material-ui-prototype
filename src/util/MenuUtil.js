import React from 'react';
import DashboardIcon from '@material-ui/icons/Dashboard';
import PeopleIcon from '@material-ui/icons/People';
import LocalFloristIcon from '@material-ui/icons/LocalFlorist';
import SettingsIcon from '@material-ui/icons/Settings';
import InputIcon from '@material-ui/icons/Input';
import Home from "../component/Home";
import LeaveCalendar from '../component/LeaveCalendar';
import MyLeave from '../component/MyLeave';
import Approval from '../component/Approval';
import Setting from '../component/Setting';
import Login from "../component/Login";

const Dashboard = prop => <Home childComponent={<LeaveCalendar />} />;
const MyLeaveInfo = prop => <Home childComponent={<MyLeave />} />;
const ApprovalList = prop => <Home childComponent={<Approval />} />;
const MySetting = prop => <Home childComponent={<Setting />} />;

const MenuItems = [
  {
    title: 'Dashboard',
    href: '/dashboard',
    icon: <DashboardIcon />,
    component: Dashboard
  },
  {
    title: 'My Leaves',
    href: '/myleave',
    icon: <LocalFloristIcon />,
    component: MyLeaveInfo
  },
  {
    title: 'Approval',
    href: '/approval',
    icon: <PeopleIcon />,
    component: ApprovalList
  },
  {
    title: 'Settings',
    href: '/settings',
    icon: <SettingsIcon />,
    component: MySetting
  },
  {
    title: 'Logout',
    href: '/logout',
    icon: <InputIcon />,
    component: Login
  }
];

export default {MenuItems};