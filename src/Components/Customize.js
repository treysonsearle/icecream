import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { addNewFlavor, addToTotal } from '../redux/reducer.js';


class Customize extends Component {
    constructor(props) {
        super(props)
        this.state = {
            flavors: [],
            addIns: [],
            price: 0.00,
            flavorName: ''


        }
        this.addFlavor = this.addFlavor.bind(this)
        this.deleteFlavor = this.deleteFlavor.bind(this)
        this.addAddIn = this.addAddIn.bind(this)
        this.deleteAddIn = this.deleteAddIn.bind(this)
        this.submitFlavor = this.submitFlavor.bind(this)
        this.goToOrder = this.goToOrder.bind(this)

    }
    componentDidMount() {
        console.log(this.props)
    }

    goToOrder() {
        console.log(this.props.flavorsIds)
        const { orderId, flavorsIds } = this.props
        flavorsIds.map(e => axios.post('/api/bag_list', { bag_id: orderId, flavor_id: e.id })
            .then(res => {
                console.log('it is working')

            }))

        this.props.history.push(`/Order/${this.props.orderId}`)


    }

    checkFlavors() {
        if (this.state.flavors === []) {
            this.setState({ pic: '' })
        }
    }

    submitFlavor() {
        console.log('im clicked')
        if (this.state.flavors.length >= 1) {
            axios.post('/api/flavor', this.state)
                .then(res => {
                    this.props.addToTotal(res.data.price)
                    let obj = {
                        id: res.data.id,
                        name: res.data.flavor_name,
                        amount: res.data.price
                    }
                    this.props.addNewFlavor(obj)
                    console.log(this.props.flavorsIds)

                })
                .catch(err => {
                    console.log(err)

                })
        }
        this.setState({
            flavors: [],
            addIns: [],
            price: 0.00,
            flavorName: ''
        })

    }

    deleteFlavor(e) {
        console.log(e)
        const copiedArray = [...this.state.flavors]
        console.log(this.state.flavors)
        const index = this.state.flavors.findIndex(element => element === e)
        console.log(index)
        copiedArray.splice(index, 1)

        this.setState({ flavors: [...copiedArray] })
        console.log(copiedArray)
        this.setState({ price: this.state.price - 1.00 })

    }

    deleteAddIn(e) {
        console.log(e)
        const copiedArray = [...this.state.addIns]
        console.log(this.state.addIns)
        const index = this.state.addIns.findIndex(element => element === e)
        console.log(index)
        copiedArray.splice(index, 1)

        this.setState({ addIns: [...copiedArray] })
        console.log(copiedArray)
        this.setState({ price: this.state.price - 1.00 })

    }


    addAddIn(event) {
        if (this.state.addIns.length < 3) {
            if (this.state.addIns.some(addIn => addIn === event.target.value)) {
                return
            }
            this.setState({ addIns: [...this.state.addIns, event.target.value] })
            this.setState({ price: this.state.price + 1.00 })

        }
        else {
            alert('AddIns cap reached')
        }

    }


    addFlavor(event) {
        if (this.state.flavors.length < 3) {
            if (this.state.flavors.some(flavor => flavor === event.target.value)) {
                return
            }
            console.log(event.target.value)
            this.setState({ flavors: [...this.state.flavors, event.target.value] })
            this.setState({ price: this.state.price + 1.00 })

        }
        else {
            alert('Flavors cap reached')
        }

    }


    render() {
        console.log(this.state.flavors)
        return (
            <div>
                <div>Name PlaceHolder</div>
                <div>Ice Cream Pic</div>
                <label>flavor</label>
                <button className="custom-button" value="vanilla" onClick={this.addFlavor} >Vanilla</button>
                <button className="custom-button" value="chocolate" onClick={this.addFlavor} >Chocolate</button>
                <button className="custom-button" value="Strawberry" onClick={this.addFlavor} >Strawberry</button>
                <button className="custom-button" value="carmel" onClick={this.addFlavor} >Carmel</button>
                <label>AddIns</label>
                <button className="custom-button" value="Chocolate Chips" onClick={this.addAddIn} >Chocolate Chips</button>
                <button className="custom-button" value="Cookie Dough" onClick={this.addAddIn} >Cookie Dough</button>
                <button className="custom-button" value="Brownies" onClick={this.addAddIn} >Brownies</button>
                <button className="custom-button" value="Sprinkles" onClick={this.addAddIn} >Sprinkles</button>
                <div className="created-flavor">
                    <label>Flavor Name:</label><input type='text' value={this.state.flavorName} onChange={e => this.setState({ flavorName: e.target.value })} />
                    <div>Flavors: {this.state.flavors.map((e, i) => <button key={i} value={e} onClick={() => this.deleteFlavor(e)} >{e}</button>)}</div>
                    <div>AddIns: {this.state.addIns.map((e, i) => <button key={i} value={e} onClick={() => this.deleteAddIn(e)} >{e}</button>)}</div>
                    <p>price: {this.state.price}</p>
                    <button onClick={() => this.submitFlavor()}>Submit Flavor</button>
                    <button onClick={() => this.goToOrder()}>Order</button>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return state;
}

export default connect(mapStateToProps, { addNewFlavor, addToTotal })(Customize);

