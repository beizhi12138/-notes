class Promise {
    constructor(executor) {
        //executor 是new promise((reslove,reject)=>{})传入的参数，传入就执行
        // 因为excutor时传入两个参数，reslove,reject,可执行
        // promise 有三个状态，pendding(等待),fulfiled(成功),reason(失败)
        //状态机模式，初始状态是pendding,且只能转换为fulfiled或者,reason 不可改变
        this.state = 'pendding' //初始化为等待
        this.value = undefined //成功的值
        this.reason = undefined // 失败的值
        //为什么要写以下两个数组
        //解决异步实现，为什么需要解决异步，假设此时是成功的状态，但是reslove是在settimeou里执行的，
        //此时state的状态就还是pendding，但是状态已经成功了，那么在then里边我们的成功时需要执行的函数就会被延误
        //所以就将then里的函数存储起来，一旦reslove执行了就立即循环执行数组里被延误执行的函数
        //reslove和reject是用来改变状态的
        this.resloveArr = [] //存放成功函数的值
        this.rejectArr = [] //存放失败函数的值
        let reslove = (value) => {
            //若是成功，状态只能从pendding转为fulfiled，
            if (this.state == 'pendding') {
                // pendding转为fulfiled
                this.state = 'fulfiled';
                this.value = value; //接受成功的参数
                //如果reslove被执行，挨个调用成功的函数
                this.resloveArr.forEach(fn => {
                    fn();
                })
            }
        }
        let reject = (reason) => {
            //若是失败，状态也只能从pendding转变未reason
            if (this.state == 'pendding') {
                this.state = 'reason'
                this.reason = reason //接收失敗的原因
                //如果reject被执行，挨个调用失败的函数
                this.rejectArr.forEach(fn => {
                    fn();
                })

            }
        }
        //因为excutor传入就执行所以立即调用
        //如果调用executor 失败立即调用reject
        try {
            executor(reslove, reject)
        } catch (err) {
            reject(err);
        }

    }
    //.then
    //promise有then的这个方法，接收两个参数，一个是成功时执行的函数，一个是失败时执行的函数
    // 如果状态为成功时我们就执行成功的函数，如果状态为失败时我们就执行失败的函数
    // 但是假设reslove此时被写在setimeout里，假设我们此时已经成功或者失败了，但是此时的状态还是等待中那么我们就需要将.then传进来的函数
    //存储进数组里
    then(onFulfilled, onRejected) {
        // 判断onFulfilled和 onRejected是否是函数,onFulfilled 如果不是函数直接饭hivalue，onRejected如果不是函数直接返回错误
        onFulfilled = typeof onFulfilled == 'function' ? onFulfilled : value => value;
        onRejected = typeof onRejected == 'function' ? onRejected : err => {
            throw err
        };
        //解决链式调用，要返回一个新的Promise，这个Promise是onFulfilled ,或者onRejected的值，首先要判判断返回的是否为promise，如果是promise
        //那么这个promise的结果作为下一个promise的结果，如果是普通的值那么直接作为要返回的promise的值，所以要做一个判断，这个判断叫做reslovePromie
        let promise2 = new Promise((reslove, reject) => {

            if (this.state == 'fulfiled') {
                // 异步
                setTimeout(() => {
                    try {
                        let x = onFulfilled(this.value);
                        reslovePromise(promise2, x, reslove, reject);
                    } catch (e) {
                        reject(e)
                    }
                }, 0)

            }
            if (this.state == 'reason') {
                //异步 
                setTimeout(() => {
                    try {
                        let x = onRejected(this.reason);
                        reslovePromise(promise2, x, reslove, reject);
                    } catch (e) {
                        reject(e)
                    }
                }, 0)

            }
            //当状态为pendding时把失败的函数存放到失败里，成功的函数存放到成功里
            if (this.state == 'pendding') {
                this.onFulfilled.push(() => {
                    setTimeout(() => {
                        try {
                            let x = onFulfilled(this.value);
                            reslovePromise(promise2, x, reslove, reject);
                        } catch (e) {
                            reject(e);
                        }
                    }, 0)

                })
                this.onRejected.push(() => {
                    setTimeout(() => {
                        try {
                            let x = onRejected(this.reason);
                            reslovePromise(promise2, x, reslove, reject);
                        } catch (e) {
                            reject(e);
                        }
                    }, 0)
                })
            }
        })
        return promise2; //返回promise2
    }
    // catch(onRejected){

    // }
}

function reslovePromise(promise2, x, reslove, reject) {
    //x 如果返回值是promise2 ,那么会循环调用，直接报错即可
    if (x === promise2) {
        return reject(new TypeError('Chaining cycle detected for promise'));
    }
    let called //防止多次调用
    //判断x既不能等于null，且还要是对象或者是函数
    if (x != null && (typeof x == 'object' || typeof x == 'function')) {
        try {
            let then = x.then;
            if (typeof then == 'function') {
                //判断如果then是函数那么默认就是promise
                //让then执行，第一个参数是，this，第二个参数是失败的回调和成功的回调
                then.call(x, y => {
                    if (called) return
                    called = true;
                    //如果成功的结果依旧是promise那就继续解析
                    reslovePromise(promise2, y, reslove, reject);
                }, err => {
                    if (called) return
                    called = true;
                    reject(err); //失败了就调用失败的函数
                })
            } else {
                //如果不是函数也就意味着不是promise那就直接成功
                reslove(x);
            }
        } catch (error) {
            if (called) return
            called = true;
            reject(error);
        }
    } else {
        reslove(x);
    }

}
Promise.defer = Promise.deferred = function () {
    let dfd = {}
    dfd.promise = new Promise((resolve, reject) => {
        dfd.resolve = resolve;
        dfd.reject = reject;
    });
    return dfd;
}
module.exports = Promise;

//promise解决了回调地狱的问题，回调地狱就是一个函数执行完了，再去执行下一个函数 这样 {a:{b:{c....}}} 
//这种嵌套，但是我们会遇到两种状态，比如当前函数执行成功了，去执行下一个函数，但是如果不成功就不能去执行
//下一个函数，这样就形成了ifelse，判断然后再一层层嵌套下去，所以就用到了状态机模式.
//状态机模式就是在有限个状态以及在这些状态之间的转移
// 所以 ，回调地狱里边就只有两种状态，函数执行成功或者是失败，且状态不能互相改变，故此就有了promise
//promise里一共有三种模式，初始化是等待，然后状态只能转变成成功或者是失败(成功就执行成功的函数，失败就执行失败的函数)
// promise提供了链式调用的方法
//因为假设在回调地狱里等待一个函数执行完了，我们继续再去用新的promise，那么我们的代码还是层层嵌套的
//代码冗余量大且可读性差，
// 所以有了链式调用,就是当第一个promise执行完的时候再返回一个新的promise