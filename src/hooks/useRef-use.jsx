import React, {
  useState,
  useMemo,
  memo,
  useCallback,
  useRef,
  PureComponent,
  useEffect,
} from 'react'

/**
 * useRef
 * 作用:获取子组件或者DOM节点的句柄。渲染周期之间共享数据存储(state也可以跨域渲染周期保存,单state的赋值会触发视图渲染,ref不会)
 * 应用场景:ref组件成员上有函数需要调用。访问上一次渲染的数据,甚至是state,就把其同步到ref中,下一次渲染时就能获取到
 *
 * 问题:如何判断一个组件,在本次渲染和上一次渲染中有没有重新创建?
 */

class Counter extends PureComponent {
  speak() {
    console.log('Counter.speak')
  }
  render() {
    const { props } = this
    return (
      <div>
        <h1 onClick={props.onClick}>count:{props.count}</h1>
      </div>
    )
  }
}
// useMemo 和 useCallback作为优化手段,不能依赖其是否触发重新渲染
function App(props) {
  const [count, setCount] = useState(0)
  const [clickCount, setClickCount] = useState(0)
  let timer = useRef()
  const counterRef = useRef()

  const double = useMemo(() => {
    return count * 2
  }, [count === 3])
  const onClick = useCallback(() => {
    console.log('click')
    setClickCount((clickCount) => clickCount + 1)
    counterRef.current.speak()
  }, [counterRef])

  useEffect(() => {
    timer.current = setInterval(() => {
      setCount((count) => count + 1)
    }, 1000)
  }, [])

  useEffect(() => {
    if (count >= 10) {
      clearInterval(timer.current)
    }
  })
  return (
    <div>
      <button
        type="button"
        onClick={() => {
          setCount(count + 1)
        }}
      >
        click{count}
      </button>
      <Counter ref={counterRef} count={double} onClick={onClick} />
    </div>
  )
}

export default App
