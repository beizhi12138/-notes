// const MaP=new Map();
// //增
// MaP.set('a','aa');
// MaP.set('b','bb')
// //删除  delete
// MaP.delete('a');
// // get   查 
// MaP.get('a')
// // set 改
// MaP.set('b','ccc')
// 两个数组的交集

// const maps=new Map();
// nums1.forEach(item=>{
//     maps.set(item,true);
// })
// const res=[];
// nums2.forEach(items=>{
//   if(maps.get(items)){
//       res.push(items)
//       maps.delete(items);
//   }
// })
// return res

//有效的符号  此处利用栈和字典结合
const stack = []; //声明一个栈 
const Maps=new Map();
Maps.set("(",')');
Maps.set('[',']');
Maps.set('{','}');
function fh(s){
    if(s.length % 2 != 0 ){return false}
  for(let i=0;i<s.length;i++){
      const c=s[i]
      if(Maps.has(c)){
          stack.push(c)
      }else{
         
          const top = stack[stack.length-1];
          if(Maps.get(top) === c){
              stack.pop()
          }else{
              return false
          }
      }
  }
  return stack.length  == 0
}
console.log(fh('({[}])'))