import cache from 'memory-cache'
import express from 'express'

const router = express.Router()

router.get('/', (req, res) => {
	const cachedDevs = JSON.parse(cache.get('devs'))
	if (!cachedDevs || !cachedDevs.length) {
		return res.status(404).json({error: 'developers not found'})
	}

	res.json(cachedDevs)
})

export default router
