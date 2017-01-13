import React, { Component } from 'react'
import Developer from './Developer'

import { GridList } from 'material-ui/GridList'

import Toggle from 'material-ui/Toggle'

const styles = {
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  gridList: {
    width: '100%',
    overflowY: 'auto',
  },
  toggleList: {
    position: 'absolute',
    right: 40,
    top: 95
  }
};

export default class DevelopersToBuy extends Component {
  // TODO: Use decorator
  // TODO: Gracefully reorder effect
  // TODO: Unnecessary complexity, refactor

  constructor(props) {
    super(props)
    this.config = {
      devs: this.props.developers || [],
      toggle: {
        expensive: true,
        cheapest: false
      }
    }
    this.state = this.config
  }

  orderCheapest(event, isToggled) {
    let { devs, toggle } = this.state
    if (!isToggled) {
      toggle.cheapest = false
      return this.setState({ toggle })
    }

    devs.sort((prev, next) => { 
      return prev.node.price - next.node.price
    })
    toggle = {
      cheapest: true,
      expensive: false
    }
    this.setState({ devs, toggle })
  }

  orderExpensive(event, isToggled) {
    let { devs, toggle } = this.state

    if (!isToggled) {
      toggle.expensive = false
      return this.setState({ toggle })
    }

    devs.sort((prev, next) => { 
      return next.node.price - prev.node.price
    })
    toggle = {
      cheapest: false,
      expensive: true
    }
    this.setState({ devs, toggle })
  }

  isInCart(dev, devsInCart) {
    let found = devsInCart.filter((devInCart)=> {
      return dev.node.login === devInCart.login
    })

    return found.length
  }

  render() {
  	const { devsInCart, addToCart, loading } = this.props
    const { devs, toggle } = this.state

  	return (
      	<div style={styles.root}>
          <div style={styles.toggleList}>
            <Toggle label="Cheapest" toggled={toggle.cheapest} onToggle={this.orderCheapest.bind(this)} />
            <Toggle label="Expensive" toggled={toggle.expensive} onToggle={this.orderExpensive.bind(this)} />
          </div>
      		<GridList cols={5} padding={1} cellHeight={250} style={styles.gridList} >
          	{ devs.map((dev, index) => (<Developer index={index} inCart={this.isInCart(dev, devsInCart)} data={dev} addToCart={addToCart} />)) }
  	    	</GridList>
  	    </div>
  	)
  }
}
