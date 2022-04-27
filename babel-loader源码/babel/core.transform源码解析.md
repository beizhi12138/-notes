# babel/core
babel-loader的transform是通过引入babel/core的transform进行代码转换的，然而babel/core的transform里又进行了一次封装通过trasnformamation进行转换，babel/core实际上的作用就是调用babel的插件转换代码后将代码返回
```JavaScript
"use strict";
//babel/transform.js
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
## transfroamation
   transfromation是babel/core的核心,transfromation返回.run方法，在transfrom.js里也是通过transfromation的.run方法进行转换代码

```JavaScript
  //transfromation.run代码片段
  const file = yield* (0, _normalizeFile.default)(config.passes, (0, _normalizeOpts.default)(config), code, ast);
  //通过_normalizefile.default将代码转为ASt树,normalize是babel封装的方法，其内部调用的是babel/parser方法
  const opts = file.opts;
  try {
    yield* transformFile(file, config.passes);
    //transformfile方法利用babel/traverse,将代码转换为目标代码
  } catch (e) {
    var _opts$filename;

    e.message = `${(_opts$filename = opts.filename) != null ? _opts$filename : "unknown"}: ${e.message}`;

    if (!e.code) {
      e.code = "BABEL_TRANSFORM_ERROR";
    }

    throw e;
  }
  let outputCode, outputMap;

  try {
    if (opts.code !== false) {
      ({
        outputCode,
        outputMap
        //调用generates 遍历ast并且输出代码
        //generate方法实际上调用的是babel/generator
      } = (0, _generate.default)(config.passes, file));
      

      function* transformFile(file, pluginPasses) {
  for (const pluginPairs of pluginPasses) {
    const passPairs = [];
    const passes = [];
    const visitors = [];

    for (const plugin of pluginPairs.concat([(0, _blockHoistPlugin.default)()])) {
      const pass = new _pluginPass.default(file, plugin.key, plugin.options);
      passPairs.push([plugin, pass]);
      passes.push(pass);
      visitors.push(plugin.visitor);
    }

    for (const [plugin, pass] of passPairs) {
      const fn = plugin.pre;

      if (fn) {
        const result = fn.call(pass, file);
        yield* [];

        if (isThenable(result)) {
          throw new Error(`You appear to be using an plugin with an async .pre, ` + `which your current version of Babel does not support. ` + `If you're using a published plugin, you may need to upgrade ` + `your @babel/core version.`);
        }
      }
    }

    const visitor = _traverse().default.visitors.merge(visitors, passes, file.opts.wrapPluginVisitorMethod);
   //_traverse实际上调用的是引入的babel/parser
    (0, _traverse().default)(file.ast, visitor, file.scope);

    for (const [plugin, pass] of passPairs) {
      const fn = plugin.post;

      if (fn) {
        const result = fn.call(pass, file);
        yield* [];

        if (isThenable(result)) {
          throw new Error(`You appear to be using an plugin with an async .post, ` + `which your current version of Babel does not support. ` + `If you're using a published plugin, you may need to upgrade ` + `your @babel/core version.`);
        }
      }
    }
  }
}
      
      
      //normaizefile.js
      var _parser = require("../parser"); //_parser内部引入了babel/parser然后返回

var _cloneDeep = require("./util/clone-deep");

const {
  file,
  traverseFast
} = _t();

const debug = _debug()("babel:transform:file");

const LARGE_INPUT_SOURCEMAP_THRESHOLD = 1000000;

function* normalizeFile(pluginPasses, options, code, ast) {
  // console.log(pluginPasses,'pluginpass')
  code = `${code || ""}`;
  //调用parse将代码转换为Ast
  if (ast) {
    if (ast.type === "Program") {
      ast = file(ast, [], []);
    } else if (ast.type !== "File") {
      throw new Error("AST root must be a Program or File node");
    }

    if (options.cloneInputAst) {
      ast = (0, _cloneDeep.default)(ast);
    }
  } else {
    ast = yield* (0, _parser.default)(pluginPasses, options, code);
  }

```