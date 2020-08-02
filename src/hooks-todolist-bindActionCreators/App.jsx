import React, { useEffect, useState, useCallback, memo, useRef } from 'react'
import { createAdd, createRemove, createSet, createToggle } from './actions'
import './App.css'
/**
 * 问题一:为什么设置state值时要使用函数形式
 *  设置值传入函数形式,避免对原数据的过度依赖
 * 问题二:为什么使用useCallback
 * 问题三:什么时候使用memo
 *  纯组件/无状态组件
 */
/**
 * action
 * {
 *  type:'add', // 操作类型
 *  payload:todo, // 数据
 * }
 */
let isSeq = new Date()
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
    addTodo({
      id: ++isSeq,
      text: newText,
      complete: false,
    })
    // dispatch({
    //   type: 'add',
    //   payload: {
    //     id: ++isSeq,
    //     text: newText,
    //     complete: false,
    //   },
    // })
    // dispatch(
    //   createAdd({
    //     id: ++isSeq,
    //     text: newText,
    //     complete: false,
    //   })
    // )
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
    // dispatch({ type: 'toggle', payload: id })
    // dispatch(createToggle(id))
  }
  const onRemove = () => {
    removeTodo(id)
    // dispatch({ type: 'remove', payload: id })
    // dispatch(createRemove(id))
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
  // 设置值传入函数形式,避免对原数据的过度依赖
  const addTodo = useCallback((todo) => {
    // setTodos((todos) => [...todos, todo])
    dispatch({ tyep: 'add', payload: todo })
  }, [])

  const removeTodo = useCallback((id) => {
    // setTodos((todos) => todos.filter((todo) => todo.id !== id))
    dispatch({ tyep: 'remove', payload: id })
  }, [])

  const toggleTodo = useCallback((id) => {
    // setTodos((todos) =>
    //   todos.map((todo) => (todo.id === id ? { ...todo, complete: !todo.complete } : todo))
    // )
    dispatch({ tyep: 'remove', payload: id })
  }, [])

  // 作为属性传递就需要使用callback包裹？第二个参数看是否对其他数据有所有依赖
  // 核心思想是都通过dispatch来操作数据  => 每次调用都需要构建一个action对象 => 将其分离成单独文件管理
  const dispatch = useCallback((action) => {
    const { type, payload } = action
    switch (type) {
      case 'set':
        setTodos(payload)
        break
      case 'add':
        setTodos((todos) => [...todos, payload])
        break
      case 'remove':
        setTodos((todos) => todos.filter((todo) => todo.id !== payload))
        break
      case 'toggle':
        setTodos((todos) =>
          todos.map((todo) => (todo.id === payload ? { ...todo, complete: !todo.complete } : todo))
        )
        break
      default:
    }
  }, [])
  // 仅执行一次
  useEffect(() => {
    const todos = JSON.parse(localStorage.getItem(LS_KEY) || '[]')
    // setTodos(todos)
    // dispatch({ type: 'set', payload: todos })
    dispatch(createSet(todos))
  }, [])
  useEffect(() => {
    localStorage.setItem(LS_KEY, JSON.stringify(todos))
  }, [todos])
  return (
    <div className="todo-list">
      {/* <Control addTodo={addTodo}></Control> */}
      {/* <Todos removeTodo={removeTodo} toggleTodo={toggleTodo} todos={todos}></Todos> */}
      {/* <Control dispatch={dispatch}></Control>
      <Todos dispatch={dispatch} todos={todos}></Todos> */}
      {/* ...bindActionCreators({ addTodo: createAdd }, dispatch) 该函数返回的是什么,传递给子组件的就是什么  */}
      <Control {...bindActionCreators({ addTodo: createAdd }, dispatch)}></Control>
      <Todos
        {...bindActionCreators({ removeTodo: createRemove, toggleTodo: createToggle }, dispatch)}
        todos={todos}
      ></Todos>
    </div>
  )
}

export default TodoList
