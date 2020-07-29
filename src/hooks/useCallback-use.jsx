import React, { useState, useMemo, memo, useCallback } from 'react';

const Counter = memo(function Counter(props) {
  console.log(props.count);
  return (
    <div>
      <h1 onClick={props.onClick}>count:{props.count}</h1>
    </div>
  );
});
// useMemo 和 useCallback作为优化手段,不能依赖其是否触发重新渲染
function App(props) {
  const [count, setCount] = useState(0);
  const [clickCount, setClickCount] = useState(0);
  const double = useMemo(() => {
    return count * 2;
  }, [count === 3]);
  // 函数的变化会导致Counter组件重新渲染,可通过useMemo来优化
  // const onClick = () => {
  //   console.log('click');
  // }

  // const onClick = useMemo(() => {
  //   return () => {
  //     console.log('click');
  //   };
  // }, []);

  // 如果useMemo返回的是一个函数.则可以由useCallback替代
  // useMemo(() => fn)  等价于 useCallback(fn)
  // useCallback 解决传入子组件的函数参数过度变化,导致子组件过度渲染的问题
  const onClick = useCallback(() => {
    console.log('click');
    setClickCount(clickCount + 1);
  }, [clickCount]);
  return (
    <div>
      <button
        type="button"
        onClick={() => {
          setCount(count + 1);
        }}
      >
        click{count}
      </button>
      <Counter count={double} onClick={onClick} />
    </div>
  );
}

export default App;
