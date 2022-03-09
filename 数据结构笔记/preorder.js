const bt=require('./bt');
console.log(bt)
const preorder=(root)=>{
    if(!root){return};
    console.log(root.val);
     preorder(root.left);
     preorder(root.right);

}
preorder(bt);