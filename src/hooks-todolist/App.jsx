import React, { useEffect, useState, useCallback, memo, useRef } from 'react'
import './App.css'
/**
 * 问题一:为什么设置state值时要使用函数形式
 *  设置值传入函数形式,避免对原数据的过度依赖
 * 问题二:为什么使用useCallback
 * 问题三:什么时候使用memo
 *  纯组件/无状态组件
 */
let isSeq = new Date()
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
    toggleTodo,
    removeTodo,
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
  // 设置值传入函数形式,避免对原数据的过度依赖
  const addTodo = useCallback((todo) => {
    setTodos((todos) => [...todos, todo])
  }, [])

  const removeTodo = useCallback((id) => {
    setTodos((todos) => todos.filter((todo) => todo.id !== id))
  }, [])

  const toggleTodo = useCallback((id) => {
    setTodos((todos) =>
      todos.map((todo) => (todo.id === id ? { ...todo, complete: !todo.complete } : todo))
    )
  }, [])
  // 仅执行一次
  useEffect(() => {
    const todos = JSON.parse(localStorage.getItem(LS_KEY) || '[]')
    setTodos(todos)
  }, [])
  useEffect(() => {
    localStorage.setItem(LS_KEY, JSON.stringify(todos))
  }, [todos])
  return (
    <div className="todo-list">
      <Control addTodo={addTodo}></Control>
      <Todos removeTodo={removeTodo} toggleTodo={toggleTodo} todos={todos}></Todos>
    </div>
  )
}

export default TodoList
