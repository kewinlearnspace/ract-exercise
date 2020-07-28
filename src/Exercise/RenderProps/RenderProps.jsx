import React, { Component } from 'react';

class Cat extends Component {
  render() {
    const mouse = this.props.mouse;
    return <p style={{ position: 'absolute', left: mouse.x, top: mouse.y }}>鼠标移动部分</p>;
  }
}

class Mouse extends Component {
  constructor(props) {
    super(props);
    this.state = { x: 0, y: 0 };
    this.handleMouseMove = this.handleMouseMove.bind(this);
  }

  handleMouseMove(event) {
    this.setState({
      x: event.clientX,
      y: event.clientY,
    });
  }
  render() {
    return (
      <div style={{ height: '100%' }} onMouseMove={this.handleMouseMove}>
        {this.props.render(this.state)}
      </div>
    );
  }
}

/**
 * 理解:Render Props就是为父组件的props添加一个返回组件的函数,并在父组件render的时候执行这个函数
 * A(父组件) -> B(公共代码) -> C(需要使用公共代码的组件)  将B中公共逻辑的属性(props)作为A中组件函数的属性(props)再传递给C
 * 使用场景:日志收集,异步请求等公共逻辑
 */
class App extends Component {
  render() {
    return (
      <div>
        <h1>Move the mouse around!</h1>
        {/* 父组件的返回组件函数 */}
        <Mouse render={(mouse) => <Cat mouse={mouse} />} />
      </div>
    );
  }
}

export default App;
