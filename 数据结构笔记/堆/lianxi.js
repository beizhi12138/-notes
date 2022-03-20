class MinHeap{
    constructor(){
       
        this.heap=[];
    }
    insert(value){
      this.heap.push(value);
      this.shiftUp(this.heap.length-1);
    }
    shiftUp(index){
        if(index == 0) return;
         const i=index;
         const ParentIndex=this.GetParentIndex(i);
        if(this.heap[ParentIndex] > this.heap[i]){
            this.swap(ParentIndex,i);
            this.shiftUp(ParentIndex);//递归的操作，如果上移之后不满足最小堆，那么继续上移
        }
    }
    GetParentIndex(ChildIndex){
       return Math.floor((ChildIndex - 1) / 2);
    }
    GetLeftIndex(index){
         return index * 2 + 1
    }
    GetRightIndex(index){
        return index * 2 + 2
    }
    swap(Parent,Child){
        const temp=this.heap[Parent];
        this.heap[Parent]=this.heap[Child];
        this.heap[Child]=temp;
    }
    //删除堆顶
    pop(){
        this.heap[0]=this.heap.pop();
        this.ShiftDown(0);
    }
    //下移操作，删除完堆顶之后，需要进行下移操作， 使得根节点小于所有的子节点
    ShiftDown(value){
       //下移操作需要获取根节点的左节点和右节点
       const LfetIndex=this.GetLeftIndex(value);
       const RightIndex=this.GetRightIndex(value);
       if(this.heap[LfetIndex] < this.heap[value]){
           //判断左节点是否小于根节点，如果小于根节点则进行换位置
           this.swap(LfetIndex,value);
           this.ShiftDown(LfetIndex);
       }
       if(this.heap[RightIndex] < this.heap[value]){
           //判断根节点是否小于右节点如果小于则进行换位置
           this.swap(RightIndex,value);
           this.ShiftDown(RightIndex);
       }
    }
    //获取堆顶
    Peek(){
        return this.heap[0];
    }
    //获取堆的大小
    Size(){
        return this.heap.length
    }
}
const MinHeaps=new MinHeap();
MinHeaps.insert(3);
MinHeaps.insert(2);
MinHeaps.insert(1);
MinHeaps.insert(6);
MinHeaps.insert(5);
MinHeaps.insert(4);
MinHeaps.insert(0);
MinHeaps.pop();

//创建一个最小堆，堆里存储着得分和，名次，判断他们的得分然后排序，堆头就是最后一名，循环只要堆里一直有值就循环下去，三个判断判断是不是三二一，如果那就改写，如果不是就根据坐标，他的值就等于当前的length+1






