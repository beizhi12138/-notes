# vue-loader
  loader在webpack里是用来做编译的，这就可以理解vue-loader是帮助我们把我们写的vue组件编译成js文件(因为我们的浏览器是识别不了我们的vue组件的)
# vue-loader的index.js

 vue-loader的index.js导出了一个函数,函数接收一个参数，这个参数就是要转换的文件的内容
```JavaScript
  module.exports = function (source) {
  //source就是传入的文件(传入的文件里的所有代码)
  //........
  }
```
  导出的这个函数里也有this,这个this是webpack注入给我们的