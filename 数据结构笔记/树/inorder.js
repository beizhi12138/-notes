const bt=require('./bt');
// 递归
// const inorder=(root)=>{
//     if(!root){return};
//     inorder(root.left);
//     console.log(root.val);
//     inorder(root.right);
// }

//非递归
const inorder=(root)=>{
    const stack =[]; //先声明一个栈
     //先访问左节点，访问左节点需要用到一个指针
     let p=root;
     while(stack.length || p){
        while(p){
            stack.push(p); //根据栈后进先出的特性我们需要先把根节点推入栈中，然后依次把左节点放入栈中，这样先访问的就是左节点
            p=p.left
        }
        const n=stack.pop();
        console.log(n.val) // 访问跟节点
        p=n.right //访问右节点
     }
    
}
inorder(bt)