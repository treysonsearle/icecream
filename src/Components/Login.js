import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { updateUser } from '../redux/reducer.js';
import { updateOrderId } from '../redux/orderReducer';


import './Login.css';

class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      username: '',
      password: '',
      errorMsg: ''
    }
    this.login = this.login.bind(this);
    this.register = this.register.bind(this);
  }

  handleChange(prop, val) {
    this.setState({
      [prop]: val
    })
  }

  login() {
    axios.post('/api/login/login', this.state)
      .then(res => {
        this.props.updateUser(res.data)
        this.props.history.push('/dash');
        axios.post('/api/bag').then(res => {
          console.log(res.data)
          this.props.updateOrderId(res.data.id)

        })
          .catch(err => {
            console.log(err)
          })
      })
      .catch(err => {
        console.log(err)
        this.setState({ errorMsg: 'Incorrect username or password!' })
      })

  }

  register() {
    axios.post('/api/login/register', this.state)
      .then(res => {
        console.log(res.data)
        this.props.updateUser(res.data);
        this.props.history.push('/dash')
      })
      .catch(err => {
        console.log(err)
        this.setState({ errorMsg: 'Username taken!' })
      })
  }



  closeErrorMessage = () => {
    this.setState({
      errorMsg: false,
      username: '',
      password: ''
    })


  }


  render() {
    return (<div>
      <div className='login'>
        <div className='login-container'>
          <div className="icecream-container">
            <h1 className="title" >Icecream Creator</h1>

          </div>
          {this.state.errorMsg && <h3 className='login-error-msg'>{this.state.errorMsg} <span onClick={this.closeErrorMessage}>X</span></h3>}
          <div className='login-input-box'>
            <p>Username:</p>
            <input className='login-input' value={this.state.username} onChange={e => this.handleChange('username', e.target.value)} />
          </div>
          <div className='login-input-box'>
            <p>Password:</p>
            <input className='login-input' value={this.state.password} type='password' onChange={e => this.handleChange('password', e.target.value)} />
          </div>
          <div className='login-button-container'>
            <button className='dark-button' onClick={this.login}> Login </button>
            <button className='dark-button' onClick={this.register}> Register </button>
          </div>
        </div>
      </div>
    </div>
    )
  }
}


export default connect(null, { updateUser, updateOrderId })(Login);