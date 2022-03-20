class MyPromise{
    constructor(executor) {
         //executor 是new promise((reslove,reject)=>{})传入的参数，传入就执行
         // 因为excutor时传入两个参数，reslove,reject,可执行
         // promise 有三个状态，pendding(等待),fulfiled(成功),reason(失败)
         this.state='pendding'  //初始化为等待
         this.value=undefined //成功的值
         this.reason=undefined
         let reslove=(value)=>{
             //若是成功，状态只能从pendding转为fulfiled，
           if(this.state == 'pendding'){
            // pendding转为fulfiled
            this.state='fulfiled';
            this.value=value ;  //接受成功的参数
           }
         }
         let reject = (reason)=>{
                        //若是失败，状态也只能从pendding转变未reason
                        if(this.state == 'pendding'){
                            this.state='reason'
                            this.reason=reason //接收失敗的原因
                            
                        }
         }
         //因为excutor传入就执行所以立即调用
         executor(reslove,reject)
    }
}