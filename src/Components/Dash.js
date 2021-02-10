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
      randomFlavors: [],
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
    let newArray = []
    axios.get('/api/flavors')
      .then(res => {
        this.setState({ flavors: res.data })
        for (let i = 0; i < 9; i++) {
          let index = Math.floor(Math.random() * Math.floor(this.state.flavors.length - 1))
          newArray.push(this.state.flavors[index])
          this.setState({ randomFlavors: [...newArray] })
        }
      })
  }
  render() {
    let { randomFlavors } = this.state

    console.log(this.props)
    return (
      <div className="container">
        <div className="flavors">{randomFlavors.map((e, i) => <div className="flavorImg" key={i}><img src={icecream} /><p>{e.flavor_name}</p></div>)}</div>


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