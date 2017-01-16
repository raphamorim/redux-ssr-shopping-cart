/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _App = __webpack_require__(1);

	var _App2 = _interopRequireDefault(_App);

	var _bodyParser = __webpack_require__(34);

	var _routes = __webpack_require__(35);

	var _routes2 = _interopRequireDefault(_routes);

	var _memoryCache = __webpack_require__(41);

	var _memoryCache2 = _interopRequireDefault(_memoryCache);

	var _react = __webpack_require__(2);

	var _react2 = _interopRequireDefault(_react);

	var _request = __webpack_require__(42);

	var _request2 = _interopRequireDefault(_request);

	var _express = __webpack_require__(37);

	var _express2 = _interopRequireDefault(_express);

	var _server = __webpack_require__(43);

	var _template = __webpack_require__(44);

	var _template2 = _interopRequireDefault(_template);

	var _config = __webpack_require__(45);

	var _config2 = _interopRequireDefault(_config);

	var _mongoose = __webpack_require__(39);

	var _mongoose2 = _interopRequireDefault(_mongoose);

	var _graffiti = __webpack_require__(46);

	var _graffiti2 = _interopRequireDefault(_graffiti);

	var _schemas = __webpack_require__(47);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	_mongoose2.default.connect(_config2.default.mongo);

	var githubToken = process.env.GITHUB_TOKEN;
	var port = process.env.PORT || 5000;

	var server = (0, _express2.default)();

	server.get('/', function (req, res) {
		var appString = (0, _server.renderToString)(_react2.default.createElement(_App2.default, null));

		res.send((0, _template2.default)({
			body: appString,
			title: 'Developers Shop • jQuery'
		}));
	});

	server.use((0, _bodyParser.json)());

	server.use(function (req, res, next) {
		return next();

		// TODO: Reorganize all middleware logic

		if (_memoryCache2.default.get('devs')) return next();

		var normalizeData = function normalizeData(organization) {
			var edges = organization.members.edges;

			// Applies price rules on nodes
			edges.map(function (edge) {
				var node = edge.node;
				var followers = node.followers,
				    following = node.following,
				    repositories = node.repositories;

				node['price'] = 0;

				if (followers) node['price'] += followers.totalCount;
				if (following) node['price'] += following.totalCount;
				if (repositories) node['price'] += repositories.totalCount;

				return node;
			});

			// Sort by most expensive
			edges.sort(function (prev, next) {
				return next.node.price - prev.node.price;
			});
			return JSON.stringify(edges);
		};
		var config = {
			url: 'https://api.github.com/graphql',
			method: 'POST',
			headers: {
				'User-Agent': 'Awesome-Octocat'
			},
			auth: {
				bearer: githubToken
			},
			body: JSON.stringify({
				query: 'query($organizationLogin:String!) { \n  \t\t\t\torganization(login: $organizationLogin) { \n\t\t\t\t  \tmembers(last: 100) {\n\t\t\t\t      \tedges {\n\t\t\t\t        \tnode {\n\t\t\t\t        \t\tlogin,\n\t\t\t\t          \t\tname,\n\t\t\t\t\t          \temail,\n\t\t\t\t\t          \turl,\n\t\t\t\t\t          \tavatarURL,\n\t\t\t\t\t          \tcompany,\n\t\t\t\t          \t\tfollowers {\n\t\t\t\t            \t\ttotalCount\n\t\t\t\t          \t\t}\n\t\t\t\t          \t\tfollowing {\n\t\t\t\t            \t\ttotalCount\n\t\t\t\t          \t\t}\n\t\t\t\t          \t\trepositories {\n\t\t\t\t            \t\ttotalCount\n\t\t\t\t          \t\t}\n\t\t\t\t        \t}\n\t\t\t\t      \t}\n\t\t\t\t    }\n  \t\t\t\t} \n  \t\t\t}',
				variables: { 'organizationLogin': 'jquery' }
			})
		};
		(0, _request2.default)(config, function (err, result, body) {
			if (!err && result.statusCode === 200) {
				body = JSON.parse(body);
				if (body.data && body.data.organization) {
					_memoryCache2.default.put('devs', normalizeData(body.data.organization), config.time.hour);
				}
			}

			next();
		});
	});

	server.use('/assets', _express2.default.static('dist/assets'));

	server.use('/api/developers', _routes2.default.developers);
	server.use('/api/carts', _routes2.default.carts);

	server.use(_graffiti2.default.express({ schema: _schemas.schema }));

	server.listen(port, function () {
		console.log('listening on port ' + port);
	});

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(2);

	var _react2 = _interopRequireDefault(_react);

	var _Developers = __webpack_require__(3);

	var _Developers2 = _interopRequireDefault(_Developers);

	var _redux = __webpack_require__(4);

	var _reduxThunk = __webpack_require__(30);

	var _reduxThunk2 = _interopRequireDefault(_reduxThunk);

	var _MuiThemeProvider = __webpack_require__(31);

	var _MuiThemeProvider2 = _interopRequireDefault(_MuiThemeProvider);

	var _reactRedux = __webpack_require__(5);

	var _cart = __webpack_require__(32);

	var _cart2 = _interopRequireDefault(_cart);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var reducers = {
		cart: _cart2.default
	};

	var storeMiddleware = (0, _redux.applyMiddleware)(_reduxThunk2.default)(_redux.createStore);
	var reducer = (0, _redux.combineReducers)(reducers);
	var store = storeMiddleware(reducer);

	var App = function (_Component) {
		_inherits(App, _Component);

		function App() {
			_classCallCheck(this, App);

			return _possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).apply(this, arguments));
		}

		_createClass(App, [{
			key: 'render',
			value: function render() {
				return _react2.default.createElement(
					_MuiThemeProvider2.default,
					null,
					_react2.default.createElement(
						_reactRedux.Provider,
						{ store: store },
						_react2.default.createElement(_Developers2.default, null)
					)
				);
			}
		}]);

		return App;
	}(_react.Component);

	exports.default = App;

/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = require("react");

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(2);

	var _react2 = _interopRequireDefault(_react);

	var _redux = __webpack_require__(4);

	var _reactRedux = __webpack_require__(5);

	var _DevelopersGrid = __webpack_require__(6);

	var _DevelopersGrid2 = _interopRequireDefault(_DevelopersGrid);

	var _Cart = __webpack_require__(15);

	var _Cart2 = _interopRequireDefault(_Cart);

	var _Loader = __webpack_require__(24);

	var _Loader2 = _interopRequireDefault(_Loader);

	var _AppBar = __webpack_require__(25);

	var _AppBar2 = _interopRequireDefault(_AppBar);

	var _FlatButton = __webpack_require__(23);

	var _FlatButton2 = _interopRequireDefault(_FlatButton);

	var _CartActions = __webpack_require__(26);

	var CartActions = _interopRequireWildcard(_CartActions);

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var INITIAL_QUERY = 'developers';

	var DevsApp = function (_Component) {
		_inherits(DevsApp, _Component);

		function DevsApp() {
			_classCallCheck(this, DevsApp);

			return _possibleConstructorReturn(this, (DevsApp.__proto__ || Object.getPrototypeOf(DevsApp)).apply(this, arguments));
		}

		_createClass(DevsApp, [{
			key: 'componentDidMount',
			value: function componentDidMount() {
				this.props.fetchDevelopers(INITIAL_QUERY);
			}
		}, {
			key: 'handleCheckout',
			value: function handleCheckout() {
				// TODO: Use component refs or [better approach: redux action]
				var cartBadge = document.querySelector('.cart-badge');
				if (cartBadge) cartBadge.click();
			}
		}, {
			key: 'render',
			value: function render() {
				var _props = this.props,
				    developers = _props.developers,
				    devsInCart = _props.devsInCart,
				    addToCart = _props.addToCart,
				    removeFromCart = _props.removeFromCart,
				    loading = _props.loading;

				var developersToBuy = _react2.default.createElement(_DevelopersGrid2.default, { developers: developers, devsInCart: devsInCart, addToCart: addToCart, removeFromCart: removeFromCart });
				var emptyElement = _react2.default.createElement('div', null);

				var checkoutButton = void 0;

				if (devsInCart.length) checkoutButton = _react2.default.createElement(_FlatButton2.default, { onClick: this.handleCheckout, label: 'Proceed to checkout' });

				return _react2.default.createElement(
					'div',
					null,
					_react2.default.createElement(_AppBar2.default, { title: 'jQuery Developers Shop',
						iconElementLeft: emptyElement,
						iconClassNameRight: 'muidocs-icon-navigation-expand-more',
						iconElementRight: checkoutButton }),
					_react2.default.createElement(_Cart2.default, { devsInCart: devsInCart,
						addToCart: addToCart,
						removeFromCart: removeFromCart }),
					loading ? _react2.default.createElement(_Loader2.default, null) : developersToBuy
				);
			}
		}]);

		return DevsApp;
	}(_react.Component);

	function mapStateToProps(state) {
		return {
			developers: state.cart.get('developers').toJS(),
			devsInCart: state.cart.get('devsInCart').toJS(),
			loading: state.cart.get('loading')
		};
	}

	exports.default = (0, _reactRedux.connect)(mapStateToProps, CartActions)(DevsApp);

