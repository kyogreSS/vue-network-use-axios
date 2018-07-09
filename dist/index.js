'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _axios = require('axios');

var _axios2 = _interopRequireDefault(_axios);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var NetworkConfigs = {};

NetworkConfigs.install = function (Vue) {
    var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
        _ref$address = _ref.address,
        address = _ref$address === undefined ? {} : _ref$address,
        _ref$networkConfigs = _ref.networkConfigs,
        networkConfigs = _ref$networkConfigs === undefined ? {} : _ref$networkConfigs;

    Vue.prototype.$http = Vue.$http = new NetworkHandler(address, networkConfigs);
};

exports.default = NetworkConfigs;

var NetworkHandler = function () {
    function NetworkHandler(address, networkConfigs) {
        _classCallCheck(this, NetworkHandler);

        this.address = address || {};
        this.serverConfigs = networkConfigs || {};
        _axios2.default.defaults.withCredentials = true;
    }

    _createClass(NetworkHandler, [{
        key: 'getAxios',
        value: function getAxios() {
            return _axios2.default;
        }
    }, {
        key: 'send',
        value: function () {
            var _ref3 = _asyncToGenerator(_regenerator2.default.mark(function _callee(key, _ref2) {
                var bind = _ref2.bind,
                    _ref2$params = _ref2.params,
                    params = _ref2$params === undefined ? {} : _ref2$params,
                    callBack = _ref2.callBack,
                    errorHandler = _ref2.errorHandler,
                    urlFragment = _ref2.urlFragment,
                    query = _ref2.query,
                    headers = _ref2.headers;
                var configure, newOption, keys;
                return _regenerator2.default.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                if (!(typeof key !== 'string')) {
                                    _context.next = 3;
                                    break;
                                }

                                console.log("you must input a key!");
                                return _context.abrupt('return', false);

                            case 3:
                                configure = this.address[key];

                                if (!(typeof configure === 'undefined')) {
                                    _context.next = 7;
                                    break;
                                }

                                console.log("network hasn't configure!", key);
                                return _context.abrupt('return', false);

                            case 7:
                                newOption = _extends({}, this.serverConfigs);


                                for (keys in configure) {
                                    typeof configure[keys] !== 'undefined' && configure[keys] !== null && (newOption[keys] = configure[keys]);
                                }

                                newOption.url && urlFragment && (newOption.url = newOption.url + urlFragment);

                                headers && (newOption.headers = headers);

                                _context.next = 13;
                                return (0, _axios2.default)(_extends({}, newOption, {
                                    params: query,
                                    data: _extends({}, params)
                                })).then(function (res) {
                                    typeof callBack === 'function' && bind && callBack.bind(bind)(res.data, res.status, res.statusText);
                                    typeof callBack === 'function' && !bind && callBack(res.data, res.status, res.statusText);
                                }).catch(function (err) {
                                    err && typeof errorHandler === 'function' && bind && errorHandler.bind(bind)(err);
                                    err && typeof errorHandler === 'function' && !bind && errorHandler(err);
                                });

                            case 13:
                            case 'end':
                                return _context.stop();
                        }
                    }
                }, _callee, this);
            }));

            function send(_x2, _x3) {
                return _ref3.apply(this, arguments);
            }

            return send;
        }()
    }, {
        key: 'sendFile',
        value: function () {
            var _ref5 = _asyncToGenerator(_regenerator2.default.mark(function _callee2(key, formData, _ref4) {
                var bind = _ref4.bind,
                    callBack = _ref4.callBack,
                    errorHandler = _ref4.errorHandler;
                var configure, url;
                return _regenerator2.default.wrap(function _callee2$(_context2) {
                    while (1) {
                        switch (_context2.prev = _context2.next) {
                            case 0:
                                if (!(typeof key !== 'string')) {
                                    _context2.next = 3;
                                    break;
                                }

                                console.log("you must input a key!");
                                return _context2.abrupt('return', false);

                            case 3:
                                configure = this.address[key];

                                if (!(typeof configure === 'undefined')) {
                                    _context2.next = 7;
                                    break;
                                }

                                console.log("network hasn't configure!");
                                return _context2.abrupt('return', false);

                            case 7:
                                url = configure.url;
                                _context2.next = 10;
                                return _axios2.default.post(url, formData, {
                                    headers: {
                                        'Content-Type': 'multipart/form-data'
                                    }
                                }).then(function (res) {
                                    typeof callBack === 'function' && bind && callBack.bind(bind)(res.data, res.status, res.statusText);
                                    typeof callBack === 'function' && !bind && callBack(res.data, res.status, res.statusText);
                                }).catch(function (err) {
                                    err && typeof errorHandler === 'function' && bind && errorHandler.bind(bind)(err);
                                    err && typeof errorHandler === 'function' && !bind && errorHandler(err);
                                });

                            case 10:
                            case 'end':
                                return _context2.stop();
                        }
                    }
                }, _callee2, this);
            }));

            function sendFile(_x4, _x5, _x6) {
                return _ref5.apply(this, arguments);
            }

            return sendFile;
        }()
    }]);

    return NetworkHandler;
}();