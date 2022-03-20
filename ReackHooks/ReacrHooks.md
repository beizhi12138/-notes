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
     useEffect 相当于代替了componentDidMount和componentDidUpdate 两个声明周期函数，它接收一个回调函数，就是我们要在声明周期里要做的操作

      示例代码

```javaScript


                                                            