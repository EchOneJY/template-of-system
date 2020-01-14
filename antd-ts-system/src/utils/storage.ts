interface Storage {
  set(name:string, content:string | object):void
  get(name:string):any
  remove(name:string):void
  add(name:string, key:string, content:any):void
}


class storage implements Storage {

  set(name:string, content:any):void {
    if (!name) return
    if (typeof content !== 'string') {
      content = JSON.stringify(content)
    }
    window.sessionStorage.setItem(name, content)
  }

  get(name:string):any {
    if (!name) return
    var value = window.sessionStorage.getItem(name)
    if (value !== null) {
      try {
        value = JSON.parse(value)
      } catch (e) {
        value = value
      }
    }
    return value
  }

  remove(name:string) {
    if (!name) return
    window.sessionStorage.removeItem(name)
  }
  
  add(name:string, key:string, content:any) {
    if (!name) return
    const obj = this.get(name)
    obj[key] = content
    this.set(name, obj)
  }
}

// /**
//  * @description 存储sessionStorage 值
//  * @param {String} name sessionStorage name
//  * @param {String} content sessionStorage value
//  */
// storage.set = (name:string, content:any):void => {
//   if (!name) return
//   if (typeof content !== 'string') {
//     content = JSON.stringify(content)
//   }
//   window.sessionStorage.setItem(name, content)
// }

// /**
//  * @description 获取sessionStorage 值
//  * @param {String} name sessionStorage name
//  */
// storage.get = (name:string):any=> {
//   if (!name) return
//   var value = window.sessionStorage.getItem(name)
//   if (value !== null) {
//     try {
//       value = JSON.parse(value)
//     } catch (e) {
//       value = value
//     }
//   }
//   return value
// }

// /**
//  * @description 删除sessionStorage 值
//  * @param {String} name sessionStorage name
//  */
// storage.remove = name => {
//   if (!name) return
//   window.sessionStorage.removeItem(name)
// }

// /**
//  * @description 向sessionStorage同一key存储数据
//  * @param {String} name sessionStorage name
//  */
// storage.add = (name, key, content) => {
//   if (!name) return
//   const obj = storage.get(name)
//   obj[key] = content
//   storage.set(name, obj)
// }

export default storage