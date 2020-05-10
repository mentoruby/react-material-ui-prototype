import React from 'react';
import DashboardIcon from '@material-ui/icons/Dashboard';
import PeopleIcon from '@material-ui/icons/People';
import LocalFloristIcon from '@material-ui/icons/LocalFlorist';
import SettingsIcon from '@material-ui/icons/Settings';
import PersonIcon from '@material-ui/icons/Person';
import InputIcon from '@material-ui/icons/Input';
import Home from "../component/Home";
import LeaveCalendar from '../component/LeaveCalendar';
import MyLeave from '../component/MyLeave';
import Approval from '../component/Approval';
import Setting from '../component/Setting';
import Login from "../component/Login";
import AddLeave from "../component/AddLeave";
import Account from "../component/Account";

const Dashboard = prop => <Home childComponent={<LeaveCalendar />} />;
const MyLeaveInfo = prop => <Home childComponent={<MyLeave />} />;
const ApprovalList = prop => <Home childComponent={<Approval />} />;
const MySetting = prop => <Home childComponent={<Setting />} />;
const AddLeaveForm = prop => <Home childComponent={<AddLeave />} />;
const AccountForm = prop => <Home childComponent={<Account />} />;

const MenuItems = [
  {
    name: 'dashboard',
    title: 'Dashboard',
    visible: true,
    href: '/dashboard',
    icon: <DashboardIcon />,
    component: Dashboard
  },
  {
    name: 'myleave',
    title: 'My Leaves',
    visible: true,
    href: '/myleave',
    icon: <LocalFloristIcon />,
    component: MyLeaveInfo
  },
  {
    name: 'approval',
    title: 'Approval',
    visible: true,
    href: '/approval',
    icon: <PeopleIcon />,
    component: ApprovalList
  },
  {
    name: 'account',
    title: 'Account',
    visible: true,
    href: '/account',
    icon: <PersonIcon />,
    component: AccountForm
  },
  {
    name: 'settings',
    title: 'Settings',
    visible: true,
    href: '/settings',
    icon: <SettingsIcon />,
    component: MySetting
  },
  {
    name: 'logout',
    title: 'Logout',
    visible: true,
    href: '/logout',
    icon: <InputIcon />,
    component: Login
  },
  {
    name: 'addLeave',
    title: 'Add Leave',
    visible: false,
    href: '/addLeave',
    icon: null,
    component: AddLeaveForm
  }
];

export default {MenuItems};