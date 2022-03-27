//冒泡排序
// Array.prototype.bubblesort=function(){  //将冒泡排序绑定在数组的原型链上，这样获取到的this就是数组本身
//     const arr=this;
//     for(let i=0;i<arr.length-1;i++){
//         for(let j=0;j<arr.length-1-i;j++){
            
//             if(arr[j]>arr[j+1]){
//                 const temp=arr[j];
//                 arr[j]=arr[j+1];
//                 arr[j+1]=temp;
//             }
//         }
//     }
//     return arr;
// }
// const arr=[5,4,3,2,1];
// const bubbleSportArr=arr.bubblesort();

//选择排序
// Array.prototype.selectSort=function(){
//     const arr=this;
  
//     for(let i=0;i<arr.length-1;i++){
//         let MinIndex=i;
//         for(let j =i;j<arr.length;j++){
//             if(arr[MinIndex] > arr[j]){
//                 MinIndex=j;
//             } 
//           }
//           if(MinIndex != i){
//             const temp=arr[i];
//             arr[i]=arr[MinIndex];
//             arr[MinIndex]=temp
//           }
          
//     }
    
//     return arr;
// }
// const arr=[8,45,7,4,1,0,2];
// const  SelectArr=arr.selectSort();
// console.log(SelectArr);
//插入排序
// Array.prototype.insertSort=function(){
//     for(let i=1;i<this.length;i++){
       
//         let j=i;
//         const temp=this[i];
//          while(j>0){
//              if(this[j-1] > temp){
//                  this[j] =this[j-1];
//              }else{
//                  break;
//              }
//              j--
//          }
//          this[j]=temp;
        
//     }
 
// }
// const arr=[31,26,54,32,1];
// arr.insertSort();
//归并排序
Array.prototype.margetSort=function(){
 const rec=(arr)=>{
     //需要递归对数组进行拆分的操作，将数组分成一个个独立的数;
     if(arr.length == 1){return arr} //将数组分成一个个单独的数时就return出去
     const mid=Math.floor(arr.length / 2); //拿到中间的下标，一次来进行拆分数组
     const left=arr.slice(0,mid); //拿到中间数组左边拆分的数组
     const right=arr.slice(mid,arr.length) //拿到中间数组右边拆分的数组
     //此时进入第一轮拆分，我们没有将数组，拆分成未一个个单独的数，所以需要递归进行拆分
     // 为了获取最后拆分的两个数组，所以我们声明两个变量
     
     const orderLeft=rec(left); //left 最后会拆分成5 , 
     const orderRight=rec(right);//right 最后会拆分成4,
      const res=[];
      while(orderLeft.length || orderRight.length){
          // 进行合并
          if(orderLeft.length && orderRight.length){
             
                   res.push(orderLeft[0] > orderRight[0] ? orderRight.shift():orderLeft.shift());
            
          }else if(orderLeft.length){
            res.push(orderLeft.shift());
        }else if(orderRight.length){
            res.push(orderRight.shift());
        }
      }
     return res;

 }
 rec(this).forEach((item,i) => {
     this[i]=item;
 });
}
const arr=[5,4,3,2,1];
arr.margetSort();
//快速排序
// Array.prototype.quickSort=function(){
//   //由于需要递归的对基准前后的子数组进行分区，所以我们写一个递归
//   const rec=(arr)=>{
//       console.log(arr.length)
//       if( arr.length === 1 || arr.length == 0) {return arr;} //如果数组只剩下一个元素那么就不需要进行下去
//       //选择一个基准
//       const mid=arr[0];
//       //由于要对基准前后的子数组进行分区，所以我们需要建立两个数组，保存子数组
//       const MidleftArr=[];
//       const MidrRightArr=[];
//       //进行遍历数组进行分区
//       for(let i=1;i<arr.length;i++){
//          if(arr[i]<mid){
//              MidleftArr.push(arr[i])
//          }else{
//              MidrRightArr.push(arr[i]);
//          }
//       }
//       //将最后分区完的数组返回出去
//       return [...rec(MidleftArr),mid,...rec(MidrRightArr)];
//   }
//      rec(this).forEach((item,index) => {
//         this[index]=item;
//   });
// }

// const arr=[35,1,67,8,0,91,24];
// arr.quickSort();
// console.log(arr);
//顺序搜索
// Array.prototype.shunxuSearch=function(m){
//      //m就是目标值
//      for(let i=0;i<this.length;i++){
//          if(m == this[i]){
//              return i;
//                      }
//      }
//      return -1;
// }
// const res=[1,2,3,4,5].shunxuSearch(3);
//二分搜索
// Array.prototype.TwoSearch=function(m){
//     //二分搜索是一个范围搜索，所以我们需要有一个范围
//     let low=0; //最小范围
//     let high=this.length-1; //最大范围
//     //只要目标值一直在我们的范围里，那么就一直循环下去
//     while(low <= high){
//       const mid=Math.floor((low+high) / 2)           //获取到我们的中间值，中间值就是最大范围和最小范围中间的那个数
//       if( this[mid] == m){
//           return mid
//       }else if(this[mid] < m){
//           high=mid -1
//       }else{
//            low = mid +1
//       }
     
//     }
//     return -1
// }
// const res=[5,4,3,2,1].TwoSearch(5);
 