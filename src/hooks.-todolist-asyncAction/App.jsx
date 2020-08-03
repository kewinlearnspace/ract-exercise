import React, { useEffect, useState, useCallback, memo, useRef } from 'react'
import { createAdd, createRemove, createSet, createToggle } from './actions'
import reducer from './reducers'
import './App.css'

/**
 * action
 * {
 *  type:'add', // 操作类型
 *  payload:todo, // 数据
 * }
 */

/**
 * 先创建action对象 在统一通过dispatch来处理action
 */
function bindActionCreators(actionCreators, dispatch) {
  const res = {}
  for (let key in actionCreators) {
    // args是执行具体操作所传递进来的参数 如删除时传递的就是id
    res[key] = function (...args) {
      console.log(args, key)
      const actionCreator = actionCreators[key]
      const action = actionCreator(...args)
      dispatch(action)
    }
  }
  return res
}

// 组件外创建变量来存储state再结合useEffect(当值发生变化是就修改store的值),以保持每次异步请求后的数据都是最新的
let store = {
  todos: [],
  incrementCount: 0,
}
const Control = memo(function Control(props) {
  const { addTodo } = props
  const inputRef = useRef()

  // onSubmit没有向任何子组件传递,所以不需要useCallback?
  const onSubmit = (event) => {
    event.preventDefault()
    const newText = inputRef.current.value.trim()

    if (newText.length === 0) {
      return
    }
    addTodo(newText)
    inputRef.current.value = ''
  }
  return (
    <div className="control">
      <h1>Todo</h1>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          ref={inputRef}
          className="new-todo"
          placeholder="Waht needs to be done?"
        />
      </form>
    </div>
  )
})

const TodosItem = memo(function TodosItem(props) {
  const {
    todo: { id, text, complete },
    removeTodo,
    toggleTodo,
  } = props

  const onchange = () => {
    toggleTodo(id)
  }
  const onRemove = () => {
    removeTodo(id)
  }
  return (
    <li className="todo-item">
      <input type="checkbox" onChange={onchange} checked={complete}></input>
      <label className={complete ? 'complete' : ''}>{text}</label>
      <button onClick={onRemove}> &#xd7;</button>
    </li>
  )
})

const Todos = memo(function Todos(props) {
  const { todos, removeTodo, toggleTodo } = props
  return (
    <ul>
      {todos.map((todo) => (
        <TodosItem
          key={todo.id}
          todo={todo}
          removeTodo={removeTodo}
          toggleTodo={toggleTodo}
        ></TodosItem>
      ))}
    </ul>
  )
})

const LS_KEY = '_$todos_'
function TodoList() {
  const [todos, setTodos] = useState([])
  const [incrementCount, setIncrementCount] = useState(0)

  useEffect(() => {
    Object.assign(store, {
      todos,
      incrementCount,
    })
  }, [todos, incrementCount])
  // 作为属性传递就需要使用callback包裹？第二个参数看是否对其他数据有所有依赖
  // 核心思想是都通过dispatch来操作数据  => 每次调用都需要构建一个action对象 => 将其分离成单独文件管理
  // 从执行操作的来执行数据更新逻辑
  const dispatch = (action) => {
    // 操作数据的对象
    const setter = {
      todos: setTodos,
      incrementCount: setIncrementCount,
    }
    if ('function' === typeof action) {
      // 通过函数返回的形式,保持每次获取到的store都是最新的,与前一次无关
      action(dispatch, () => store)
      return
    }
    const newSetter = reducer(store, action)
    for (let key in newSetter) {
      console.log(key)
      // 执行更新state的方法
      setter[key](newSetter[key])
    }
  }
  // 仅执行一次
  useEffect(() => {
    const todos = JSON.parse(localStorage.getItem(LS_KEY) || '[]')
    dispatch(createSet(todos))
  }, [])
  useEffect(() => {
    localStorage.setItem(LS_KEY, JSON.stringify(todos))
  }, [todos])
  return (
    <div className="todo-list">
      <Control {...bindActionCreators({ addTodo: createAdd }, dispatch)}></Control>
      <Todos
        {...bindActionCreators({ removeTodo: createRemove, toggleTodo: createToggle }, dispatch)}
        todos={todos}
      ></Todos>
    </div>
  )
}

export default TodoList
