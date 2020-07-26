import React from 'react'
import logo from './logo.svg'
import './App.css'

// Context创建
const BatterContext = React.createContext()

class Leaf extends React.Component {
  // 只能叫contextType
  static contextType = BatterContext
  render() {
    const batter = this.context
    return <h1>batter:{batter}</h1>
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
  }
  render() {
    const { power } = this.state
    return (
      <BatterContext.Provider value={power}>
        <button type="button" onClick={() => this.setState({ power: power - 1 })}>
          click
        </button>
        <Middle></Middle>
      </BatterContext.Provider>
    )
  }
}
// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

export default App
