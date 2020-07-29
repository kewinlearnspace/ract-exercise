import React, { Component, useState, useMemo } from 'react';
// useMemo 定义一段函数逻辑是否执行,与memo相同本质上都是通过判断依赖是否发生变化
// useMemo的参数与useEffect的参数一致,第一个是要执行的逻辑函数,第二个参数是这个逻辑依赖的变量所组成的数组
// useMemo和useEffect的区别。useEffect是在渲染后运行,useMemo是有返回值的,所以useMemo是在渲染期间执行的,useMemo可以依赖另一个useMemo(不要在循环中依赖useMemo.程序会崩溃)
function Counter(props) {
  const { count } = props;
  const double = useMemo(() => {
    return count * 2;
  }, [count]);
  const float = useMemo(() => {
    return count * 2;
  }, [count === 3]);

  // useMemo可以依赖另一个useMemo
  const doubles = useMemo(() => {
    return double / 2;
  }, [double]);
  return (
    <div>
      <h1>count:{count}</h1>
      <h1>double:{double}</h1>
      <h1>float:{float}</h1>
      <h1>doubles:{doubles}</h1>
    </div>
  );
}

function App(props) {
  const [count, setCount] = useState(0);
  const [size, setSize] = useState(0);
  return (
    <div>
      <button
        type="button"
        onClick={() => {
          setCount(count + 1);
          setSize(size + 1);
        }}
      >
        click{count}
      </button>
      <Counter count={count} />
    </div>
  );
}

export default App;
