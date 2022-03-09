
// 有序的括号
// const stack = []; //声明一个栈 
// function fh(s){
//     if(s.length % 2 != 0 ){return false}
//   for(let i=0;i<s.length;i++){
//       const c=s[i]
//       if(
//           c == '(' || c == '[' || c == '{' 
//       ){
//           stack.push(c)
//       }else{
//           const top = stack[stack.length-1];
//           if(
//                top == "(" && c == ")" ||
//                top == "[" && c == "]" ||
//                top == "{" && c == "}" 
//           ){
//               stack.pop()
//           }else{
//               return false
//           }
//       }
//   }
//   return stack.length  == 0
// }
// console.log(fh('{[]}'))

// const func1=()=>{
//   func2();
// }
// const func2=()=>{
//   func3()
// }
// const func3=()=>{

// }

// func1();
console.log(Function.prototype.prototype === Object.prototype)  //  false
console.log(Function.prototype === Object.prototype) // falkse
console.log(Function.prototype) //{}
console.log(Object.prototype) //[Object: null prototype] {}
