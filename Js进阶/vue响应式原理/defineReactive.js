import observe from "./observe.js";
function defineReactive(data,key,val){
    if(arguments.length == 2){
        val=data[key];
    }
    let childob=observe(val);
 Object.defineProperty(data,key,{
     get(){
         console.log('正在被访问');
         return val;
     },
    set(value){
        console.log('正在被修改');
        console.log(value);
       val=value;
       childob=observe(value);
    }
 })

}

export default defineReactive