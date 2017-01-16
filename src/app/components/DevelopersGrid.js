import React, { Component } from 'react'
import Developer from './Developer'
import Paginate from 'rc-pagination'

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
    right: 15,
    top: 105
  }
};

export default class DevelopersGrid extends Component {
  // TODO: Use decorator
  // TODO: Gracefully reorder effect
  // TODO: Unnecessary complexity, refactor

  constructor(props) {
    super(props)
    this.onResize = this.onResize.bind(this)
    this.config = {
      defaultCurrent: 1,
      current: 1,
      total: props.developers.length,
      pageSize: 25,
      devs: props.developers || [],
      toggle: false,
      onChange: this.paginate.bind(this)
    }
    this.state = this.config
  }

  componentDidMount () {
    this.calcColumns()
    if (typeof window !== 'undefined')
      window.addEventListener('resize', this.onResize, false)
  }

  componentWillUnmount () {
    if (typeof window !== 'undefined')
      window.removeEventListener('resize', this.onResize)
  }

  onResize(){
    if (this.rqf)
      return
    
    if (typeof window !== 'undefined')
      this.rqf = window.requestAnimationFrame(() => {
        this.rqf = null
        this.calcColumns()
      })
  }

  calcColumns(columns = 5) {
    // TODO: Put this information on a separeted config 
    if (window && window.innerWidth <= 380)
      columns = 1
    else if (window && window.innerWidth <= 800)
      columns = 3

    this.setState({ columns })
  }

  order(event, isToggled) {
    let { devs, toggle } = this.state

    if (!isToggled)
      devs.sort((prev, next) => { 
        return next.node.price - prev.node.price
      })
    else
      devs.sort((prev, next) => { 
        return prev.node.price - next.node.price
      })
    
    toggle = isToggled
    this.setState({ toggle })
  }

  isInCart(dev, devsInCart) {
    let found = devsInCart.filter((devInCart)=> {
      return dev.node.login === devInCart.login
    })

    return found.length
  }

  paginate(current) {
    this.setState({ current })
  }

  render() {
  	const { devsInCart, addToCart, removeFromCart, loading } = this.props
    const { devs, toggle, columns, current, pageSize } = this.state

    const prev = current - 1
    const developers = devs.slice(pageSize * prev, pageSize * current)

  	return (
      <div>
        <Paginate {...this.state}/>
      	<div style={styles.root}>
          <div style={styles.toggleList}>
            <Toggle label="Cheapest" toggled={toggle} onToggle={this.order.bind(this)} />
          </div>
      		<GridList cols={columns} padding={1} cellHeight={250} style={styles.gridList} >
          	{ developers.map((dev, index) => 
              <Developer inCart={this.isInCart(dev, devsInCart)} data={dev} {...this.props} />
            )}
  	    	</GridList>
  	    </div>
        <Paginate {...this.state}/>
      </div>
  	)
  }
}
