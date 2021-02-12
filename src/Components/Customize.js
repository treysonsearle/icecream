import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { addNewFlavor, addToTotal } from '../redux/reducer.js';
import './Customize.css';
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






class Customize extends Component {
    constructor(props) {
        super(props)
        this.state = {
            flavors: [],
            addIns: [],
            price: 0.00,
            flavorName: '',
            pic: icecream


        }
        this.addFlavor = this.addFlavor.bind(this)
        this.deleteFlavor = this.deleteFlavor.bind(this)
        this.addAddIn = this.addAddIn.bind(this)
        this.deleteAddIn = this.deleteAddIn.bind(this)
        this.submitFlavor = this.submitFlavor.bind(this)
        this.goToOrder = this.goToOrder.bind(this)
        // this.checkFlavors = this.checkFlavors.bind(this)

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

    checkFlavors = (copiedArray) => {
        console.log(copiedArray)
        if (copiedArray.length === 0) {
            this.setState({ pic: icecream })
        }
        else if (copiedArray.length === 1) {
            switch (copiedArray[0]) {
                case 'Vanilla':
                    return this.setState({ pic: icecream })
                case 'Chocolate':
                    return this.setState({ pic: chocolate })
                case 'Strawberry':
                    return this.setState({ pic: strawberry })
                case 'Carmel':
                    return this.setState({ pic: carmel })
            }
        }
        else if (copiedArray.length === 2) {
            if (copiedArray.some(e => e === 'Vanilla') && copiedArray.some(e => e === 'Chocolate')) {
                this.setState({ pic: vanillachocolate })
            }
            else if (copiedArray.some(e => e === 'Vanilla') && copiedArray.some(e => e === 'Strawberry')) {
                this.setState({ pic: vanillastrawberry })
            }
            else if (copiedArray.some(e => e === 'Vanilla') && copiedArray.some(e => e === 'Carmel')) {
                this.setState({ pic: vanillacarmel })
            }
            else if (copiedArray.some(e => e === 'Strawberry') && copiedArray.some(e => e === 'Chocolate')) {
                this.setState({ pic: starwberrychocolate })
            }
            else if (copiedArray.some(e => e === 'Strawberry') && copiedArray.some(e => e === 'Carmel')) {
                this.setState({ pic: strawberrycarmel })
            }
            else if (copiedArray.some(e => e === 'Carmel') && copiedArray.some(e => e === 'Chocolate')) {
                this.setState({ pic: carmelchocolate })
            }
        }

        else if (copiedArray.length === 3) {
            if (copiedArray.some(e => e === 'Vanilla') && copiedArray.some(e => e === 'Chocolate') && copiedArray.some(e => e === 'Strawberry')) {
                this.setState({ pic: vanillastrawberrychocolate })
            }
            else if (copiedArray.some(e => e === 'Vanilla') && copiedArray.some(e => e === 'Chocolate') && copiedArray.some(e => e === 'Carmel')) {
                this.setState({ pic: vanillacarmelstrawberry })
            }
            else if (copiedArray.some(e => e === 'Carmel') && copiedArray.some(e => e === 'Chocolate') && copiedArray.some(e => e === 'Strawberry')) {
                this.setState({ pic: strawberrycarmelchocolate })
            }
            else if (copiedArray.some(e => e === 'Carmel') && copiedArray.some(e => e === 'Vanilla') && copiedArray.some(e => e === 'Strawberry')) {
                this.setState({ pic: vanillastrawberrycarmel })
            }
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
                        amount: res.data.price,
                        pic: res.data.pic
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
            flavorName: '',
            pic: icecream
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
        this.setState({ price: this.state.price - 1.00 })
        this.checkFlavors(copiedArray)

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

            let copiedArray = [...this.state.flavors, event.target.value]
            this.setState({ flavors: [...this.state.flavors, event.target.value] })
            this.checkFlavors(copiedArray)
            this.setState({ price: this.state.price + 1.00 })

        }
        else {
            alert('Flavors cap reached')
        }

    }


    render() {
        console.log(this.state.flavors)
        return (
            <div className="container">
                <div className="icecream-wrapper">
                    <img src={this.state.pic} />
                </div>
                <div className="flavor-wrapper">
                    <label>Flavors</label>
                    <button className="appBtn" value="Vanilla" onClick={this.addFlavor} >Vanilla</button>
                    <button className="appBtn" value="Chocolate" onClick={this.addFlavor} >Chocolate</button>
                    <button className="appBtn" value="Strawberry" onClick={this.addFlavor} >Strawberry</button>
                    <button className="appBtn" value="Carmel" onClick={this.addFlavor} >Carmel</button>
                    <label>AddIns</label>
                    <button className="appBtn" value="Chocolate Chips" onClick={this.addAddIn} >Chocolate Chips</button>
                    <button className="appBtn" value="Cookie Dough" onClick={this.addAddIn} >Cookie Dough</button>
                    <button className="appBtn" value="Brownies" onClick={this.addAddIn} >Brownies</button>
                    <button className="appBtn" value="Sprinkles" onClick={this.addAddIn} >Sprinkles</button>
                </div>
                <div className="created-flavor">
                    <div>
                        <label>Flavor Name</label>
                        <input type='text' value={this.state.flavorName} onChange={e => this.setState({ flavorName: e.target.value })} />
                    </div>
                    <div><h2>Flavors:</h2> {this.state.flavors.map((e, i) => <button className="appBtn" key={i} value={e} onClick={() => this.deleteFlavor(e)} >{e}</button>)}</div>
                    <div><h2>AddIns:</h2> {this.state.addIns.map((e, i) => <button className="appBtn" key={i} value={e} onClick={() => this.deleteAddIn(e)} >{e}</button>)}</div>
                    <h2>Price: {this.state.price}</h2>
                    <button className="appBtn" onClick={() => this.submitFlavor()}>Submit Flavor</button>
                    <button className="appBtn" onClick={() => this.goToOrder()}>Order</button>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return state;
}

export default connect(mapStateToProps, { addNewFlavor, addToTotal })(Customize);

