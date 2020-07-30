import React, { useState, useMemo, useRef, useCallback, PureComponent, useEffect } from 'react';
/**
 * 自定义组件和hooks函数的最大区别,基本只有输入输出的区别
 * 自定义hooks函数组件以useXXX开头
 * hooks可以返回jsx,可以当做组件来渲染
 * 利用自定义hooks来分享状态逻辑的便利性
 */
class Counter extends PureComponent {
  render() {
    const { props } = this;
    return (
      <div>
        <h1>count:{props.count}</h1>
      </div>
    );
  }
}
// Counter组件改造成hooks函数组件
function useCounter(count) {
  const size = useSize();
  return (
    <div>
      <h1>
        count:{count} --- {size.width}x{size.height}
      </h1>
    </div>
  );
}

function useSize() {
  const [size, setSize] = useState({
    width: document.documentElement.clientWidth,
    height: document.documentElement.clientHeight,
  });

  // 仅调用一次,防止过度渲染
  const onResize = useCallback(() => {
    setSize({
      width: document.documentElement.clientWidth,
      height: document.documentElement.clientHeight,
    });
  }, []);
  // 仅调用一次
  useEffect(() => {
    window.addEventListener('resize', onResize, false);
    // 解绑事件
    return () => {
      window.removeEventListener('resize', onResize, false);
    };
  }, []);
  return size;
}

// 自定义hooks
function useCount(defaultValue) {
  const [count, setCount] = useState(defaultValue);
  const timer = useRef();

  useEffect(() => {
    timer.current = setInterval(() => {
      setCount((count) => count + 1);
    }, 1000);
  }, []);

  useEffect(() => {
    if (count >= 10) {
      clearInterval(timer.current);
    }
  }, [count]);
  return [count, setCount];
}

function App(props) {
  const [count, setCount] = useCount(0);
  const Counter = useCounter(count);
  const size = useSize();
  return (
    <div>
      <button
        type="button"
        onClick={() => {
          setCount(count + 1);
        }}
      >
        click{count} --- {size.width}x{size.height}
      </button>
      {/* <Counter count={count} /> */}
      {Counter}
    </div>
  );
}

export default App;
