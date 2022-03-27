# 简介
  ReactHooks 是React的新特性，在我们的react版本号为16.8以上的版本不需要另外安装

  ## 基础写法
   使用ReactHooks 我们将不再使用传统的render函数，以及class的写法
 

   示例代码
```javaScript
   //ReactHooks写法
   import react,{useState} from  'react';
   function index(){
       return (
           <div>
             同样的在这里返回dom节点
           </div>
       )
   }
   export default index
   //传统的react写法
    import react , {Component}  from 'react'
    class index extends Component{
        constructor(props){
            super(props)
            this.state={}
        }
        render(){
            return (
                <div>
                  在这里返回dom节点
                </div>
            )
        }
    }
    export default index
```
  ## useState
      ReactHooks是使用useState来进声明状态值的，

      示例代码
```javaScript
   
   //ReactHooks 声明state状态
    const [age,SetAge] = useState(18);
    const [name,SetName] = useState('吴英');

    // 这里使用的是Es6的结构赋值
    //useState是react内置的一个函数，他只接受一个参数就是当前state的初始值，他返回一个数组，数组的第一项就是当前state的初始值，第二个是改变当前state的方法
    //useState的声明不能出现在判断语句中

    //传统react，声明state状态
    constructor(props){
        supper(props)
        this.state={
            name:'吴英',
            age:18
        }
    }
        //改变state
        this.setState({
            name:''
        })
```
  ## useEffect代替生命周期语法
     useEffect 相当于代替了componentDidMount和componentDidUpdate 两个声明周期函数，它接收一个回调函数，就是我们要在声明周期里要做的操作,同样useEffect的回调函数还有一个返回函数，就是组件解绑的时候要执行的函数,useEffect还有第二个参数是一个数组，数组里是我们自己在当前组件里定义的状态，只有当状态改变时才会执行解绑函数

      示例代码

```javaScript
 import { formatCountdown } from 'antd/lib/statistic/utils';
import React ,{useState,useEffect,Component} from 'react';
import {BrowserRouter as Router,Route,Link,Routes} from 'react-router-dom'

function Index(){
    useEffect(()=>{
        console.log('来了,老弟. ---index')
        return ()=>{console.log('走了老弟,---index')}
    })
    return (
        <div>
            index
        </div>
    )
}

function List(){
    useEffect(()=>{
        console.log('来了,老弟. ---List')
        //这里return的是解绑的函数
        return ()=>{
            console.log('老弟你走了,---list')
        }
    })
    return (
        <div>List</div>
    )
}
//使用reacthooks写法
function ExampleThree(){
    const [count , SetCount] =useState(0);
    useEffect(()=>{
        //这里的函数既代表了componentDidMount  和 componentDidUpdate
        console.log(`you count init and update ${count}`)
        //这里的第二个参数，是一个数组，只有当这个 第二个参数里的状态有变化时，会执行组件的解绑函数
    },[count])
    return (
        <div>
            <p>you click {count} time</p>
            <button onClick={()=>{SetCount(count+1)}}>change count</button>
            <Router>
                <ul>
                    <li>
                        <Link to='/'>首页</Link>
                    </li>
                    <li>
                        <Link to='/list'>列表</Link>
                    </li>
                </ul>
                <Routes>
                <Route path='/'  element={Index()}></Route>
                    <Route path='/list' element={List()}></Route>
                </Routes>
               
            </Router>
        </div>
    )
}
```

 ## useContext  父子组件传值

   首先我们需要引入createContext ,和useContext ，然后在父组件外部声明一个变量用createContext
   ()创建一个上下文环境
   ，然后在组件里使用  < createContext().Providr value ={要向子组件传递的值}> <子组件></子组件> </ createContext().Provider>
示例代码

```javaScript

import React ,{useState,useContext,createContext} from 'react';
//使用useContext 我们要进行引入
//使用reacthooks写法
const countText=createContext();
//首先我们要先声明一个变量，用于创建一个共享数据上下文的环境

function Child(){
    //在子组件里通过useContext进行接收
    const counts = useContext(countText)
    return (
        <h2>{counts}</h2>
    )
}
function Example(){
    const [count , SetCount] =useState(0);
    return (
        <div>
            <p>you click {count} time</p>
            <button onClick={()=>{SetCount(count+1)}}>change count</button>
             {/* 然后我们需要是用countText.Provider  这个组件用于向子组件传值 */}
                 {/* 然后在countText.Provider里写我们的子组件 */}
            <countText.Provider value={count}>
                <Child />
            </countText.Provider>
        </div>
    )
}
export default Example


```


  上述代码是两个组件在一个文件里的写法，如过子组件与父组件不在一个文件，那么我们就需要把createContext共享出去，写成一个公共的文件，然后在父组件里和子组件里分别使用


  示例代码

