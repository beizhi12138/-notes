const root=require('./bt');
const postOrder=(root)=>{
    if(!root){return}
   postOrder(root.left);
   postOrder(root.right);
   console.log(root.val);
}
postOrder(root);