import App from './app'
import React from 'react'
import express from 'express'
import { renderToString } from 'react-dom/server'
import template from './template'

const server = express()
const port = 8888

server.use('/assets', express.static('assets'))

server.get('/', (req, res) => {
	const appString = renderToString(<App />)

	res.send(template({
		body: appString,
		title: 'Hello World from the server'
	}))
})

server.use((req, res, next) => {
	console.log(`[ ${new Date().toUTCString()} ] - GET`)
	next()
})

server.listen(port, () => {
	console.log(`listening on port ${port}`)
})
