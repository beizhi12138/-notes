// const queue=[];
// queue.push(1);
// queue.push(2);
// queue.shift();
// queue.shift();
//封装队列lei
class Queue{
    constructor(){
        this.queue=[];
    }
    push(root){
       return this.queue.push(root)
    }
    shift(){
        return this.queue.shift()
    }
    peek(){
        return this.queue[0]
    }
}
const queue=new Queue();
queue.push(1);
queue.push(2);
queue.shift();
console.log(queue.peek());
console.log(queue.queue);