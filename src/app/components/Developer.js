import React, { Component, PropTypes } from 'react'

import { GridTile } from 'material-ui/GridList'
import IconButton from 'material-ui/IconButton'
import Snackbar from 'material-ui/Snackbar'
import ShoppingCart from 'material-ui/svg-icons/action/add-shopping-cart'

export default class Developer extends Component {
	constructor(props) {
	    super(props)
	    this.state = {
	      open: false
	    }
	}

	handleTouchTap() {
	    this.setState({
	      open: true
	    })
	}

	handleRequestClose() {
	    this.setState({
	      open: false
	    })
	}

	render() {
		let { data, inCart, addToCart } = this.props

		if (!data)
			return null

		data = data.node

		const handleClose = this.handleRequestClose.bind(this)
		const handleTouchTap = this.handleTouchTap.bind(this)
		const handleClick = () => { addToCart(data); handleTouchTap() }

		const message = `${data.login} added to your cart!`

		const formatCurrency = (num) => {
		    return '$' + Number(num.toFixed(1)).toLocaleString()
		}

		const actionBtn = (
			<div>
				<IconButton onClick={handleClick} disabled={inCart}>
		      		<ShoppingCart color="white"/>
		    	</IconButton>
		    	<Snackbar
		      		open={this.state.open}
		          	message={message}
		          	autoHideDuration={2500}
		          	onRequestClose={handleClose}/>
		    </div>
		)

		return (
			<GridTile
				titlePosition={'top'}
		      	key={data.avatarURL}
		      	title={data.login}
		      	actionPosition="left"
		      	titleBackground="linear-gradient(to bottom, rgba(0,0,0,0.7) 0%,rgba(0,0,0,0.3) 70%,rgba(0,0,0,0) 100%)"
		      	subtitle={formatCurrency(data.price)}
		      	actionIcon={actionBtn} >
		      	<img src={data.avatarURL} />
		    </GridTile>
		)
	}
}

Developer.propTypes = {
	data: PropTypes.shape({
		avatarURL: PropTypes.string,
		name: PropTypes.string,
	}),
	addToCart: PropTypes.func,
	inCart: PropTypes.bool,
}
