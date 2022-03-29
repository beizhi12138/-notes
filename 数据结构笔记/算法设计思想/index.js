//回溯算法练习
// 全排类
const arr=[1,2,3];
const res=[];
const def=(path)=>{
    if(path.length == arr.length){
        res.push(path);
        return 
    }
  arr.forEach(n=>{
      if(path.includes(n)){return ;}
       def(path.concat(n));
  })
}
def([]);
console.log(res);