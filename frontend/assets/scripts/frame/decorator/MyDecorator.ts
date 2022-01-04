export namespace MyDecorator{
  /**
   * name
   */
  export function printClass(parms:string){
      console.log(parms)
  }

  export function logMethod() {
    return function (target: any, methodName: any, desc: any) {
        console.error("方法装饰器")
        console.log(target)
        console.log(methodName)
        console.log(desc.value)
    }
  }

  export function logMethod2(target: any, methodName: any, desc: any) {
      console.error("方法装饰器")
      console.log(target)
      console.log(methodName)
      console.log(desc.value)
  }
  
}