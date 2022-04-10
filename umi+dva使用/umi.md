# umi
 ## 简介
   umi相当于react的路由，他给我们提供了路由，可以供页面进行切换

 ## 路由
   umi的路由方式相当于在pages目录下写页面，然后在.umisc.ts里进行配置
  ### 路由配置
```JavaScript
import { defineConfig } from 'umi';
import routes from  './routes'
export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  routes, //在routes这写路由的配置,我们可以把routes单独写成一个文件来写
  fastRefresh: {},
});

//routes文件

export default [
    {   title:"首页", // 路由的名称
        path:"/",component:"@pages/index",
        exact:true, //是否严格匹配
        routes:[
            {path:"/list",component:'xxxx'} //配置子路由
        ] 
    }
]

```
  ### 路由跳转
   路由跳转有两种方式

   1.可以引用history方法,利用history.push或者history.goBack进行跳转
   2.还可以利用Link标签进行跳转

 ###  约定式路由
     约定式路由就是不用我们去手写路由配置，只要我们在pages文件夹下有文件就会被解析成为路由
    
 ### _layout路由
    如果我们在pages文件夹下建立一个_layout文件那么，那么pages下的所有文件会出现layout组件，这个layout组件相当于一个公共组件,但是这个公共组件有两种一种是全局的公共组件，一种是局部的公共组件,不管使用哪种公共组件都需要在routes中去进行配置

```JavaScript
 //routes.tsx
   export default [
       {path :'/' , component : '@/layout/index' ,  //全局的公共组件
         routes:[
            {path:'/index',component:'@pages/Index/_layout'//局部的公共组件
              routes:[
                 {path:'/index',component:'@pages/Index/index'} 
              ]
            } 
         ]
       }
   ]
   

   //如果是局部的公共组件我们需要这样写

    // _layout.tsx
      export default function(props){
          return (
              <div>
                这里是局部的公共组件
                {props.children}
              </div>
          )
      }

      //全局的公共组件需要这样写
       // layout/index.tsx
      import {IRouteComponentProps} from 'umi';
      export default function({children,match,location,history,route}:IRouteComponentProps){
           return (
               <div>
                  这里是全局的公共组件
                  {children}
               </div>
           )
      }
```

### 404路由
  如果我们访问到了不存在的路由，那么我们可以跳转的404路由进行渲染,我们同样需要在routes中进行配置

  ```JavaScript
  //routes.tsx

  export default [
      {
          path:'/s',component:'@/pages/index'
      },
      {
          path:'/user',component:'@/pages/user'
      },
      {
          component:'@/pages/404'
      }
  ]
  //如果匹配不到/和/s和/user那么就会渲染404页面
  ```

  ## 插件
    umi是支持我们使用插件的，具体插件如何使用我们来看如何去进行umi+dva搭配使用

 ## mock
  umi里有一个mock文件夹，我们可以通过在mock文件夹下创建模拟数据

  注意umi打包之后是访问不了路由的，这是因为umi默认的是Broeser路由，我们需要在配置里将其切换为hash路由再将其进行打包，此时路由是可以正常使用的

  ```JavaScript
   // .umirc.ts
    import { defineConfig } from 'umi';
import routes from  './routes'
export default defineConfig({
   
  nodeModulesTransform: {
    type: 'none',
  },
  routes,
  fastRefresh: {},
  history:{
    type:'hash' //切换为hash
  }
});
  ```