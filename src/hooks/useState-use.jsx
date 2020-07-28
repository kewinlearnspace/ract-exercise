import React, { Component, useState } from 'react'

function App(props) {
  const [count, setCount] = useState(0)
  // 传入函数延迟初始化
  const [age, setAge] = useState(() => {
    console.log('age')
    return props.age || 0
  })
  // useState不要在判断和循环中定义
  // if (count === 0) {
  //   useState(2)
  // }
  return (
    <div>
      <button type="button" onClick={() => setCount(count + 1)}>
        clickCount{count}
      </button>
      <br></br>
      <button type="button" onClick={() => setAge(age + 0)}>
        clickAge{age}
      </button>
    </div>
  )
}

export default App
