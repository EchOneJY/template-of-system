import { message } from 'antd'

export const ACTION_SET_INPUT_VALUE = 'SET_INPUT_VALUE'
export const ACTION_SET_TODO_LIST = 'SET_TODO_LIST'
export const ACTION_ADD_TODO_ITEM_SAGA = 'ADD_TODO_ITEM_SAGA'
export const ACTION_DELETE_TODO_ITEM_SAGA = 'DELETE_TODO_ITEM_SAGA'

export function setInputValue(val) {
  return {
    type: ACTION_SET_INPUT_VALUE,
    payload: val
  }
}

export function setTodoList(list) {
  return {
    type: ACTION_SET_TODO_LIST,
    payload: list
  }
}

export function addTodoItem() {
  return (dispatch, getState) => {
    const {
      todos: { inputValue, todoList }
    } = getState()
    if (inputValue === '') {
      message.warning('内容不能为空')
      return
    }
    const list = todoList.concat(inputValue)
    dispatch(setTodoList(list))
    dispatch(setInputValue(''))
  }
}

export function deleteTodoItem(idx) {
  return (dispatch, getState) => {
    const {
      todos: { todoList }
    } = getState()
    const list = todoList.slice()
    list.splice(idx, 1)
    dispatch(setTodoList(list))
  }
}

export function addTodoItemSaga() {
  return {
    type: ACTION_ADD_TODO_ITEM_SAGA
  }
}

export function deleteTodoItemSaga(idx) {
  return {
    type: ACTION_DELETE_TODO_ITEM_SAGA,
    payload: idx
  }
}
