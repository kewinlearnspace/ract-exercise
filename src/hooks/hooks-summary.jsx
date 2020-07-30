import React, { useState, useRef, useEffect } from 'react';


// Hooks 中如何获取历史 props 和 state?
function Coutners() {
  const [counter, setCounter] = useState(0);
  const countRef = useRef();
  let timer = useRef(0);
  useEffect(() => {
    countRef.current = counter;
  });
  useEffect(() => {
    timer.current = setInterval(() => {
      setCounter((count) => count + 1);
    }, 1000);
  }, []);

  useEffect(() => {
    if (counter >= 10) {
      clearInterval(timer.current);
    }
  }, [counter]);
  const prevCount = countRef.current;
  return (
    <div>
      Now:{counter}---old:{prevCount}
    </div>
  );
}

// 如何强制更新一个 Hooks 组件?
function Force() {
  const [count, setCount] = useState(0);
  const [update, setUpdate] = useState(0);
  useEffect(() => {
    console.log(count);
  });
  const forceUpdate = () => {
    setUpdate((update) => update + 1);
  };
  return (
    <div>
      count:{count}
      <button onClick={forceUpdate}>click</button>
    </div>
  );
}

// export default Coutners;
export default Force;
