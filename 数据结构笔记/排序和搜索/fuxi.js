//冒泡排序
// Array.prototype.maopaoSort=function(){
//     const arr=this;
//     for(let i =0 ; i<arr.length-1;i++){
//         // 为了防止最后只剩一项的时候内存溢出，所以i要小于arr.length-1
//         for(let j=0;j<arr.length-1-i;j++){
//             //同理，为了防止只剩最后一项的时候内存溢出所以j小于arr.length-1且
//             //已经放到最后的几项不需要再去进行访问所以j要小于arr.length-1-i
//             const temp=arr[j];
//             if(arr[j] > arr[j+1]){
//                 arr[j]=arr[j+1];
//                 arr[j+1]=temp;
//             }
//         }
//     }
//     return arr
// }
// const arr=[5,4,3,2,1];
// arr.maopaoSort();
//选择排序
// Array.prototype.xuanzeSort = function () {
//     for (let j = 0; j < this.length - 1; j++) {
//         let MinIndex = j;
//         for (let i =j; i < this.length; i++) {
//             if (this[MinIndex] > this[i]) {
//                 MinIndex = i;
//             }
//         }
//         if (MinIndex != j) {
//             const temp = this[j];
//             this[j] = arr[MinIndex];
//             this[MinIndex] = temp
//         }
//     }
// }
// const arr = [5, 88, 69, 54, 1];
// arr.xuanzeSort();
//插入排序
//  Array.prototype.charuSort=function(){
//       for(let i=1;i<this.length;i++){
//           let j=i;
//           const temp=this[i];
//           while(j>0){
//               if(this[j-1] > temp){
//                   this[j]=this[j-1]
//               }else{
//                   break;
//               }
//               j--
//           }
//           this[j]=temp;
//       }
//  }
//  const arr=[5,421,211,53,2,3,56];
//  arr.charuSort();
//归并排序
// Array.prototype.guibingSort=function(){
//    const rec=(arr)=>{
//        if(arr.length == 1){return arr}
//        const mid=Math.floor(arr.length/2);
//        const left=arr.slice(0,mid);
//        const right=arr.slice(mid,arr.length);
//        const res=[]; //建立一个空数组进行存放合并的值
//         //再对数组进行拆分，直到最后一位数
//         const OrderLeft=rec(left);
//         const OrderRight=rec(right);
//         //此时已经拆分到最后以为，开始进行合并
//         while(OrderLeft.length || OrderRight.left){
//             if(OrderLeft.length && OrderRight.length){
//                 res.push(OrderLeft[0] < OrderRight[0] ? OrderLeft.shift():OrderRight.shift());
//             }else if(OrderLeft.length){
//                 res.push(OrderLeft.shift());
//             }else if(OrderRight.length){
//                 res.push(OrderRight.shift());
//             }
//         }
//         return res;
//    }
//    return rec(this).forEach((item,index) => {
//          this[index]=item;
//    });
// }
//  const arr=[5,4,3,2,1];
//  arr.guibingSort();
//快速排序
// Array.prototype.quickSort=function(){
//     const rec=(arr)=>{
//         if(arr.length == 1|| arr.length == 0){return arr}
//         const leftArr=[];
//         const rightArr=[];
//         const mid=arr[0];
//         for(let i=1;i<arr.length;i++){
//             if(arr[i] < mid){
//                 leftArr.push(arr[i]);
//             }else{
//                 rightArr.push(arr[i]);
//             }
//         }
//         return [...rec(leftArr),mid,...rec(rightArr)];
//     }
//   const res=  rec(arr);
//     return  res.forEach((item,index) => {
//         this[index]=item;
        
//     });
// }
// const arr=[5,421,211,53,2,3,56];
// arr.quickSort();
//顺序搜索
// Array.prototype.shunxuSearch=function(m){
//     for(let i=0;i<this.length;i++){
//         if(this[i] == m){
//             return i;
//         }
//     }
//  return -1;
// }
// const res=[5,4,3,2,1].shunxuSearch(3);
// console.log(res);
//二分搜索
// Array.prototype.TwoSearch=function(m){
//     const arr=this;
//     let low = 0;
//     let high=arr.length-1
//     while(low <high){
//         const mid=Math.floor((low + high) / 2);
//        if(arr[mid] == m){
//            return mid;
//        }else if(arr[mid] > m){
//            low=mid+1;
//        }else{
//            high=mid -1;
//        }
//     }
//  return -1
// }
//  const res=[5,4,3,2,1].TwoSearch(2);
//  console.log(res)
