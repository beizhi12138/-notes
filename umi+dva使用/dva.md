# 简介
  dva是用来进行状态管理的(umi内置的有dva所以我们不需要另外再引入dvfa)

## 使用dva
  使用dva我们首先要在umi的src下创建一个model文件夹，用来管理我们的状态

  ```JavaScript
   //modules/system
   export default {
        // models命名空间，需全局唯一
    namespace: 'system',           
    // models存储的数据store                  
    state: {
        dataList: 1,
        lists:2
    },      
    // 更新store，用新数据合并state的旧数据                                
    reducers: {
        Lists(state,{payload}){
            return {...state,...payload}
        },
        save(state, {payload}) {                    
           
            // console.log(state);
            // console.log(payload);
             return { ...state,...payload};
        },
      
    },
   }
   // 在组件中使用
   import {connect} from 'umi';
    export default Index=(props)=>{
      return (
          <div>{props.system.dataList}</div>
      )
    }
   connect(({ system }) => ({ system }))(Index)
  ```

## namespace (命名空间)
  指定model的名字，一定要是唯一的

## state 
   存储数据，

## reducers
   这里是用来修改数据的,

```JavaScript
//models/index.ts
  reducers:{
        save(state,{payload}){
            return {...state,...payload}
        }
  }
 // pages / index.ts
   props.dispatch({
       type:'index/save',
       payload:{
           //要修改的数据
       }
   })
```
## subscriptions 

  每次进入项目都会执行subscriptions

```JavaScript
  subscriptions:{
      set(dispatch,history){
          //可以实现对history的监听
          history.listen((a)=>{

          })
      }
  }
```

## effects
 effects是由action触发的，比如我们有些数据是通过请求获得的，那么我们就需要在请求完之后再去调用dispatch修改数据，所以我们可以在effects里执行
,那么我们在调用dispatch的时候就需要调用effects里的函数，在通过effects去调用reducers
 ```JavaScript
  effects:{
     add({payload},{call,put,select}){
         //payload,接受过来要修改的参数
         //call 传进去一个函数并执行
         //put 调用reducers
         //select 获取所有的state
        //  yield是ES6的新关键字，使生成器函数执行暂停，yield关键字后面的表达式的值返回给生成器的调用者。它可以被认为是一个基于生成器的版本的return关键字。
         const states=yield select (state=>state);
        const {data}=  yield  call( get/post ) //可以在call里去执行请求函数,获取到数据后
        //通过put函数去调用reducers更改state
        yield put('refucer名字',payload:{
            //要修改的数据
        })
     }

  }

 ```

 ## dva-cli

 # dva源码解析
  dva其实就是实现了对redux和redux-sga的封装他还内置了路由和fetch(相当于axios)，所以dva也是一个企业级别的微型框架,研究dva的源码首先我们根据package.json查看dva都引入了哪些东西
  ## dva/package.json
    dva里分别引入了这些东西

```JavaScript
  "@babel/runtime": "7.0.0-beta.46", //编译时的文件，编译过后使得代码的体积更小
    "@types/isomorphic-fetch": "^0.0.34", //请求用的库
    "@types/react-router-dom": "^4.2.7",
    "@types/react-router-redux": "^5.0.13",
    "dva-core": "^1.4.0", //dva源码的核心功能实现的库
    "global": "^4.3.2",
    "history": "^4.6.3", //borswerRouter和hashRouter
    "invariant": "^2.2.2",//断言库
    "isomorphic-fetch": "^2.2.1",
    "react-redux": "5.0.7",//提供了一个高阶组件方便在各处调用store
    "react-router-dom": "^4.1.2", //路由
    "react-router-redux": "5.0.0-alpha.9", //reduce的中间件
    "redux": "^3.7.2" //redux

```
然后我们来看index.js
  
   ## dva/src/index.js
     index.js返回一个app方法,app挂载了dva的所有方法,app返回三个方法start,model,use,router

     ```javaScript
     //额外的plugin插件
     app.use({})
     //models层
  app.model(require('./models/example').default);

// 4. Router 配置路由
app.router(require('./router').default);

// 5. Start 挂载
app.start('#root');

     ```

  ### dva
    当我们引入dva的时候，dva先导出的是一个方法，我们需要调用这个方法得到app,然后才能通过app开启我们的应用,
     我们首先来看导出的这个方法
