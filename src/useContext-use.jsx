import React, { Component, useState, createContext, useContext } from 'react';

// 不要随意使用context。它会破会组件的独立性
const CountContext = createContext();
class Foo extends Component {
  render() {
    return (
      <div>
        <CountContext.Consumer>{(count) => <h1>{count}</h1>}</CountContext.Consumer>
      </div>
    );
  }
}

class Add extends Component {
  static contextType = CountContext;
  render() {
    const counter = this.context;
    return <h1>{counter}</h1>;
  }
}

function Counter() {
  const counter = useContext(CountContext);
  return (
    <div>
      <h1>{counter}</h1>
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
      <CountContext.Provider value={count}>
        <Foo />
        <Add />
        <Counter />
      </CountContext.Provider>
    </div>
  );
}

export default App;
