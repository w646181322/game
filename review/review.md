### typeof ，instanceof
  typeof 能判断基本数据类型 Number，Boolean，Sting，undefined，function，但无法判断出引用类型 Object
  instanceof 判断对象的是谁的实例，根据原型链进行搜索
  ```
  // instanceof 实现原理
  function instance_of(L,R){
    let O = R.prototype
    L = L.__proto__
    while(true){
      if(O === null){
        return false
      }
      if(O === L){
        teturn true
      }
      L = L.__proto__
    }
  }
  ```
  ```
  // new 操作原理
  function create(fuc,args){
    let obj = {}
    Object.setPrototypeOf(obj,fuc.prototype)
    let result = fuc.apply(obj,args)
    return result instanceof Object? result : obj
  }
  ```
  ```
  // debounce 防抖
  function debounce(fn,delayTime){
    var timeId;
    var that = this,args = arguments
    return function (){
      clearTimeout(timeId)
      timeId = setTimeout( () => {
        fn.apply(that,args)
      },delayTime)
    }
  }
  ```


  ```
  // throttle 节流
  function throttle(fn,countTime){
    var runFlat = false
    var that = this,args = arguments
    return function (){
      if(!runFlat){
        runFlat = true
        setTimeout(() => {
          fn.apply(that,args)
          runFlat = false
        },countTime)
      }
    }
  }
  ```

  ```
  // DeepClone 深拷贝
  function DeepClone(obj){
    var objClone = Array.isArray(obj) ? [] : {}
    if(obj && typeof obj === 'Object'){
      for(key in obj){
        if(obj.hasOwnProperty(key)){
          if(obj[key] && typeof obj[key] === 'Object'){
            objClone[key] = DeepClone(obj[key])
          }else{
            objClone[key] = obj[key]
          }
        }
      }
    }
    return objClone
  }
  ```

  ```
  // call
  Function.prototype.mycall = function(content = window){
    var content.Fn = this
    var args = [...arguments].slice(1)
    var res = content.Fn(...args)
    return res
  }
  ```

  ```
  // apply
  Function.prototype.myapply = function(content = window){
    var content.Fn = this
    if(arguments[1]){
      res = content.Fn(...argument[1])
    }else{
      res = content.Fn()
    }
    return res
  }
  ```

  ```
  // bind
  Function.prototype.mybind = function (){
    var thatFunc = this , thatArg = arguments[0]
    //console.log(this)
    var args = Array.prototype.slice(arguments,1)
    return function () {
      var funcArgs = args.concat(Array.prototype.slice(arguments))
      return thatFunc.apply(thatArg,funcArgs)
    }
  }
  //function foo(){
  //  console.log(this)
  //}
  //var obj = {a:1}
  //var f1 = foo.mybind(obj,2)
  ```

