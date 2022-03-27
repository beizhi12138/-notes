import def from './util.js'
// 为了实现对数组的监听所以我们要有一个Array.js
//vue里对数组的七个方法进行了改写
const ArratMethods=[
    'pop',
    'shift',
    'push',
    'unshift',
    'sort',
    'splice',
    'reverse'
]
//首先我们需要保存原函数方法
const ArrayPrototype=Array.prototype;
//然后保存以下这七个方法
const ArrayChangeMethods=Object.create(ArrayPrototype);

ArratMethods.forEach(item => {
     //对这个七个方法进行改写
     //先保存原方法
     const orginl=ArrayPrototype[item];
     def(ArrayChangeMethods,item,function(){
         //我们已经实现了给数组的每一项添加响应式，但是数组的push,unshift,splice等方法是能够给数组添加元素的
         //所以我们如何给数据通过push进来的元素添加响应式呢?
         const args=[...arguments]  //因为arguments是一个伪数组我们不能直接使用他
         let insertArray=[];  //首先建立一个空数组用来存储push等方法进行的元素
         let ob=this.__ob__ ; //保存ob用来给push进来的元素添加响应式
         switch(item){
             case 'push':
             case 'shift':
                 insertArray=args
                 break;
             case 'splice' :
                 insertArray=args.splice(2)  //splice方法有些特殊，可以查看splice的方法
         }
         if(insertArray.length){
             //给push进来的元素添加响应式
             ob.ArrayObserve(insertArray);
         }
         console.log('啦啦啦');
         //不能直接调用orginl，因为直接调用指向的是window，然后window是空的
        const result= orginl.apply(this,arguments);
        return result;
     })
});
export default ArrayChangeMethods