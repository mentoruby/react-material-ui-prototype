import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useTheme } from '@material-ui/core/styles';
import { useMediaQuery } from '@material-ui/core';
import { colors } from '@material-ui/core';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import DashboardIcon from '@material-ui/icons/Dashboard';
import PeopleIcon from '@material-ui/icons/People';
import LocalFloristIcon from '@material-ui/icons/LocalFlorist';
import SettingsIcon from '@material-ui/icons/Settings';
import ListItem from '@material-ui/core/ListItem';
import Button from '@material-ui/core/Button';
import Hidden from '@material-ui/core/Hidden';
import InputIcon from '@material-ui/icons/Input';
import Avatar from '@material-ui/core/Avatar';
import PersonOutlinedIcon from '@material-ui/icons/PersonOutlined';

const drawerWidth = 240;
const topBarHeight = 81;

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100%'
  },
  appBar: {
    borderBottom: `1px solid ${theme.palette.divider}`,
    background : '#F7F9FA'
  },
  toolbar: {
    flexWrap: 'wrap',
    paddingRight: 24, // keep right padding when drawer closed
  },
  flexGrow: {
    flexGrow: 1,
  },
  link: {
    margin: theme.spacing(1, 1.5),
  },
  drawer: {
    width: drawerWidth,
    [theme.breakpoints.up('lg')]: {
      marginTop: topBarHeight,
      height: `calc(100% - ${topBarHeight}px)`
    }
  },
  drawerRoot: {
    backgroundColor: theme.palette.white,
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    padding: theme.spacing(2),
  },
  profileRoot: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    minHeight: 'fit-content'
  },
  avatar: {
    width: theme.spacing(5),
    height: theme.spacing(5),
  },
  divider: {
    margin: theme.spacing(2, 0)
  },
  menuitem: {
    display: 'flex',
    paddingTop: 0,
    paddingBottom: 0
  },
  menubutton: {
    color: colors.blueGrey[800],
    padding: '10px 8px',
    justifyContent: 'flex-start',
    textTransform: 'none',
    letterSpacing: 0,
    width: '100%',
    fontWeight: theme.typography.fontWeightMedium
  },
  menuicon: {
    color: theme.palette.icon,
    width: 24,
    height: 24,
    display: 'flex',
    alignItems: 'center',
    marginRight: theme.spacing(1)
  },
  menuactive: {
    color: theme.palette.primary.main,
    fontWeight: theme.typography.fontWeightMedium,
    '& $icon': {
      color: theme.palette.primary.main
    }
  }
}));

const TopSideBar = props => {
  const classes = useStyles();

  const theme = useTheme();

  const isDesktop = useMediaQuery(theme.breakpoints.up('lg'), {
    defaultMatches: true
  });

  const [openSidebar, setOpenSidebar] = React.useState(false);

  const handleSidebarOpen = () => {
    setOpenSidebar(true);
  };

  const handleSidebarClose = () => {
    setOpenSidebar(false);
  };

  const shouldOpenSidebar = isDesktop ? true : openSidebar;

  const menuitems = [
    {
      title: 'Dashboard',
      href: '/dashboard',
      icon: <DashboardIcon />
    },
    {
      title: 'Leaves',
      href: '/leaves',
      icon: <LocalFloristIcon />
    },
    {
      title: 'Approval',
      href: '/approval',
      icon: <PeopleIcon />
    },
    {
      title: 'Settings',
      href: '/settings',
      icon: <SettingsIcon />
    },
    {
      title: 'Logout',
      href: '/logout',
      icon: <InputIcon />
    }
  ];

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="static" color="default" elevation={0} className={classes.appBar}>
        <Toolbar className={classes.toolbar}>
            <img className={classes.link} src={process.env.PUBLIC_URL + '/favicon.ico'} alt="logo"/>
            <Typography variant="h6" color="inherit" noWrap>
              Company Name
            </Typography>
            <div className={classes.flexGrow} />
            <Hidden mdDown>
              <IconButton color="inherit" onClick={() => {alert('Going to Logout page');}}>
                <InputIcon />
              </IconButton>
            </Hidden>
            <Hidden lgUp>
              <IconButton color="inherit" onClick={handleSidebarOpen}>
                <MenuIcon />
              </IconButton>
            </Hidden>
        </Toolbar>
      </AppBar>
      <Drawer
        anchor="left"
        variant={isDesktop ? 'persistent' : 'temporary'}
        classes={{paper: classes.drawer}}
        onClose={handleSidebarClose}
        open={shouldOpenSidebar}>
          <div className={classes.drawerRoot}>
            <div className={classes.profileRoot}>
              <Avatar
                alt="Person"
                className={classes.avatar}
                // component={RouterLink}
                // src={user.avatar}
              >
                <PersonOutlinedIcon/>
              </Avatar>
              <Typography variant="subtitle1">
                Super Man
              </Typography>
            </div>
            <Divider className={classes.divider} />
            <List>
              {menuitems.map(item => (
                <ListItem
                  className={classes.menuitem}
                  disableGutters
                  key={item.title}>
                  <Button
                    activeClassName={classes.menuactive}
                    className={classes.menubutton}
                    //component={CustomRouterLink}
                    to={item.href}>
                    <div className={classes.menuicon}>{item.icon}</div>
                    {item.title}
                  </Button>
                </ListItem>
              ))}
            </List>
            <Divider className={classes.divider} />
          </div>
      </Drawer>
    </div>
  );
};

export default TopSideBar;