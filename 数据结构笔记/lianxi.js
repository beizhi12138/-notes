// 二叉树的广度、深度遍历(递归)
const bt=require('./树/bt');
//深度优先遍历(递归)
// const dfs=(n)=>{
//  console.log(n.val);
//  if(n.left)dfs(n.left);
//  if(n.right)dfs(n.right);
// }
// dfs(bt);
//非递归
// const  stack=[bt];
// while(stack.length){
//     const n=stack.pop();
//     console.log(n.val);
//     if(n.right){stack.push(n.right)}
//     if(n.left){stack.push(n.left)}
  
// }
//广度优先遍历(递归)
const q=[bt];
while(q){
    const n=q.shift();
    if(n.left)q.push(n.left);
    if(n.right)q.push(n.right);
}