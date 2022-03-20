const bt=require('./bt');

//递归
// const preorder=(root)=>{
//     if(!root){return};
//     console.log(root.val);
//      preorder(root.left);
//      preorder(root.right);

// }


//非递归版
 const preorder=(root)=>{
     const stack=[root];
     while(stack.length){
        const n=stack.pop(); //先访问根节点
         console.log(n.val);
        if(n.right) stack.push(n.right) ; //根据栈后进先出的特性，先将右节点放入栈
        if(n.left) stack.push(n.left) ; // 根据栈后进先出的特性，后将左节点放入栈
     }
    
 }
preorder(bt);