/**工厂模式 */
//通过工厂模式去构建不同的类
class Factory {
    create = (brand) => {
         switch(brand){
            case 'childA' :
             return new childA(brand);
            case 'childB' :
             return new childB(brand);
             default :
              break;
         }
    }
}
class childA {
  constructor(brand){
    this.brand=brand;
    this.name='childA';
  }
}
class childB {
  constructor(brand){
    this.brand=brand;
    this.name='childB';
  }
}
const arr=[];
const factory=new Factory();
arr.push(factory.create('childA'));
arr.push(factory.create('childB'));
for(let item of arr){
    console.log(item.brand,item.name);
}