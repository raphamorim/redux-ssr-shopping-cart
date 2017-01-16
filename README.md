# Redux SSR Shopping Cart 

> A Sample of React + Redux + Server Side Render + GraphQL + Express + MongoDB

## Structure

```
/
 /dist -- build files
  /assets -- assets bundled from our build step
   /stylesheet
   	base.css -- reset and ref styles
   bundle.js -- bundled client
  server.js -- bundled server
 /src -- source files
  /app -- our React components
   /actions
   /components
   /constants
   /containers
   /data
   /reducers
   index.js -- root component wrapped with `react-dom/render`
  /config -- mongo configuration
  /server -- our express server
   /models -- mongoose models
   /routes -- express routes
   /schemas -- generate graphql schemas
   template.js -- our basic HTML template
  index.js -- our express server
```

## Setup & Build

#### Setup

This setup routine will install/check all dependencies (including [nodejs](http://nodejs.org), [npm](http://npmjs.com), [nvm](https://github.com/creationix/nvm) and [yarn](https://yarnpkg.com/)).

```sh
$ make install
```

Also, you can run `make setup_upgrade` to upgrade project dependencies and `make clean` to delete project dependencies.

#### Build

The above command uses the [webpack](https://webpack.github.io/) to build `server` and `bundle` files (then you'll be able to use all ES6 features in server too, but you can turn off this later).

```sh
$ make build
```

To enter in developer mode (watching files and build for every change) you can run: `make watch`.

Production Note: use `make build-prod` to force `production` environment for bundle process.

## Up Mongo

You need to have [MongoDB](mongodb.com) installed, then you need to run in a separeted process:

```sh
$ mongod
```

## Running

```
$ make run
```

