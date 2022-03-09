const bt=require('./bt');
const tree= {
    val:'a',
    children:[
        {
            val:'b',
            children:[
                {
                    val:'d',
                    children:[]
                },
                {
                    val:'e',
                    children:[
                        {
                            val:'h',
                            children:[]
                        }
                    ]
                }
            ]
        },
        {
            val:'c',
            children:[
                {
                    val:'k',
                    children:[]
                },
                {
                    val:'f',
                    children:[
                        {
                            val:'g',
                            children:[]
                        }
                    ]
                }
            ]
        }
    ]
}
//深度优先遍历
// const shendu=(root)=>{
//     console.log(root.val);
//     root.children.forEach(shendu);
// }
// shendu(tree);
//广度优先遍历
// const gaungdu=(root)=>{
//      const numArr=[root];
//      while(numArr.length >0){
//       const n=numArr.shift();
//          console.log(n.val);
//          n.children.forEach(child => {
//               numArr.push(child)
//          });
//      }
// }
// gaungdu(tree)
//二叉树的先序遍历
// const preOrder=(root)=>{
//     if(!root){return}
//     console.log(root.val);
//     preOrder(root.left)
//     preOrder(root.right)
// }
// preOrder(bt);
//二叉树的中序遍历
// const inorder=(root)=>{
//     if(!root){return}
//    inorder(root.left);
//    console.log(root.val);
//    inorder(root.right);
// }
// inorder(bt)
//二叉树的后序遍历
const PostOrder=(root)=>{
    if(!root){return}
    PostOrder(root.left);
    PostOrder(root.right);
    console.log(root.val);
}
PostOrder(bt);