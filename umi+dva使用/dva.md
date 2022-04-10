# 简介
  dva是用来进行状态管理的(umi内置的有dva所以我们不需要另外再引入dvfa)

## 使用dva
  使用dva我们首先要在umi的src下创建一个model文件夹，用来管理我们的状态

  ```JavaScript
   //modules/system
   export default {
        // models命名空间，需全局唯一
    namespace: 'system',           
    // models存储的数据store                  
    state: {
        dataList: 1,
        lists:2
    },      
    // 更新store，用新数据合并state的旧数据                                
    reducers: {
        Lists(state,{payload}){
            return {...state,...payload}
        },
        save(state, {payload}) {                    
           
            // console.log(state);
            // console.log(payload);
             return { ...state,...payload};
        },
      
    },
   }
   // 在组件中使用
   import {connect} from 'umi';
    export default Index=(props)=>{
      return (
          <div>{props.system.dataList}</div>
      )
    }
   connect(({ system }) => ({ system }))(Index)
  ```

