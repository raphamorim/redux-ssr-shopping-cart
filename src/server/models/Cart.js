import mongoose from 'mongoose'

const Schema = mongoose.Schema
const cart = new Schema({
	name: {
		type: String,
		required: true
	},
	price: {
		type: Number,
		required: true
	},
	date: {
		type: Date,
		default: Date.now
	},
	developers: {
		type: Array,
		required: true
	},
	email: {
		type: String,
		required: true
	},
	status: {
		type: String,
		default: 'started'
	}
}, {
	versionKey: false
})

const Cart = mongoose.model('Cart', cart)
export default Cart
