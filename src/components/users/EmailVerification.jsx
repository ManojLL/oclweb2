import React from 'react';
import { Link } from 'react-router-dom';
import alertifyjs from 'alertifyjs';
import { Paper, Button, CircularProgress } from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';
import { get } from 'lodash';
import APIService from '../../services/APIService';
import { refreshCurrentUserCache } from '../../common/utils';

class EmailVerification extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      isLoading: true,
      username: props.match.params.user,
      token: props.match.params.token,
      failureMsg: null,
      notFound: false,
    }
  }

  componentDidMount() {
    this.fetchUser()
  }


  fetchUser() {
    const { username } = this.state
    APIService.users(username).get().then(response => {
      if(get(response, 'detail') === 'Not found.')
        this.setState({notFound: true, isLoading: false})
      else
        this.setState({user: response.data, isLoading: false})
    })
  }

  onSubmit() {
    const { username, token } = this.state
    APIService.users(username).verify(token).get().then(response => {
      if(get(response, 'status') === 200 && get(response, 'data.token')) {
        alertifyjs.success('Successfully Verified Email.')
        this.afterLoginSuccess(response.data.token)
      } else if(get(response, 'detail'))
        this.setState({failureMsg: response.detail})
      else
        alertifyjs.error('Something bad happend')
    })
  }

  afterLoginSuccess(token) {
    localStorage.setItem('token', token)
    this.cacheUserData()
  }

  cacheUserData() {
    refreshCurrentUserCache(response => {
      alertifyjs.success(`Successfully signed in as ${this.state.username}.`)
      window.location.hash  = '#' + response.data.url
    })
  }

  getNotFoundDOM() {
    return (
      <MuiAlert elevation={6} variant="filled" severity="error">
        Unable to verify the user. Either verification link expired or wrong. Please contact OCL Team.
      </MuiAlert>
    )
  }

  getAlreadyVerifiedDOM() {
    return (
      <MuiAlert elevation={6} variant="filled" severity="default">
        This user is already verified. Please proceed to <Link to='/accounts/login'>SignIn</Link>.
      </MuiAlert>
    )
  }

  getFailureMsgDOM() {
    return (
      <MuiAlert elevation={6} variant="filled" severity="error">
        {
          this.state.failureMsg
        }
      </MuiAlert>
    )
  }

  getConfirmEmailAddressDOM() {
    const { user } = this.state;
    return (
      <React.Fragment>
        <h1 style={{textAlign: 'center'}}>Confirm Email Address</h1>
        <p>
          {
            `Please confirm that ${user.email} is an email address for user ${user.username}.`
          }
        </p>
        <Button onClick={() => this.onSubmit()} variant='outlined' color='primary'>
          Confirm
        </Button>
      </React.Fragment>
    )
  }

  getDOM() {
    const { user, notFound, failureMsg } = this.state;
    if(notFound)
      return this.getNotFoundDOM()
    if(user.verified)
      return this.getAlreadyVerifiedDOM()

    if(failureMsg)
      return this.getFailureMsgDOM()

    return this.getConfirmEmailAddressDOM();
  }

  render() {
    const { isLoading } = this.state;
    return (
      <div className='col-md-12' style={{marginTop: '25px'}}>
        <div className='col-md-3' />
        <div className='col-md-6'>
          <Paper style={{padding: '25px'}} className='login-paper'>
            {
              isLoading ?
              <CircularProgress /> :
              this.getDOM()
            }
          </Paper>
        </div>
        <div className='col-md-3' />
      </div>
    );
  }
}

export default EmailVerification;