```javaScript
   //Context.js
     import {createContext} from 'react';
     const countText = createContext();
     export default countText;
   //Parernt.js

   import react ,{useState} from 'react';
   import ConText from './Context.js'
   import Child from './Child'
   function Parent(){
       const {count,SetCount}=useState(0);
       return (
          <div>
           <ConText.Provider value={count}> 
             <Child />
           </ConText.Provider>  
        </div>
       )
   }

   //Child.js
   import react , {useContext} from 'react'
   import Context from './Context'
    function Child(){
        const counts=useContext(Context)
        return (
            <div>{counts}</div>
        )
    }
   ```

   ## useReducer 状态管理函数
  useReducer 返回两个参数,一个是需要保存进usereducer的值，一个是dispatch
  接受两个参数，一个是通过dispatch触发时需要执行的函数,一个是保存数据的初始值
  dispatch触发的函数里接收两个参数一个是state,一个是action state就是保存的数据,action就是调用dispatch时传进来的参数。
  当我们需要改变数据时，只需要调用dispatch,给dispatch传递的参数就是希望状态做什么改变，然后在useReducer的参数传递进去的函数里对action做判断，操作改变state然后返回即可

   ```javaScript
  import React ,{useState,useReducer} from 'react';
//使用useReducer我们首先要进行引入
//使用reacthooks写法
function ExampleTwo(){
  //useReducer 返回两个参数,一个是需要保存进usereducer的值，一个是dispatch
  //  接受两个参数，一个是通过dispatch触发时需要执行的函数,一个是保存数据的初始值
  //dispatch触发的函数里接收两个参数一个是state,一个是action state就是保存的数据,action就是调用dispatch时传进来的参数
   const [count,dispatch]= useReducer((state,action)=>{
            switch(action){
                case 'add':
                 return state+1;
                case 'sub' :
                 return state-1;
                default: return state;
            }
   },0) 
    return (
        <div>
            <h1>{count}</h1>
            <button onClick={()=>{dispatch('add')}}>countadd</button>
            <button onClick={()=>{dispatch('sub')}}>countsub</button>
            {/* 当我们需要改变数据的时候，通过dispatch即可 */}
        </div>
    )
}
export default ExampleTwo
   ```

   ## 使用useContext和useReducer 实现类似Redux的效果

     useContext用来控制全局状态管理,useReducer 实现逻辑处理

     示例代码
```javaScript
  //color.js
  import React, { createContext ,useReducer} from 'react';

export const ColorContext = createContext({})
export  const UPDATE_COLOR='UPDATE_COLOR'
const reucer=(state,action)=>{
    switch(action.type){
        case UPDATE_COLOR :
             return action.color;
        default : return state;
    }
}
export const Color = props=>{
    const [color,dispatch]=useReducer(reucer,'blue');
    return (
        <ColorContext.Provider value={{color,dispatch}}>
            {props.children}
        </ColorContext.Provider>
    )
}

//Example.js
import react,{useContext} from 'react'
import {ColorContext} from './color'
function Index(){
    const {color}=useContext(ColorContext)
 return (
     <div style={{color:color}}>字体颜色为{color}</div>
 )
}
export default Index

//Buttons.js

import { useContext } from "react";
import {UPDATE_COLOR,ColorContext} from './color'
function Buttons(){
    const {dispatch} = useContext(ColorContext);
    return (
        <div>
            <button onClick={()=>{dispatch({color:'red',type:UPDATE_COLOR})}}>红色</button>
            <button onClick={()=>{dispatch({color:'green',type:UPDATE_COLOR})}}>绿色</button>
        </div>
    )
}
export default Buttons

//index.js

import react from 'react'
import Buttons from './Button'
import Example from './Example6'
import {Color} from './color'
function Index(){
 return (
     <div>
         <Color>
         <Example></Example>
        <Buttons></Buttons>
        </Color>
     </div>
 )
}
export default Index
```

## UseMemo  解决reacthooks的性能问题
 
   在原来的用class写的组件里，有一个声明周期函数 shouldComponentUpdate()  ,会在组件更新之前执行它，
   但是在ReactHooks里没有它，当我们组件更新时都会去执行useEffect,这样会影响我们的性能以及带来很多不必要的操作
   所以我们使用useMemo解决