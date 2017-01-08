import express from 'express'
import React from 'react'
import { renderToString } from 'react-dom/server'
import App from './app'
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