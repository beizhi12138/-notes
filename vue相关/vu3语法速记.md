## vue3新语法

### 设置props

```TypeScript
//vue2
esport default{
    props:["需要接收的props"]
}
//vue3 
definePropos<{msg:String}>();
//用来接收prop 上边的是Ts的泛型写法
```
### 创建App

```TypeScript
//vue2 
return new Vue({
    //配置
})
//vue3
import {createApp} from "vue";
import App from "./App.vue";
createApp(App).mount("挂载根节点");
```
### 指令

#### 插值

```html
{{data中的数据}}
```
#### v-bind

v-bind 还是vue2的语法
绑定多个值
```ts
const objectofAttrs={id:"1",class:"wrapper"}

<div v-bind="objectofAttrs"></div>
```
### 数据双向绑定

```ts
//vue2

export default {
    data(){
        return {
            数据
        }
    }
}
//vue3
```