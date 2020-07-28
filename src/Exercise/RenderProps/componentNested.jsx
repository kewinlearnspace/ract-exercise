import React, { Component } from 'react';

// 多层组件嵌套,能将数据进行传递。却没法实现真正的将行为封装成可重用的方式的目标。每次我们在不同的用例中想要使用鼠标的位置，我们就不得不创建一个新的针对那一用例渲染不同内容的组件
class Cat extends Component {
  render() {
    const mouse = this.props.mouse;
    return (
      <img
        src="/public/logo512.png"
        style={{
          position: 'absolute',
          left: mouse.x,
          top: mouse.y,
          width: '100px',
          height: '100px',
          backgroundColor: 'red',
        }}
        alt=""
      />
    );
  }
}
class MouseWithCat extends Component {
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
        {/* <h1>Move ths mouse around</h1>
        <p>
          The current mouse position is ({this.state.x},{this.state.y})
        </p> */}
        <Cat mouse={this.state}></Cat>
      </div>
    );
  }
}
class App extends Component {
  render() {
    return (
      <div>
        <MouseWithCat></MouseWithCat>
      </div>
    );
  }
}

export default App;
