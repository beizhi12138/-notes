// var obj={name:'whiy'};
// var info ={name:'info',friend:obj};
// var p={name:'p',friend:obj};


// //闭包
// function foo(){
//     var name='foor'
//  function bar(){
//      console.log('bar',name);

//      //这里其实就是闭包，
//  }
//  return bar;
// }
// const fn=foo();
// //当我们的foo执行完之后它的上下文环境是该被销毁的,包括name变量，但是我们在bar里面依旧能够访问name，这就是闭包
//为什么foo的上下文环境没有被销毁,因为bar函数里引用了foo里的变量，所以它不会被销毁
//  fn();