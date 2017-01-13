import App from './app/containers/App'
import api from './api'
import cache from 'memory-cache'
import React from 'react'
import request from 'request'
import express from 'express'
import { renderToString } from 'react-dom/server'
import template from './template'
import setNodeEnv from 'node-env-file'

setNodeEnv(__dirname + '/../.env');

const githubToken = process.env.GITHUB_TOKEN
const server = express()
const port = 8888
const time = { 
	HOUR: 3600000
}

server.get('/', (req, res) => {
	const appString = renderToString(<App />)

	res.send(template({
		body: appString,
		title: 'Developers Shop • jQuery'
	}))
})

server.use((req, res, next) => {
	return next()

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
		edges.sort((prev, next) => { 
      		return next.node.price - prev.node.price
    	})
		return JSON.stringify(edges)
	}
	const config = {
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
  			variables: { "organizationLogin": "jquery" }
  		})
	}
	request(config, function(err, result, body) {
		if (!err && result.statusCode === 200) {
			body = JSON.parse(body)
			if (body.data && body.data.organization) {
				cache.put('devs', normalizeData(body.data.organization), time.hour)
			}
		}

		next()
	})
})

server.use('/assets', express.static('dist/assets'))
server.use('/api', api);

server.listen(port, () => {
	console.log(`listening on port ${port}`)
})
