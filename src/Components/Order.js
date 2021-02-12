import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import StripeCheckout from 'react-stripe-checkout'
import { setFlavorId, clearFlavorId, subFromTotal, addNewFlavor, addToTotal, clearTotal } from '../redux/reducer.js';
import { updateOrderId } from '../redux/orderReducer';
import './Order.css';
import icecream from '../assets/icecream.svg'
import chocolate from '../assets/chocolate.svg'
import strawberry from '../assets/strawberry.svg'
import carmel from '../assets/carmel.svg'
import vanillacarmel from '../assets/vanillacarmel.svg'
import vanillastrawberry from '../assets/vanillastrawberry.svg'
import vanillachocolate from '../assets/vanillachocolate.svg'
import starwberrychocolate from '../assets/starwberrychocolate.svg'
import carmelchocolate from '../assets/carmelchocolate.svg'
import strawberrycarmel from '../assets/strawberrycarmel.svg'
import vanillastrawberrychocolate from '../assets/vanillastrawberrychocolate.svg'
import vanillastrawberrycarmel from '../assets/vanillastrawberrycarmel.svg'
import strawberrycarmelchocolate from '../assets/strawberrycarmelchocolate.svg'
import vanillacarmelstrawberry from '../assets/vanillacarmelstrawberry.svg'


class Order extends Component {
    constructor(props) {
        super(props)

        this.handleToken = this.handleToken.bind(this)
        this.removeFlavorFromBag = this.removeFlavorFromBag.bind(this)
        this.getFlavorIds = this.getFlavorIds.bind(this)

        // this.getFlavorName = this.getFlavorName.bind(this)
        // this.getTotal = this.getTotal.bind(this)
    }


    removeFlavorFromBag(id) {
        console.log(id)
        axios.delete(`/api/bagList/${id}`)
            .then(res => {
                console.log(res.data)
                this.getFlavorIds(res.data)

            }).catch(
                err => console.log(err)
            )



    }

    componentDidMount() {
        // this.getTotal()
    }

    getFlavorIds(arr) {


        let refreshedFlavorIds = arr.map(e => e.flavor_id)
        // let newArray = []
        console.log(refreshedFlavorIds)

        this.props.clearFlavorId()
        console.log(this.props.flavorsIds)
        this.props.clearTotal()
        refreshedFlavorIds.map(e => axios.get(`/api/flavor/${e}`)
            .then(res => {
                this.props.addToTotal(res.data.price)
                let obj = {
                    id: res.data.id,
                    name: res.data.flavor_name,
                    amount: res.data.price,
                    pic: res.data.pic
                }
                // newArray.push(obj)
                console.log(obj)
                this.props.addNewFlavor(obj)

                console.log(this.props.total)

            }))
    }




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
            axios.put(`/api/bag/${this.props.orderId}`)
            axios.post('/api/bag').then(res => {
                console.log(res.data)
                this.props.updateOrderId(res.data.id).then(res => {
                    axios.post('/api/bag').then(res => {
                        console.log(res.data)
                        this.props.updateOrderId(res.data.id)
                        console.log(this.props.orderId)

                    })
                        .catch(err => {
                            console.log(err)
                        })
                })

            })
                .catch(err => {
                    console.log(err)
                })
        } else {

            alert("Something went wrong", { type: "error" });
        }
    }


    render() {
        const { flavorsIds } = this.props
        console.log(this.props)
        return (
            <div className="container">
                <h1>Your Order</h1>


                <div>

                    <div>{flavorsIds?.map((e, i) => <div key={e.id}>{e.name} <img src={e.pic} /> <p>Price: {e.amount}</p>   <button className="appBtn" value={e.id} onClick={() => this.removeFlavorFromBag(e.id)}>Remove</button></div>)}</div>



                    <div>Total: {this.props.total}</div>

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

export default connect(mapStateToProps, { setFlavorId, clearFlavorId, subFromTotal, addNewFlavor, addToTotal, updateOrderId, clearTotal })(Order)