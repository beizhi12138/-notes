import observe from './observe.js'
const obj={
    a:{
        b:{
            c:{
                m:1
            }
        }
    },
    d:{
        e:{
            f:2
        }
    },
    g:[[1],2,[3]]
}
observe(obj);
obj.g.push(1);
obj.g.push([6,4])
// obj.a.b=10;
console.log(obj.g);
// 为了解决这个相应式我们需要一个observer类(将data的子节点都添加上响应式)，一个observe(是为了判断我们传进来的根节点)方法

