import def  from './unils.js'

//pop(删除数组的最后一项并返回);
//push(向数组的末尾添加元素)
//shift(删除数组的第一项并返回);
//unshift(向数组头部添加元素);
//sort(排序);
//splice();
//reverse(反转)

//vue对这七个数组进行了改写，但是我们进行改写之后既希望他添加响应式，又希望他执行原来的操作对数组进行改变
//所以我们需要复制原来的方法，以便于在改写的时候进行调用

//首先得到array的prototype
const arrayPrototype=Array.prototype
// 以Array.prototype为原型创建一个Arraymethods 对象
const ArrayMethods = Object.create(arrayPrototype);
const ArrayNeddChange=[
    'pop',
    'push',
    'shift',
    'unshift',
    'sort',
    'splice',
    'reverse'
]
//备份原来的方法
ArrayNeddChange.forEach(MethodItem   => {
  const orignl=arrayPrototype[MethodItem];
  def(ArrayMethods,MethodItem,function(){
               //现在我们已经实现了对数组的监听，但是假设我们现在对数组里在push一个数组 我们是监听不到的，那么现在怎么办呢，
      //所以我们现在需要把当前的__ob__ 取出来
      // console.log(this)
      const ob=this.__ob__;
      //__ob__ 是怎么来的呢,比如obj.g属性是一个数组，他在我们对obj实现监听的时候已经添加了__ob__,所以当我们调用Arrmethods里函数的
      //时候，他当前的this是指向obj.g的，就是当我们obj.g.push() 的时候当前我们的this是指向obj.g的

      //现在push,unshift,splice 是能够插入新的元素的，我们需要给新的元素也实现监听，实现也有obsever的
      // console.log('啦啦啦');
    const args=[...arguments]
    let newinserted=[];
    switch(MethodItem){
        case 'push' :
        case 'unshift':
            newinserted=args
            break;
        case 'splice' :
            newinserted=args.splice(2);
            break;
    }
    if(newinserted.length){
        ob.ObserveArray(newinserted)
    }
    //在这里实现数组如果改变，也通过dep
    ob.dep.notify();
      //回复原来的功能
      //因为我们直接调用originl方法他会去window里找这个方法
      //所以我们为了能执行原来的方法，就改变函数的this指向
    const result=  orignl.apply(this,arguments);
    return result;
    //return result 是为了shift方法是返回删除的数组，所以我们需要在这个改写的地方返回
  })
})
export default ArrayMethods