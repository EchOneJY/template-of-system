export function createStore(reducer, enhancer) {
  if (enhancer) {
    return enhancer(createStore)(reducer)
  }

  let currentState = undefined
  const currentListeners = [] //回调函数数组

  function getState() {
    return currentState
  }
  //更新状态
  function dispatch(action) {
    //修改
    currentState = reducer(currentState, action)
    //变更通知
    currentListeners.forEach(v => v())
    return action
  }

  function subscribe(cb) {
    currentListeners.push(cb)
  }

  //初始化状态
  dispatch({ type: '@YIYI-REDUX' })

  return { getState, dispatch, subscribe }
}

export function applyMiddleware(...middlewares) {
  return createStore => (...args) => {
    //完成createStore操作
    const store = createStore(...args)
    //原始dispatch
    let dispatch = store.dispatch
    //传递给中间件函数的参数
    const midApi = {
      getState: store.getState,
      dispatch: (...args) => dispatch(...args)
    }
    const chain = middlewares.map(mw => mw(midApi))
    //强化dispatch，按顺序执行中间件函数
    dispatch = compose(...chain)(store.dispatch)
    return {
      ...store,
      dispatch
    }
  }
}

export function compose(...funcs) {
  if (funcs.length === 0) {
    return arg => arg
  }
  if (funcs.length === 1) {
    return funcs[0]
  }
  return funcs.reduce((prev, current) => (...args) => current(prev(...args)))
}

function bindActionCreator(creator, dispatch) {
  return (...args) => dispatch(creator(...args))
}

export function bindActionCreators(creators, dispatch) {
  return Object.keys(creators).reduce((ret, item) => {
    ret[item] = bindActionCreator(creators[item], dispatch)
    return ret
  }, {})
}
