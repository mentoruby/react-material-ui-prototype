import React, { Component } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { withStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import History from './History';
import PublicTopBar from './PublicTopBar'

const useStyles = theme => ({
  signin: {
    marginTop: theme.spacing(3),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
});

class LoginPage extends Component {
  constructor(props) {
    super(props);
    
    // clear history
    History.entries = [];
    History.index = -1;
    History.push("/");

    // initialize
    this.state = {
      loginId: '',
      password: '',
      error: '',
    };
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(event) {
    if(this.state.loginId==='admin') {
      History.push('/dashboard');
    } else {
      History.push('/home');
    }
  }

  render() {
    const { classes } = this.props;
    return (
      <div>
        <PublicTopBar />
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <div className={classes.signin}>
            <Avatar className={classes.avatar}>
              <LockOutlinedIcon />
            </Avatar>
            <form className={classes.form} onSubmit={this.onSubmit}>
            <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="loginId"
                name="loginId"
                label="Login ID"
                autoFocus
                onChange={(evt) => this.setState({loginId:evt.target.value})}
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="password"
                name="password"
                label="Password"
                type="password"
                autoComplete="current-password"
                onChange={(evt) => this.setState({password:evt.target.value})}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}>
                Sign In
              </Button>
            </form>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
            </Grid>
          </div>
        </Container>
      </div>
    )
  }
}
export default withStyles(useStyles)(LoginPage);