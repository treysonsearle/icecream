import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import StripeCheckout from 'react-stripe-checkout'
import { setFlavorId, clearFlavorId, subFromTotal } from '../redux/reducer.js';
import './Order.css';

class Order extends Component {
    constructor(props) {
        super(props)
        this.handleToken = this.handleToken.bind(this)
        this.removeFlavorFromBag = this.removeFlavorFromBag.bind(this)
        this.getFlavorIds = this.getFlavorIds.bind(this)
        this.check = this.check.bind(this)
        // this.getTotal = this.getTotal.bind(this)
    }

    increaseAmount(e) {
        console.log(e)
        e = e + 1
    }

    removeFlavorFromBag(e) {

        axios.delete(`/api/bagList/${e}`)
            .then(res => {
                console.log(res.data)
                this.getFlavorIds()
            }).catch(
                err => console.log(err)
            )

        axios.get(`/api/flavor/${e}`)
            .then(res => {
                let flavorPrice = res.data.price
                console.log(res.data.price)
                console.log(flavorPrice)
                this.props.subFromTotal(flavorPrice)
                console.log(this.props.total)

            }).catch(
                err => console.log(err)
            )

    }

    componentDidMount() {
        // this.getTotal()
    }

    getFlavorIds() {
        axios.get(`/api/orderedFlavors/${this.props.orderId}`)
            .then(res => {
                console.log(res.data)
                let refreshedFlavorIds = res.data.map(e => e.flavor_id)

                console.log(refreshedFlavorIds)
                // this.props.clearFlavorId()
                // console.log(this.props.flavorsIds)

                this.props.setFlavorId(refreshedFlavorIds)
                console.log(this.props.flavorsIds)
            }).catch(
                err => console.log(err)
            )
        // this.getTotal()
    }

    // getTotal() {
    //     this.setState({ total: 0 })
    //     let totalPrice = 0

    //     console.log(this.props.flavorsIds)
    //     for (let i = 0; i < this.props.flavorsIds.length; ++i) {
    //         console.log(this.props.flavorsIds[i])
    //         axios.get(`/api/flavor/${this.props.flavorsIds[i]}`)
    //             .then(res => {
    //                 console.log(res.data)
    //                 this.setState({ total: this.state.total + (+res.data.price) })
    //                 console.log(this.state.total)
    //             }).catch(
    //                 err => console.log(err)
    //             )
    //     }
    //     // this.props.flavorsIds.map(e => 
    //     console.log(totalPrice)

    //     console.log(this.props.total)
    // }

    async handleToken(token, addresses) {
        let { total } = this.props

        console.log(total)
        const response = await axios.post(
            "/api/checkout",
            { token, total }
        );
        const { status } = response.data;
        console.log("Response:", response.data);
        if (status === "success") {

            alert("Success! Check email for details", { type: "success" });
        } else {

            alert("Something went wrong", { type: "error" });
        }
    }

    check() {
        console.log(this.props.total)
    }

    render() {
        const { flavorsIds } = this.props
        return (
            <div>
                <h1>Your Order</h1>


                <div>

                    <div>{flavorsIds.map((e, i) => <div>{e} <button key={i} value={e} onClick={() => this.removeFlavorFromBag(e)}>Remove</button><button  >Amount</button></div>)}</div>

                    <div>QTY</div>

                    <div>Total: {this.props.total}</div>
                    <button onClick={this.check}></button>
                </div>
                <StripeCheckout
                    stripeKey='pk_test_51IGYRdBdX1pC86gACqjFd3cB4kTeGGmMTBpgtkkELehitJHzGlUQRB8Cm6AJr0cS1zr1FCX5qo3eEHWmrI5GUhRc00BeWPHV78'
                    token={this.handleToken}
                    billingAddress
                    shippingAddress
                    amount={this.props.total * 100}
                />
            </div>
        )

    }
}

function mapStateToProps(state) {
    return state;
}

export default connect(mapStateToProps, { setFlavorId, clearFlavorId, subFromTotal })(Order)

