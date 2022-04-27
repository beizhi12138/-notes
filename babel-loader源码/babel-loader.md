# babel-loader
 babel-loader是用来将Es6语法转换成Es5语法，看源码之前我们看一下前端为什么要进行构建和打包
 ## 为什么要进行构建和打包
   1.使得代码体积率更小,加载更快
   2.编译高级语法(ts,模块化)
 ## webpack的打包流程
   1.初始化参数，读取合并参数
   2.用上一步得到的参数,得到Compiler(文件)参数,加载所有配置的插件，执行对象的run方法
   3.确定入口文件
   4.编译模块,从入口文件触发，调用所有的文件配置的loader,编译模块,找到模块依赖的模块递归编译,直到所有文件都经过loader的编译。
   5.完成模块编译：在经过第 4 步使用 Loader 翻译完所有模块后,得到了每个模块被翻译后的最终内容以及它们之间的依赖关系。 
   6.输出资源：根据入口和模块之间的依赖关系,组装成一个个包含多个模块的 Chunk,再把每个 Chunk 转换成一个单独的文件加入到输出列表,这步是可以修改输出内容的最后机会。  
   7.输出完成：在确定好输出内容后,根据配置确定输出的路径和文件名,把文件内容写入到文件系统。
 
 ## babel是什么
   babel是将高级语法编译成低级语法的工具，webpack通过babel-loader使用babel

 ## babel的工作流程
   1.接收到代码
   2.再把代码转换成AST语法树(babel-parse将代码转换成Ast语法树)
   3.变换，对ASt进行转换处理(babel-taraves提供遍历语法树节点的能力)
   4.输出代码(babel-generator转换成目标代码，并打印代码)
 ## 什么是AST(抽象语法树)
  无论使用什么编程语言，都要经过自己的解释器或者编译器，将代码转换成语法树，然后再将语法树转换成计算机可以识别运运行的代码，

  ### 抽象语法树
    抽象语法树就是以树状的语言表示代码结构，树上的每一个节点都代表一个语法结构

```javaScript
//JS代码
  var a=1;
//转换成语法树后
AST={
   type: Program,
   body:{
       type: VariableDeclaration,
       declarations:{
          type: VariableDeclarator,
          id:{
             type: Identifier
             name: a
       },
       init:{
             type: Literal
             value: 1
             raw: 1
             kind: var
         }
      }
    }
   sourceType: script
}

```

 语法树的用途:
    JSLint、JSHint对代码错误或风格的检查等
    webpack、rollup进行代码打包等
    CoffeeScript、TypeScript、JSX等转化为原生Javascript
    vue模板编译、react模板编译
    包括我们使用的VsCode插件使得代码高亮也使用的语法树

# babel-loader
  babel-loader主要讲述了从接收到文件，采用异步处理，判断有没有额外的配置的loader，如果有先调用额外的配置的loader，最后通过transfrom('src/transform.js')函数进行转换，最后返回结果的过程
