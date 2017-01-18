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

	var _bodyParser = __webpack_require__(36);

	var _routes = __webpack_require__(37);

	var _routes2 = _interopRequireDefault(_routes);

	var _memoryCache = __webpack_require__(43);

	var _memoryCache2 = _interopRequireDefault(_memoryCache);

	var _react = __webpack_require__(2);

	var _react2 = _interopRequireDefault(_react);

	var _request = __webpack_require__(44);

	var _request2 = _interopRequireDefault(_request);

	var _express = __webpack_require__(39);

	var _express2 = _interopRequireDefault(_express);

	var _server = __webpack_require__(45);

	var _template = __webpack_require__(46);

	var _template2 = _interopRequireDefault(_template);

	var _config = __webpack_require__(47);

	var _config2 = _interopRequireDefault(_config);

	var _mongoose = __webpack_require__(41);

	var _mongoose2 = _interopRequireDefault(_mongoose);

	var _graffiti = __webpack_require__(48);

	var _graffiti2 = _interopRequireDefault(_graffiti);

	var _schemas = __webpack_require__(49);

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
			edges.sort(function (prev, coming) {
				return coming.node.price - prev.node.price;
			});

			return JSON.stringify(edges);
		};
		var requestConfig = {
			url: 'https://api.github.com/graphql',
			method: 'POST',
			headers: {
				'User-Agent': 'Awesome-Octocat'
			},
			auth: {
				bearer: githubToken
			},
			body: JSON.stringify({
				query: 'query($organizationLogin:String!) {\n\t\t\t\torganization(login: $organizationLogin) {\n\t\t\t\t\tmembers(last: 100) {\n\t\t\t\t\t\tedges {\n\t\t\t\t\t\t\tnode {\n\t\t\t\t\t\t\t\tlogin,\n\t\t\t\t\t\t\t\tname,\n\t\t\t\t\t\t\t\temail,\n\t\t\t\t\t\t\t\turl,\n\t\t\t\t\t\t\t\tavatarURL,\n\t\t\t\t\t\t\t\tcompany,\n\t\t\t\t\t\t\t\tfollowers {\n\t\t\t\t\t\t\t\t\ttotalCount\n\t\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\t\tfollowing {\n\t\t\t\t\t\t\t\t\ttotalCount\n\t\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\t\trepositories {\n\t\t\t\t\t\t\t\t\ttotalCount\n\t\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}',
				variables: { 'organizationLogin': 'jquery' }
			})
		};
		(0, _request2.default)(requestConfig, function (err, result, body) {
			if (!err && result.statusCode === 200) {
				body = JSON.parse(body);
				if (body.data && body.data.organization) _memoryCache2.default.put('devs', normalizeData(body.data.organization), 3600000);
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

	var _reactTapEventPlugin = __webpack_require__(34);

	var _reactTapEventPlugin2 = _interopRequireDefault(_reactTapEventPlugin);

	var _getMuiTheme = __webpack_require__(35);

	var _getMuiTheme2 = _interopRequireDefault(_getMuiTheme);

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

	(0, _reactTapEventPlugin2.default)();

	var App = function (_Component) {
		_inherits(App, _Component);

		function App() {
			_classCallCheck(this, App);

			return _possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).apply(this, arguments));
		}

		_createClass(App, [{
			key: 'render',
			value: function render() {
				return (
					// Related: https://github.com/callemall/material-ui/issues/4466
					_react2.default.createElement(
						_MuiThemeProvider2.default,
						{ muiTheme: (0, _getMuiTheme2.default)({ userAgent: null }) },
						_react2.default.createElement(
							_reactRedux.Provider,
							{ store: store },
							_react2.default.createElement(_Developers2.default, null)
						)
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

				this.setState({
					columns: columns
				});
			}
		}, {
			key: 'order',
			value: function order(event, isToggled) {
				var _state = this.state,
				    devs = _state.devs,
				    toggle = _state.toggle;


				if (isToggled) {
					devs.sort(function (prev, next) {
						return prev.node.price - next.node.price;
					});
				} else {
					devs.sort(function (prev, next) {
						return next.node.price - prev.node.price;
					});
				}

				toggle = isToggled;
				this.setState({
					toggle: toggle
				});
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
				this.setState({
					current: current
				});
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
								return _react2.default.createElement(_Developer2.default, _extends({ key: index, inCart: _this3.isInCart(dev, devsInCart), data: dev }, _this3.props));
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
						key: data.login,
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
		inCart: _react.PropTypes.number
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
			padding: '24px 16px 0px 16px'
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
					title: 'My Order'
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
			if (responseData) setData(responseData);
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

	module.exports = require("react-tap-event-plugin");

/***/ },
/* 35 */
/***/ function(module, exports) {

	module.exports = require("material-ui/styles/getMuiTheme");

/***/ },
/* 36 */
/***/ function(module, exports) {

	module.exports = require("body-parser");

/***/ },
/* 37 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _carts = __webpack_require__(38);

	var _carts2 = _interopRequireDefault(_carts);

	var _developers = __webpack_require__(42);

	var _developers2 = _interopRequireDefault(_developers);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = { carts: _carts2.default, developers: _developers2.default };

/***/ },
/* 38 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _express = __webpack_require__(39);

	var _express2 = _interopRequireDefault(_express);

	var _Cart = __webpack_require__(40);

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
/* 39 */
/***/ function(module, exports) {

	module.exports = require("express");

/***/ },
/* 40 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _mongoose = __webpack_require__(41);

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
/* 41 */
/***/ function(module, exports) {

	module.exports = require("mongoose");

/***/ },
/* 42 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _memoryCache = __webpack_require__(43);

	var _memoryCache2 = _interopRequireDefault(_memoryCache);

	var _express = __webpack_require__(39);

	var _express2 = _interopRequireDefault(_express);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var router = _express2.default.Router();

	router.get('/', function (req, res) {
		var cachedDevs = JSON.parse(_memoryCache2.default.get('devs'));
		if (!cachedDevs || !cachedDevs.length) {
			return res.status(404).json({ error: 'developers not found' });
		}

		res.json(cachedDevs);
	});

	exports.default = router;

/***/ },
/* 43 */
/***/ function(module, exports) {

	module.exports = require("memory-cache");

/***/ },
/* 44 */
/***/ function(module, exports) {

	module.exports = require("request");

/***/ },
/* 45 */
/***/ function(module, exports) {

	module.exports = require("react-dom/server");

/***/ },
/* 46 */
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
/* 47 */
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
/* 48 */
/***/ function(module, exports) {

	module.exports = require("@risingstack/graffiti");

/***/ },
/* 49 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.schema = undefined;

	var _Cart = __webpack_require__(40);

	var _Cart2 = _interopRequireDefault(_Cart);

	var _graffitiMongoose = __webpack_require__(50);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var options = {
		mutation: false, // mutation fields can be disabled
		allowMongoIDMutation: false // mutation of mongo _id can be enabled
	};

	var schema = exports.schema = (0, _graffitiMongoose.getSchema)([_Cart2.default], options);

/***/ },
/* 50 */
/***/ function(module, exports) {

	module.exports = require("@risingstack/graffiti-mongoose");

/***/ }
/******/ ]);