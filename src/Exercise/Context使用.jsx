import React from 'react'
import logo from './logo.svg'
import './App.css'

// Context创建
const BatterContext = React.createContext()
// 多个context的使用
const LoginContext = React.createContext()

class Leaf extends React.Component {
  render() {
    return (
      <BatterContext.Consumer>
        {(batter) => (
          <LoginContext.Consumer>
            {(login) => (
              <h1>
                batter:{batter} login:{String(login)}
              </h1>
            )}
          </LoginContext.Consumer>
        )}
      </BatterContext.Consumer>
    )
  }
}

class Middle extends React.Component {
  render() {
    return <Leaf />
  }
}

class App extends React.Component {
  state = {
    power: 60,
    isLogin: false,
  }
  render() {
    const { power, isLogin } = this.state
    return (
      <BatterContext.Provider value={power}>
        <LoginContext.Provider value={isLogin}>
          <button type="button" onClick={() => this.setState({ power: power - 1 })}>
            click
          </button>
          <button type="button" onClick={() => this.setState({ isLogin: !isLogin })}>
            press
          </button>
          <Middle></Middle>
        </LoginContext.Provider>
      </BatterContext.Provider>
    )
  }
}

export default App
