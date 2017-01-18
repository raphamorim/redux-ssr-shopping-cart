import express from 'express'
import Cart from '../models/Cart'

const router = express.Router()

router.get('/:id', (req, res) => {
	Cart.findById(req.params.id).exec((err, result) => {
		if (err)
			return res.status(403).json({ message: 'forbidden request body' })

		if (!result)
			return res.status(404).json({ message: 'cart is not found' })

		res.status(200).json(result)
	})
})

router.post('/', function(req, res) {
	const body = req.body
	const cart = new Cart(body)

	cart.save(function(err, result) {
		if (err)
			return res.status(401).json(err)

		res.status(201).json(result)
	})
})

export default router
