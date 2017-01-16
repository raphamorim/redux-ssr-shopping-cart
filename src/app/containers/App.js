import React, { Component } from 'react'
import Developers from './Developers'
import { applyMiddleware, combineReducers, createStore } from 'redux'
import thunk from 'redux-thunk'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import { Provider } from 'react-redux'
import cartReducer from '../reducers/cart'

const reducers = {
	cart: cartReducer,
}

const storeMiddleware = applyMiddleware(thunk)(createStore)
const reducer = combineReducers(reducers)
const store = storeMiddleware(reducer)

export default class App extends Component {
	render() {
		return (
			<MuiThemeProvider>
	      		<Provider store={store}>
	        		<Developers/>
	      		</Provider>
	      	</MuiThemeProvider>
		)
	}
}
