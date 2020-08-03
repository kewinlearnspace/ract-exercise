export function createSet(payload) {
  return {
    type: 'set',
    payload,
  }
}

let isSeq = new Date()

export function createAdd(text) {
  // dispatch查询后执行的逻辑
  // state现有的数据
  return (dispatch, getState) => {
    setTimeout(() => {
      const { todos } = getState()
      if (!todos.find((todo) => todo.text === text)) {
        dispatch({
          type: 'add',
          payload: {
            id: ++isSeq,
            text,
            complete: false,
          },
        })
      }
    }, 3000)
  }
}
export function createToggle(payload) {
  return {
    type: 'toggle',
    payload,
  }
}
export function createRemove(payload) {
  return {
    type: 'remove',
    payload,
  }
}
