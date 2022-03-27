import defineReactive from './defineReactive.js';
import def from './util.js'
import ArrayChangeMethods from './Array.js'
import observe from './observe.js'
class observer {
    constructor(value){
        console.log('触发了observer');
        //这个def是为了给最初传进来的根节点添加响应式
         def(value,'__ob__',this);
         if(Array.isArray(value)){
           //如果传进来的是数组，那么就强制改变他的原型链指向
           Object.setPrototypeOf(value,ArrayChangeMethods);
           //如果数组的子元素还是数组，那么我们需要给他的子元素也添加observe，实现响应式
           //这样我们就实现了给数组的每一项添加响应式
           this.ArrayObserve(value);
         }else{
         //给他的根节点添加响应式
         this.walk(value);
         }

    }
    walk(value){
          for(let k in value){
                defineReactive(value,k);
          }
    }
    ArrayObserve(arr){
          for(let i=0,l=arr.length;i<l;i++){
             observe(arr[i]);
          }
    }
}
export default observer