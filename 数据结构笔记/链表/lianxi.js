// const a={val:'a'};
// const b={val:'a'};
// const c={val:'c'};
// const d={val:'c'};
// a.next=b
// b.next=c
// c.next=d
//循环链表
// let q=a
//  while(q){
//      console.log(q.val);
//      q=q.next
//  }
//插入链表
// const e={val:'e'}
// c.next=e;
// e.next=d;
//删除链表 //删除链表的操作相当于直接改变next指向
// a.next=c
//反转链表
// let p1=a;
// let p2=null;
// while(p1){
//     const tmp=p1.next;
//     p1.next=p2;
//     p2=p1;
//     p1=tmp;
  
// }
// 删除链表中重复的元素 //链表是一个有序的链表，且重复的元素相邻
// function Del(head){
//     let p=head;
//     while(p && p.next){
//         if(p.val === p.next.val){
//             p.next=p.next.next
//         }else{
//             p=p.next;
//         }
//     }
//     return head;
// }
// let cc=Del(a)

 //JS中的原型链
//  const obj={};
//  const func=()=>{}
//  Function.prototype.y='y'
//  Object.prototype.x='x'

//模仿instanceof
// const instanceofs=(A,B)=>{
//  let p=A
//  while(p){
//      if(p == B.prototype){
//          return true
//      }
//    p=p.__proto__
//  }
//  return false
// }
// 使用链表指针获取json节点的值
const json={
    a:{b:{c:1}},
    b:{e:{f:2}}
}
const patha=['a','b','c'];
const pathb=['b','e','f']
let p=json;
pathb.forEach(k=>{
    p=p[k]
})