```JavaScript
  "use strict";
//generator函数的终止函数和最终返回结果的函数
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
  try {
    var info = gen[key](arg);
    var value = info.value;
  } catch (error) {
    reject(error);
    return;
  }
  if (info.done) {
    resolve(value);
  } else {
    Promise.resolve(value).then(_next, _throw);
  }
}
//generator函数的开始函数，返回promise
function _asyncToGenerator(fn) {
  //返回一个函数，函数的返回值是promise
 return function () {
    var self = this,
      args = arguments;
      //这里的tis同样指向的是webpack
      //args是传递过来的参数
     return new Promise(function (resolve, reject) {
      var gen = fn.apply(self, args); //在这里调用了传递过来的函数拿到他的返回值，并且改变this
      function _next(value) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
      }

      function _throw(err) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
      }
      _next(undefined);
    });
  };
}

let babel;

try {
  babel = require("@babel/core");
} catch (err) {
  if (err.code === "MODULE_NOT_FOUND") {
    err.message += "\n babel-loader@8 requires Babel 7.x (the package '@babel/core'). " + "If you'd like to use Babel 6.x ('babel-core'), you should install 'babel-loader@7'.";
  }

  throw err;
} // Since we've got the reverse bridge package at @babel/core@6.x, give
// people useful feedback if they try to use it alongside babel-loader.


if (/^6\./.test(babel.version)) {
  throw new Error("\n babel-loader@8 will not work with the '@babel/core@6' bridge package. " + "If you want to use Babel 6.x, install 'babel-loader@7'.");
}

const {
  version
} = require("../package.json");
//获取babel的版本号
const cache = require("./cache");
//如果有缓存文件的转换方法
const transform = require("./transform");
//转换代码的函数
const injectCaller = require("./injectCaller");

const schema = require("./schema");//options的规则
const {
  isAbsolute
} = require("path");

const loaderUtils = require("loader-utils");//webpack的工具类，方便我们进入loader内部

const validateOptions = require("schema-utils");//工具类，检验传入的参数是否正确

function subscribe(subscriber, metadata, context) {
  if (context[subscriber]) {
    context[subscriber](metadata);
  }
}

module.exports = makeLoader();
module.exports.custom = makeLoader;

function makeLoader(callback) {
  const overrides = callback ? callback(babel) : undefined;
  return function (source, inputSourceMap) {
    //这里返回饭hi
    //source就是接收到的文件
    // Make the loader async
    const callback = this.async();
    //这里的async是webpack的因为要异步使用loader(等待多个返回结果完成后)
    //这里的this是webpack传入的
    //这里调用loader函数，并且改变loader函数的this,调用loader函数我们就去看loader函数
    loader.call(this, source, inputSourceMap, overrides).then(args => {
      //在这里拿到结果后返回
      return callback(null, ...args)
    }, err => callback(err));
  };
}

function loader(_x, _x2, _x3) {
   //接收三个参数后，返回_loader函数的执行,并且改变_loader函数的this指向
   //此时_loader函数的this指向loader,而loader的this指向webpcak
  return _loader.apply(this, arguments);
}

function _loader() {
  //此时该函数的this指向webpack
  _loader = _asyncToGenerator(function* (source, inputSourceMap, overrides) {
    const filename = this.resourcePath;//拿到源文件的名字
    let loaderOptions = loaderUtils.getOptions(this);//拿到babel-loader的配置
    //schema是检验规则
    validateOptions(schema, loaderOptions, {
      name: "Babel loader"
    });
   //判断loader是否有定制配置，如果有定制配置则设置overrsides=定制配置
    if (loaderOptions.customize != null) {
      if (typeof loaderOptions.customize !== "string") {
        throw new Error("Customized loaders must be implemented as standalone modules.");
      }

      if (!isAbsolute(loaderOptions.customize)) {
        throw new Error("Customized loaders must be passed as absolute paths, since " + "babel-loader has no way to know what they would be relative to.");
      }

      if (overrides) {
        throw new Error("babel-loader's 'customize' option is not available when already " + "using a customized babel-loader wrapper.");
      }

      let override = require(loaderOptions.customize);
      if (override.__esModule) override = override.default;

      if (typeof override !== "function") {
        throw new Error("Custom overrides must be functions.");
      }

      overrides = override(babel);
    }
     ///声明一个变量，去判断有没有定制配置准备存储定制配置的信息
    let customOptions;
   //判断有没有定制配置，如果有定制配置则终端当前函数的执行，去执行配置的loader,然后拿到返回值
    if (overrides && overrides.customOptions) {
      //如果有定制配置，则终端当前函数，并执行定制的loader拿到返回的结果
      const result = yield overrides.customOptions.call(this, loaderOptions, {
        source,
        map: inputSourceMap
      });
      customOptions = result.custom;
      loaderOptions = result.loader;
    } // Deprecation handling


    if ("forceEnv" in loaderOptions) {
      console.wron("The option `forceEnv` has been removed in favor of `envName` in Babel 7.");
    }

    if (typeof loaderOptions.babelrc === "string") {
      console.error("The option `babelrc` should not be set to a string anymore in the babel-loader config. " + "Please update your configuration and set `babelrc` to true or false.\n" + "If you want to specify a specific babel config file to inherit config from " + "please use the `extends` option.\nFor more information about this options see " + "https://babeljs.io/docs/core-packages/#options");
    } // Standardize on 'sourceMaps' as the key passed through to Webpack, so that
    // users may safely use either one alongside our default use of
    // 'this.sourceMap' below without getting error about conflicting aliases.


    if (Object.prototype.hasOwnProperty.call(loaderOptions, "sourceMap") && !Object.prototype.hasOwnProperty.call(loaderOptions, "sourceMaps")) {
      loaderOptions = Object.assign({}, loaderOptions, {
        sourceMaps: loaderOptions.sourceMap
      });
      delete loaderOptions.sourceMap;
    }

    const programmaticOptions = Object.assign({}, loaderOptions, {
      filename,
      inputSourceMap: inputSourceMap || loaderOptions.inputSourceMap,
      // Set the default sourcemap behavior based on Webpack's mapping flag,
      // but allow users to override if they want.
      sourceMaps: loaderOptions.sourceMaps === undefined ? this.sourceMap : loaderOptions.sourceMaps,
      // Ensure that Webpack will get a full absolute path in the sourcemap
      // so that it can properly map the module back to its internal cached
      // modules.
      sourceFileName: filename
    }); // Remove loader related options
    //object.assign方法是将对象属性分配到目标对象里，最后返回目标对象
    //相当于obejct.assgin的参数都是对象，他会将第二个参数and第三个参数的属性复制到第一个参数里，
    //如果第一个参数里有第二个或者第三个参数相同的属性，
    //那么第二个参数或者第三个参数的值会覆盖掉原本第一个参数里属性的值
    delete programmaticOptions.customize;
    delete programmaticOptions.cacheDirectory;
    delete programmaticOptions.cacheIdentifier;
    delete programmaticOptions.cacheCompression;
    delete programmaticOptions.metadataSubscribers;
 //使用delete可以删除对象的某些属性
    if (!babel.loadPartialConfig) {
      throw new Error(`babel-loader ^8.0.0-beta.3 requires @babel/core@7.0.0-beta.41, but ` + `you appear to be using "${babel.version}". Either update your ` + `@babel/core version, or pin you babel-loader version to 8.0.0-beta.2`);
    } // babel.loadPartialConfigAsync is available in v7.8.0+


    const {
      loadPartialConfigAsync = babel.loadPartialConfig
    } = babel;
    const config = yield loadPartialConfigAsync(injectCaller(programmaticOptions, this.target));
     //拿到全局要改变文件的参数信息

     console.log('```````````````````````````````````````````````````````````分割线，')
   //在这里完成将ES6代码转换成ES5代码 
    if (config) {
      let options = config.options;
        //options  ------要转换文件的信息
        //判断有没有配置的转换如果有先去执行配置的转换
      if (overrides && overrides.config) {
        options = yield overrides.config.call(this, config, {
          source,
          map: inputSourceMap,
          customOptions
        });
      }

      if (options.sourceMaps === "inline") {
        // Babel has this weird behavior where if you set "inline", we
        // inline the sourcemap, and set 'result.map = null'. This results
        // in bad behavior from Babel since the maps get put into the code,
        // which Webpack does not expect, and because the map we return to
        // Webpack is null, which is also bad. To avoid that, we override the
        // behavior here so "inline" just behaves like 'true'.
        options.sourceMaps = true;
      }

      const {
        cacheDirectory = null,
          cacheIdentifier = JSON.stringify({
            options,
            "@babel/core": transform.version,
            "@babel/loader": version
          }),
          cacheCompression = true,
          metadataSubscribers = []
      } = loaderOptions;
      let result;
      //判断有没有缓存的文件,如果有缓存的文件就将当前文件和缓存文件一起进行转换
      if (cacheDirectory) {
        result = yield cache({
          source,
          options,
          transform,
          cacheDirectory,
          cacheIdentifier,
          cacheCompression
        });
      } else {
        result = yield transform(source, options);
        //通过transform去继续进行转换
      } // Availabe since Babel 7.12
      // https://github.com/babel/babel/pull/11907

      if (config.files) {
        config.files.forEach(configFile => this.addDependency(configFile));
      } else {
        // .babelrc.json
        if (typeof config.babelrc === "string") {
          this.addDependency(config.babelrc);
        } // babel.config.js


        if (config.config) {
          this.addDependency(config.config);
        }
      }

      if (result) {
      //判断有没有结果
      //  判断定制配置的结果
        if (overrides && overrides.result) {
          //如果有拿到定制配置的结果
          result = yield overrides.result.call(this, result, {
            source,
            map: inputSourceMap,
            customOptions,
            config,
            options
          });
        }

        const {
          code,
          map,
          metadata
        } = result;
        //获取到转换后的结果
        metadataSubscribers.forEach(subscriber => {
          subscribe(subscriber, metadata, this);
        });
        //返回转换后的结果到getGenerator那里
        return [code, map];
      }
    } // If the file was ignored, pass through the original content.

   console.wron(source,inputSourceMap,'souce')
    return [source, inputSourceMap];
  });
