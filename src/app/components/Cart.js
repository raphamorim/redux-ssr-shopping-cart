import React, { Component } from 'react'

import Badge from 'material-ui/Badge'
import IconButton from 'material-ui/IconButton'
import ShoppingCart from 'material-ui/svg-icons/action/add-shopping-cart'
import Subheader from 'material-ui/Subheader'
import Avatar from 'material-ui/Avatar'
import Chip from 'material-ui/Chip'
import TextField from 'material-ui/TextField'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'

const styles = {
	cart: {
		display: 'flex',
		justifyContent: 'space-between',
		padding: '24px 16px 0px 16px'
	},
	chip: {
		margin: 4,
	},
	content: {
		width: '100%',
		maxWidth: 'none'
	},
	orderedDevs: {
		display: 'flex',
		flexWrap: 'wrap',
		width: '100%'
	}
}

export default class Cart extends Component {
	constructor(props) {
		super(props)
		this.state = {
			open: false
		}
	}

	handleOpen() {
		this.setState({
			open: true
		})
	}

	handleClose() {
		this.setState({
			open: false
		})
	}

	render() {
		let { devsInCart, removeFromCart } = this.props
		let totalPrice = 0

		const formatCurrency = (num) => {
			return `$` + Number(num.toFixed(1)).toLocaleString()
		}

		// TODO: Decorators
		const handleClose = this.handleClose.bind(this)
		const handleOpen = this.handleOpen.bind(this)

		const buttonProps = {
			primary: true,
			onTouchTap: handleClose,
			onClick: handleClose
		}
		const modalProps = {
			modal: true,
			contentStyle: styles.content,
			open: this.state.open,
			title: 'My Order'
		}

		const confirm = [
			<FlatButton label="Ok, I undestand!" {...buttonProps}/>
		]
		const actions = [
			<FlatButton label="Cancel" {...buttonProps}/>,
			<FlatButton label="Finish Order" {...buttonProps} onClick={() => location.reload()}/>
		]

		const orderedDevs = devsInCart.map((dev, index) => {
			totalPrice += dev.price

			return (
				<Chip style={styles.chip}>
					<Avatar src={dev.avatarURL} />
					{dev.login}
				</Chip>
			)
		})

		let dialog = (<Dialog actions={confirm} {...modalProps}>
			You have not made any order yet
		</Dialog>)

		if (devsInCart.length)
			dialog = (
				<Dialog actions={actions} autoScrollBodyContent={true} {...modalProps}>
					<Subheader>Developers in Cart:</Subheader>
					<div style={styles.orderedDevs}>
						{orderedDevs}
					</div>
					<Subheader>Total: {formatCurrency(totalPrice)}</Subheader>
				</Dialog>
			)

		return (
			<div style={styles.cart}>
				<Badge
					className="cart-badge"
					onClick={handleOpen}
					badgeContent={devsInCart.length}
					primary={true}
					style={styles.badge}>
					<ShoppingCart />
				</Badge>
				{ dialog }
			</div>
		)
	}
}
