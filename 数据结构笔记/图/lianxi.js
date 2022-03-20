const graph=require('./graph');
const Myset=new Set(); //因为不需要访问已经访问过的节点，所以我们用到集合来进行判断

//深度优先遍历
// const dfs=(root)=>{
//   console.log(root); //访问根节点
//    Myset.add(root);//将访问过的节点添加到集合中
//     graph[root].forEach(k => {  //访问根节点的相邻节点
//          if(!Myset.has(k)){ //判断是否为根节点未访问过的相邻节点
//            dfs(k); // 对根节点未访问过的相邻节点进行访问
//          }
        
//     });

// }
// dfs(1);

//广度优先遍历
const q=[2];
Myset.add(2);//由于根节点已经入队那么我们默认他已经访问过
while(q.length){
    const n=q.shift();
    console.log(n);
    graph[n].forEach(k=>{
        if(!Myset.has(k)){
            q.push(k);
            Myset.add(k) //入队我们即视为访问过
        }
    })
}