# babel-loader
 babel-loader是用来将Es6语法转换成Es5语法，看源码之前我们看一下前端为什么要进行构建和打包
 ## 为什么要进行构建和打包
   1.使得代码体积率更小,加载更快
   2.编译高级语法(ts,模块化)
 ## webpack的打包流程
   1.初始化参数，读取合并参数
   2.用上一步得到的参数,得到Compiler(文件)参数,加载所有配置的插件，执行对象的run方法
   3.确定入口文件
   4.编译模块,从入口文件触发，调用所有的文件配置的loader,编译模块,找到模块依赖的模块递归编译,直到所有文件都经过loader的编译。
   5.完成模块编译：在经过第 4 步使用 Loader 翻译完所有模块后,得到了每个模块被翻译后的最终内容以及它们之间的依赖关系。 
   6.输出资源：根据入口和模块之间的依赖关系,组装成一个个包含多个模块的 Chunk,再把每个 Chunk 转换成一个单独的文件加入到输出列表,这步是可以修改输出内容的最后机会。  
   7.输出完成：在确定好输出内容后,根据配置确定输出的路径和文件名,把文件内容写入到文件系统。
 
 ## babel是什么
   babel是将高级语法编译成低级语法的工具，webpack通过babel-loader使用babel

 ## babel的工作流程
   1.先将代码转换成token
   2.再把token转换成AST语法树(babel-parse将代码转换成Ast语法树)
   3.变换，对ASt进行转换处理(babel-taraves提供遍历语法树节点的能力)
   4.输出代码(babel-generator转换成目标代码，并打印代码)
 ## 什么是AST(抽象语法树)
  无论使用什么编程语言，都要经过自己的解释器或者编译器，将代码转换成语法树，然后再将语法树转换成计算机可以识别运运行的代码，

  ### 抽象语法树
    抽象语法树就是以树状的语言表示代码结构，树上的每一个节点都代表一个语法结构

```javaScript
//JS代码
  var a=1;
//转换成语法树后
AST={
   type: Program,
   body:{
       type: VariableDeclaration,
       declarations:{
          type: VariableDeclarator,
          id:{
             type: Identifier
             name: a
       },
       init:{
             type: Literal
             value: 1
             raw: 1
             kind: var
         }
      }
    }
   sourceType: script
}

```

 语法树的用途:
    JSLint、JSHint对代码错误或风格的检查等
    webpack、rollup进行代码打包等
    CoffeeScript、TypeScript、JSX等转化为原生Javascript
    vue模板编译、react模板编译
    包括我们使用的VsCode插件使得代码高亮也使用的语法树

# babel-loader源码解析