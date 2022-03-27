import obServers from './observes.js'
function observe(value){
    if(typeof value != 'object'){return} //如果传进来的不是一个对象那么我们直接return回去，也就是相当于到最终的子节点了
    let ob;
    if(typeof value.__ob__ !== 'undefined'){
       ob=value.__ob__;
    }else{
        ob = new obServers(value);
    }
  return ob;
}
export default observe;