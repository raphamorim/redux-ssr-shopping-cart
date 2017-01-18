import App from './app/containers/App'
import { json } from 'body-parser'
import api from './server/routes'
import cache from 'memory-cache'
import React from 'react'
import request from 'request'
import express from 'express'
import { renderToString } from 'react-dom/server'
import template from './server/template'
import config from './config'
import mongoose from 'mongoose'
import graffiti from '@risingstack/graffiti'
import { schema } from './server/schemas'

mongoose.connect(config.mongo)

const githubToken = process.env.GITHUB_TOKEN
const port = process.env.PORT || 5000

const server = express()

server.get('/', (req, res) => {
	const appString = renderToString(<App />)

	res.send(template({
		body: appString,
		title: 'Developers Shop • jQuery'
	}))
})

server.use(json())

server.use((req, res, next) => {
	// TODO: Reorganize all middleware logic

	if (cache.get('devs'))
		return next()

	const normalizeData = (organization) => {
		const edges = organization.members.edges

		// Applies price rules on nodes
		edges.map((edge) => {
			const node = edge.node
			const { followers, following, repositories } = node
			node['price'] = 0

			if (followers)
				node['price'] += followers.totalCount
			if (following)
				node['price'] += following.totalCount
			if (repositories)
				node['price'] += repositories.totalCount

			return node
		})

		// Sort by most expensive
		edges.sort((prev, coming) => {
			return coming.node.price - prev.node.price
		})

		return JSON.stringify(edges)
	}
	const requestConfig = {
		url: 'https://api.github.com/graphql',
		method: 'POST',
		headers: {
			'User-Agent': 'Awesome-Octocat'
		},
		auth: {
			bearer: githubToken
		},
		body: JSON.stringify({
			query: `query($organizationLogin:String!) {
				organization(login: $organizationLogin) {
					members(last: 100) {
						edges {
							node {
								login,
								name,
								email,
								url,
								avatarURL,
								company,
								followers {
									totalCount
								}
								following {
									totalCount
								}
								repositories {
									totalCount
								}
							}
						}
					}
				}
			}`,
			variables: { 'organizationLogin': 'jquery' }
		})
	}
	request(requestConfig, function(err, result, body) {
		if (!err && result.statusCode === 200) {
			body = JSON.parse(body)
			if (body.data && body.data.organization)
				cache.put('devs', normalizeData(body.data.organization), 3600000)
		}

		next()
	})
})

server.use('/assets', express.static('dist/assets'))

server.use('/api/developers', api.developers)
server.use('/api/carts', api.carts)

server.use(graffiti.express({ schema }))

server.listen(port, () => {
	console.log(`listening on port ${port}`)
})