//调用_asyncToGenerator 返回一个Generator对象,调用到了_asyncGenerator我们就去看_asynGenerator函数
  return _loader.apply(this, arguments);
}
```
# transform.js
  通过异步调用和generator函数最后利用transform('babel/core')进行转换后返回结果
  transform.js首先返回一个自执行函数
```JavaScript
"use strict";

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
  try {
    var info = gen[key](arg);
    var value = info.value;
  } catch (error) {
    reject(error);
    return;
  }
  if (info.done) {
    resolve(value);
  } else {
    Promise.resolve(value).then(_next, _throw);
  }
}

function _asyncToGenerator(fn) {
  //接收一个generator函数，然后返回一个promise
  return function () {
    var self = this,
      args = arguments;
    return new Promise(function (resolve, reject) {
      var gen = fn.apply(self, args);

      function _next(value) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
      }

      function _throw(err) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
      }
      _next(undefined);
    });
  };
}

const babel = require("@babel/core");

const {
  promisify
} = require("util");

const LoaderError = require("./Error");

const transform = promisify(babel.transform); //promiseify方法是node的内置模块util的方法
//可以把传统的函数转换为接收同样参数的返回promise的函数
module.exports = /*#__PURE__*/ function () {
  //这里导出的是一个自执行函数 
  //调用的流程是
  //先调用_asyncTogenerator拿到_asyncTogenerator的返回函数
  //再返回一个函数接收参数
  //然后调用axyncToGenerator的返回函数，返回asyncToGenerator的返回函数的信息
  var _ref = _asyncToGenerator(function* (source, options) {
    let result;

    try {
      result = yield transform(source, options);
      //中断函数的执行通过babel/core转换
    } catch (err) {
      throw err.message && err.codeFrame ? new LoaderError(err) : err;
    }

    if (!result) return null; // We don't return the full result here because some entries are not
    // really serializable. For a full list of properties see here:
    // https://github.com/babel/babel/blob/main/packages/babel-core/src/transformation/index.js
    // For discussion on this topic see here:
    // https://github.com/babel/babel-loader/pull/629

    const {
      ast,
      code,
      map,
      metadata,
      sourceType
    } = result;

    if (map && (!map.sourcesContent || !map.sourcesContent.length)) {
      map.sourcesContent = [source];
    }
    return {
      ast,//ast树
      code,//转换后的代码
      map,
      metadata,
      sourceType
    };
   
     //转换完成后，将结果给promise通过promise再返回给结果
  });
  return function (_x, _x2) {
    //_x要转换的文件
    //_x2要转换的文件的信息
    return _ref.apply(this, arguments); //调用_ref并且改变_ref的this指向，此时的this指向是undefined
  };
}();

module.exports.version = babel.version;

```

如果要看babe;/core.transform是如何转换的请看babel/core.transform源码解析