# assert
  ## 什么是assert
     assert是一种断言库,是一种用来做单元测试的工具，断言库是单元测试的重要组成部分，在编写单元测试代码时，通过断言库来描述代码逻辑的预期效果，从而验证代码逻辑的正确性。
  ## 什么是单元测试
      维基百科是这样解释的:单元测试是针对程序的最小单元，比如变量，来进行正确性检验的测试工作。程序单元是应用的最小可测试部件。一个单元可能是单个程序、类、对象、方法等
  ## 前端为什么需要单元测试
     必要性：JavaScript 缺少类型检查，编译期间无法定位到错误，单元测试可以帮助你测试多种异常情况。
     正确性：测试可以验证代码的正确性，在上线前做到心里有底。
     自动化：通过 console 虽然可以打印出内部信息，但是这是一次性的事情，下次测试还需要从头来过，效率不能得到保证。通过编写测试用例，可以做到一次编写，多次运行。
     保证重构：互联网行业产品迭代速度很快，迭代后必然存在代码重构的过程，那怎么才能保证重构后代码的质量呢？有测试
     用例做后盾，就可以大胆的进行重构。
  ## 断言库和测试框架的区别
      断言是用来测试某些变量或者函数执行的结果是否正确(与预期结果是否一致)
      测试框架是用来组织和执行测试 
      常见的断岩库: assert,should,mocha
      常见的测试框架:jest,mocha
      glup执行单元测试也需要安装测试框架后运行
  ## assert的使用
   ### ok
    ok方法接收两个参数，第一个参数是条件，第二个参数为报错信息，如果条件成立则不报错，条件不成立则报错并输出报错信息
```JavaScript
          const add=(a,b)=>{
               return a+b
            }
               Assert.ok(add(1,2) == '4' ,'1+2等于三');
               Assert(add(1,2) == '4' ,'1+2等于3');
```
   ### equal
      equal方法接收三个参数，第一个参数是，实际值，第二个参数是预期值，第三个参数是报错信息
       实际值与预期值不相等
```JavaScript
   const add=(a,b)=>{
               return a+b
            }
               Assert.equal(add(1,2) ,'3','1+2等于三');
```
  ### notEqual

    notEqual与equal方法相反，如果实际值等于预期值则会进行报错

```JavaScript
    const add=(a,b)=>{
               return a+b
            }
               Assert(add(1,2) == '3' ,'1+2等于3');
```

  ### deepEqual

     deepEqual方法用来判断数组和对象的值是否一致，接收三个参数，第一个参数是实际值，第二个参数是预期值，第三个参数是报错信息

```JavaScript
 const obj1={a:1,b:2};
 const obj2={a:1,b:2};
 const arr1=[1,2,3];
 const arr2=[1,3,4]
 Assert.deepEqual(obj1,obj2,'属性不一致')
 Assert.deepEqual(arr1,arr2,'属性不一致')
```
 ### notDeepEqual
    notdeepEqual方法与deepEqual方法正好相反,如果属性一致则会进行报错

```JavaScript
   const obj1={a:1,b:2};
 const obj2={a:1,b:2};
 const arr1=[1,2,3];
 const arr2=[1,3,4]
 Assert.notDeepEqual(obj1,obj2,'属性不一致')
 Assert.notDeepEqual(arr1,arr2,'属性不一致')
```
### strictEqual  and notStrictEqual
   strictEqual 是用严格模式来判断数据 
   notStrinctEqual 不用严格模式来判断数据

```JavaScript
   Assert.strictEqual(1,'1','实际值与预期值不一致')  //因为使用严格模式所以会报错
   Assert.notStrictEqual(1,'1','实际值与预期值不一致') //不使用严格模式不会报错
```
### throws
  预期某个函数会抛出错误，如果抛出错误且与预期的错误一致则不进行报错，不抛出错误则进行报错
   接收三个参数，预期的函数，预期抛出的错误，报错信息

```JavaScript
//与预期抛出的错误一致不进行报错
   Assert.throws(()=>{

      throw new Error("Wrong value");

    },
    Error,
    '不符合预期的错误类型'
  );
```

### doesNotThrows
   与throws方法相反，预期某个函数不抛出错误
   接收两个参数，预期执行的函数，报错信息
```JavaScript
Assert.doesNotThrow(()=>{
    throw 'aa';
},'预期不抛出错误')
//   doesNotThrow预期代码块不抛出错误，如果抛出错误则会报错
```

### ifError

  ifError方法就是用来输出错误的
  接收一个参数，参数如果是undefinde || null 则不报错 如果不是undefined || null 则进行报错并输出参数

```JavaScript
   Assert.ifError(null)  //不进行报错
   Assert,.ifError('错了') //进行报错，并且输出报错信息
```

### CallTracekr 类
  CallTracker是assert的一个类，使用的时候需要先进行实例化，这个类是用来进行判断函数调用的次数，如果未达到预期次数则进行报错，需要配合process使用

```JavaScript
 const track=new Assert.CallTracker();
 const call=()=>{
     console.log(1);
 }
 const aa=track.call(call,1); //设置函数需要调用的次数
 aa();
 process.on('exit',()=>{
      track.verify();
 })
//  函数必须在track.verify之前调用够设置的次数，如果为调用够则进行报错
```

## 简单使用test测试
  因为node没有内置test模块，虽然node18有test模块但是只是实验性的，
 
```JavaScript
// 运行以下代码node版本需要为18
const test=require('node:test')
 test('报错的代码',()=>{
    Assert.strictEqual(1,2) //会报错因为抛出了异常
})
 
```
