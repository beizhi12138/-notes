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