import Observer from './observer.js'
function observe(value){
    if(typeof value != 'object'){
        return //如果不是对象直接return出去
    }
    let ob
    if(typeof value.__ob__ != 'undefined'){
        ob=value.__ob__;
    }else{
      ob = new Observer(value);
    }
    return ob;
}
export default observe