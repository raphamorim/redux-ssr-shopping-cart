import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import DevelopersGrid from '../components/DevelopersGrid'
import Cart from '../components/Cart'
import Loader from '../components/Loader'

import AppBar from 'material-ui/AppBar'
import FlatButton from 'material-ui/FlatButton'

import * as CartActions from '../actions/CartActions'
const INITIAL_QUERY = 'developers'

class DevsApp extends Component {
	componentDidMount() {
		this.props.fetchDevelopers(INITIAL_QUERY)
	}

	handleCheckout() {
		// TODO: Use component refs or [better approach: redux action]
		const cartBadge = document.querySelector('.cart-badge')
		if (cartBadge)
			cartBadge.click()
	}

	render() {
		const { developers, devsInCart, addToCart, removeFromCart, loading } = this.props
    	const developersToBuy = <DevelopersGrid developers={developers} devsInCart={devsInCart} addToCart={addToCart} removeFromCart={removeFromCart}/>
    	const emptyElement = <div></div>
		
		let checkoutButton

		if (devsInCart.length)
			checkoutButton = <FlatButton onClick={this.handleCheckout} label='Proceed to checkout'/>

		return (
		    <div>
  				<AppBar title='jQuery Developers Shop' 
  					iconElementLeft={emptyElement}
					iconClassNameRight='muidocs-icon-navigation-expand-more' 
					iconElementRight={checkoutButton}/>
		        <Cart devsInCart={devsInCart}
	          		addToCart={addToCart}
	          		removeFromCart={removeFromCart}/>
		        { (loading) ? <Loader/> : developersToBuy }
		    </div>
		)
	}
}

function mapStateToProps(state) {
	return {
		developers: state.cart.get('developers').toJS(),
		devsInCart: state.cart.get('devsInCart').toJS(),
		loading: state.cart.get('loading'),
	}
}

export default connect(mapStateToProps, CartActions)(DevsApp)
