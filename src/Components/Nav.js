import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import axios from 'axios';
import { updateUser, logout } from '../redux/reducer.js';


import './Nav.css';

class Nav extends Component {
  constructor(props) {
    super(props);

    this.logout = this.logout.bind(this);
    this.getUser = this.getUser.bind(this);
  }

  componentDidMount() {
    this.getUser()
  }

  getUser() {
    axios.get('/api/auth/me')
    .then(res => {this.props.updateUser(res.data)})
  }
  
  logout() {
    axios.post('/api/auth/logout')
      .then(res => this.props.logout())
  }
  
  render() {
      return this.props.location.pathname !== '/' &&
        <div className='nav'>

          <div className='nav-links'>
            <Link to='/dash'><img className=''  alt='home' /></Link>
            <Link to='/customize'><img className=''  alt='Customize' /></Link>
            <Link to='/Order/:id'><img className='' alt='Order' /></Link>
          </div>
          <Link to='/'><img className='logout' alt='logout' /></Link>
        </div>
  }
}

function mapStateToProps(state) {
  return state;
}

export default withRouter(connect(mapStateToProps, { updateUser, logout })(Nav));