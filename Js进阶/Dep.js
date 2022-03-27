export default class Dep{
    constructor(){
        console.log('我是Dep')
    }
    notify(){
        console.log('我是notify')
    }
}