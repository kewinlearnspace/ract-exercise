import React, { Component, useState, useEffect } from 'react'

class App2 extends Component {
  state = {
    count: 0,
    size: {
      width: document.documentElement.clientWidth,
      height: document.documentElement.clientHeight,
    },
  }
  onResize = () => {
    this.setState({
      size: {
        width: document.documentElement.clientWidth,
        height: document.documentElement.clientHeight,
      },
    })
  }
  componentDidMount() {
    document.title = this.state.count
    window.addEventListener('resize', this.onResize, false)
  }
  componentDidUpdate() {
    document.title = this.state.count
  }
  componentWillUnmount() {
    window.removeEventListener('resize', this.onResize, false)
  }
  render() {
    const { count, size } = this.state
    return (
      <div>
        <button type="button" onClick={() => this.setState({ count: count + 1 })}>
          click{count}
          size: {size.width}x{size.height}
        </button>
      </div>
    )
  }
}
function App(props) {
  const [count, setCount] = useState(0)
  const [size, setSize] = useState({
    width: document.documentElement.clientWidth,
    height: document.documentElement.clientHeight,
  })
  const onResize = () => {
    setSize({
      width: document.documentElement.clientWidth,
      height: document.documentElement.clientHeight,
    })
  }
  // 第二个参数为空(undefiend),表示只要当前组件数据有变化就会触发
  useEffect(() => {
    document.title = count
  })
  // 第二个参数数组内书写具体的值时,该值发生变化就会执行,初始化也会执行一次
  useEffect(() => {
    console.log(count)
  }, [count])

  // 第二个参数数组内书写具体的值时,该值发生变化就会执行,初始化也会执行一次
  useEffect(() => {
    window.addEventListener('resize', onResize, false)
    return () => {
      window.removeEventListener('resize', onResize, false)
    }
  }, [])

  const onClick = () => {
    console.log('count', count)
  }
  // 每次都绑定新的事件,清除旧事件
  useEffect(() => {
    document.querySelector('#size').addEventListener('click', onClick, false)
    return () => {
      document.querySelector('#size').removeEventListener('click', onClick, false)
    }
  })
  return (
    <div>
      <button type="button" onClick={() => setCount(count + 1)}>
        click{count}
      </button>
      {count % 2 ? (
        <span id="size">
          size: {size.width}x{size.height}
        </span>
      ) : (
        <p id="size">
          size: {size.width}x{size.height}
        </p>
      )}
    </div>
  )
}

export default App
