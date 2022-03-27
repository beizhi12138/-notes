class Promise {
    constructor(excutor) {
        this.state = 'pendding';
        this.value = undefined;
        this.reason = undefined;
        this.successArr = [];
        this.errorArr = [];
        let reslove = (value) => {
            if (this.state == 'pendding') {
                this.state = 'success';
                this.value = value;
                this.successArr.forEach(fn => {
                    fn();
                })
            }
        }
        let reject = (error) => {
            if (this.state == 'pendding') {
                this.state = 'error'
                this.reason = error;
                this.errorArr.push(fn => {
                    fn();
                })
            }
        }
        try {
            excutor(reslove, reject)
        } catch (error) {
            reject(error)
        }
    }
    then(success, error) {
        let promise2 = new Promise((reslove, reject) => {
            if (this.state == 'success') {
              const x=success(this.value);
              reslovePromise(promise2,x,reslove,reject);
            }
            if (this.state == 'error') {
               const x=error(this.reason);
                reslovePromise(promise2,x,reslove,reject);
            }
            if (this.state == 'pendding') {
                this.successArr.push(()=>{
                    let x=success(this.value);
                    reslovePromise(promise2,x,reslove,reject);
                });
                this.errorArr.push(()=>{
                    let x=error(this.reason);
                    reslovePromise(promise2,x,reslove,reject);
                });
            }
        });
    return promise2
    }
}
const reslovePromise = () => {
 if( x === promise2){return reject(new TypeError('错误'))}
 if(x != null && (typeof x == 'object' || x == 'function')){
     let then=x.then;
     if(typeof then == 'function'){
         then.call(x,y=>{
             reslovePromise(promise2,y,reslove,reject);
         },err=>{
             reject(err)
         })
     }else{
         reslove(x);
     }
 }else{
     reslove(x);
 }
}

Promise.all=(promises)=>{
    let arr=[];
     return new Promiose((reslove,reject)=>{
         for(let i=0;i<promises.length;i++){
            promises[i].then(data=>{
               for(let j=0;j<promises.length;j++){
                   arr[j]=data;
                   if(arr.length == promises.length){
                       reslove(arr);
                   }
               }
            },reject)
         }
        })
    

}
Promise.race=(promises)=>{
    return new Promise((reslove,reject)=>{
        for(let i=0;i<promises.length;i++){
            promises[i].then(reslove,reject)
        }
    })
}
export default Promise