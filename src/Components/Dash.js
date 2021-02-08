import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { updateOrderId } from '../redux/reducer.js';

import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader

import './Dash.css';
import icecream from '../assets/icecream.svg'

class Dash extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: '',
      myFlavors: true,
      oldestFirst: false,
      flavors: [],
      selectedFlavor: ''
    }
    this.grabFlavors = this.grabFlavors.bind(this);
    // this.reset = this.reset.bind(this);
    this.createOrder = this.createOrder.bind(this)

  }

  createOrder() {

    axios.post('/api/bag').then(res => {
      console.log(res.data)
      this.props.updateOrderId(res.data.id)

    })
      .catch(err => {
        console.log(err)
      })
  }

  componentDidMount() {
    this.grabFlavors();
  }
  grabFlavors() {
    axios.get('/api/flavors')
      .then(res => {
        this.setState({ flavors: res.data, loading: false })
      })
  }
  render() {
    let { flavors } = this.state

    console.log(this.props)
    return (
      <div>

        {flavors.map((e, i) => <div key={i}><img src={icecream} /><p>{e.flavor1}</p></div>)}

        {/* <div>Selected Icecream  {this.props.orderId}</div> */}
        <button onClick={() => this.createOrder()}>Create your own</button>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return state;
}

export default connect(mapStateToProps, { updateOrderId })(Dash);