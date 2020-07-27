import React, { Component, PureComponent, memo } from 'react';

// class Foo extends Component {
//   // 通过比较下一次的props是否相等,判断是否要重新渲染,false 标识不需要重新渲染,true 表示需要重新渲染
//   shouldComponentUpdate(nextProps, nextState) {
//     if (nextProps.name === this.props.name) {
//       return false;
//     }
//     return true;
//   }
//   render() {
//     console.log('Foo render');
//     return null;
//   }
// }
// class App extends Component {
//   state = {
//     count: 0,
//   };
//   render() {
//     return (
//       <div>
//         <button type="button" onClick={() => this.setState({ count: this.state.count + 1 })}>
//           addClick
//         </button>
//         <Foo></Foo>
//       </div>
//     );
//   }
// }

/**
 * 表示一个纯组件，可以用来优化 react 程序。减少 render 函数渲染的次数。提高性能。进行的是浅比较，也就是说如果是引用数据类型的数据，只会比较不是同一个地址，而不会比较这个地址里面的数据是否一致
 * 缺陷:进行的是浅比较(只有传入的props第一级的数据发生变化才会触发组件重新渲染),可以理解成可以比较出简单的数据类型是否发生变化,单无法检查到引用数据类型是否发生变化,对引用数据类型的仅是比较其指针所指向的地址是否发生变化,若是使用该方法检查引用数据类型是否发生变化,只能在其内部数据发生变化时,强行改变原来指针的指向,使其指向一个新的地址
 * 使用场景：纯展示组件上
 */
// 类声明组件
// class Foo extends PureComponent {
//   render() {
//     console.log('Foo render');
//     return <div>{this.props.person.age}</div>;
//   }
// }
// 函数组件 - 无状态组件
// memo使用memo包裹一层,等价于PureComponent
const Foo = memo(function Foo(props) {
  console.log('Foo render');
  return <div>{props.person.age}</div>;
});
class App extends Component {
  state = {
    person: {
      age: 0,
    },
    count: 0,
  };
  // callback() {
  //   // this指向
  // }
  callback = () => {};
  render() {
    const { person } = this.state;
    return (
      <div>
        <button
          type="button"
          onClick={() => {
            person.age++;
            this.setState({ count: this.state.count + 1, person });
          }}
        >
          addClick
        </button>
        {/* this指向有问题 */}
        {/* <Foo person={person} cb={this.callback}></Foo> */}
        {/* 每次都会刷新 */}
        {/* <Foo person={person} cb={() => {}}></Foo> */}
        <Foo person={person} cb={this.callback}></Foo>
      </div>
    );
  }
}

export default App;
