import React, { Component, lazy, Suspense } from 'react';

// /*webpackChunkName:'about'*/ =>给异步加载的文件设置别名
const About = lazy(() => import(/*webpackChunkName:'about'*/ './About.jsx'));
// const About = lazy(() => import('./About.jsx'));
class App extends Component {
  state = {
    hasError: false,
  };
  // 使用 create-react-app 创建的项目，在开发环境，就算使用了 componentDidCatch 或者 getDerivedStateFromError，错误依然会被抛出，在 build 后，错误将会捕获，不会导致整个项目卸载
  static getDerivedStateFromError(error) {
    // 更新 state 使下一次渲染能够显示降级后的 UI
    return { hasError: true };
  }
  // componentDidCatch(error, errorInfo) {
  //   this.setState({
  //     hasError: true,
  //   });
  //   console.log(this.state.hasError);
  // }

  render() {
    if (this.state.hasError) {
      return <div>{this.state.hasError}</div>;
    }
    return (
      <div>
        <Suspense fallback={<div>loading....</div>}>
          {this.state.hasError}
          <About />
        </Suspense>
      </div>
    );
  }
}

export default App;