```JavaScript
export default  function (opts={}){
   const history = opts.history || createHashHistory();
    //创建app时需要传入的参数
    const createOpts = {
    initialReducer: {
      routing,
    },
    setupMiddlewares(middlewares) {
      return [
        routerMiddleware(history),
        ...middlewares,
      ];
    },
     setupApp(app) {
            app._history = patchHistory(history);
       },
     };
        const app = core.create(opts, createOpts); //通过引入的dva-core创建一个app
       const oldAppStart = app.start; //给app绑定上start方法
       app.router = router; //给app绑定上router
      app.start = start; //给app绑定start方法
     return app; //返回app
}
```

  ### start
   
    start方法接收一个参数,就是我们需要挂载的Dom，它可以是一个字符串就是dom的id或者class，也可以是一个真实的dom，start之后开始models(这一层是通过dva-core实现的)，然后通过getProvider函数给根组件绑定上provider组件(provider组件是React-redux提供给我们的)给跟组件绑定上provider组件我们就可以在任意组件拿到state,然后调用react的render函数

```JavaScript
   function start(container) {
    // 允许 container 是字符串，然后用 querySelector 找元素
    if (isString(container)) {
      //判断传进来的参数是否是字符串
      container = document.querySelector(container);
      //invariant是用来判断传入参数的重要性能
      invariant(
        container,
        `[app.start] container ${container} not found`,
      );
    }

    // 并且是 HTMLElement
    invariant(
      !container || isHTMLElement(container),
      `[app.start] container should be HTMLElement`,
    );

    // 路由必须提前注册
    //判断app是否提前注册了路由
    invariant(
      app._router,
      `[app.start] router must be registered before app.start()`,
    );

    if (!app._store) {
      //给app绑定store，并且传入this
      oldAppStart.call(app);
    }
    const store = app._store;
        //将数据层于view层进行绑定
    // export _getProvider for HMR
    // ref: https://github.com/dvajs/dva/issues/469
    app._getProvider = getProvider.bind(null, store, app);
         
    // If has container, render; else, return react component
    if (container) {
      render(container, store, app, app._router);
      app._plugin.apply('onHmr')(render.bind(null, container, store, app));
    } else {
      return getProvider(store, this, this._router);
    }
  }
}

//getprovider函数

function getProvider(store, app, router) {
  //此处的provider是react-redux的我们之所以使用dva在任意组件里去进行行provider和connect，而不是在通过reactr-redux去给根节点绑定是因为
  //dva在此处就已经帮我们给根节点绑定了
  const DvaRoot = extraProps => (
    //Provider组件是react提供给我们的，通过parovider组件给根组件绑定我们就可以在任意地方拿到state了
    <Provider store={store}>
      { router({ app, history: app._history, ...extraProps }) }
    </Provider>
  );
  return DvaRoot;
}
 //render函数
function render(container, store, app, router) {
  //调用reactr-dom的render方法来进行渲染组件
  const ReactDOM = require('react-dom');  // eslint-disable-line
  ReactDOM.render(React.createElement(getProvider(store, app, router)), container);
}
```

 ### router
   router方法接收的是路由，给app的绑定上路由

   ```JavaScript
  // 这个方法是在dva导出的函数里的，我们通过调用app.router传进来路由组件就可以实现绑定了
    function router(router) {
    //同样通过invariant来进行判断
    invariant(
      isFunction(router),
      `[app.router] router should be function, but got ${typeof router}`,
    );
    //给app方法绑定上路由
    app._router = router;
  }
   ```


  经过上面的源码，我们可以看到dva/src/index.js只是实现了对mode和view的绑定，真正实现了dva里的model的是dva-core所以我们接下来看dva-core的源码
   ## dva-core/src/index.js

  ### create
    dva-core导出了create方法，这个create方法就是我们整个创建model的过程，create方法接收两个参数opts 是使用者添加的控制选项，createOpts 则是初始化了 reducer 与 redux 的中间件
    create创建了一个app并给他绑定model(用于注册model),plugin(各种插件基于dva的声明周期函数的)，start(启动app),最终create放回app

