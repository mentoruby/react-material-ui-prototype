import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import CardActions from '@material-ui/core/CardActions';
import DateUtil from '../util/DateUtil';

const useStyles = theme => ({
  root: {
    height: '100%',
    padding: theme.spacing(2),
  },
});

class Account extends Component {
  constructor(props) {
    super(props);
    this.state = {
      password: null,
      firstName: null,
      lastName: null,
      email: null,
      phone: null,
      birthMonth: 1,
      birthDay: 1,
      annualLeave: 0,
      compLeave: 0,
    }
  }

  componentDidMount() {
    this.refreshAccount();
  }

  refreshAccount = () => {
    this.setState({
      password: null,
      firstName: 'Super',
      lastName: 'Man',
      email: 'superman@company.com',
      phone: '12345678',
      birthMonth: 10,
      birthDay: 5,
      annualLeave: 16,
      compLeave: 10,
    });
  }

  handleChangePassword = (event) => {
    this.setState({password: event.target.value});
  }

  handleChangeFirstName = (event) => {
    this.setState({firstName: event.target.value});
  }

  handleChangeLastName = (event) => {
    this.setState({lastName: event.target.value});
  }

  handleChangeEmail = (event) => {
    this.setState({email: event.target.value});
  }

  handleChangePhone = (event) => {
    this.setState({phone: event.target.value});
  }

  handleChangeBirthMonth = (event) => {
    this.setState({birthMonth: event.target.value});
  }

  handleChangeBirthDay = (event) => {
    this.setState({birthDay: event.target.value});
  }

  handleChangeAnnualLeave = (event) => {
    this.setState({annualLeave: event.target.value});
  }

  handleChangeCompLeave = (event) => {
    this.setState({compLeave: event.target.value});
  }

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <Grid container spacing={4}>
          <Grid item md={5} xs={12}>
            <form>
              <Card>
                <CardHeader title="Password" subheader="Update password"/>
                <Divider />
                <CardContent>
                  <TextField fullWidth label="Password" name="password" onChange={this.handleChangePassword} type="password" value="" variant="outlined" margin="normal"/>
                  <TextField fullWidth label="Confirm Password" name="confirmPassword" type="password" value="" variant="outlined" margin="normal"/>
                </CardContent>
                <Divider />
                <CardActions>
                  <Button type="submit" color="primary" variant="contained">Update</Button>
                </CardActions>
              </Card>
            </form>
          </Grid>
          <Grid item md={7} xs={12}>
            <form>
              <Card>
                <CardHeader title="Profile" subheader="You can update this personal profile." />
                <Divider />
                <CardContent>
                  <Grid container spacing={3}>
                    <Grid item md={6} xs={12}>
                      <TextField fullWidth label="First Name" margin="dense" name="firstName" onChange={this.handleChangeFirstName} required value={this.state.firstName} variant="outlined"/>
                    </Grid>
                    <Grid item md={6} xs={12}>
                      <TextField fullWidth label="Last Name" margin="dense" name="lastName" onChange={this.handleChangeLastName} required value={this.state.lastName} variant="outlined" />
                    </Grid>
                    <Grid item md={6} xs={12}>
                      <TextField fullWidth label="Email" margin="dense" name="email" onChange={this.handleChangeEmail} required value={this.state.email} variant="outlined"/>
                    </Grid>
                    <Grid item md={6} xs={12}>
                      <TextField fullWidth label="Phone" margin="dense" name="phone" onChange={this.handleChangePhone} value={this.state.phone} variant="outlined" />
                    </Grid>
                    <Grid item md={3} xs={6}>
                      <TextField fullWidth label="Birth Month" margin="dense" name="birthMonth" onChange={this.handleChangeBirthMonth} required select value={this.state.birthMonth} variant="outlined" SelectProps={{ native: true }}>
                      {DateUtil.MonthSettings.map(option => (
                        <option
                          key={option.value}
                          value={option.value}
                        >
                          {option.label}
                        </option>
                      ))}
                      </TextField>
                    </Grid>
                    <Grid item md={3} xs={6}>
                      <TextField fullWidth label="Birth Day" margin="dense" name="birthDay" onChange={this.handleChangeBirthDay} required select value={this.state.birthDay} variant="outlined" SelectProps={{ native: true }}>
                      {Array(31).fill().map((value, index) => (
                        <option key={index+1} value={index+1}>{index+1}</option>
                      ))}
                      </TextField>
                    </Grid>
                    <Grid item md={3} xs={6}>
                      <TextField fullWidth label="Annual Leave" margin="dense" name="annualLeave" onChange={this.handleChangeAnnualLeave} required value={this.state.annualLeave} variant="outlined" disabled/>
                    </Grid>
                    <Grid item md={3} xs={6}>
                      <TextField fullWidth label="Comp. Leave" margin="dense" name="compLeave" onChange={this.handleChangeCompLeave} required value={this.state.compLeave} variant="outlined" disabled/>
                    </Grid>
                  </Grid>
                </CardContent>
                <Divider />
                <CardActions>
                  <Button type="submit" color="primary" variant="contained">Save</Button>
                </CardActions>
              </Card>
            </form>
          </Grid>
        </Grid>
      </div>
    )
  }
}

export default withStyles(useStyles)(Account);