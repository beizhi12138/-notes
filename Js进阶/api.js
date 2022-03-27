import axios from 'axios'

// // 设置axios的请求头
axios.defaults.baseURL='http://static0.nodejs.cn' //设置地址
// axios.defaults.headers['content-type']='application/x-www-form-urlencoded'
// //设置拦截器，再每一次请求发起都携带token
if(!axios.prototype.map){
    axios.prototype.map=new Map();
}
axios.interceptors.request.use(config=>{
     
    const url=config.url
    const map=axios.prototype.map
      //新建一个map ，每次发起请求，就向map里存储数据，url为键,请求次数为值
        // //每次调用请求前，传需要请求的次数，比如希望urlA请求三次就取消，则穿count为3
       if(map.has(url)){
           console.log(1)
          const count=map.get(url);
          map.set(url,count+1)
       }else{
           map.set(url,1)
           console.log(map)
       }
      
        if(map.get(url) == 3){
         source.cancel('Operation canceled by the user.');
        }
        let token='' //获取到token
     if(token) config.headers.Authorization=token;
     return config;
})
axios.interceptors.response.use(response=>{
  //请求成功直接返回数据
   if(response.status == 200){
    return response.data
   }
    
},error=>{
    let {response} = error
    if(response){
        switch(response.status){
            case 404 : 
             break
        }
     //在这里处理请求异常页面
    }else{
        // if(!window.navigator.online){
        //     //客户端断网，直接跳转断网页面
        //     return 
        // } 
        return Promise.reject(error);
        //服务器返回的不是结果是一个promise
    }
})
class Api{
    constructor(){
        //或者就是在这里写公共的请求头，以及token，
        this.config={}
        this.CancelToken = axios.CancelToken;
        this.source = this.CancelToken.source();
    }
    get(url){
       return  axios.get(url,{
           cancelToken:this.source.token
       })
    }
    Post(url,data){
        // return axios.post(url,data,this.config)
      return axios.post(url,{
            ...data,
            cancelToken:this.source.token
        
      })
    }
    delete(url,data){
        return axios.delete(url,{
           
            ...data,
            cancelToken:this.source.token
        
      })
    }
    put(url,data){
        return axios.put(url,{
            ...data,
            cancelToken:this.source.token
      })
    }
}
export default Ap