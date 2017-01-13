import React, { Component } from 'react'

import Badge from 'material-ui/Badge'
import IconButton from 'material-ui/IconButton'
import ShoppingCart from 'material-ui/svg-icons/action/add-shopping-cart'

import Avatar from 'material-ui/Avatar'
import Chip from 'material-ui/Chip'

import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'

const styles = {
  cart: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '24px 16px'
  },
  chip: {
    margin: 4,
  },
  content: {
    width: '100%',
    maxWidth: 'none'
  },
  orderedDevs: {
    display: 'flex'
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

    // TODO: Decorators
    const handleClose = this.handleClose.bind(this)
    const handleOpen = this.handleOpen.bind(this)

    const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onTouchTap={handleClose}
        onClick={handleClose}
      />,
      <FlatButton
        label="Finish Order"
        primary={true}
        onTouchTap={handleClose}
        onClick={handleClose}
      />,
    ]

  	const orderedDevs = devsInCart.map((dev, index) => {
      const remove = () => removeFromCart(dev)
  		return (
        <Chip onRequestDelete={remove} style={styles.chip}>
          <Avatar src={dev.avatarURL} />
          {dev.login}
        </Chip>
  		)
  	})
    
  	return (
      <div style={styles.cart}>
        <Badge className="cart-badge" onClick={handleOpen} badgeContent={devsInCart.length} primary={true}>
          <ShoppingCart />
        </Badge>
        <Dialog
          title="My Order"
          actions={actions}
          modal={true}
          contentStyle={styles.content}
          open={this.state.open}>
          <div style={styles.orderedDevs}>
            {orderedDevs}
          </div>
        </Dialog>
      </div>
  	)
  }
}