```JavaScript
  export function create(hooksAndOpts = {}, createOpts = {}) {
  const { initialReducer, setupApp = noop } = createOpts;
//plugin里包含了一些钩子函数
  const plugin = new Plugin(); //所有的中间件
  plugin.use(filterHooks(hooksAndOpts));
 //create创建了一个app并给他绑定了model和start方法
  const app = {
    _models: [prefixNamespace({ ...dvaModel })],
    _store: null,
    _plugin: plugin,
    use: plugin.use.bind(plugin),
    model,
    start,
  };
  return app;
```
  ### plugin

    在create函数里创建了plugin并通过filterHooks去掉不合法的plugin,plugin里是这样做的,

       1.plugin里首先定义一乐hooks函数，用于保存所有生命周期函数的名称(主要用于判断用户传进来的是否是合法的，以及给plugin这个类进行绑定)
       2.声明一个filterhooks函数用于过滤掉用户传进来的不合法的函数
       3.声明plugin类并进行导出，在constructor函数给plugin类的私有hooks绑定hooks数组
       4.定义plugin的类方法用来注册中间件,也就是将用户传进来的方法push到对应的hooks数组里
```JavaScript
//定义hooks包含了所有声明周期函数的名字
const hooks = [
  'onError',
  'onStateChange',
  'onAction',
  'onHmr',
  'onReducer',
  'onEffect',
  'extraReducers',
  'extraEnhancers',
  '_handleActions',
];
//判断是否是hooks里有的，如果hooks没有就被视为不合法的剔除掉
export function filterHooks(obj) {
  return Object.keys(obj).reduce((memo, key) => {
    if (hooks.indexOf(key) > -1) {
      memo[key] = obj[key];
    }
    return memo;
  }, {});
}

export default class Plugin {
  constructor() {
    this._handleActions = null;
    this.hooks = hooks.reduce((memo, key) => {
      memo[key] = [];
      return memo;
    }, {});
  //定义每一个插件函数为数组,就是相当于
   // this.hooks={
      //onError=[],
      //onStartChange=[]  
   //}
  }

  use(plugin) {
    //判断传进来的plugin是否是一个对象
    invariant(
      isPlainObject(plugin),
      'plugin.use: plugin should be plain object'
    );
    const hooks = this.hooks;
    //挨个放入数组
    for (const key in plugin) {
      //调用hasOwnProperty方法，是为了防止用户在的pligun里自己写一个，也就是怕用户传入进项相同名称的然后覆盖掉之前的函数，所以通过hasOwnProperty调用
      if (Object.prototype.hasOwnProperty.call(plugin, key)) {
        invariant(hooks[key], `plugin.use: unknown plugin property: ${key}`);
        if (key === '_handleActions') {
          this._handleActions = plugin[key];
        } else if (key === 'extraEnhancers') {
          hooks[key] = plugin[key];
        } else {
          hooks[key].push(plugin[key]);
        }
      }
    }
  }

  apply(key, defaultHandler) {
    const hooks = this.hooks;
    const validApplyHooks = ['onError', 'onHmr'];
    invariant(
      validApplyHooks.indexOf(key) > -1,
      `plugin.apply: hook ${key} cannot be applied`
    );
    const fns = hooks[key];

    return (...args) => {
      if (fns.length) {
        for (const fn of fns) {
          fn(...args);
        }
      } else if (defaultHandler) {
        defaultHandler(...args);
      }
    };
  }

  get(key) {
    const hooks = this.hooks;
    invariant(key in hooks, `plugin.get: hook ${key} cannot be got`);
    if (key === 'extraReducers') {
      return getExtraReducers(hooks[key]);
    } else if (key === 'onReducer') {
      return getOnReducer(hooks[key]);
    } else {
      return hooks[key];
    }
  }
}

```
  接下来我们来看model，我们是如何注册model的
### model
  注册model是通过model函数，model函数首先通过checkmodel来检查model是否合法
    一个model是否合法需要以下几点
        1.namespace: //必须传，必须为字符串，而且是唯一的
        2.state 必须传，可以是任何数据
        3.effect  //可传可不传 必须是一个对象
        4.subscriptions //可传可不传，必须是一个对象
      
    然后model函数通过profixednamespace函数给model加上前缀，最后将model添加到app的_model就完成了注册


```javascript
    function model(m) {
    if (process.env.NODE_ENV !== 'production') {
      checkModel(m, app._models);
    }
    const prefixedModel = prefixNamespace({ ...m });
    app._models.push(prefixedModel);
    return prefixedModel;
  }
```

## start方法(start方法是dva-core的核心)
 dva的start方法是完成了model和view的绑定，dva-core的start就是完成了对react-redux的调用和redux-saga的调用，在dva的导出函数里就执行了dva-core的start的调用