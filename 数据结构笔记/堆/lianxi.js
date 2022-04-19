// class MinHeap{
//     constructor(){
       
//         this.heap=[];
//     }
//     insert(value){
//       this.heap.push(value);
//       this.shiftUp(this.heap.length-1);
//     }
//     shiftUp(index){
//         if(index == 0) return;
//          const i=index;
//          const ParentIndex=this.GetParentIndex(i);
//         if(this.heap[ParentIndex] < this.heap[i]){
//             this.swap(ParentIndex,i);
//             this.shiftUp(ParentIndex);//递归的操作，如果上移之后不满足最小堆，那么继续上移
//         }
//     }
//     GetParentIndex(ChildIndex){
//        return Math.floor((ChildIndex - 1) / 2);
//     }
//     GetLeftIndex(index){
//          return index * 2 + 1
//     }
//     GetRightIndex(index){
//         return index * 2 + 2
//     }
//     swap(Parent,Child){
//         const temp=this.heap[Parent];
//         this.heap[Parent]=this.heap[Child];
//         this.heap[Child]=temp;
//     }
//     //删除堆顶
//     pop(){
//         this.heap[0]=this.heap.pop();
//         this.ShiftDown(0);
//     }
//     //下移操作，删除完堆顶之后，需要进行下移操作， 使得根节点小于所有的子节点
//     ShiftDown(value){
//        //下移操作需要获取根节点的左节点和右节点
//        const LfetIndex=this.GetLeftIndex(value);
//        const RightIndex=this.GetRightIndex(value);
//        if(this.heap[LfetIndex] > this.heap[value]){
//            //判断左节点是否小于根节点，如果小于根节点则进行换位置
//            this.swap(LfetIndex,value);
//            this.ShiftDown(LfetIndex);
//        }
//        if(this.heap[RightIndex] > this.heap[value]){
//            //判断根节点是否小于右节点如果小于则进行换位置
//            this.swap(RightIndex,value);
//            this.ShiftDown(RightIndex);
//        }
//     }
//     //获取堆顶
//     Peek(){
//         return this.heap[0];
//     }
//     //获取堆的大小
//     Size(){
//         return this.heap.length
//     }
// }


//最大堆
class minheap{
    constructor(){
        this.heap=[]
    }
    insert(val){
        this.heap.push(val);
        this.shiftUp(this.heap.length-1);
    }
    shiftUp(index){
      if(index == 0){
          return
      }
      const ParentIndex=this.GetParentIndex(index);
      if(this.heap[index] > this.heap[ParentIndex]){
          this.swap(ParentIndex,index);
          this.shiftUp(ParentIndex);
      }
    }
    GetParentIndex(index){
       return Math.floor((index -1) /2);
    }
    GetLeftIndex(index){
        return (index * 2) +1;
    }
    GetRightIndex(index){
        return (index * 2) + 2;
    }
    swap(Parent,Child){
        const p=this.heap[Parent];
         this.heap[Parent]=this.heap[Child];
        this.heap[Child]=p;
    }
    pop(){
         this.heap[0]=this.heap.pop();
         this.shiftDown(0);
    }
    shiftDown(index){
      const Left=this.GetLeftIndex(index);
      const Right=this.GetRightIndex(index);
      if(this.heap[index] < this.heap[Left]){
          this.swap(index,Left);
          this.shiftDown(Left);
      }
      if(this.heap[index] < this.heap[Right]){
          this.swap(index,Right);
          this.shiftDown(Right);
      }
    }
    size(){
        return this.heap.length
    }
    peek(){
        return this.heap[0];
    }
}
const MinHeaps=new minheap();
MinHeaps.insert(3);
MinHeaps.insert(2);
MinHeaps.insert(1);
MinHeaps.insert(6);
MinHeaps.insert(5);
MinHeaps.insert(4);
MinHeaps.insert(0);
MinHeaps.pop();
console.log(MinHeaps)






