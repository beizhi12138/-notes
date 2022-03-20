const root=require('./bt');
// 递归版
// const postOrder=(root)=>{
//     if(!root){return}
//    postOrder(root.left);
//    postOrder(root.right);
//    console.log(root.val);
// }
//递归
const postOrder=(root)=>{
    const  stack=[root];
    const outputstack=[];
    while(stack.length){
       const n=stack.pop();
       outputstack.push(n);
       if(n.left) stack.push(n.left);
       if(n.right) stack.push(n.right); 
    }
    console.log(outputstack)
    // while(outputstack.length){
    //     const p=outputstack.pop()
    //     console.log(p.val)
    // }
}






 postOrder(root);