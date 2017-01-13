import * as Im from 'immutable'
import { ADD_TO_CART, REMOVE_FROM_CART, SET_DEVELOPERS, SET_LOADING } from '../constants/ActionTypes'

const initialState = Im.fromJS({
	developers: [],
	devsInCart: [],
	loading: true,
})

export default function cart(state = initialState, action) {
	switch (action.type) {
		case SET_DEVELOPERS:
			return state.merge({
				'developers': action.payload,
				'loading': false
			})
		case SET_LOADING:
			return state.set('loading', action.payload)
		case ADD_TO_CART:
			return state.update('devsInCart', (devsInCart) => devsInCart.push(action.payload))
		case REMOVE_FROM_CART:
			return state.update('devsInCart', (devsInCart) => {
				return devsInCart.filter((dev) => {
					return dev.login !== action.payload.login
				})
			})
		default:
			return state
	}
}
