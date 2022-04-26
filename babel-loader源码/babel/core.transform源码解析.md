# babel/core
babel-loader的transform是通过引入babel/core的transform进行代码转换的，然而babel/core的transform里又进行了一次封装通过trasnformamation进行转换
```JavaScript
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.transformSync = exports.transformAsync = exports.transform = void 0;

function _gensync() {
  const data = require("gensync");
  // gensync库封装generator函数，返回一个新的函数，其有不同的使用方式：
  // 同步使用（sync）
  // 异步调用，封装成promise，在then方法中获取结果（async）
  // 传入回调使用errback
  console.log(data, 'data')
  _gensync = function () {

    return data;
  };

  return data;
}

var _config = require("./config");

var _transformation = require("./transformation");

const transformRunner = _gensync()(function* transform(code, opts) {
  //gensync会将结果传递到yield* 然后执行yield*
  const config = yield* (0, _config.default)(opts);
  //执行完之后再去执行下一步代码
  if (config === null) return null;
  //将全局信息和需要转换的代码，传递给transformation去进行转换
  const res = yield* (0, _transformation.run)(config, code);
  //得到结果返回结果
  return res
});

const transform = function transform(code, opts, callback) {
  //code'接收到要转换的代码
  //opts 要转换代码的信息
  //callback 是回调函数，
  if (typeof opts === "function") {
    callback = opts;
    opts = undefined;
  }
    //函数的调用顺序
    //因为提前声明了transromRunner
  if (callback === undefined) return transformRunner.sync(code, opts);
  //因为有回调所以传入了回调
  transformRunner.errback(code, opts, callback);
};

exports.transform = transform;
const transformSync = transformRunner.sync;
exports.transformSync = transformSync;
const transformAsync = transformRunner.async;
exports.transformAsync = transformAsync;
```