/***/ },
/* 4 */
/***/ function(module, exports) {

	module.exports = require("redux");

/***/ },
/* 5 */
/***/ function(module, exports) {

	module.exports = require("react-redux");

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(2);

	var _react2 = _interopRequireDefault(_react);

	var _Developer = __webpack_require__(7);

	var _Developer2 = _interopRequireDefault(_Developer);

	var _rcPagination = __webpack_require__(13);

	var _rcPagination2 = _interopRequireDefault(_rcPagination);

	var _GridList = __webpack_require__(8);

	var _Toggle = __webpack_require__(14);

	var _Toggle2 = _interopRequireDefault(_Toggle);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var styles = {
	  root: {
	    display: 'flex',
	    flexWrap: 'wrap',
	    justifyContent: 'space-between'
	  },
	  gridList: {
	    width: '100%',
	    overflowY: 'auto'
	  },
	  toggleList: {
	    position: 'absolute',
	    right: 15,
	    top: 105
	  }
	};

	var DevelopersGrid = function (_Component) {
	  _inherits(DevelopersGrid, _Component);

	  // TODO: Use decorator
	  // TODO: Gracefully reorder effect
	  // TODO: Unnecessary complexity, refactor

	  function DevelopersGrid(props) {
	    _classCallCheck(this, DevelopersGrid);

	    var _this = _possibleConstructorReturn(this, (DevelopersGrid.__proto__ || Object.getPrototypeOf(DevelopersGrid)).call(this, props));

	    _this.onResize = _this.onResize.bind(_this);
	    _this.config = {
	      defaultCurrent: 1,
	      current: 1,
	      total: props.developers.length,
	      pageSize: 25,
	      devs: props.developers || [],
	      toggle: false,
	      onChange: _this.paginate.bind(_this)
	    };
	    _this.state = _this.config;
	    return _this;
	  }

	  _createClass(DevelopersGrid, [{
	    key: 'componentDidMount',
	    value: function componentDidMount() {
	      this.calcColumns();
	      if (typeof window !== 'undefined') window.addEventListener('resize', this.onResize, false);
	    }
	  }, {
	    key: 'componentWillUnmount',
	    value: function componentWillUnmount() {
	      if (typeof window !== 'undefined') window.removeEventListener('resize', this.onResize);
	    }
	  }, {
	    key: 'onResize',
	    value: function onResize() {
	      var _this2 = this;

	      if (this.rqf) return;

	      if (typeof window !== 'undefined') this.rqf = window.requestAnimationFrame(function () {
	        _this2.rqf = null;
	        _this2.calcColumns();
	      });
	    }
	  }, {
	    key: 'calcColumns',
	    value: function calcColumns() {
	      var columns = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 5;

	      // TODO: Put this information on a separeted config 
	      if (window && window.innerWidth <= 380) columns = 1;else if (window && window.innerWidth <= 800) columns = 3;

	      this.setState({ columns: columns });
	    }
	  }, {
	    key: 'order',
	    value: function order(event, isToggled) {
	      var _state = this.state,
	          devs = _state.devs,
	          toggle = _state.toggle;


	      if (!isToggled) devs.sort(function (prev, next) {
	        return next.node.price - prev.node.price;
	      });else devs.sort(function (prev, next) {
	        return prev.node.price - next.node.price;
	      });

	      toggle = isToggled;
	      this.setState({ toggle: toggle });
	    }
	  }, {
	    key: 'isInCart',
	    value: function isInCart(dev, devsInCart) {
	      var found = devsInCart.filter(function (devInCart) {
	        return dev.node.login === devInCart.login;
	      });

	      return found.length;
	    }
	  }, {
	    key: 'paginate',
	    value: function paginate(current) {
	      this.setState({ current: current });
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var _this3 = this;

	      var _props = this.props,
	          devsInCart = _props.devsInCart,
	          addToCart = _props.addToCart,
	          removeFromCart = _props.removeFromCart,
	          loading = _props.loading;
	      var _state2 = this.state,
	          devs = _state2.devs,
	          toggle = _state2.toggle,
	          columns = _state2.columns,
	          current = _state2.current,
	          pageSize = _state2.pageSize;


	      var prev = current - 1;
	      var developers = devs.slice(pageSize * prev, pageSize * current);

	      return _react2.default.createElement(
	        'div',
	        null,
	        _react2.default.createElement(_rcPagination2.default, this.state),
	        _react2.default.createElement(
	          'div',
	          { style: styles.root },
	          _react2.default.createElement(
	            'div',
	            { style: styles.toggleList },
	            _react2.default.createElement(_Toggle2.default, { label: 'Cheapest', toggled: toggle, onToggle: this.order.bind(this) })
	          ),
	          _react2.default.createElement(
	            _GridList.GridList,
	            { cols: columns, padding: 1, cellHeight: 250, style: styles.gridList },
	            developers.map(function (dev, index) {
	              return _react2.default.createElement(_Developer2.default, _extends({ inCart: _this3.isInCart(dev, devsInCart), data: dev }, _this3.props));
	            })
	          )
	        ),
	        _react2.default.createElement(_rcPagination2.default, this.state)
	      );
	    }
	  }]);

	  return DevelopersGrid;
	}(_react.Component);

	exports.default = DevelopersGrid;

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(2);

	var _react2 = _interopRequireDefault(_react);

	var _GridList = __webpack_require__(8);

	var _IconButton = __webpack_require__(9);

	var _IconButton2 = _interopRequireDefault(_IconButton);

	var _Snackbar = __webpack_require__(10);

	var _Snackbar2 = _interopRequireDefault(_Snackbar);

	var _add = __webpack_require__(11);

	var _add2 = _interopRequireDefault(_add);

	var _clear = __webpack_require__(12);

	var _clear2 = _interopRequireDefault(_clear);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var styles = {
		tile: {
			cursor: 'pointer'
		},
		largeIcon: {
			color: 'white'
		}
	};

	var Developer = function (_Component) {
		_inherits(Developer, _Component);

		function Developer(props) {
			_classCallCheck(this, Developer);

			var _this = _possibleConstructorReturn(this, (Developer.__proto__ || Object.getPrototypeOf(Developer)).call(this, props));

			_this.state = {
				open: false
			};
			return _this;
		}

		_createClass(Developer, [{
			key: 'handleTouchTap',
			value: function handleTouchTap() {
				this.setState({
					open: true
				});
			}
		}, {
			key: 'handleRequestClose',
			value: function handleRequestClose() {
				this.setState({
					open: false
				});
			}
		}, {
			key: 'render',
			value: function render() {
				var _props = this.props,
				    data = _props.data,
				    inCart = _props.inCart,
				    addToCart = _props.addToCart,
				    removeFromCart = _props.removeFromCart;

				data = data.node;

				// TODO: Decorators
				var handleClose = this.handleRequestClose.bind(this);
				var handleTouchTap = this.handleTouchTap.bind(this);
				var handleClick = function handleClick(ev) {
					if (inCart) {
						removeFromCart(data);
					} else {
						addToCart(data);
						handleTouchTap();
					}
					ev.preventDefault();
				};

				var message = data.login + ' was added to your cart!';
				var formatCurrency = function formatCurrency(num) {
					return '$' + Number(num.toFixed(1)).toLocaleString();
				};

				var icon = _react2.default.createElement(_add2.default, { style: styles.button });
				if (inCart) icon = _react2.default.createElement(_clear2.default, { style: styles.button });

				var actionBtn = _react2.default.createElement(
					'div',
					null,
					_react2.default.createElement(
						_IconButton2.default,
						{ iconStyle: styles.largeIcon },
						icon
					),
					_react2.default.createElement(_Snackbar2.default, {
						open: this.state.open,
						message: message,
						autoHideDuration: 2500,
						onRequestClose: handleClose })
				);

				return _react2.default.createElement(
					_GridList.GridTile,
					{
						className: 'grid-tile',
						onClick: handleClick,
						style: styles.tile,
						titlePosition: 'top',
						key: data.avatarURL,
						title: data.login,
						actionPosition: 'left',
						titleBackground: 'linear-gradient(to bottom, rgba(0,0,0,0.7) 0%,rgba(0,0,0,0.3) 70%,rgba(0,0,0,0) 100%)',
						subtitle: formatCurrency(data.price),
						actionIcon: actionBtn },
					_react2.default.createElement('img', { className: inCart ? 'inCart' : '', src: data.avatarURL })
				);
			}
		}]);

		return Developer;
	}(_react.Component);

	exports.default = Developer;


	Developer.propTypes = {
		data: _react.PropTypes.shape({
			avatarURL: _react.PropTypes.string,
			name: _react.PropTypes.string
		}),
		addToCart: _react.PropTypes.func,
		inCart: _react.PropTypes.bool
	};

/***/ },
/* 8 */
/***/ function(module, exports) {

	module.exports = require("material-ui/GridList");

/***/ },
/* 9 */
/***/ function(module, exports) {

	module.exports = require("material-ui/IconButton");

/***/ },
/* 10 */
/***/ function(module, exports) {

	module.exports = require("material-ui/Snackbar");

/***/ },
/* 11 */
/***/ function(module, exports) {

	module.exports = require("material-ui/svg-icons/content/add");

/***/ },
/* 12 */
/***/ function(module, exports) {

	module.exports = require("material-ui/svg-icons/content/clear");

/***/ },
/* 13 */
/***/ function(module, exports) {

	module.exports = require("rc-pagination");

/***/ },
/* 14 */
/***/ function(module, exports) {

	module.exports = require("material-ui/Toggle");

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(2);

	var _react2 = _interopRequireDefault(_react);

	var _Badge = __webpack_require__(16);

	var _Badge2 = _interopRequireDefault(_Badge);

	var _IconButton = __webpack_require__(9);

	var _IconButton2 = _interopRequireDefault(_IconButton);

	var _addShoppingCart = __webpack_require__(17);

	var _addShoppingCart2 = _interopRequireDefault(_addShoppingCart);

	var _Subheader = __webpack_require__(18);

	var _Subheader2 = _interopRequireDefault(_Subheader);

	var _Avatar = __webpack_require__(19);

	var _Avatar2 = _interopRequireDefault(_Avatar);

	var _Chip = __webpack_require__(20);

	var _Chip2 = _interopRequireDefault(_Chip);

	var _TextField = __webpack_require__(21);

	var _TextField2 = _interopRequireDefault(_TextField);

	var _Dialog = __webpack_require__(22);

	var _Dialog2 = _interopRequireDefault(_Dialog);

	var _FlatButton = __webpack_require__(23);

	var _FlatButton2 = _interopRequireDefault(_FlatButton);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var styles = {
	  cart: {
	    display: 'flex',
	    justifyContent: 'space-between',
	    padding: '24px 16px'
	  },
	  chip: {
	    margin: 4
	  },
	  content: {
	    width: '100%',
	    maxWidth: 'none'
	  },
	  orderedDevs: {
	    display: 'flex',
	    flexWrap: 'wrap',
	    width: '100%'
	  }
	};

	var Cart = function (_Component) {
	  _inherits(Cart, _Component);

	  function Cart(props) {
	    _classCallCheck(this, Cart);

	    var _this = _possibleConstructorReturn(this, (Cart.__proto__ || Object.getPrototypeOf(Cart)).call(this, props));

	    _this.state = {
	      open: false
	    };
	    return _this;
	  }

	  _createClass(Cart, [{
	    key: 'handleOpen',
	    value: function handleOpen() {
	      this.setState({
	        open: true
	      });
	    }
	  }, {
	    key: 'handleClose',
	    value: function handleClose() {
	      this.setState({
	        open: false
	      });
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var _props = this.props,
	          devsInCart = _props.devsInCart,
	          removeFromCart = _props.removeFromCart;

	      var totalPrice = 0;

	      var formatCurrency = function formatCurrency(num) {
	        return '$' + Number(num.toFixed(1)).toLocaleString();
	      };

	      // TODO: Decorators
	      var handleClose = this.handleClose.bind(this);
	      var handleOpen = this.handleOpen.bind(this);

	      var buttonProps = {
	        primary: true,
	        onTouchTap: handleClose,
	        onClick: handleClose
	      };
	      var modalProps = {
	        modal: true,
	        contentStyle: styles.content,
	        open: this.state.open,
	        title: "My Order"
	      };

	      var confirm = [_react2.default.createElement(_FlatButton2.default, _extends({ label: 'Ok, I undestand!' }, buttonProps))];
	      var actions = [_react2.default.createElement(_FlatButton2.default, _extends({ label: 'Cancel' }, buttonProps)), _react2.default.createElement(_FlatButton2.default, _extends({ label: 'Finish Order' }, buttonProps))];

	      var orderedDevs = devsInCart.map(function (dev, index) {
	        totalPrice += dev.price;
	        return _react2.default.createElement(
	          _Chip2.default,
	          { style: styles.chip },
	          _react2.default.createElement(_Avatar2.default, { src: dev.avatarURL }),
	          dev.login
	        );
	      });

	      var dialog = _react2.default.createElement(
	        _Dialog2.default,
	        _extends({ actions: confirm }, modalProps),
	        'You have not made any order yet'
	      );

	      if (devsInCart.length) dialog = _react2.default.createElement(
	        _Dialog2.default,
	        _extends({ actions: actions, autoScrollBodyContent: true }, modalProps),
	        _react2.default.createElement(
	          _Subheader2.default,
	          null,
	          'Developers in Cart:'
	        ),
	        _react2.default.createElement(
	          'div',
	          { style: styles.orderedDevs },
	          orderedDevs
	        ),
	        _react2.default.createElement(
	          _Subheader2.default,
	          null,
	          'Total: ',
	          formatCurrency(totalPrice)
	        )
	      );

	      return _react2.default.createElement(
	        'div',
	        { style: styles.cart },
	        _react2.default.createElement(
	          _Badge2.default,
	          {
	            className: 'cart-badge',
	            onClick: handleOpen,
	            badgeContent: devsInCart.length,
	            primary: true,
	            style: styles.badge },
	          _react2.default.createElement(_addShoppingCart2.default, null)
	        ),
	        dialog
	      );
	    }
	  }]);

	  return Cart;
	}(_react.Component);

	exports.default = Cart;

/***/ },
/* 16 */
/***/ function(module, exports) {

	module.exports = require("material-ui/Badge");

/***/ },
/* 17 */
/***/ function(module, exports) {

	module.exports = require("material-ui/svg-icons/action/add-shopping-cart");

/***/ },
/* 18 */
/***/ function(module, exports) {

	module.exports = require("material-ui/Subheader");

/***/ },
/* 19 */
/***/ function(module, exports) {

	module.exports = require("material-ui/Avatar");

/***/ },
/* 20 */
/***/ function(module, exports) {

	module.exports = require("material-ui/Chip");

/***/ },
/* 21 */
/***/ function(module, exports) {

	module.exports = require("material-ui/TextField");

/***/ },
/* 22 */
/***/ function(module, exports) {

	module.exports = require("material-ui/Dialog");

/***/ },
/* 23 */
/***/ function(module, exports) {

	module.exports = require("material-ui/FlatButton");

/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.default = Loader;

	var _react = __webpack_require__(2);

	var _react2 = _interopRequireDefault(_react);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var style = {
		width: 65,
		margin: '0 auto',
		paddingTop: 60,
		position: 'relative'
	};

	function Loader(props) {
		return _react2.default.createElement(
			'div',
			{ style: style },
			_react2.default.createElement(
				'svg',
				{ className: 'spinner', width: '65px', height: '65px', viewBox: '0 0 66 66', xmlns: 'http://www.w3.org/2000/svg' },
				_react2.default.createElement('circle', { className: 'path', fill: 'none', strokeWidth: '6', strokeLinecap: 'round', cx: '33', cy: '33', r: '30' })
			)
		);
	}

/***/ },
/* 25 */
/***/ function(module, exports) {

	module.exports = require("material-ui/AppBar");

/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.addToCart = addToCart;
	exports.removeFromCart = removeFromCart;
	exports.setLoading = setLoading;
	exports.setDevelopers = setDevelopers;
	exports.fetchDevelopers = fetchDevelopers;
	exports.fetchCart = fetchCart;

	var _ActionTypes = __webpack_require__(27);

	var _fetchData = __webpack_require__(28);

	function addToCart(dev) {
	  return {
	    type: _ActionTypes.ADD_TO_CART,
	    payload: dev
	  };
	}

	function removeFromCart(dev) {
	  return {
	    type: _ActionTypes.REMOVE_FROM_CART,
	    payload: dev
	  };
	}

	function setLoading(value) {
	  return {
	    type: _ActionTypes.SET_LOADING,
	    payload: value
	  };
	}

	function setDevelopers(devs) {
	  return {
	    type: _ActionTypes.SET_DEVELOPERS,
	    payload: devs
	  };
	}

	function fetchDevelopers() {
	  return function (dispatch) {
	    dispatch(setLoading(true));
	    (0, _fetchData.fetchDevelopers)(function (developers) {
	      dispatch(setDevelopers(developers));
	    });
	  };
	}

	function fetchCart(cartId) {
	  return function (dispatch) {
	    dispatch(setLoading(true));
	    (0, _fetchData.fetchDevelopers)(function (developers) {
	      dispatch(setDevelopers(developers));
	    }, cartId);
	  };
	}

/***/ },
/* 27 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var ADD_TO_CART = exports.ADD_TO_CART = 'ADD_TO_CART';
	var REMOVE_FROM_CART = exports.REMOVE_FROM_CART = 'REMOVE_FROM_CART';
	var SET_DEVELOPERS = exports.SET_DEVELOPERS = 'SET_DEVELOPERS';
	var SET_LOADING = exports.SET_LOADING = 'SET_LOADING';

/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.fetchDevelopers = fetchDevelopers;

	__webpack_require__(29);

	function fetchDevelopers(setData) {
	    fetch('/api/developers').then(function (res) {
	        return res.json();
	    }).then(function (responseData) {
	        if (responseData) {
	            setData(responseData);
	        }
	    });
	}

/***/ },
/* 29 */
/***/ function(module, exports) {

	module.exports = require("whatwg-fetch");

/***/ },
/* 30 */
/***/ function(module, exports) {

	module.exports = require("redux-thunk");

/***/ },
/* 31 */
/***/ function(module, exports) {

	module.exports = require("material-ui/styles/MuiThemeProvider");

/***/ },
/* 32 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.default = cart;

	var _immutable = __webpack_require__(33);

	var Im = _interopRequireWildcard(_immutable);

	var _ActionTypes = __webpack_require__(27);

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	var initialState = Im.fromJS({
		developers: [],
		devsInCart: [],
		loading: true
	});

	function cart() {
		var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
		var action = arguments[1];

		switch (action.type) {
			case _ActionTypes.SET_DEVELOPERS:
				return state.merge({
					'developers': action.payload,
					'loading': false
				});
			case _ActionTypes.SET_LOADING:
				return state.set('loading', action.payload);
			case _ActionTypes.ADD_TO_CART:
				return state.update('devsInCart', function (devsInCart) {
					return devsInCart.push(action.payload);
				});
			case _ActionTypes.REMOVE_FROM_CART:
				return state.update('devsInCart', function (devsInCart) {
					return devsInCart.filter(function (dev) {
						return dev.login !== action.payload.login;
					});
				});
			default:
				return state;
		}
	}

/***/ },
/* 33 */
/***/ function(module, exports) {

	module.exports = require("immutable");

/***/ },
/* 34 */
/***/ function(module, exports) {

	module.exports = require("body-parser");

/***/ },
/* 35 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _carts = __webpack_require__(36);

	var _carts2 = _interopRequireDefault(_carts);

	var _developers = __webpack_require__(40);

	var _developers2 = _interopRequireDefault(_developers);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = { carts: _carts2.default, developers: _developers2.default };

/***/ },
/* 36 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _express = __webpack_require__(37);

	var _express2 = _interopRequireDefault(_express);

	var _Cart = __webpack_require__(38);

	var _Cart2 = _interopRequireDefault(_Cart);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var router = _express2.default.Router();

	router.get('/:id', function (req, res) {
		_Cart2.default.findById(req.params.id).exec(function (err, result) {
			if (err) return res.status(403).json({ message: 'forbidden request body' });

			if (!result) return res.status(404).json({ message: 'cart is not found' });

			res.status(200).json(result);
		});
	});

	router.post('/', function (req, res) {
		var body = req.body;
		var cart = new _Cart2.default(body);

		cart.save(function (err, result) {
			if (err) return res.status(401).json(err);

			res.status(201).json(result);
		});
	});

	exports.default = router;

/***/ },
/* 37 */
/***/ function(module, exports) {

	module.exports = require("express");

/***/ },
/* 38 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _mongoose = __webpack_require__(39);

	var _mongoose2 = _interopRequireDefault(_mongoose);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var Schema = _mongoose2.default.Schema;
	var cart = new Schema({
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
	});

	var Cart = _mongoose2.default.model('Cart', cart);
	exports.default = Cart;

/***/ },
/* 39 */
/***/ function(module, exports) {

	module.exports = require("mongoose");

/***/ },
/* 40 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _memoryCache = __webpack_require__(41);

	var _memoryCache2 = _interopRequireDefault(_memoryCache);

	var _express = __webpack_require__(37);

	var _express2 = _interopRequireDefault(_express);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var router = _express2.default.Router();

	var items = [{
		"node": {
			"login": "addyosmani",
			"name": "Addy Osmani",
			"email": "addyosmani@gmail.com",
			"url": "https://github.com/addyosmani",
			"avatarURL": "https://avatars1.githubusercontent.com/u/110953?v=3",
			"company": "Google",
			"followers": {
				"totalCount": 23146
			},
			"following": {
				"totalCount": 233
			},
			"repositories": {
				"totalCount": 287
			},
			"price": 23666
		}
	}, {
		"node": {
			"login": "mikolalysenko",
			"name": "Mikola Lysenko",
			"email": "mikolalysenko@gmail.com",
			"url": "https://github.com/mikolalysenko",
			"avatarURL": "https://avatars1.githubusercontent.com/u/231686?v=3",
			"company": "bits cooperative",
			"followers": {
				"totalCount": 1053
			},
			"following": {
				"totalCount": 545
			},
			"repositories": {
				"totalCount": 489
			},
			"price": 2087
		}
	}, {
		"node": {
			"login": "ashleygwilliams",
			"name": "ashley williams",
			"email": "ashley666ashley@gmail.com",
			"url": "https://github.com/ashleygwilliams",
			"avatarURL": "https://avatars3.githubusercontent.com/u/1163554?v=3",
			"company": "@npm",
			"followers": {
				"totalCount": 1528
			},
			"following": {
				"totalCount": 15
			},
			"repositories": {
				"totalCount": 259
			},
			"price": 1802
		}
	}, {
		"node": {
			"login": "vladikoff",
			"name": "Vlad Filippov",
			"email": "github@vf.io",
			"url": "https://github.com/vladikoff",
			"avatarURL": "https://avatars0.githubusercontent.com/u/128755?v=3",
			"company": "",
			"followers": {
				"totalCount": 980
			},
			"following": {
				"totalCount": 148
			},
			"repositories": {
				"totalCount": 380
			},
			"price": 1508
		}
	}, {
		"node": {
			"login": "leobalter",
			"name": "Leo Balter",
			"email": "leonardo.balter@gmail.com",
			"url": "https://github.com/leobalter",
			"avatarURL": "https://avatars0.githubusercontent.com/u/301201?v=3",
			"company": "Bocoup",
			"followers": {
				"totalCount": 592
			},
			"following": {
				"totalCount": 90
			},
			"repositories": {
				"totalCount": 204
			},
			"price": 886
		}
	}, {
		"node": {
			"login": "scottgonzalez",
			"name": "Scott González",
			"email": "scott.gonzalez@gmail.com",
			"url": "https://github.com/scottgonzalez",
			"avatarURL": "https://avatars1.githubusercontent.com/u/141167?v=3",
			"company": "Clipper Magazine",
			"followers": {
				"totalCount": 685
			},
			"following": {
				"totalCount": 0
			},
			"repositories": {
				"totalCount": 195
			},
			"price": 880
		}
	}, {
		"node": {
			"login": "jeffmo",
			"name": "Jeff Morrison",
			"email": "",
			"url": "https://github.com/jeffmo",
			"avatarURL": "https://avatars1.githubusercontent.com/u/498293?v=3",
			"company": "",
			"followers": {
				"totalCount": 803
			},
			"following": {
				"totalCount": 0
			},
			"repositories": {
				"totalCount": 51
			},
			"price": 854
		}
	}, {
		"node": {
			"login": "arthurvr",
			"name": "Arthur Verschaeve",
			"email": "arthur.versch@gmail.com",
			"url": "https://github.com/arthurvr",
			"avatarURL": "https://avatars3.githubusercontent.com/u/6025224?v=3",
			"company": "",
			"followers": {
				"totalCount": 510
			},
			"following": {
				"totalCount": 117
			},
			"repositories": {
				"totalCount": 209
			},
			"price": 836
		}
	}, {
		"node": {
			"login": "raphamorim",
			"name": "Raphael Amorim",
			"email": "rapha850@gmail.com",
			"url": "https://github.com/raphamorim",
			"avatarURL": "https://avatars0.githubusercontent.com/u/3630346?v=3",
			"company": "@globocom ",
			"followers": {
				"totalCount": 491
			},
			"following": {
				"totalCount": 57
			},
			"repositories": {
				"totalCount": 193
			},
			"price": 741
		}
	}, {
		"node": {
			"login": "nacin",
			"name": "Andrew Nacin",
			"email": "",
			"url": "https://github.com/nacin",
			"avatarURL": "https://avatars2.githubusercontent.com/u/272784?v=3",
			"company": "WordPress / The White House",
			"followers": {
				"totalCount": 676
			},
			"following": {
				"totalCount": 0
			},
			"repositories": {
				"totalCount": 35
			},
			"price": 711
		}
	}, {
		"node": {
			"login": "buritica",
			"name": "Juan Pablo Buritica",
			"email": "buritica@gmail.com",
			"url": "https://github.com/buritica",
			"avatarURL": "https://avatars1.githubusercontent.com/u/228120?v=3",
			"company": "@splicers ",
			"followers": {
				"totalCount": 522
			},
			"following": {
				"totalCount": 24
			},
			"repositories": {
				"totalCount": 82
			},
			"price": 628
		}
	}, {
		"node": {
			"login": "timmywil",
			"name": "Timmy Willison",
			"email": "",
			"url": "https://github.com/timmywil",
			"avatarURL": "https://avatars0.githubusercontent.com/u/192451?v=3",
			"company": "@jquery Core Lead, @opentable Senior Engineer",
			"followers": {
				"totalCount": 423
			},
			"following": {
				"totalCount": 22
			},
			"repositories": {
				"totalCount": 124
			},
			"price": 569
		}
	}, {
		"node": {
			"login": "brianloveswords",
			"name": "Brian J Brennan",
			"email": "brianloveswords@gmail.com",
			"url": "https://github.com/brianloveswords",
			"avatarURL": "https://avatars0.githubusercontent.com/u/166258?v=3",
			"company": "Bocoup",
			"followers": {
				"totalCount": 309
			},
			"following": {
				"totalCount": 41
			},
			"repositories": {
				"totalCount": 209
			},
			"price": 559
		}
	}, {
		"node": {
			"login": "dmethvin",
			"name": "Dave Methvin",
			"email": "",
			"url": "https://github.com/dmethvin",
			"avatarURL": "https://avatars1.githubusercontent.com/u/157858?v=3",
			"company": "The Engage Group",
			"followers": {
				"totalCount": 515
			},
			"following": {
				"totalCount": 2
			},
			"repositories": {
				"totalCount": 30
			},
			"price": 547
		}
	}, {
		"node": {
			"login": "mgol",
			"name": "Michał Gołębiowski",
			"email": "m.goleb@gmail.com",
			"url": "https://github.com/mgol",
			"avatarURL": "https://avatars3.githubusercontent.com/u/1758366?v=3",
			"company": "YouGov, jQuery, Angular",
			"followers": {
				"totalCount": 386
			},
			"following": {
				"totalCount": 56
			},
			"repositories": {
				"totalCount": 90
			},
			"price": 532
		}
	}, {
		"node": {
			"login": "csnover",
			"name": "Colin Snover",
			"email": "",
			"url": "https://github.com/csnover",
			"avatarURL": "https://avatars3.githubusercontent.com/u/229244?v=3",
			"company": "",
			"followers": {
				"totalCount": 443
			},
			"following": {
				"totalCount": 0
			},
			"repositories": {
				"totalCount": 52
			},
			"price": 495
		}
	}, {
		"node": {
			"login": "gnarf",
			"name": "Mx Corey Frang",
			"email": "corey@bocoup.com",
			"url": "https://github.com/gnarf",
			"avatarURL": "https://avatars1.githubusercontent.com/u/549355?v=3",
			"company": "Bocoup",
			"followers": {
				"totalCount": 224
			},
			"following": {
				"totalCount": 67
			},
			"repositories": {
				"totalCount": 117
			},
			"price": 408
		}
	}, {
		"node": {
			"login": "Frijol",
			"name": "Kelsey",
			"email": "",
			"url": "https://github.com/Frijol",
			"avatarURL": "https://avatars1.githubusercontent.com/u/454690?v=3",
			"company": "",
			"followers": {
				"totalCount": 244
			},
			"following": {
				"totalCount": 20
			},
			"repositories": {
				"totalCount": 102
			},
			"price": 366
		}
	}, {
		"node": {
			"login": "ajpiano",
			"name": "adam j. sontag",
			"email": "ajpiano@ajpiano.com",
			"url": "https://github.com/ajpiano",
			"avatarURL": "https://avatars3.githubusercontent.com/u/155599?v=3",
			"company": "Bocoup",
			"followers": {
				"totalCount": 305
			},
			"following": {
				"totalCount": 1
			},
			"repositories": {
				"totalCount": 45
			},
			"price": 351
		}
	}, {
		"node": {
			"login": "apsdehal",
			"name": "Amanpreet Singh",
			"email": "me@apsdehal.in",
			"url": "https://github.com/apsdehal",
			"avatarURL": "https://avatars1.githubusercontent.com/u/3616806?v=3",
			"company": "jQuery Foundation, NYU",
			"followers": {
				"totalCount": 178
			},
			"following": {
				"totalCount": 108
			},
			"repositories": {
				"totalCount": 65
			},
			"price": 351
		}
	}, {
		"node": {
			"login": "tjvantoll",
			"name": "TJ VanToll",
			"email": "tj.vantoll@gmail.com",
			"url": "https://github.com/tjvantoll",
			"avatarURL": "https://avatars2.githubusercontent.com/u/544280?v=3",
			"company": "Telerik",
			"followers": {
				"totalCount": 252
			},
			"following": {
				"totalCount": 0
			},
			"repositories": {
				"totalCount": 95
			},
			"price": 347
		}
	}, {
		"node": {
			"login": "mikesherov",
			"name": "Mike Sherov",
			"email": null,
			"url": "https://github.com/mikesherov",
			"avatarURL": "https://avatars2.githubusercontent.com/u/364532?v=3",
			"company": null,
			"followers": {
				"totalCount": 208
			},
			"following": {
				"totalCount": 22
			},
			"repositories": {
				"totalCount": 86
			},
			"price": 316
		}
	}, {
		"node": {
			"login": "Krinkle",
			"name": "Timo Tijhof",
			"email": "krinklemail@gmail.com",
			"url": "https://github.com/Krinkle",
			"avatarURL": "https://avatars0.githubusercontent.com/u/156867?v=3",
			"company": "Wikimedia Foundation",
			"followers": {
				"totalCount": 166
			},
			"following": {
				"totalCount": 0
			},
			"repositories": {
				"totalCount": 132
			},
			"price": 298
		}
	}, {
		"node": {
			"login": "AurelioDeRosa",
			"name": "Aurelio De Rosa",
			"email": "a.derosa@audero.it",
			"url": "https://github.com/AurelioDeRosa",
			"avatarURL": "https://avatars1.githubusercontent.com/u/1430979?v=3",
			"company": "Digital Detox",
			"followers": {
				"totalCount": 250
			},
			"following": {
				"totalCount": 1
			},
			"repositories": {
				"totalCount": 46
			},
			"price": 297
		}
	}, {
		"node": {
			"login": "arschmitz",
			"name": "Alexander Schmitz",
			"email": "arschmitz@gmail.com",
			"url": "https://github.com/arschmitz",
			"avatarURL": "https://avatars2.githubusercontent.com/u/462993?v=3",
			"company": "jQuery Foundation, W3C",
			"followers": {
				"totalCount": 196
			},
			"following": {
				"totalCount": 1
			},
			"repositories": {
				"totalCount": 100
			},
			"price": 297
		}
	}, {
		"node": {
			"login": "tkellen",
			"name": "Tyler Kellen",
			"email": "tyler@sleekcode.net",
			"url": "https://github.com/tkellen",
			"avatarURL": "https://avatars0.githubusercontent.com/u/1004324?v=3",
			"company": "Bocoup",
			"followers": {
				"totalCount": 237
			},
			"following": {
				"totalCount": 1
			},
			"repositories": {
				"totalCount": 54
			},
			"price": 292
		}
	}, {
		"node": {
			"login": "jaubourg",
			"name": "Julian Aubourg",
			"email": "j@ubourg.net",
			"url": "https://github.com/jaubourg",
			"avatarURL": "https://avatars2.githubusercontent.com/u/160354?v=3",
			"company": "Creative Area",
			"followers": {
				"totalCount": 267
			},
			"following": {
				"totalCount": 0
			},
			"repositories": {
				"totalCount": 24
			},
			"price": 291
		}
	}, {
		"node": {
			"login": "ericandrewlewis",
			"name": "Eric Lewis",
			"email": "eric.andrew.lewis@gmail.com",
			"url": "https://github.com/ericandrewlewis",
			"avatarURL": "https://avatars1.githubusercontent.com/u/1087646?v=3",
			"company": "The New York Times",
			"followers": {
				"totalCount": 136
			},
			"following": {
				"totalCount": 10
			},
			"repositories": {
				"totalCount": 141
			},
			"price": 287
		}
	}, {
		"node": {
			"login": "runspired",
			"name": "Chris Thoburn",
			"email": "",
			"url": "https://github.com/runspired",
			"avatarURL": "https://avatars0.githubusercontent.com/u/650309?v=3",
			"company": "",
			"followers": {
				"totalCount": 148
			},
			"following": {
				"totalCount": 44
			},
			"repositories": {
				"totalCount": 86
			},
			"price": 278
		}
	}, {
		"node": {
			"login": "kadamwhite",
			"name": "K.Adam White",
			"email": "",
			"url": "https://github.com/kadamwhite",
			"avatarURL": "https://avatars2.githubusercontent.com/u/442115?v=3",
			"company": "@bocoup",
			"followers": {
				"totalCount": 138
			},
			"following": {
				"totalCount": 17
			},
			"repositories": {
				"totalCount": 122
			},
			"price": 277
		}
	}, {
		"node": {
			"login": "boazsender",
			"name": "Boaz",
			"email": "boaz@bocoup.com",
			"url": "https://github.com/boazsender",
			"avatarURL": "https://avatars0.githubusercontent.com/u/122117?v=3",
			"company": null,
			"followers": {
				"totalCount": 198
			},
			"following": {
				"totalCount": 16
			},
			"repositories": {
				"totalCount": 62
			},
			"price": 276
		}
	}, {
		"node": {
			"login": "kborchers",
			"name": "Kris Borchers",
			"email": "kris.borchers@gmail.com",
			"url": "https://github.com/kborchers",
			"avatarURL": "https://avatars3.githubusercontent.com/u/282468?v=3",
			"company": "",
			"followers": {
				"totalCount": 93
			},
			"following": {
				"totalCount": 19
			},
			"repositories": {
				"totalCount": 155
			},
			"price": 267
		}
	}, {
		"node": {
			"login": "agcolom",
			"name": "Anne-Gaelle Colom",
			"email": "coloma@westminster.ac.uk",
			"url": "https://github.com/agcolom",
			"avatarURL": "https://avatars0.githubusercontent.com/u/688413?v=3",
			"company": "University of Westminster",
			"followers": {
				"totalCount": 162
			},
			"following": {
				"totalCount": 18
			},
			"repositories": {
				"totalCount": 82
			},
			"price": 262
		}
	}, {
		"node": {
			"login": "rxaviers",
			"name": "Rafael Xavier de Souza",
			"email": "",
			"url": "https://github.com/rxaviers",
			"avatarURL": "https://avatars2.githubusercontent.com/u/967155?v=3",
			"company": "PayPal",
			"followers": {
				"totalCount": 142
			},
			"following": {
				"totalCount": 15
			},
			"repositories": {
				"totalCount": 101
			},
			"price": 258
		}
	}, {
		"node": {
			"login": "JamesMGreene",
			"name": "James M. Greene",
			"email": "james.m.greene@gmail.com",
			"url": "https://github.com/JamesMGreene",
			"avatarURL": "https://avatars1.githubusercontent.com/u/417751?v=3",
			"company": "Viavi Solutions",
			"followers": {
				"totalCount": 131
			},
			"following": {
				"totalCount": 30
			},
			"repositories": {
				"totalCount": 87
			},
			"price": 248
		}
	}, {
		"node": {
			"login": "markelog",
			"name": "Oleg Gaidarenko",
			"email": "markelog@gmail.com",
			"url": "https://github.com/markelog",
			"avatarURL": "https://avatars3.githubusercontent.com/u/945528?v=3",
			"company": "",
			"followers": {
				"totalCount": 176
			},
			"following": {
				"totalCount": 5
			},
			"repositories": {
				"totalCount": 67
			},
			"price": 248
		}
	}, {
		"node": {
			"login": "johnkpaul",
			"name": "John K. Paul",
			"email": null,
			"url": "https://github.com/johnkpaul",
			"avatarURL": "https://avatars2.githubusercontent.com/u/475621?v=3",
			"company": null,
			"followers": {
				"totalCount": 122
			},
			"following": {
				"totalCount": 16
			},
			"repositories": {
				"totalCount": 98
			},
			"price": 236
		}
	}, {
		"node": {
			"login": "jiahuang",
			"name": "Jia Huang",
			"email": "jialiya.huang0@gmail.com",
			"url": "https://github.com/jiahuang",
			"avatarURL": "https://avatars0.githubusercontent.com/u/577629?v=3",
			"company": "Technical Machine",
			"followers": {
				"totalCount": 125
			},
			"following": {
				"totalCount": 44
			},
			"repositories": {
				"totalCount": 40
			},
			"price": 209
		}
	}, {
		"node": {
			"login": "danheberden",
			"name": "Dan Heberden",
			"email": "",
			"url": "https://github.com/danheberden",
			"avatarURL": "https://avatars0.githubusercontent.com/u/307962?v=3",
			"company": "Bazaarvoice",
			"followers": {
				"totalCount": 145
			},
			"following": {
				"totalCount": 2
			},
			"repositories": {
				"totalCount": 57
			},
			"price": 204
		}
	}, {
		"node": {
			"login": "fnagel",
			"name": "Felix Nagel",
			"email": "info@felixnagel.com",
			"url": "https://github.com/fnagel",
			"avatarURL": "https://avatars2.githubusercontent.com/u/116824?v=3",
			"company": "Freelancer",
			"followers": {
				"totalCount": 124
			},
			"following": {
				"totalCount": 33
			},
			"repositories": {
				"totalCount": 30
			},
			"price": 187
		}
	}, {
		"node": {
			"login": "RedWolves",
			"name": "Ralph Whitbeck",
			"email": "ralph.whitbeck@gmail.com",
			"url": "https://github.com/RedWolves",
			"avatarURL": "https://avatars1.githubusercontent.com/u/129322?v=3",
			"company": "Atlassian",
			"followers": {
				"totalCount": 110
			},
			"following": {
				"totalCount": 38
			},
			"repositories": {
				"totalCount": 36
			},
			"price": 184
		}
	}, {
		"node": {
			"login": "aulvi",
			"name": "Adam Ulvi",
			"email": "",
			"url": "https://github.com/aulvi",
			"avatarURL": "https://avatars1.githubusercontent.com/u/3950946?v=3",
			"company": "",
			"followers": {
				"totalCount": 97
			},
			"following": {
				"totalCount": 20
			},
			"repositories": {
				"totalCount": 49
			},
			"price": 166
		}
	}, {
		"node": {
			"login": "gseguin",
			"name": "Ghislain Seguin",
			"email": "",
			"url": "https://github.com/gseguin",
			"avatarURL": "https://avatars1.githubusercontent.com/u/373923?v=3",
			"company": "Nest",
			"followers": {
				"totalCount": 97
			},
			"following": {
				"totalCount": 14
			},
			"repositories": {
				"totalCount": 48
			},
			"price": 159
		}
	}, {
		"node": {
			"login": "HipsterBrown",
			"name": "Nick Hehr",
			"email": "headhipster@hipsterbrown.com",
			"url": "https://github.com/HipsterBrown",
			"avatarURL": "https://avatars0.githubusercontent.com/u/3051193?v=3",
			"company": "@namely ",
			"followers": {
				"totalCount": 50
			},
			"following": {
				"totalCount": 17
			},
			"repositories": {
				"totalCount": 91
			},
			"price": 158
		}
	}, {
		"node": {
			"login": "johnnyman727",
			"name": "Jon",
			"email": "johnnyman727@gmail.com",
			"url": "https://github.com/johnnyman727",
			"avatarURL": "https://avatars0.githubusercontent.com/u/432909?v=3",
			"company": "Technical Machine",
			"followers": {
				"totalCount": 79
			},
			"following": {
				"totalCount": 29
			},
			"repositories": {
				"totalCount": 44
			},
			"price": 152
		}
	}, {
		"node": {
			"login": "copasetickid",
			"name": "Rushaine McBean",
			"email": "rushaine.mcbean@gmail.com",
			"url": "https://github.com/copasetickid",
			"avatarURL": "https://avatars2.githubusercontent.com/u/892365?v=3",
			"company": null,
			"followers": {
				"totalCount": 67
			},
			"following": {
				"totalCount": 17
			},
			"repositories": {
				"totalCount": 67
			},
			"price": 151
		}
	}, {
		"node": {
			"login": "gibson042",
			"name": "Richard Gibson",
			"email": "",
			"url": "https://github.com/gibson042",
			"avatarURL": "https://avatars0.githubusercontent.com/u/1199584?v=3",
			"company": "Architect at Dyn; jQuery core team & Sizzle lead",
			"followers": {
				"totalCount": 98
			},
			"following": {
				"totalCount": 0
			},
			"repositories": {
				"totalCount": 46
			},
			"price": 144
		}
	}, {
		"node": {
			"login": "isaacdurazo",
			"name": "Isaac Durazo",
			"email": "",
			"url": "https://github.com/isaacdurazo",
			"avatarURL": "https://avatars2.githubusercontent.com/u/1379244?v=3",
			"company": "Bocoup.com",
			"followers": {
				"totalCount": 74
			},
			"following": {
				"totalCount": 30
			},
			"repositories": {
				"totalCount": 35
			},
			"price": 139
		}
	}, {
		"node": {
			"login": "dmzza",
			"name": "David Mazza",
			"email": "",
			"url": "https://github.com/dmzza",
			"avatarURL": "https://avatars3.githubusercontent.com/u/120893?v=3",
			"company": "",
			"followers": {
				"totalCount": 20
			},
			"following": {
				"totalCount": 45
			},
			"repositories": {
				"totalCount": 73
			},
			"price": 138
		}
	}, {
		"node": {
			"login": "chrislea",
			"name": "Chris Lea",
			"email": "chris.lea@gmail.com",
			"url": "https://github.com/chrislea",
			"avatarURL": "https://avatars2.githubusercontent.com/u/115710?v=3",
			"company": "NodeSource",
			"followers": {
				"totalCount": 111
			},
			"following": {
				"totalCount": 6
			},
			"repositories": {
				"totalCount": 18
			},
			"price": 135
		}
	}, {
		"node": {
			"login": "ikarienator",
			"name": "Bei Zhang - Ikarienator",
			"email": "",
			"url": "https://github.com/ikarienator",
			"avatarURL": "https://avatars1.githubusercontent.com/u/1472048?v=3",
			"company": "Shape Security",
			"followers": {
				"totalCount": 48
			},
			"following": {
				"totalCount": 30
			},
			"repositories": {
				"totalCount": 54
			},
			"price": 132
		}
	}, {
		"node": {
			"login": "ryanneufeld",
			"name": "Ryan Neufeld",
			"email": "ryan@neucode.org",
			"url": "https://github.com/ryanneufeld",
			"avatarURL": "https://avatars2.githubusercontent.com/u/585350?v=3",
			"company": null,
			"followers": {
				"totalCount": 42
			},
			"following": {
				"totalCount": 9
			},
			"repositories": {
				"totalCount": 81
			},
			"price": 132
		}
	}, {
		"node": {
			"login": "jaspermdegroot",
			"name": "Jasper de Groot",
			"email": "",
			"url": "https://github.com/jaspermdegroot",
			"avatarURL": "https://avatars3.githubusercontent.com/u/1296793?v=3",
			"company": "Self-employed Web Developer & Designer",
			"followers": {
				"totalCount": 104
			},
			"following": {
				"totalCount": 17
			},
			"repositories": {
				"totalCount": 6
			},
			"price": 127
		}
	}, {
		"node": {
			"login": "LizaLemons",
			"name": "Liza Ramo",
			"email": "",
			"url": "https://github.com/LizaLemons",
			"avatarURL": "https://avatars3.githubusercontent.com/u/7459417?v=3",
			"company": "",
			"followers": {
				"totalCount": 38
			},
			"following": {
				"totalCount": 30
			},
			"repositories": {
				"totalCount": 50
			},
			"price": 118
		}
	}, {
		"node": {
			"login": "trentmwillis",
			"name": "Trent Willis",
			"email": "trentmwillis@gmail.com",
			"url": "https://github.com/trentmwillis",
			"avatarURL": "https://avatars1.githubusercontent.com/u/3526753?v=3",
			"company": "LinkedIn",
			"followers": {
				"totalCount": 38
			},
			"following": {
				"totalCount": 5
			},
			"repositories": {
				"totalCount": 74
			},
			"price": 117
		}
	}, {
		"node": {
			"login": "MattSurabian",
			"name": "Matthew Surabian",
			"email": "matt@mattsurabian.com",
			"url": "https://github.com/MattSurabian",
			"avatarURL": "https://avatars1.githubusercontent.com/u/1134260?v=3",
			"company": "@bocoup ",
			"followers": {
				"totalCount": 56
			},
			"following": {
				"totalCount": 18
			},
			"repositories": {
				"totalCount": 39
			},
			"price": 113
		}
	}, {
		"node": {
			"login": "flaki",
			"name": "István Szmozsánszky",
			"email": "git@flaki.hu",
			"url": "https://github.com/flaki",
			"avatarURL": "https://avatars3.githubusercontent.com/u/2089432?v=3",
			"company": "",
			"followers": {
				"totalCount": 28
			},
			"following": {
				"totalCount": 2
			},
			"repositories": {
				"totalCount": 81
			},
			"price": 111
		}
	}, {
		"node": {
			"login": "geekman-rohit",
			"name": "Rohit Mulange",
			"email": "rohit@rohit.codes",
			"url": "https://github.com/geekman-rohit",
			"avatarURL": "https://avatars2.githubusercontent.com/u/7365362?v=3",
			"company": "",
			"followers": {
				"totalCount": 46
			},
			"following": {
				"totalCount": 28
			},
			"repositories": {
				"totalCount": 24
			},
			"price": 98
		}
	}, {
		"node": {
			"login": "patriciarealini",
			"name": "Patricia Realini",
			"email": "",
			"url": "https://github.com/patriciarealini",
			"avatarURL": "https://avatars2.githubusercontent.com/u/7608497?v=3",
			"company": "@bustlelabs ",
			"followers": {
				"totalCount": 36
			},
			"following": {
				"totalCount": 30
			},
			"repositories": {
				"totalCount": 19
			},
			"price": 85
		}
	}, {
		"node": {
			"login": "clarkbox",
			"name": "Clark A",
			"email": "clarka@gmail.com",
			"url": "https://github.com/clarkbox",
			"avatarURL": "https://avatars2.githubusercontent.com/u/359375?v=3",
			"company": null,
			"followers": {
				"totalCount": 54
			},
			"following": {
				"totalCount": 9
			},
			"repositories": {
				"totalCount": 22
			},
			"price": 85
		}
	}, {
		"node": {
			"login": "gabrielschulhof",
			"name": "Gabriel \"_|Nix|_\" Schulhof",
			"email": "gabriel.schulhof@intel.com",
			"url": "https://github.com/gabrielschulhof",
			"avatarURL": "https://avatars1.githubusercontent.com/u/976081?v=3",
			"company": "Intel Finland Oy",
			"followers": {
				"totalCount": 35
			},
			"following": {
				"totalCount": 0
			},
			"repositories": {
				"totalCount": 42
			},
			"price": 77
		}
	}, {
		"node": {
			"login": "anamariasosam",
			"name": "Ana María",
			"email": "anamariasosam@gmail.com",
			"url": "https://github.com/anamariasosam",
			"avatarURL": "https://avatars2.githubusercontent.com/u/2703269?v=3",
			"company": "",
			"followers": {
				"totalCount": 26
			},
			"following": {
				"totalCount": 10
			},
			"repositories": {
				"totalCount": 40
			},
			"price": 76
		}
	}, {
		"node": {
			"login": "SelinaMusuta",
			"name": "Selina Musuta",
			"email": "selina@codeforprogress.org",
			"url": "https://github.com/SelinaMusuta",
			"avatarURL": "https://avatars3.githubusercontent.com/u/6758402?v=3",
			"company": "Code for Progress",
			"followers": {
				"totalCount": 22
			},
			"following": {
				"totalCount": 19
			},
			"repositories": {
				"totalCount": 32
			},
			"price": 73
		}
	}, {
		"node": {
			"login": "RussellBradley",
			"name": "Russell Bradley",
			"email": "me@russellbradley.com",
			"url": "https://github.com/RussellBradley",
			"avatarURL": "https://avatars0.githubusercontent.com/u/2488791?v=3",
			"company": "Airtime",
			"followers": {
				"totalCount": 34
			},
			"following": {
				"totalCount": 21
			},
			"repositories": {
				"totalCount": 18
			},
			"price": 73
		}
	}, {
		"node": {
			"login": "n7best",
			"name": "n7best",
			"email": "n7best@gmail.com",
			"url": "https://github.com/n7best",
			"avatarURL": "https://avatars3.githubusercontent.com/u/7037381?v=3",
			"company": "",
			"followers": {
				"totalCount": 31
			},
			"following": {
				"totalCount": 2
			},
			"repositories": {
				"totalCount": 38
			},
			"price": 71
		}
	}, {
		"node": {
			"login": "pbunsee",
			"name": "Pranesha Bunsee",
			"email": "",
			"url": "https://github.com/pbunsee",
			"avatarURL": "https://avatars3.githubusercontent.com/u/12846621?v=3",
			"company": "",
			"followers": {
				"totalCount": 10
			},
			"following": {
				"totalCount": 25
			},
			"repositories": {
				"totalCount": 35
			},
			"price": 70
		}
	}, {
		"node": {
			"login": "adrocknaphobia",
			"name": "Adam Lehman",
			"email": "",
			"url": "https://github.com/adrocknaphobia",
			"avatarURL": "https://avatars1.githubusercontent.com/u/1197545?v=3",
			"company": "@adobe ",
			"followers": {
				"totalCount": 44
			},
			"following": {
				"totalCount": 8
			},
			"repositories": {
				"totalCount": 13
			},
			"price": 65
		}
	}, {
		"node": {
			"login": "Queeniebee",
			"name": "",
			"email": "",
			"url": "https://github.com/Queeniebee",
			"avatarURL": "https://avatars0.githubusercontent.com/u/1273608?v=3",
			"company": "",
			"followers": {
				"totalCount": 7
			},
			"following": {
				"totalCount": 7
			},
			"repositories": {
				"totalCount": 50
			},
			"price": 64
		}
	}, {
		"node": {
			"login": "cgack",
			"name": "Cory Gackenheimer",
			"email": "",
			"url": "https://github.com/cgack",
			"avatarURL": "https://avatars1.githubusercontent.com/u/688148?v=3",
			"company": "Healthx",
			"followers": {
				"totalCount": 19
			},
			"following": {
				"totalCount": 1
			},
			"repositories": {
				"totalCount": 40
			},
			"price": 60
		}
	}, {
		"node": {
			"login": "angryjenkins",
			"name": "Matthew N. Martin",
			"email": "matt@angryjenkins.com",
			"url": "https://github.com/angryjenkins",
			"avatarURL": "https://avatars2.githubusercontent.com/u/14875183?v=3",
			"company": "",
			"followers": {
				"totalCount": 6
			},
			"following": {
				"totalCount": 7
			},
			"repositories": {
				"totalCount": 43
			},
			"price": 56
		}
	}, {
		"node": {
			"login": "alexrqs",
			"name": "Alexander",
			"email": "",
			"url": "https://github.com/alexrqs",
			"avatarURL": "https://avatars3.githubusercontent.com/u/1099589?v=3",
			"company": "",
			"followers": {
				"totalCount": 37
			},
			"following": {
				"totalCount": 4
			},
			"repositories": {
				"totalCount": 14
			},
			"price": 55
		}
	}, {
		"node": {
			"login": "platinumazure",
			"name": "Kevin Partington",
			"email": "platinum.azure@kernelpanicstudios.com",
			"url": "https://github.com/platinumazure",
			"avatarURL": "https://avatars3.githubusercontent.com/u/284282?v=3",
			"company": "",
			"followers": {
				"totalCount": 15
			},
			"following": {
				"totalCount": 7
			},
			"repositories": {
				"totalCount": 33
			},
			"price": 55
		}
	}, {
		"node": {
			"login": "tekd",
			"name": "Denny Tek",
			"email": "",
			"url": "https://github.com/tekd",
			"avatarURL": "https://avatars1.githubusercontent.com/u/9205941?v=3",
			"company": "",
			"followers": {
				"totalCount": 5
			},
			"following": {
				"totalCount": 4
			},
			"repositories": {
				"totalCount": 43
			},
			"price": 52
		}
	}, {
		"node": {
			"login": "theutahkate",
			"name": "Utah K Newman",
			"email": "utah.kate.newman@gmail.com",
			"url": "https://github.com/theutahkate",
			"avatarURL": "https://avatars1.githubusercontent.com/u/5475551?v=3",
			"company": "",
			"followers": {
				"totalCount": 11
			},
			"following": {
				"totalCount": 4
			},
			"repositories": {
				"totalCount": 35
			},
			"price": 50
		}
	}, {
		"node": {
			"login": "rubymorillo",
			"name": "Stephanie Morillo",
			"email": "",
			"url": "https://github.com/rubymorillo",
			"avatarURL": "https://avatars3.githubusercontent.com/u/3386562?v=3",
			"company": "",
			"followers": {
				"totalCount": 23
			},
			"following": {
				"totalCount": 1
			},
			"repositories": {
				"totalCount": 24
			},
			"price": 48
		}
	}, {
		"node": {
			"login": "kimcoop",
			"name": null,
			"email": null,
			"url": "https://github.com/kimcoop",
			"avatarURL": "https://avatars0.githubusercontent.com/u/1010665?v=3",
			"company": null,
			"followers": {
				"totalCount": 12
			},
			"following": {
				"totalCount": 4
			},
			"repositories": {
				"totalCount": 31
			},
			"price": 47
		}
	}, {
		"node": {
			"login": "bethge",
			"name": "Marius Stefan Bethge",
			"email": "marius.bethge@gmail.com",
			"url": "https://github.com/bethge",
			"avatarURL": "https://avatars0.githubusercontent.com/u/522575?v=3",
			"company": "Albert-Ludwigs-University Freiburg",
			"followers": {
				"totalCount": 34
			},
			"following": {
				"totalCount": 6
			},
			"repositories": {
				"totalCount": 7
			},
			"price": 47
		}
	}, {
		"node": {
			"login": "jorydotcom",
			"name": "Jory Burson",
			"email": "jory@bocoup.com",
			"url": "https://github.com/jorydotcom",
			"avatarURL": "https://avatars3.githubusercontent.com/u/1355039?v=3",
			"company": "Bocoup",
			"followers": {
				"totalCount": 27
			},
			"following": {
				"totalCount": 7
			},
			"repositories": {
				"totalCount": 10
			},
			"price": 44
		}
	}, {
		"node": {
			"login": "arghgr",
			"name": "bianca c",
			"email": "",
			"url": "https://github.com/arghgr",
			"avatarURL": "https://avatars2.githubusercontent.com/u/3230717?v=3",
			"company": "",
			"followers": {
				"totalCount": 7
			},
			"following": {
				"totalCount": 17
			},
			"repositories": {
				"totalCount": 20
			},
			"price": 44
		}
	}, {
		"node": {
			"login": "rjollos",
			"name": "Ryan J Ollos",
			"email": "ryan.j.ollos@gmail.com",
			"url": "https://github.com/rjollos",
			"avatarURL": "https://avatars0.githubusercontent.com/u/1152089?v=3",
			"company": "Verasonics, Inc.",
			"followers": {
				"totalCount": 21
			},
			"following": {
				"totalCount": 7
			},
			"repositories": {
				"totalCount": 12
			},
			"price": 40
		}
	}, {
		"node": {
			"login": "joelgkinney",
			"name": "Joel G. Kinney",
			"email": "joel@fortpointlegal.com",
			"url": "https://github.com/joelgkinney",
			"avatarURL": "https://avatars0.githubusercontent.com/u/1663719?v=3",
			"company": "Fort Point Legal",
			"followers": {
				"totalCount": 12
			},
			"following": {
				"totalCount": 24
			},
			"repositories": {
				"totalCount": 3
			},
			"price": 39
		}
	}, {
		"node": {
			"login": "taraadiseshan",
			"name": "Tara Adiseshan",
			"email": "",
			"url": "https://github.com/taraadiseshan",
			"avatarURL": "https://avatars2.githubusercontent.com/u/2432062?v=3",
			"company": "",
			"followers": {
				"totalCount": 6
			},
			"following": {
				"totalCount": 7
			},
			"repositories": {
				"totalCount": 18
			},
			"price": 31
		}
	}, {
		"node": {
			"login": "lady3bean",
			"name": "Hawley",
			"email": "lady3bean@users.noreply.github.com",
			"url": "https://github.com/lady3bean",
			"avatarURL": "https://avatars1.githubusercontent.com/u/10011287?v=3",
			"company": "@Bernie-2016 ",
			"followers": {
				"totalCount": 7
			},
			"following": {
				"totalCount": 6
			},
			"repositories": {
				"totalCount": 16
			},
			"price": 29
		}
	}, {
		"node": {
			"login": "aspaceforsound",
			"name": "Rena Anakwe",
			"email": "rena@aspaceforsound.com",
			"url": "https://github.com/aspaceforsound",
			"avatarURL": "https://avatars3.githubusercontent.com/u/5399917?v=3",
			"company": "A Space for Sound LLC",
			"followers": {
				"totalCount": 6
			},
			"following": {
				"totalCount": 9
			},
			"repositories": {
				"totalCount": 14
			},
			"price": 29
		}
	}, {
		"node": {
			"login": "sarahduve",
			"name": "Sarah Duve",
			"email": "",
			"url": "https://github.com/sarahduve",
			"avatarURL": "https://avatars1.githubusercontent.com/u/2575390?v=3",
			"company": "",
			"followers": {
				"totalCount": 11
			},
			"following": {
				"totalCount": 1
			},
			"repositories": {
				"totalCount": 11
			},
			"price": 23
		}
	}, {
		"node": {
			"login": "danielle-b",
			"name": "Danielle Brantley",
			"email": "",
			"url": "https://github.com/danielle-b",
			"avatarURL": "https://avatars1.githubusercontent.com/u/10361140?v=3",
			"company": "",
			"followers": {
				"totalCount": 1
			},
			"following": {
				"totalCount": 0
			},
			"repositories": {
				"totalCount": 22
			},
			"price": 23
		}
	}, {
		"node": {
			"login": "bentonam",
			"name": "Aaron",
			"email": "",
			"url": "https://github.com/bentonam",
			"avatarURL": "https://avatars3.githubusercontent.com/u/442745?v=3",
			"company": "",
			"followers": {
				"totalCount": 9
			},
			"following": {
				"totalCount": 1
			},
			"repositories": {
				"totalCount": 11
			},
			"price": 21
		}
	}, {
		"node": {
			"login": "theaemarie",
			"name": "Amy Etheredge",
			"email": "amy.etheredge@gmail.com",
			"url": "https://github.com/theaemarie",
			"avatarURL": "https://avatars3.githubusercontent.com/u/10343400?v=3",
			"company": "",
			"followers": {
				"totalCount": 5
			},
			"following": {
				"totalCount": 3
			},
			"repositories": {
				"totalCount": 11
			},
			"price": 19
		}
	}, {
		"node": {
			"login": "rdugue",
			"name": "Ralph Dugue",
			"email": "",
			"url": "https://github.com/rdugue",
			"avatarURL": "https://avatars2.githubusercontent.com/u/5379112?v=3",
			"company": "",
			"followers": {
				"totalCount": 3
			},
			"following": {
				"totalCount": 4
			},
			"repositories": {
				"totalCount": 10
			},
			"price": 17
		}
	}, {
		"node": {
			"login": "aricearice",
			"name": "Alice Yang",
			"email": "alice.yang@me.com",
			"url": "https://github.com/aricearice",
			"avatarURL": "https://avatars3.githubusercontent.com/u/6108994?v=3",
			"company": "",
			"followers": {
				"totalCount": 4
			},
			"following": {
				"totalCount": 4
			},
			"repositories": {
				"totalCount": 8
			},
			"price": 16
		}
	}, {
		"node": {
			"login": "snewcomb",
			"name": null,
			"email": null,
			"url": "https://github.com/snewcomb",
			"avatarURL": "https://avatars0.githubusercontent.com/u/880104?v=3",
			"company": null,
			"followers": {
				"totalCount": 14
			},
			"following": {
				"totalCount": 1
			},
			"repositories": {
				"totalCount": 1
			},
			"price": 16
		}
	}, {
		"node": {
			"login": "andybs",
			"name": "Andy Smith",
			"email": "",
			"url": "https://github.com/andybs",
			"avatarURL": "https://avatars1.githubusercontent.com/u/423690?v=3",
			"company": "IBM",
			"followers": {
				"totalCount": 2
			},
			"following": {
				"totalCount": 1
			},
			"repositories": {
				"totalCount": 11
			},
			"price": 14
		}
	}, {
		"node": {
			"login": "StevenAyr",
			"name": "Steven Ayr",
			"email": "steve@fortpointlegal.com",
			"url": "https://github.com/StevenAyr",
			"avatarURL": "https://avatars2.githubusercontent.com/u/6910856?v=3",
			"company": "Fort Point Legal PC",
			"followers": {
				"totalCount": 3
			},
			"following": {
				"totalCount": 1
			},
			"repositories": {
				"totalCount": 6
			},
			"price": 10
		}
	}, {
		"node": {
			"login": "JacquesPerrault",
			"name": "Jacques Perrault",
			"email": "jacques_perrault@us.ibm.com",
			"url": "https://github.com/JacquesPerrault",
			"avatarURL": "https://avatars1.githubusercontent.com/u/521638?v=3",
			"company": "IBM",
			"followers": {
				"totalCount": 2
			},
			"following": {
				"totalCount": 0
			},
			"repositories": {
				"totalCount": 7
			},
			"price": 9
		}
	}, {
		"node": {
			"login": "jquerybot",
			"name": null,
			"email": null,
			"url": "https://github.com/jquerybot",
			"avatarURL": "https://avatars3.githubusercontent.com/u/2255191?v=3",
			"company": null,
			"followers": {
				"totalCount": 5
			},
			"following": {
				"totalCount": 0
			},
			"repositories": {
				"totalCount": 0
			},
			"price": 5
		}
	}, {
		"node": {
			"login": "subaha",
			"name": "",
			"email": "",
			"url": "https://github.com/subaha",
			"avatarURL": "https://avatars0.githubusercontent.com/u/7139681?v=3",
			"company": "",
			"followers": {
				"totalCount": 0
			},
			"following": {
				"totalCount": 0
			},
			"repositories": {
				"totalCount": 3
			},
			"price": 3
		}
	}, {
		"node": {
			"login": "ericladd",
			"name": null,
			"email": null,
			"url": "https://github.com/ericladd",
			"avatarURL": "https://avatars2.githubusercontent.com/u/2287906?v=3",
			"company": null,
			"followers": {
				"totalCount": 0
			},
			"following": {
				"totalCount": 0
			},
			"repositories": {
				"totalCount": 2
			},
			"price": 2
		}
	}, {
		"node": {
			"login": "JSFOwner",
			"name": "JS Foundation GitHub Owner",
			"email": "",
			"url": "https://github.com/JSFOwner",
			"avatarURL": "https://avatars2.githubusercontent.com/u/17435044?v=3",
			"company": "@JSFoundation",
			"followers": {
				"totalCount": 1
			},
			"following": {
				"totalCount": 0
			},
			"repositories": {
				"totalCount": 0
			},
			"price": 1
		}
	}, {
		"node": {
			"login": "jqdeploy",
			"name": null,
			"email": null,
			"url": "https://github.com/jqdeploy",
			"avatarURL": "https://avatars1.githubusercontent.com/u/453259?v=3",
			"company": null,
			"followers": {
				"totalCount": 0
			},
			"following": {
				"totalCount": 0
			},
			"repositories": {
				"totalCount": 0
			},
			"price": 0
		}
	}, {
		"node": {
			"login": "Vaygh",
			"name": "Darius McCaskey",
			"email": "",
			"url": "https://github.com/Vaygh",
			"avatarURL": "https://avatars3.githubusercontent.com/u/14252794?v=3",
			"company": "",
			"followers": {
				"totalCount": 0
			},
			"following": {
				"totalCount": 0
			},
			"repositories": {
				"totalCount": 0
			},
			"price": 0
		}
	}];

	router.get('/', function (req, res) {
		var cachedDevs = JSON.parse(_memoryCache2.default.get('devs'));
		if (!cachedDevs || !cachedDevs.length) {
			return res.status(200).json(items);
			// return res.status(404).json({error: 'developers not found'})
		}

		res.json(cachedDevs);
	});

	exports.default = router;

/***/ },
/* 41 */
/***/ function(module, exports) {

	module.exports = require("memory-cache");

/***/ },
/* 42 */
/***/ function(module, exports) {

	module.exports = require("request");

/***/ },
/* 43 */
/***/ function(module, exports) {

	module.exports = require("react-dom/server");

/***/ },
/* 44 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	exports.default = function (_ref) {
	  var body = _ref.body,
	      title = _ref.title;

	  return "\n    <!DOCTYPE html>\n    <html>\n      <head>\n        <title>" + title + "</title>\n        <meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">\n        <link rel=\"stylesheet\" href=\"assets/stylesheet/base.css\">\n      </head>\n      <body>\n        <div id=\"root\">" + body + "</div>\n      </body>\n      <script src=\"assets/bundle.js\"></script>\n    </html>\n  ";
	};

/***/ },
/* 45 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	/*
	 * Config environments.
	 */
	var Config = {};

	/*
	 * Set current environment.
	 */
	Config.env = process.env['NODE_ENV'] || 'development';

	/*
	 * Set specific time definitions.
	 */
	Config.time = {
	  hour: 3600000
	};

	/*
	 * Environment: Development.
	 */
	Config.development = {
	  name: 'development',
	  mongo: 'mongodb://localhost/shop',
	  defaultUrl: 'http://localhost',
	  serverPort: 3000,
	  logNamespace: 'development',
	  log4js: {
	    console: {
	      type: 'console'
	    },
	    file: {
	      type: 'file',
	      filename: 'development.log',
	      maxLogSize: 20480,
	      backups: 3,
	      pollInterval: 15
	    }
	  }
	};

	/*
	 * Environment: Production.
	 */
	Config.production = {
	  name: 'production',
	  mongo: process.env['MONGODB_URI'],
	  defaultUrl: 'http://localhost',
	  serverPort: 3000,
	  logNamespace: 'production',
	  log4js: {
	    console: {
	      type: 'console'
	    },
	    file: {
	      type: 'file',
	      filename: 'production.log',
	      maxLogSize: 20480,
	      backups: 6,
	      pollInterval: 15
	    }
	  }
	};

	var config = Config[Config.env];
	exports.default = config;

/***/ },
/* 46 */
/***/ function(module, exports) {

	module.exports = require("@risingstack/graffiti");

/***/ },
/* 47 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.schema = undefined;

	var _Cart = __webpack_require__(38);

	var _Cart2 = _interopRequireDefault(_Cart);

	var _graffitiMongoose = __webpack_require__(48);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var options = {
	  mutation: false, // mutation fields can be disabled
	  allowMongoIDMutation: false // mutation of mongo _id can be enabled
	};

	var schema = exports.schema = (0, _graffitiMongoose.getSchema)([_Cart2.default], options);

/***/ },
/* 48 */
/***/ function(module, exports) {

	module.exports = require("@risingstack/graffiti-mongoose");

/***/ }
/******/ ]);