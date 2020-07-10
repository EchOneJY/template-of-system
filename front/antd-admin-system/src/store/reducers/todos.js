import { combineReducers } from 'redux'
import { ACTION_SET_INPUT_VALUE, ACTION_SET_TODO_LIST } from '../actions'

export function inputValue(state = '', action) {
  const { type, payload } = action
  switch (type) {
    case ACTION_SET_INPUT_VALUE:
      return payload
    default:
  }
  return state
}

export function todoList(
  state = ['早上4点起床，锻炼身体', '中午下班游泳一小时'],
  action
) {
  const { type, payload } = action
  switch (type) {
    case ACTION_SET_TODO_LIST:
      console.log(payload)
      return payload
    default:
  }
  return state
}

export default combineReducers({
  inputValue,
  todoList
})
