import React, { Component, PropTypes } from 'react'

import { GridTile } from 'material-ui/GridList'
import IconButton from 'material-ui/IconButton'
import Snackbar from 'material-ui/Snackbar'
import AddIcon from 'material-ui/svg-icons/content/add'
import ClearIcon from 'material-ui/svg-icons/content/clear'

const styles = {
	tile: {
		cursor: 'pointer'
	},
	largeIcon: {
    	color: 'white'
  	}
}

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
		let { data, inCart, addToCart, removeFromCart } = this.props
		data = data.node

		// TODO: Decorators
		const handleClose = this.handleRequestClose.bind(this)
		const handleTouchTap = this.handleTouchTap.bind(this)
		const handleClick = (ev) => {
			if (inCart) {
				removeFromCart(data)
			} else {
				addToCart(data)
				handleTouchTap()
			}
			ev.preventDefault()
		}

		const message = `${data.login} was added to your cart!`
		const formatCurrency = (num) => {
		    return `$` + Number(num.toFixed(1)).toLocaleString()
		}

		let icon = <AddIcon style={styles.button}/>
		if (inCart)
			icon = <ClearIcon style={styles.button}/>

		const actionBtn = (
			<div>
				<IconButton iconStyle={styles.largeIcon}>
		      		{ icon }
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
				className='grid-tile'
				onClick={handleClick}
				style={styles.tile}
				titlePosition={'top'}
		      	key={data.avatarURL}
		      	title={data.login}
		      	actionPosition='left'
		      	titleBackground='linear-gradient(to bottom, rgba(0,0,0,0.7) 0%,rgba(0,0,0,0.3) 70%,rgba(0,0,0,0) 100%)'
		      	subtitle={formatCurrency(data.price)}
		      	actionIcon={actionBtn} >
		      	<img className={(inCart)? 'inCart' : ''} src={data.avatarURL} />
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
