import Dep from "./Dep.js";
import observe  from "./observe.js";
function defineReactive(data,key,val){
    //在这里呢我们需要有一个dep来进行在set的时候通知watcher(这里是对对象的，如果是数组，我们也需要在Array.js里也有一个dep.notify)
    const dep=new Dep();
    if(arguments.length == 2){
        val=data[key];
        //arguments 是函数的隐藏参数，他只有一个length属性，length =x  x就是函数的形参的个数 
    }
    let childob=observe(val);
    // console.log('我是defineReactive',data,val);
   Object.defineProperty(data,key,{
    get(){
        // console.log('你正在尝试访问')
        return val;
    },
    set(value){
        // console.log('你正在尝试修改',value);
        childob=observe(value);
        val=value;
        dep.notify();
    }
   })
}
export default defineReactive