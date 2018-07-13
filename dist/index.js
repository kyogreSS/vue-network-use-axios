'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _axios = require('axios');

var _axios2 = _interopRequireDefault(_axios);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
        value: function send(key, _ref2) {
            var bind = _ref2.bind,
                _ref2$params = _ref2.params,
                params = _ref2$params === undefined ? {} : _ref2$params,
                callBack = _ref2.callBack,
                errorHandler = _ref2.errorHandler,
                urlFragment = _ref2.urlFragment,
                query = _ref2.query,
                headers = _ref2.headers;

            if (typeof key !== 'string') {
                console.log("you must input a key!");
                return false;
            }

            var configure = this.address[key];

            if (typeof configure === 'undefined') {
                console.log("network hasn't configure!", key);
                return false;
            }

            var newOption = _extends({}, this.serverConfigs);

            for (var keys in configure) {
                typeof configure[keys] !== 'undefined' && configure[keys] !== null && (newOption[keys] = configure[keys]);
            }

            newOption.url && urlFragment && (newOption.url = newOption.url + urlFragment);

            headers && (newOption.headers = headers);

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
        }
    }, {
        key: 'sendFile',
        value: function sendFile(key, formData, _ref3) {
            var bind = _ref3.bind,
                callBack = _ref3.callBack,
                errorHandler = _ref3.errorHandler;

            if (typeof key !== 'string') {
                console.log("you must input a key!");
                return false;
            }

            var configure = this.address[key];

            if (typeof configure === 'undefined') {
                console.log("network hasn't configure!");
                return false;
            }

            var url = configure.url;

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
        }
    }]);

    return NetworkHandler;
}();