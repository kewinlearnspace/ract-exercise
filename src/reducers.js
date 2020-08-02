function combineReducers(reducres) {
  return function reducer(state, action) {
    const changed = {}
    for (let key in reducres) {
      // 执行reducres中操作数据的方法
      changed[key] = reducres[key](state[key], action)
    }
    // 最终changed={todos,incrementCount}
    return {
      ...state,
      ...changed,
    }
  }
}

// 从数据角度来操作执行数据的方法
const reducres = {
  todos(state, action) {
    const { type, payload } = action
    switch (type) {
      case 'set':
        return payload
      case 'add':
        return [...state, payload]
      case 'remove':
        return state.filter((todo) => todo.id !== payload)
      case 'toggle':
        return state.map((todo) =>
          todo.id === payload ? { ...todo, complete: !todo.complete } : todo
        )
      default:
    }
    return state
  },
  incrementCount(state, action) {
    const { type } = action
    switch (type) {
      case 'add':
      case 'set':
        return state + 1
      default:
    }
    return
  },
}
export default combineReducers(reducres)
