import React, { Component } from 'react'
import Developers from './Developers'
import { applyMiddleware, combineReducers, createStore } from 'redux'
import thunk from 'redux-thunk'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import { Provider } from 'react-redux'
import cartReducer from '../reducers/cart'
import injectTapEventPlugin from 'react-tap-event-plugin'
import getMuiTheme from 'material-ui/styles/getMuiTheme'

const reducers = {
	cart: cartReducer,
}

const storeMiddleware = applyMiddleware(thunk)(createStore)
const reducer = combineReducers(reducers)
const store = storeMiddleware(reducer)

injectTapEventPlugin()

export default class App extends Component {
	render() {
		return (
			// Related: https://github.com/callemall/material-ui/issues/4466
			<MuiThemeProvider muiTheme={getMuiTheme({userAgent: null})}>
				<Provider store={store}>
				<Developers/>
				</Provider>
			</MuiThemeProvider>
		)
	}
}
