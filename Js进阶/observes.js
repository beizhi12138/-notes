import def  from './unils.js'
import defineReactive from './defineReactive.js';
import ArrayMethods from './Array.js';
import observe from './observe.js';
import Dep from './Dep.js'
class obServer {
    constructor(value) {
        //实现每一个observer都有一个dep
        this.dep=new Dep();
        def(value,'__ob__',this);
        //  console.log('我是observe构造器',value);
         //对子节点进行defineReactive;
         //Array.isArray 方法是判断类型是不是数组
         if(Array.isArray(value)){
             // 如果是数组的话就将他的原型链强行指向ArrayMethods
              //Object.setPrototypeOf,是强行改变某个东西的原型链方法
            Object.setPrototypeOf(value,ArrayMethods);
            //为了防止数组的某一项又是一个数组，所以我们需要对数组的每一项再添加以下observe(实现对数组里的每一项的监听);
            this.ObserveArray(value);
         }else{
            this.walk(value);
         }        
    }
    walk(value){
        for(let k in value){
            defineReactive(value,k);
        }
       
    }
    ObserveArray(arr){
        //这样别管数组里嵌套多少数组，我们都能实现监听
        for(let i=0,l=arr.length;i<l;i++){
              observe(arr[i]);
        }
    }
}
export default obServer