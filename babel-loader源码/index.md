# vue-loader
  loader在webpack里是用来做编译的，这就可以理解vue-loader是帮助我们把我们写的vue组件编译成js文件(因为我们的浏览器是识别不了我们的vue组件的)
# vue-loader的index.js

 vue-loader的index.js导出了一个函数,函数接收一个参数，这个参数就是要转换的文件的内容
```JavaScript
  module.exports = function (source) {
  //source就是传入的文件(传入的文件里的所有代码)
  //........
  }
```
  导出的这个函数里也有this,这个this是webpack注入给我们的,这个this里包含了文件的信息，以及文件的模块组成

   接下来就是解析我们的模块，我们首先通过resourceQuery(webpack注入给我们的this里的信息)获取到我们的vue组件有多少个模块(正常都是template,style,script),然后传入selectBlock函数进行解析，最后返回

```JavaScript
  const loaderContext = this
  if (!errorEmitted && !loaderContext['thread-loader'] && !loaderContext[NS]) {
    loaderContext.emitError(new Error(
      `vue-loader was used without the corresponding plugin. ` +
      `Make sure to include VueLoaderPlugin in your webpack config.`
    ))
    errorEmitted = true
  }

  const stringifyRequest = r => loaderUtils.stringifyRequest(loaderContext, r)

  const {
    target,
    request,
    minimize,
    sourceMap,
    rootContext,
    resourcePath,
    resourceQuery = ''
  } = loaderContext
  const rawQuery = resourceQuery.slice(1)
  const inheritQuery = `&${rawQuery}`
  const incomingQuery = qs.parse(rawQuery)
  const options = loaderUtils.getOptions(loaderContext) || {}

  const isServer = target === 'node'
  const isShadow = !!options.shadowMode
  const isProduction = options.productionMode || minimize || process.env.NODE_ENV === 'production'
  const filename = path.basename(resourcePath)
  const context = rootContext || process.cwd()
  const sourceRoot = path.dirname(path.relative(context, resourcePath))
  //通过parse解析文件，获取不同的类型比如,template,style,srcipt等
  //parse返回的是函数的内容
  const descriptor = parse({
    source,//文件内部模块的组成，分别是template,style,script
    compiler: options.compiler || loadTemplateCompiler(loaderContext),
    filename, //文件的名字
    sourceRoot, //文件路径
    needMap: sourceMap
  })
  // if the query has a type field, this is a language block request
  // e.g. foo.vue?type=template&id=xxxxx
  // and we will return early
  //判断文件有没有type,这个type就是文件里的模块，比如index.vue文件里有style,template等模块
  //那么他的type就是  index.vue?type=template  ,index.vue?type=style,然后将这些模块传入selectBlock进行解析
  if (incomingQuery.type) {
    return selectBlock(
      descriptor,
      loaderContext,
      incomingQuery,
      !!options.appendExtension
    )
  }

```