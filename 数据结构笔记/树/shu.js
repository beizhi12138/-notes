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
// const dfs=(root)=>{
//   console.log(root.val),
//   root.children.forEach(dfs);
// }
// dfs(tree)
//广度优先遍历
const bfs=(root)=>{
    const q=[root]; //将对头入队
    while(q.length>0){
        const n=q.shift(); //将对头出队
        console.log(n.val); // 访问对头
        n.children.forEach(child => {
            q.push(child)//将对头的child入队
        });
    }
}
bfs(tree)