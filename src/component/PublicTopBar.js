import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import PersonAddOutlinedIcon from '@material-ui/icons/PersonAddOutlined';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  '@global': {},
  appBar: {
    borderBottom: `1px solid ${theme.palette.divider}`,
    background : '#F7F9FA',
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
}));

const PublicTopBar = () => {
  const classes = useStyles();
  
  return (
    <React.Fragment>
      <CssBaseline />
      <AppBar position="static" color="default" elevation={0} className={classes.appBar}>
        <Toolbar className={classes.toolbar}>
          <img className={classes.link} src={process.env.PUBLIC_URL + '/favicon.ico'} alt="logo"/>
          <Typography variant="h6" color="inherit" noWrap className={classes.flexGrow}>
            Company Name
          </Typography>
          <div className={classes.flexGrow} />
          <IconButton color="inherit" onClick={() => {alert('Going to Sign Up page');}} alt="Sign Up">
            <PersonAddOutlinedIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
    </React.Fragment>
  )
}
export default PublicTopBar;