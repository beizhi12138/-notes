// const bt=require('./bt');
// const tree= {
//     val:'a',
//     children:[
//         {
//             val:'b',
//             children:[
//                 {
//                     val:'d',
//                     children:[]
//                 },
//                 {
//                     val:'e',
//                     children:[
//                         {
//                             val:'h',
//                             children:[]
//                         }
//                     ]
//                 }
//             ]
//         },
//         {
//             val:'c',
//             children:[
//                 {
//                     val:'k',
//                     children:[]
//                 },
//                 {
//                     val:'f',
//                     children:[
//                         {
//                             val:'g',
//                             children:[]
//                         }
//                     ]
//                 }
//             ]
//         }
//     ]
// }
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
// const PostOrder=(root)=>{
//     if(!root){return}
//     PostOrder(root.left);
//     PostOrder(root.right);
//     console.log(root.val);
// }
// PostOrder(bt);


//遍历json所有节点
const json={
    a:{b:{c:1}},
    d:[1,2]
}
const dfs=(root,path)=>{
    console.log(root,path);
    //Object.keys(json)  参数是一个节点，返回此节点的所有子节点
   Object.keys(root).forEach(k=>{
      dfs(root[k],path.concat(k))
   }) 
}
dfs(json,[])














// const arr=[
//     {id: 5, name: '部门5', pid: 4},
//     {id: 1, name: '部门1',pid: 0},
//     {id: 2, name: '部门2', pid: 1},
//     {id: 4, name: '部门4', pid: 3},
//     {id: 3, name: '部门3', pid: 1},
 
// ];
// const res=[
//     {
//         id:1,
//         name:'部门1',
//         pid:0,
//         children:[
//             {
//                 id:2,
//                 name:'部门2',
//                 pid:1
//             },
//             {
//                 id:3,
//                 name:'部门3',
//                 pid:1,
//                 children:[
//                     {
//                         id:4,
//                         name:'部门4',
//                         pid:3,
//                         children:[{
//                             id:5,
//                             name:'部门5',
//                             pid:4
//                         }]
//                     }
//                 ]
//             }
//         ]
//     },
    
// ]
// const MySet={};
// const tree={}
// for(let item in arr){
//     MySet[arr[item].id]=arr[item];
// }
// for(let i in MySet){
//     if(MySet[i].pid){
//         //判断寻找父节点如果有判断父节点里是否已经有children；
//         if(!MySet[MySet[i].pid].children){
//             //如果父节点里没有child人则向父节点里添加children
//             MySet[MySet[i].pid].children={};
//         }
//          //将自己放到父节点的children里边
//         MySet[MySet[i].pid].children[MySet[i].id]=MySet[i];
//     }else{
//         //如果没有父节点，在向tree里添加
//        tree[MySet[i].id]=MySet[i]
//     }
// }
// console.log(tree)
    //扁平化转树，第一项的pid一定要为0，然后在tree进行存储(tree里边存储的是引用类型的地址，
    // 所以在改变引用类型时，tree也会改变)，然后开始带着子节点寻找父节点
    // 然后向父节点的children里添加